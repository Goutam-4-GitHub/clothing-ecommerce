const nodemailer = require('nodemailer');

const sendOrderEmail = async (order, user, items) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or use host/port/auth for Mailtrap
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const itemsHtml = items
    .map(
      (item) =>
        `<p>${item.name} (${item.size}) x${item.qty} - ₹${item.price}</p>`
    )
    .join('');

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: `Order Confirmation - #${order.id}`,
    html: `
      <h1>Thank you for your order!</h1>
      <p>Order ID: ${order.id}</p>
      <p>Date: ${new Date(order.orderDate).toLocaleDateString()}</p>
      <h3>Items:</h3>
      ${itemsHtml}
      <h2>Total: ₹${order.totalPrice}</h2>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendOrderEmail };
