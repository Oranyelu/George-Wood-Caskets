import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import products from "../assets/product-api";

export const migrateProducts = async () => {
    console.log("Starting migration...");
    let successCount = 0;
    let errorCount = 0;

    for (const product of products) {
        try {
            const productRef = doc(db, "products", product.id);
            const docSnap = await getDoc(productRef);

            if (docSnap.exists()) {
                console.log(`Product ${product.name} already exists. Skipping.`);
                continue;
            }

            let imageUrl = "";
            if (product.thumbnail) {
                try {
                    // Fetch the image blob from the local path (Vite serves it)
                    const response = await fetch(product.thumbnail);
                    const blob = await response.blob();

                    // Upload to Firebase Storage
                    const storageRef = ref(storage, `products/${product.id}/${product.id}.svg`);
                    await uploadBytes(storageRef, blob);
                    imageUrl = await getDownloadURL(storageRef);
                } catch (imgErr) {
                    console.error(`Error uploading image for ${product.name}:`, imgErr);
                    // Fallback to original path if upload fails, though it won't work in prod if local
                    imageUrl = product.thumbnail;
                }
            }

            // Determine Category and Material based on name/description (Simple heuristics for migration)
            let category = "Traditional";
            if (product.label === "Premium" || product.price > 400000) category = "Premium";
            if (product.label === "Religious" || product.name.includes("Bible")) category = "Religious";

            let material = "Wood"; // Default
            const lowerDesc = product.description.toLowerCase();
            if (lowerDesc.includes("mahogany") || product.colors.includes("Mahogany")) material = "Mahogany";
            else if (lowerDesc.includes("oak") || product.colors.includes("Oak")) material = "Oak";
            else if (lowerDesc.includes("cherry") || product.colors.includes("Cherry")) material = "Cherry";
            else if (lowerDesc.includes("walnut") || product.colors.includes("Walnut")) material = "Walnut";
            else if (lowerDesc.includes("maple") || product.colors.includes("Maple")) material = "Maple";
            else if (lowerDesc.includes("metal") || product.colors.includes("Metal")) material = "Metal";


            const newProductData = {
                name: product.name,
                price: product.price,
                description: product.description,
                colors: product.colors,
                label: product.label || "",
                category: category,
                material: material,
                thumbnail: imageUrl,
                images: [imageUrl], // Initialize images array
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            await setDoc(productRef, newProductData);
            console.log(`Migrated ${product.name}`);
            successCount++;
        } catch (error) {
            console.error(`Failed to migrate ${product.name}:`, error);
            errorCount++;
        }
    }

    return { successCount, errorCount };
};
