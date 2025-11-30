🛍️ Clothing E-Commerce Web App (MERN + PostgreSQL)

A fully functional E-commerce Clothing Store built using:

React (Vite) — Frontend

Node.js + Express — Backend

PostgreSQL + Sequelize — Database

JWT Authentication (HTTP-only cookies)

Shopping Cart (Guest + Logged-in users)

Order Checkout + Email Confirmation (Nodemailer)

This project is part of the Pasovit Backend Developer Assignment and is built professionally with clean structure and production-ready APIs.

🚀 Features
🔐 User Authentication

Register new users

Login / Logout

JWT stored in HTTP-only cookies

Auth-protected routes

🛒 Shopping Cart

Works for guest users (localStorage)

Works for logged-in users (PostgreSQL)

Add to cart from product detail

Update quantity

Remove item

Cart auto-sync after login

👗 Products & Filters

Product listing page

Product detail with size + qty

Search (name/description)

Filters:

Category

Size

Price Range

Pagination

20+ demo products seeded

💳 Checkout & Orders

Mock checkout (no payments)

Order saved in DB

Cart cleared after order

Email confirmation sent via Nodemailer

Order success page with order ID

📂 Project Structure
clothing-ecommerce/
│
├── backend/
│   ├── config/db.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/sendEmail.js
│   ├── seedProducts.js
│   ├── server.js
│   └── .env (not included in repo)
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── services/api.js
    │   └── App.jsx

🛠️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/Goutam-4-GitHub/clothing-ecommerce.git
cd clothing-ecommerce

⚙️ Backend Setup
2️⃣ Install dependencies
cd backend
npm install

3️⃣ Create .env file
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=clothing_ecommerce
DB_USER=postgres
DB_PASS=your_postgres_password

JWT_SECRET=your_secret_key
NODE_ENV=development

EMAIL_USER=your_smtp_user
EMAIL_PASS=your_smtp_password


Note: You can use Mailtrap or Gmail App Password for email sending.

4️⃣ Create PostgreSQL database
psql -U postgres
CREATE DATABASE clothing_ecommerce;
\q

5️⃣ Seed product data
node seedProducts.js

6️⃣ Start backend server
npm run dev


Backend runs at:

http://localhost:5000

🎨 Frontend Setup
1️⃣ Install dependencies
cd ../frontend
npm install

2️⃣ Start frontend server
npm run dev


Frontend runs at:

http://localhost:5173

🔌 API Endpoints
👤 Auth Routes
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user
POST	/api/auth/logout	Logout user
🛍️ Product Routes
Method	Endpoint	Description
GET	/api/products	Get products (with search + filters)
GET	/api/products/:id	Get single product
Example Query
/api/products?category=Men&size=M&minPrice=500&maxPrice=2000&page=1&limit=10&search=shirt

🛒 Cart Routes
Method	Endpoint	Description
GET	/api/cart	Get user's cart
POST	/api/cart/add	Add item to cart
PUT	/api/cart/update	Update quantity
DELETE	/api/cart/remove	Remove item

Support:

Guest cart (localStorage)

Logged-in cart (DB)

📦 Order Routes
Method	Endpoint	Description
POST	/api/orders	Place order + send email
✔️ How to Test

Register a new user

Login

Browse products

Add product to cart

Update qty / remove

Checkout

Place Order

View Order Success page

Receive email confirmation (if SMTP configured)

🔧 Deployment

You can deploy using:

Backend → Render

Connect repo

Use /backend directory

Add environment variables

Create PostgreSQL instance on Render

Frontend → Netlify or Vercel

Use /frontend directory

Build command: npm run build

Publish directory: dist

Update frontend API base URL:

frontend/src/services/api.js

baseURL: "https://your-render-backend-url/api",

👨‍💻 Author

Goutam Prasad

GitHub: https://github.com/Goutam-4-GitHub

LinkedIn: https://www.linkedin.com/in/goutamprasad04