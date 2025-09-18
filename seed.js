const mongoose = require('mongoose');
const { Category } = require('./models/Category');
const { Product } = require('./models/Product');

async function seed() {
  try {
    await mongoose.connect(
      "mongodb+srv://EcoMeanDB:EcoMeanDB2025@ecommerce-mean-db.9ac0d4z.mongodb.net/"
    );

    // Clear old data
    await Category.deleteMany({});
    await Product.deleteMany({});

    // ✅ Categories
    const categoryData = [
      { name: 'Mobiles' },
      { name: 'Headphones' },
      { name: 'Scooters' },
      { name: 'Cameras' },
      { name: 'Laptops' },
      { name: 'Shoes' },
      { name: 'Consoles' },
      { name: 'Wearables' },
      { name: 'Watches' },
      { name: 'Home Appliances' },
      { name: 'Tablets' },
    ];

    const categories = await Category.insertMany(categoryData);

    // ✅ Products
    const productData = [
      {
        name: 'Oppo Reno 13F 5G (Plume Purple, 12GB RAM, 256GB)',
        description: 'Mid-range smartphone with 6.67-inch AMOLED display, Snapdragon 6 Gen 1, 5800mAh battery, and IP69 water resistance.',
        price: 999,
        stock: 25,
        images: ['https://technave.com/data/files/article/202501070421452567.jpg'],
        categoryId: categories[0]._id,
        isFeatured: true
      },
      {
        name: 'Sony WH-1000XM4',
        description: 'Premium over-ear headphones with industry-leading noise cancellation, 30-hour battery life, and high-resolution audio support.',
        price: 349,
        stock: 50,
        images: ['https://tse3.mm.bing.net/th/id/OIP.6yfg3YlAsogezPqQ9_hFzwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'],
        categoryId: categories[1]._id,
        isFeatured: false
      },
      {
        name: 'Scooter',
        description: 'Merv - Kids And Adults - Jumbo - Height-Adjustable Foldable Kick Scooter Anti-Skid Wear Resistant Wheel',
        price: 1199,
        stock: 15,
        images: ['https://f.nooncdn.com/p/pzsku/Z64B3C2BBCB8446D2A079Z/45/1756818422/9ac583cc-479b-4e92-a241-631698158496.jpg?width=800'],
        categoryId: categories[2]._id,
        isFeatured: true
      },
      {
        name: 'Canon EOS Rebel T7 (2000D)',
        description: 'Entry-level DSLR with a 24.1MP APS-C sensor, 9-point AF system, and Full HD 1080p video recording at 30fps.',
        price: 499,
        stock: 12,
        images: ['https://th.bing.com/th/id/OIP.LgZst4kC3Jl0Qy-CsjSxIgHaHa?w=194&h=194&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3'],
        categoryId: categories[3]._id,
        isFeatured: false
      },
      {
        name: 'Nikon D3500',
        description: 'Beginner-friendly DSLR with a 24.2MP DX-format sensor, EXPEED 4 processor, and Full HD video at 60p.',
        price: 450,
        stock: 20,
        images: ['https://img1.kakaku.k-img.com/images/productimage/fullscale/K0000436257_0013.jpg'],
        categoryId: categories[3]._id,
        isFeatured: true
      },
      {
        name: 'DSLR camera',
        description: 'EOS 90D camera with 18-135mm lens U EU.',
        price: 650,
        stock: 18,
        images: ['https://f.nooncdn.com/p/v1663251264/N35996285A_2.jpg?width=800'],
        categoryId: categories[3]._id,
        isFeatured: true
      },
      {
        name: 'Logitech MX Master 3S',
        description: 'Ergonomic wireless mouse with a 8000 DPI sensor, multi-device connectivity, and 70-day battery life.',
        price: 99,
        stock: 60,
        images: ['https://tse3.mm.bing.net/th/id/OIP.AGkAIoXCQnKlUDYz6CQi1wHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'],
        categoryId: categories[4]._id,
        isFeatured: false
      },
      {
        name: 'ASOS',
        description: 'ROG Pelta Wireless RGB Gaming Headset ROG SpeedNova, Bluetooth, 2.4GHz, USB-C, 50mm RO',
        price: 249,
        stock: 40,
        images: ['https://f.nooncdn.com/p/pnsku/N70147292V/45/_/1738239441/1f6a77ca-d03b-40ed-8a2b-8bf1d6e38ce9.jpg?width=800'],
        categoryId: categories[1]._id,
        isFeatured: false
      },
      {
        name: 'HP Pavilion Gaming 15 (2023)',
        description: 'Gaming laptop with AMD Ryzen 7 7840HS, NVIDIA GeForce RTX 4060, 16GB RAM, and 15.6-inch Full HD display.',
        price: 1099,
        stock: 10,
        images: ['https://m.media-amazon.com/images/I/512ZtGERa1L._AC_.jpg'],
        categoryId: categories[4]._id,
        isFeatured: false
      },
      {
        name: 'Adidas',
        description: 'Copa Pure 2 Club Flexible Ground Football Boots.',
        price: 1399,
        stock: 8,
        images: ['https://f.nooncdn.com/p/pzsku/Z26ECFE42AB60368655A2Z/45/_/1740310412/71d250e5-ca82-4c57-b006-756acb918abc.jpg?width=800'],
        categoryId: categories[5]._id,
        isFeatured: false
      },
      {
        name: 'Sony PlayStation 5',
        description: 'Next-gen console with 4K gaming, 825GB SSD, and backward compatibility with PS4 titles.',
        price: 499,
        stock: 30,
        images: ['https://sonyworld.ae/cdn/shop/files/ps5_pro_pr_01_right_RGB.jpg?v=1727355057&width=550'],
        categoryId: categories[6]._id,
        isFeatured: false
      },
      {
        name: 'Xiaomi Smart Band 7',
        description: 'Fitness tracker with 1.62-inch AMOLED display, SpO2 monitoring, and up to 14-day battery life.',
        price: 49,
        stock: 80,
        images: ['https://lablaab.com/wp-content/uploads/2020/08/2edw-1024x1024.jpg'],
        categoryId: categories[7]._id,
        isFeatured: true
      },
      {
        name: "Emporio Armani Men's Watch AR1124",
        description: "The Emporio Armani AR1124 is a luxury men's watch blending sleek, minimalist style with functionality, ideal for formal and daily wear.",
        price: 129,
        stock: 35,
        images: ['https://f.nooncdn.com/p/pzsku/ZF0503721B03CBC30DF94Z/45/1752106561/b12dd775-d320-4cb4-92d2-3fe47823a53f.jpg?width=800'],
        categoryId: categories[8]._id,
        isFeatured: false
      },
      {
        name: 'Dyson V11 Torque Drive',
        description: 'Cordless vacuum with up to 60 minutes runtime, LCD screen, and whole-machine HEPA filtration.',
        price: 599,
        stock: 22,
        images: ['https://nypost.com/wp-content/uploads/sites/2/2021/11/vac4.jpg?quality=90&strip=all'],
        categoryId: categories[9]._id,
        isFeatured: false
      },
      {
        name: 'Apple iPad Air (5th Generation, 2022)',
        description: '10.9-inch tablet with M1 chip, 12MP camera, and support for Apple Pencil and Magic Keyboard.',
        price: 599,
        stock: 18,
        images: ['https://tse1.mm.bing.net/th/id/OIP.klNZo0dOUhXWaP5oGTPSeQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'],
        categoryId: categories[10]._id,
        isFeatured: false
      },
      {
        name: 'Samsung Galaxy Tab S7 FE',
        description: 'Android tablet with 12.4-inch TFT display, S Pen included, and 10,090mAh battery.',
        price: 649,
        stock: 20,
        images: ['https://www.geekman.in/wp-content/uploads/2021/05/Samsung-Galaxy-S7-FE-232-1024x683.jpg'],
        categoryId: categories[10]._id,
        isFeatured: false
      },
      {
        name: 'Lenovo Tab P11 (2nd Gen)',
        description: '10.6-inch 2K display tablet with MediaTek Helio G99, 4GB RAM, and quad speakers.',
        price: 299,
        stock: 25,
        images: ['https://tse2.mm.bing.net/th/id/OIP.qOlbqq5lf67a5QJRYzV1QwAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'],
        categoryId: categories[10]._id,
        isFeatured: true
      },
      {
        name: "Tommy Hilfiger Women's Watch",
        description: "The Tommy Hilfiger Women's Watch 178197 (or a similar model in the 178XXXX series) is a stylish, fashion-forward wristwatch designed for women.",
        price: 79,
        stock: 0,
        images: ['https://cdn2.jomashop.com/media/catalog/product/cache/9d6243d99187096e972f05545e39058c/t/o/tommy-hilfiger-angela-rose-goldtone-dial-ladies-watch-1782124.jpg?width=350&height=350'],
        categoryId: categories[8]._id,
        isFeatured: true
      }
    ];

    await Product.insertMany(productData);

    console.log("✅ Database seeded with all categories and products");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
