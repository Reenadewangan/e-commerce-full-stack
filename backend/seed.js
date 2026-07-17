const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");
const Product = require("./model/Product");
const User = require("./model/userModel");

dotenv.config();
/*mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost:27017/shopnest')
.then(()=>console.log("MongoDB connected for seeding"))
.catch(err=>{
    console.error('MongoDB connected error:',err);
    process.exit(1);
}); 
*/
const products = [
  {
    name: "Wireless Earbuds",
    description: "Bluetooth earbuds with active noise cancellation and long battery life.",
    price: 89.99,
    category: "Electronics",
    imageUrl: "https://example.com/images/earbuds.jpg",
    stock: 24,
    rating: 4.5,
    numReviews: 18,
  },
  {
    name: "Organic Cotton T-Shirt",
    description: "Soft and breathable shirt made from 100% organic cotton.",
    price: 22.0,
    category: "Clothing",
    imageUrl: "https://example.com/images/tshirt.jpg",
    stock: 45,
    rating: 4.3,
    numReviews: 32,
  },
  {
    name: "Gaming Mouse",
    description: "High-precision gaming mouse with customizable RGB lighting.",
    price: 39.99,
    category: "Electronics",
    imageUrl: "https://example.com/images/gaming-mouse.jpg",
    stock: 15,
    rating: 4.7,
    numReviews: 56,
  },
  {
    name: "Stainless Steel Water Bottle",
    description: "Leak-proof water bottle keeps drinks cold for 24 hours.",
    price: 18.5,
    category: "Home",
    imageUrl: "https://example.com/images/water-bottle.jpg",
    stock: 60,
    rating: 4.4,
    numReviews: 26,
  },
  {
    name: "Yoga Mat",
    description: "Non-slip yoga mat with extra cushioning for comfort.",
    price: 29.99,
    category: "Fitness",
    imageUrl: "https://example.com/images/yoga-mat.jpg",
    stock: 38,
    rating: 4.6,
    numReviews: 21,
  },
];

const users = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    password: "password123",
    role: "user",
    verified: true,
  },
  {
    name: "Bob Martinez",
    email: "bob@example.com",
    password: "password123",
    role: "user",
    verified: false,
  },
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    verified: true,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    await User.deleteMany();

    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );

    await User.insertMany(hashedUsers);
    await Product.insertMany(products);

    console.log("Seed data inserted successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed database:", error);
    process.exit(1);
  }
};

seedDatabase();
