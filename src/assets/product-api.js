// Import the default export (productImages object) from productImgImports.js
import productImages from './productImgImports';

const Products = {
  productsData: [
    {
      name: "Emperor",
      label: "Xclusive",
      id: 1,
      thumbnail: [productImages.EmperorWhite], // Correctly reference images
      images: ["path/to/image1.jpg", "path/to/image2.jpg"],
      price: 850000,
      color: "Metallic Brown",
      size: "6.2ft",
    },
    {
      name: "Balmoral",
      id: 2,
      thumbnail: [productImages.BalmoralWhite], // Correctly reference images
      images: ["path/to/image3.jpg", "path/to/image4.jpg"],
      price: 400000,
      color: "White",
      size: "6.2ft",
    },
    {
      name: "Oxford",
      id: 3,
      thumbnail: [productImages.OxfordBrown], // Correctly reference images
      images: ["path/to/image5.jpg", "path/to/image6.jpg"],
      price: 500000,
      color: "Gold",
      size: "6.2ft",
    },
    {
      name: "Avalanch",
      id: 4,
      thumbnail: [productImages.AvalanchWhiteRosegold], // Correctly reference images
      images: ["path/to/image7.jpg", "path/to/image8.jpg"],
      price: 600000,
      color: "White x Rosegold",
      size: "6.2ft",
    },
    {
      name: "Havard",
      id: 5,
      thumbnail: [productImages.HavardBrown], // Correctly reference images
      images: ["path/to/image9.jpg", "path/to/image10.jpg"],
      price: 300000,
      color: "White",
      size: "6.2ft",
    },
    {
      name: "Senator",
      label: "Xclusive",
      id: 6,
      thumbnail: [productImages.SenatorBrown], // Correctly reference images
      images: ["path/to/image11.jpg", "path/to/image12.jpg"],
      price: 900000,
      color: "Gold",
      size: "6.2ft",
    },
    {
      name: "Voyager",
      id: 7,
      thumbnail: [productImages.Voyager1], // Correctly reference images
      images: ["path/to/image15.jpg", "path/to/image16.jpg"],
      price: 400000,
      color: "Polished",
      size: "6.2ft",
    },
    {
      name: "Coffin",
      id: 8,
      thumbnail: [productImages.CoffinBrown], // Correctly reference images
      images: ["path/to/image19.jpg", "path/to/image20.jpg"],
      price: 300000,
      color: "Polished",
      size: "6.2ft",
    },
    {
      name: "Military",
      label: "Xclusive",
      id: 9,
      thumbnail: [productImages.MilitaryBrown], // Correctly reference images
      images: ["path/to/image23.jpg", "path/to/image24.jpg"],
      price: 850000,
      color: "Silver",
      size: "6.2ft",
    },
    {
      name: "Haven",
      label: "Xclusive",
      id: 10,
      thumbnail: [productImages.HavenBrown], // Correctly reference images
      images: ["path/to/image25.jpg", "path/to/image26.jpg"],
      price: 850000,
      color: "Silver",
      size: "6.2ft",
    },
    {
      name: "Sincerity",
      label: "Xclusive",
      id: 11,
      thumbnail: [productImages.Sincerity1], // Correctly reference images
      images: ["path/to/image27.jpg", "path/to/image28.jpg"],
      price: 850000,
      color: "White",
      size: "6.2ft",
    },
    {
      name: "Clifton",
      label: "Xclusive",
      id: 12,
      thumbnail: [productImages.CliftonBrown], // Correctly reference images
      images: ["path/to/image31.jpg", "path/to/image32.jpg"],
      price: 850000,
      color: "Olive Green",
      size: "6.2ft",
    },
    {
      name: "Promise",
      id: 13,
      thumbnail: [productImages.PromiseBrown], // Correctly reference images
      images: ["path/to/image35.jpg", "path/to/image36.jpg"],
      price: 400000,
      color: "Polished",
      size: "6.2ft",
    },
    {
      name: "Carnation",
      id: 14,
      thumbnail: [productImages.CarnationBrown], // Correctly reference images
      images: ["path/to/image37.jpg", "path/to/image38.jpg"],
      price: 850000,
      color: "Brown",
      size: "6.2ft",
    },
    {
      name: "Syracuse",
      id: 15,
      thumbnail: [productImages.SyracuseBrown], // Correctly reference images
      images: ["path/to/image39.jpg", "path/to/image40.jpg"],
      price: 1300000,
      color: "Brown",
      size: "6.2ft",
    },
    {
      name: "Bailey",
      id: 16,
      thumbnail: [productImages.BaileyBrown], // Correctly reference images
      images: ["path/to/image41.jpg", "path/to/image42.jpg"],
      price: 900000,
      color: "Gray",
      size: "6.2ft",
    },
    {
      name: "Delary",
      id: 17,
      thumbnail: [productImages.DelrayBrown], // Correctly reference images
      images: ["path/to/image43.jpg", "path/to/image44.jpg"],
      price: 600000,
      color: "Brown",
      size: "6.2ft",
    },
    {
      name: "Hart Wick",
      id: 18,
      thumbnail: [productImages.HartwickBrown], // Correctly reference images
      images: ["path/to/image45.jpg", "path/to/image46.jpg"],
      price: 1300000,
      color: "Brown",
      size: "6.2ft",
    },
    {
      name: "Barnett",
      id: 19,
      thumbnail: [productImages.BarnettBrown], // Correctly reference images
      images: ["path/to/image49.jpg", "path/to/image50.jpg"],
      price: 1600000,
      color: "Brown",
      size: "6.2ft",
    },
    {
      name: "The Bible",
      id: 20,
      thumbnail: [productImages.TheBibleBrown], // Correctly reference images
      images: ["path/to/image51.jpg", "path/to/image52.jpg"],
      price: 300000,
      color: "Brown",
      size: "6.2ft",
    }
  ]
};

export default Products;
