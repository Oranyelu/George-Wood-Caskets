import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
app.use(cors());
app.use(express.json());

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const ADMIN_EMAIL = 'georgechime91@icloud.com';

// Verify transporter
transporter.verify(function (error, success) {
    if (error) {
        console.log("Transporter Error:", error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

// --- API Endpoints ---

// 1. Order Emails (Receipt to Customer + Alert to Admin)
app.post('/api/email/order', async (req, res) => {
    try {
        const { firstName, lastName, email, phone, cart, totalPrice, trackingId, referral } = req.body;

        if (!firstName || !lastName || !email || !cart) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const orderSummary = cart.map(item => `<li>${item.name} - ${item.price.toLocaleString()} NGN</li>`).join("");

        // Customer Email Template
        const customerEmailBody = `
        <div style="font-family: Arial, sans-serif; color: #000; background-color: #fff; padding: 20px; max-width: 600px; margin: 0 auto;">
            <header style="border: 2px solid #135b3a; border-radius: 10px; padding: 10px; text-align: center;">
                <h2 style="color: #135b3a; margin: 0;">ORDER SUMMARY</h2>
                <h4 style="margin: 0;">Invoice</h4>
            </header>
            <div style="background-color: #f0b52e; border-radius: 10px; padding: 15px; margin-top: 15px;">
                <h3>Hello ${firstName} ${lastName},</h3>
                <p>Below is the summary of your order:<br />
                <strong>Tracking ID:</strong> ${trackingId}</p>
            </div>
            <div style="margin-top: 15px;">
                <b>Items:</b>
                <ul>${orderSummary}</ul>
                <p><strong>Total Price: ${totalPrice.toLocaleString()} NGN</strong></p>
            </div>
            <div style="margin-top: 15px;">
                <p>To complete your order, please update us with payment details if you haven't already.</p>
                <p style="font-size: 1.1em;">
                    <strong>NO:</strong> 2198210889 <br />
                    <strong>Name:</strong> George Chiemerie Chime <br />
                    <strong>Bank:</strong> United Bank of Africa (UBA)
                </p>
            </div>
            <p>We will contact you at: <strong>${phone}</strong>.</p>
            <p style="font-size: 0.9em; text-align: right;">Thank you for choosing George Wood Caskets!</p>
            <footer style="background-color: #135b3a; color: #fff; padding: 10px; margin-top: 15px; text-align: center;">
                <p>Contact Us: <br />
                    Call - 08143904414 | Email - georgewoodcasket@gmail.com
                </p>
            </footer>
        </div>
        `;

        // Admin Email Template
        const adminEmailBody = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #135b3a;">NEW ORDER RECEIVED</h2>
            <p><strong>Customer:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Tracking ID:</strong> ${trackingId}</p>
            <p><strong>Referred By:</strong> ${referral || 'N/A'}</p>
            <hr />
            <h3>Order Details:</h3>
            <ul>${orderSummary}</ul>
            <p><strong>Total Value:</strong> ${totalPrice.toLocaleString()} NGN</p>
        </div>
        `;

        // Send Customer Email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Order Confirmation - George Wood Caskets',
            html: customerEmailBody
        });

        // Send Admin Email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: ADMIN_EMAIL,
            subject: `New Order Alert: ${trackingId}`,
            html: adminEmailBody
        });

        res.status(200).json({ message: 'Order emails sent successfully' });

    } catch (error) {
        console.error('Error sending order email:', error);
        res.status(500).json({ message: 'Failed to send emails', error: error.message });
    }
});

// 2. Contact Form Emails (To Admin)
app.post('/api/email/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        const adminEmailBody = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #135b3a;">New Contact Inquiry</h2>
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr />
            <p style="white-space: pre-wrap;">${message}</p>
        </div>
        `;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: ADMIN_EMAIL,
            subject: `Contact Inquiry: ${subject}`,
            html: adminEmailBody
        });

        res.status(200).json({ message: 'Contact email sent successfully' });

    } catch (error) {
        console.error('Error sending contact email:', error);
        res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
});

// 3. Issue Report Emails (To Admin)
app.post('/api/email/report', async (req, res) => {
    try {
        const { name, email, issue } = req.body;

        const adminEmailBody = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #d32f2f;">New Issue Report</h2>
            <p><strong>Reporter:</strong> ${name} (${email})</p>
            <hr />
            <h3>Issue Description:</h3>
            <p style="white-space: pre-wrap;">${issue}</p>
        </div>
        `;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: ADMIN_EMAIL,
            subject: `Issue Report from ${name}`,
            html: adminEmailBody
        });

        res.status(200).json({ message: 'Issue report sent successfully' });

    } catch (error) {
        console.error('Error sending report email:', error);
        res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
});

// 4. Job Application Emails (To Admin)
app.post('/api/email/application', async (req, res) => {
    try {
        const { name, email, phone, position, resumeLink, coverLetter } = req.body;

        const adminEmailBody = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #135b3a;">New Job Application</h2>
            <p><strong>Position:</strong> ${position}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Resume/Portfolio Link:</strong> <a href="${resumeLink}">${resumeLink}</a></p>
            <hr />
            <h3>Cover Letter:</h3>
            <p style="white-space: pre-wrap;">${coverLetter}</p>
        </div>
        `;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: ADMIN_EMAIL,
            subject: `Job Application: ${position} - ${name}`,
            html: adminEmailBody
        });

        res.status(200).json({ message: 'Application sent successfully' });

    } catch (error) {
        console.error('Error sending application email:', error);
        res.status(500).json({ message: 'Failed to send application', error: error.message });
    }
});

// 5. Bond Inquiry Emails (To Admin)
app.post('/api/email/bond', async (req, res) => {
    try {
        const { name, email, phone, bondType, message } = req.body;

        const adminEmailBody = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #135b3a;">New Bond Investment Inquiry</h2>
            <p><strong>Bond Type:</strong> ${bondType}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <hr />
            <h3>Message:</h3>
            <p style="white-space: pre-wrap;">${message || 'No additional message.'}</p>
        </div>
        `;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: ADMIN_EMAIL,
            subject: `Bond Inquiry: ${bondType} - ${name}`,
            html: adminEmailBody
        });

        res.status(200).json({ message: 'Inquiry sent successfully' });

    } catch (error) {
        console.error('Error sending bond email:', error);
        res.status(500).json({ message: 'Failed to send inquiry', error: error.message });
    }
});

// 6. Service Booking Emails (To Admin)
app.post('/api/email/booking', async (req, res) => {
    try {
        const { name, email, phone, serviceName, date, message } = req.body;

        const adminEmailBody = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #135b3a;">New Service Booking Request</h2>
            <p><strong>Service:</strong> ${serviceName}</p>
            <p><strong>Customer Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Preferred Date:</strong> ${date}</p>
            <hr />
            <h3>Additional Details:</h3>
            <p style="white-space: pre-wrap;">${message || 'No additional details.'}</p>
        </div>
        `;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: ADMIN_EMAIL,
            subject: `Service Booking: ${serviceName} - ${name}`,
            html: adminEmailBody
        });

        res.status(200).json({ message: 'Booking request sent successfully' });

    } catch (error) {
        console.error('Error sending booking email:', error);
        res.status(500).json({ message: 'Failed to send booking request', error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
