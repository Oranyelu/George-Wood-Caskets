const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const nodemailer = require('nodemailer'); // Import nodemailer
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch(err => console.log(err));

// Authentication routes
app.use('/api/auth', authRoutes);

// Payment Route
app.post('/api/payment', async (req, res) => {
  const { name, emailOrPhone, cardNumber, expiryDate, cvc, cart } = req.body;

  // Simulate payment processing (replace with actual payment processing logic)
  const paymentSuccessful = true;

  if (paymentSuccessful) {
    // Send confirmation email or text
    try {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });

      let mailOptions = {
        from: process.env.EMAIL_USER,
        to: emailOrPhone.includes('@') ? emailOrPhone : process.env.SMS_GATEWAY.replace('%s', emailOrPhone),
        subject: 'Payment Confirmation',
        text: `Hello ${name},\n\nYour payment was successful. Thank you for your purchase.\n\nBest regards,\nYour Company`
      };

      await transporter.sendMail(mailOptions);

      res.json({ success: true });
    } catch (error) {
      console.error('Error sending email:', error);
      res.json({ success: false, message: 'Failed to send confirmation email.' });
    }
  } else {
    res.json({ success: false, message: 'Payment failed.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
