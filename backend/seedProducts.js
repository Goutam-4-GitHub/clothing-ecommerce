require('dotenv').config();
const { sequelize, Product } = require('./models');

const products = [
  {
    name: 'Classic White T-Shirt',
    description: 'Soft cotton T-shirt for everyday wear.',
    price: 499,
    image: 'https://picsum.photos/seed/tshirt1/400/400',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 50,
  },
  {
    name: 'Blue Denim Jeans',
    description: 'Straight fit denim jeans.',
    price: 1499,
    image: 'https://picsum.photos/seed/jeans1/400/400',
    category: 'Men',
    sizes: ['M', 'L', 'XL'],
    stock: 40,
  },
  // Add more products...
];

const seed = async () => {
  try {
    console.log("Connecting to database...");
    await sequelize.authenticate();   // ❗ REQUIRED

    console.log("DB connection successful.");
    await sequelize.sync({ alter: true });

    console.log("Seeding products...");
    await Product.bulkCreate(products, { ignoreDuplicates: true });

    console.log("Products seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error during seeding:", err);
    process.exit(1);
  }
};

seed();
