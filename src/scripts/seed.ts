import mongoose from "mongoose";
import Product from "../models/product.model.js";

const OWNER_ID = "689b8d0dac399985cd075bc7";

const seedProducts = [
  // Men's Clothing
  {
    productName: "Classic Denim Jacket",
    productDescription:
      "Timeless denim jacket perfect for layering. Made from premium cotton denim with a comfortable fit.",
    productImages: [
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=800&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    ],
    productPrice: 89.99,
    sizes: ["S", "M", "L", "XL", "XXL"],
    seller: new mongoose.Types.ObjectId(OWNER_ID),
  },
  {
    productName: "Casual Cotton T-Shirt",
    productDescription:
      "Comfortable everyday cotton t-shirt with a relaxed fit. Perfect for casual wear.",
    productImages: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&q=80",
    ],
    productPrice: 24.99,
    sizes: ["XS", "S", "M", "L", "XL"],
    seller: new mongoose.Types.ObjectId(OWNER_ID),
  },
  {
    productName: "Formal Business Shirt",
    productDescription:
      "Professional white dress shirt made from wrinkle-resistant fabric. Perfect for office wear.",
    productImages: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
    ],
    productPrice: 59.99,
    sizes: ["S", "M", "L", "XL", "XXL"],
    seller: new mongoose.Types.ObjectId(OWNER_ID),
  },

  // Women's Clothing
  {
    productName: "Elegant Summer Dress",
    productDescription:
      "Flowing midi dress perfect for summer occasions. Made from breathable fabric with a flattering silhouette.",
    productImages: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80",
    ],
    productPrice: 79.99,
    sizes: ["XS", "S", "M", "L", "XL"],
    seller: new mongoose.Types.ObjectId(OWNER_ID),
  },
  {
    productName: "Cozy Knit Sweater",
    productDescription:
      "Soft and warm knit sweater perfect for chilly days. Features a classic crew neck design.",
    productImages: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
      "https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=800&q=80",
    ],
    productPrice: 65.99,
    sizes: ["XS", "S", "M", "L"],
    seller: new mongoose.Types.ObjectId(OWNER_ID),
  },
  {
    productName: "High-Waist Skinny Jeans",
    productDescription:
      "Comfortable high-waisted jeans with stretch fabric. Perfect fit for all-day wear.",
    productImages: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80",
    ],
    productPrice: 69.99,
    sizes: ["24", "26", "28", "30", "32", "34"],
    seller: new mongoose.Types.ObjectId(OWNER_ID),
  },

  // Kids' Clothing
  {
    productName: "Kids Rainbow T-Shirt",
    productDescription:
      "Fun and colorful t-shirt for kids with a bright rainbow design. Made from soft, child-friendly cotton.",
    productImages: [
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80",
      "https://images.unsplash.com/photo-1503944168730-28e2a68e0d75?w=800&q=80",
    ],
    productPrice: 19.99,
    sizes: ["2T", "3T", "4T", "5T", "6T"],
    seller: new mongoose.Types.ObjectId(OWNER_ID),
  },
  {
    productName: "Kids Denim Overalls",
    productDescription:
      "Adorable denim overalls for kids with adjustable straps. Perfect for playtime and casual outings.",
    productImages: [
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
    ],
    productPrice: 39.99,
    sizes: ["2T", "3T", "4T", "5T", "6T", "7T"],
    seller: new mongoose.Types.ObjectId(OWNER_ID),
  },

  // Men's Shoes
  {
    productName: "Classic White Sneakers",
    productDescription:
      "Versatile white leather sneakers perfect for casual and semi-formal occasions. Comfortable all-day wear.",
    productImages: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80",
    ],
    productPrice: 119.99,
    sizes: ["7", "8", "9", "10", "11", "12"],
    seller: new mongoose.Types.ObjectId(OWNER_ID),
  },
  {
    productName: "Leather Dress Shoes",
    productDescription:
      "Elegant black leather oxford shoes perfect for business and formal occasions.",
    productImages: [
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80",
      "https://images.unsplash.com/photo-1582897085656-c636d006a246?w=800&q=80",
    ],
    productPrice: 159.99,
    sizes: ["7", "8", "9", "10", "11", "12"],
    seller: new mongoose.Types.ObjectId(OWNER_ID),
  },

  // Women's Shoes
  {
    productName: "High Heel Pumps",
    productDescription:
      "Elegant black high heel pumps perfect for formal events and professional settings.",
    productImages: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&q=80",
    ],
    productPrice: 89.99,
    sizes: ["5", "6", "7", "8", "9", "10"],
    seller: new mongoose.Types.ObjectId(OWNER_ID),
  },
  {
    productName: "Comfortable Running Shoes",
    productDescription:
      "Lightweight running shoes with excellent cushioning and breathable mesh upper.",
    productImages: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
    ],
    productPrice: 99.99,
    sizes: ["5", "6", "7", "8", "9", "10"],
    seller: new mongoose.Types.ObjectId(OWNER_ID),
  },

  // Watches - Men's
  {
    productName: "Classic Analog Watch",
    productDescription:
      "Timeless analog watch with leather strap and stainless steel case. Water-resistant and durable.",
    productImages: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    ],
    productPrice: 199.99,
    sizes: ["One Size"],
    seller: new mongoose.Types.ObjectId(OWNER_ID),
  },
  {
    productName: "Digital Sports Watch",
    productDescription:
      "Durable digital sports watch with multiple functions including timer, alarm, and water resistance.",
    productImages: [
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&q=80",
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=800&q=80",
    ],
    productPrice: 79.99,
    sizes: ["One Size"],
    seller: new mongoose.Types.ObjectId(OWNER_ID),
  },

  // Watches - Women's
  {
    productName: "Elegant Rose Gold Watch",
    productDescription:
      "Beautiful rose gold watch with crystal accents and mesh bracelet. Perfect for both casual and formal wear.",
    productImages: [
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&q=80",
      "https://images.unsplash.com/photo-1511370235399-1802cae1d32f?w=800&q=80",
    ],
    productPrice: 149.99,
    sizes: ["One Size"],
    seller: new mongoose.Types.ObjectId(OWNER_ID),
  },
  {
    productName: "Minimalist Silver Watch",
    productDescription:
      "Sleek and minimalist silver watch with clean design and comfortable leather strap.",
    productImages: [
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&q=80",
      "https://images.unsplash.com/photo-1594576662609-239cf2489270?w=800&q=80",
    ],
    productPrice: 129.99,
    sizes: ["One Size"],
    seller: new mongoose.Types.ObjectId(OWNER_ID),
  },

  // Additional Categories
  {
    productName: "Leather Handbag",
    productDescription:
      "Premium leather handbag with multiple compartments. Perfect for work and everyday use.",
    productImages: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    ],
    productPrice: 179.99,
    sizes: ["One Size"],
    seller: new mongoose.Types.ObjectId(OWNER_ID),
  },
  {
    productName: "Canvas Backpack",
    productDescription:
      "Durable canvas backpack perfect for school, work, or travel. Multiple pockets for organization.",
    productImages: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80",
    ],
    productPrice: 59.99,
    sizes: ["One Size"],
    seller: new mongoose.Types.ObjectId(OWNER_ID),
  },
  {
    productName: "Wireless Earbuds",
    productDescription:
      "High-quality wireless earbuds with noise cancellation and long battery life.",
    productImages: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&q=80",
    ],
    productPrice: 129.99,
    sizes: ["One Size"],
    seller: new mongoose.Types.ObjectId(OWNER_ID),
  },
  {
    productName: "Sunglasses - Aviator Style",
    productDescription:
      "Classic aviator sunglasses with UV protection and polarized lenses. Timeless style.",
    productImages: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
    ],
    productPrice: 89.99,
    sizes: ["One Size"],
    seller: new mongoose.Types.ObjectId(OWNER_ID),
  },
];

// Function to seed the database
export const seedProductsDB = async () => {
  try {
    // Connect to MongoDB if not already connected
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(
        process.env.MONGODB_URI || "mongodb://localhost:27017/your-db-name"
      );
    }

    // Clear existing products (optional)
    await Product.deleteMany({});
    console.log("Cleared existing products");

    // Insert seed data
    const createdProducts = await Product.insertMany(seedProducts);
    console.log(`✅ Successfully seeded ${createdProducts.length} products`);

    // Log some sample data
    console.log("\nSample products created:");
    createdProducts.slice(0, 3).forEach((product) => {
      console.log(`- ${product.productName}: $${product.productPrice}`);
    });

    return createdProducts;
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    throw error;
  }
};

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedProductsDB()
    .then(() => {
      console.log("✅ Product seeding completed successfully");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Product seeding failed:", error);
      process.exit(1);
    });
}
