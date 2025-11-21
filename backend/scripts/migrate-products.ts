
import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK
const serviceAccount = require("../../serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const productsData = [
    {
        name: "Emperor",
        slug: "emperor",
        label: "Xclusive",
        description: "A luxurious casket designed for the discerning individual.",
        price: 130000000,
        currency: "NGN",
        dimensions: { length: 198, width: 66, height: 58 },
        colors: ["Metallic Brown"],
        sizes: ["6.2ft"],
        status: "in_stock",
        availability: { leadTimeDays: 7 },
        stockQuantity: 10,
        images: ["products/emperor/image1.jpg", "products/emperor/image2.jpg"],
        thumbnail: "products/emperor/thumbnail.jpg",
        createdBy: "migration_script",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        metadata: { 
            tags: ["xclusive"], 
            rating: 4.7,
            brand: "George Wood Caskets",
            estimatedDelivery: "3-7 business days",
            originalId: 1
        }
    },
    // ... more products ...
];

async function migrateProducts() {
  const productsCollection = db.collection('products');

  for (const product of productsData) {
    await productsCollection.doc(product.slug).set(product);
    console.log(`Migrated product: ${product.name}`);
  }

  console.log('Product migration completed.');
}

migrateProducts().catch(console.error);
