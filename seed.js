const mongoose = require('mongoose');
const { Category } = require('./models/Category');
const { Product } = require('./models/Product');

async function seed() {
  try {
    await mongoose.connect("mongodb+srv://EcoMeanDB:EcoMeanDB2025@ecommerce-mean-db.9ac0d4z.mongodb.net/");

    // Clear old data
    await Category.deleteMany({});
    await Product.deleteMany({});

    // Insert categories
    const categories = await Category.insertMany([
      { name: "Books", description: "All kinds of books" },
      { name: "Electronics", description: "Mobiles, laptops, and gadgets" },
      { name: "Clothes", description: "Men and women fashion" },
      { name: "Home & Kitchen", description: "Appliances and utensils" },
      { name: "Sports", description: "Sportswear and equipment" }
    ]);

    // Insert products (20)
    await Product.insertMany([
      // Books
      {
        name: "Harry Potter",
        description: "Fantasy novel",
        price: 25,
        stock: 100,
        categoryId: categories[0]._id,
        images: ["https://images.unsplash.com/photo-1544936207-6f2a1a49b7f3"],
        isFeatured: true
      },
      {
        name: "The Great Gatsby",
        description: "Classic novel by F. Scott Fitzgerald",
        price: 15,
        stock: 80,
        categoryId: categories[0]._id,
        images: ["https://images.unsplash.com/photo-1512820790803-83ca734da794"],
        isFeatured: false
      },
      {
        name: "Atomic Habits",
        description: "Self-help book by James Clear",
        price: 20,
        stock: 120,
        categoryId: categories[0]._id,
        images: ["https://images.unsplash.com/photo-1589998059171-adef4c2b72cd"],
        isFeatured: true
      },
      {
        name: "Clean Code",
        description: "Programming best practices by Robert C. Martin",
        price: 35,
        stock: 50,
        categoryId: categories[0]._id,
        images: ["https://images.unsplash.com/photo-1522202176988-66273c2fd55f"],
        isFeatured: false
      },

      // Electronics
      {
        name: "Dell XPS 15",
        description: "High performance laptop",
        price: 1500,
        stock: 20,
        categoryId: categories[1]._id,
        images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8"],
        isFeatured: true
      },
      {
        name: "iPhone 15",
        description: "Latest Apple phone",
        price: 1200,
        stock: 50,
        categoryId: categories[1]._id,
        images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"],
        isFeatured: true
      },
      {
        name: "Samsung Galaxy S23",
        description: "Latest Samsung flagship phone",
        price: 1100,
        stock: 40,
        categoryId: categories[1]._id,
        images: ["https://images.unsplash.com/photo-1580910051074-c3d1e73b1e09"],
        isFeatured: false
      },
      {
        name: "Sony WH-1000XM5",
        description: "Noise cancelling headphones",
        price: 350,
        stock: 70,
        categoryId: categories[1]._id,
        images: ["https://images.unsplash.com/photo-1519677100203-a0e668c92439"],
        isFeatured: false
      },

      // Clothes
      {
        name: "Nike Air Max",
        description: "Comfortable running shoes",
        price: 120,
        stock: 200,
        categoryId: categories[2]._id,
        images: ["https://images.unsplash.com/photo-1600185365483-26d7d19a5a06"],
        isFeatured: true
      },
      {
        name: "Adidas Hoodie",
        description: "Winter wear hoodie",
        price: 60,
        stock: 150,
        categoryId: categories[2]._id,
        images: ["https://images.unsplash.com/photo-1600180758895-7d9c56b6b4c7"],
        isFeatured: false
      },
      {
        name: "Levi’s Jeans",
        description: "Classic denim jeans",
        price: 70,
        stock: 100,
        categoryId: categories[2]._id,
        images: ["https://images.unsplash.com/photo-1523381294911-8d3cead13475"],
        isFeatured: true
      },
      {
        name: "Puma T-shirt",
        description: "Casual cotton t-shirt",
        price: 30,
        stock: 180,
        categoryId: categories[2]._id,
        images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"],
        isFeatured: false
      },

      // Home & Kitchen
      {
        name: "Non-stick Frying Pan",
        description: "Durable kitchen frying pan",
        price: 40,
        stock: 90,
        categoryId: categories[3]._id,
        images: ["https://images.unsplash.com/photo-1622202222506-020e2df4c1d3"],
        isFeatured: true
      },
      {
        name: "Microwave Oven",
        description: "20L compact microwave oven",
        price: 200,
        stock: 30,
        categoryId: categories[3]._id,
        images: ["https://images.unsplash.com/photo-1622202222295-5e3b3a3c6d3f"],
        isFeatured: false
      },
      {
        name: "Coffee Maker",
        description: "Automatic drip coffee machine",
        price: 80,
        stock: 60,
        categoryId: categories[3]._id,
        images: ["https://images.unsplash.com/photo-1511920170033-f8396924c348"],
        isFeatured: true
      },
      {
        name: "Vacuum Cleaner",
        description: "Bagless vacuum cleaner",
        price: 150,
        stock: 25,
        categoryId: categories[3]._id,
        images: ["https://images.unsplash.com/photo-1616627563020-21f8cc5b3d19"],
        isFeatured: false
      },

      // Sports
      {
        name: "Football",
        description: "Standard size 5 football",
        price: 25,
        stock: 120,
        categoryId: categories[4]._id,
        images: ["https://images.unsplash.com/photo-1604908177767-722cd49f5a3d"],
        isFeatured: true
      },
      {
        name: "Basketball",
        description: "Indoor/outdoor basketball",
        price: 30,
        stock: 100,
        categoryId: categories[4]._id,
        images: ["https://images.unsplash.com/photo-1521412644187-c49fa049e84d"],
        isFeatured: false
      },
      {
        name: "Tennis Racket",
        description: "Lightweight carbon racket",
        price: 120,
        stock: 60,
        categoryId: categories[4]._id,
        images: ["https://images.unsplash.com/photo-1604165094771-1af8b2c9fbf8"],
        isFeatured: true
      },
      {
        name: "Running Shoes",
        description: "Professional running shoes",
        price: 100,
        stock: 80,
        categoryId: categories[4]._id,
        images: ["https://images.unsplash.com/photo-1585386959984-a415522b8f3d"],
        isFeatured: false
      }
    ]);

    console.log("✅ Database seeded with categories and products");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
