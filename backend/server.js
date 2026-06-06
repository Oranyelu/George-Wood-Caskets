import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
app.use(cors());
app.use(express.json());

import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    message: { message: "Too many requests, please try again later." }
});

// Apply rate limiter to all email routes
app.use('/api/email', limiter);

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'georgechime91@icloud.com';

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
                    <strong>NO:</strong> ${process.env.BANK_ACCOUNT_NO || '2198210889'} <br />
                    <strong>Name:</strong> ${process.env.BANK_ACCOUNT_NAME || 'George Chiemerie Chime'} <br />
                    <strong>Bank:</strong> ${process.env.BANK_NAME || 'United Bank of Africa (UBA)'}
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

// 6. Service Booking Emails (To Admin and Customer with location-based calculations)
app.post('/api/email/booking', async (req, res) => {
    try {
        const { name, email, phone, serviceName, location, date, message } = req.body;

        // Base price calculation map
        const normalizedService = (serviceName || "").toLowerCase();
        let basePrice = 20000; // default base price
        let detectedService = "Custom Service";

        if (normalizedService.includes("ambulance") || normalizedService.includes("pall")) {
            basePrice = 50000;
            detectedService = "Ambulance and Pall Bearing Service";
        } else if (normalizedService.includes("lowering")) {
            basePrice = 15000;
            detectedService = "Lowering Device";
        } else if (normalizedService.includes("graphics") || normalizedService.includes("print")) {
            basePrice = 10000;
            detectedService = "Graphics Design and Printing Services";
        } else if (normalizedService.includes("photo") || normalizedService.includes("video") || normalizedService.includes("coverage")) {
            basePrice = 40000;
            detectedService = "Photography and Video Coverage";
        }

        // Location surcharge calculations
        const normalizedLocation = (location || "").toLowerCase();
        let travelSurcharge = 25000; // default travel surcharge outside Enugu
        let surchargeReason = "Standard Travel Surcharge";

        if (normalizedLocation.includes("enugu")) {
            travelSurcharge = 0;
            surchargeReason = "Local Enugu State (No Surcharge)";
        } else if (normalizedLocation.includes("ebonyi") || normalizedLocation.includes("abakaliki")) {
            travelSurcharge = 12000;
            surchargeReason = "Ebonyi State Travel Surcharge";
        } else if (normalizedLocation.includes("anambra") || normalizedLocation.includes("awka") || normalizedLocation.includes("onitsha")) {
            travelSurcharge = 15000;
            surchargeReason = "Anambra State Travel Surcharge";
        } else if (normalizedLocation.includes("abia") || normalizedLocation.includes("umuahia") || normalizedLocation.includes("aba")) {
            travelSurcharge = 18000;
            surchargeReason = "Abia State Travel Surcharge";
        } else if (normalizedLocation.includes("imo") || normalizedLocation.includes("owerri")) {
            travelSurcharge = 20000;
            surchargeReason = "Imo State Travel Surcharge";
        } else if (normalizedLocation.includes("lagos")) {
            travelSurcharge = 80000;
            surchargeReason = "Lagos Logistics Surcharge";
        } else if (normalizedLocation.includes("abuja")) {
            travelSurcharge = 70000;
            surchargeReason = "Abuja Logistics Surcharge";
        } else if (normalizedLocation.includes("rivers") || normalizedLocation.includes("port harcourt")) {
            travelSurcharge = 45000;
            surchargeReason = "Rivers State Travel Surcharge";
        }

        const estimatedCost = basePrice + travelSurcharge;

        // Customer Email Template
        const customerEmailBody = `
        <div style="font-family: Arial, sans-serif; color: #000; background-color: #fff; padding: 20px; max-width: 600px; margin: 0 auto;">
            <header style="border: 2px solid #135b3a; border-radius: 10px; padding: 10px; text-align: center;">
                <h2 style="color: #135b3a; margin: 0;">SERVICE BOOKING REQUEST</h2>
                <h4 style="margin: 5px 0 0 0; color: #a37e2c;">Estimated Quote</h4>
            </header>
            <div style="background-color: #f0b52e; border-radius: 10px; padding: 15px; margin-top: 15px; color: #011309;">
                <h3 style="margin-top: 0;">Hello ${name},</h3>
                <p>Thank you for requesting our <strong>${detectedService}</strong>. We have received your booking details and computed a dynamic price estimate based on your service location.</p>
            </div>
            <div style="margin-top: 15px; border: 1px solid #ddd; padding: 15px; border-radius: 5px;">
                <h3 style="color: #135b3a; margin-top: 0;">Pricing Details:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Base Service Fee:</strong></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">${basePrice.toLocaleString()} NGN</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Travel & Logistics Surcharge:</strong><br/><span style="font-size: 0.8em; color: #666;">(${surchargeReason})</span></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">${travelSurcharge.toLocaleString()} NGN</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; font-size: 1.1em;"><strong>Estimated Total Cost:</strong></td>
                        <td style="padding: 12px 0; font-size: 1.1em; font-weight: bold; text-align: right; color: #135b3a;">${estimatedCost.toLocaleString()} NGN</td>
                    </tr>
                </table>
            </div>
            <div style="margin-top: 15px; background-color: #f9f9f9; padding: 10px; border-left: 4px solid #135b3a; border-radius: 4px;">
                <p style="margin: 0;"><strong>Event Details:</strong></p>
                <p style="margin: 5px 0 0 0; font-size: 0.95em;">
                    <strong>Location:</strong> ${location}<br/>
                    <strong>Date:</strong> ${date || 'To be determined'}<br/>
                    <strong>Phone Number:</strong> ${phone}
                </p>
            </div>
            <p style="font-size: 0.95em; line-height: 1.5;">* Please note that this is an initial estimate. A representative from George Wood Caskets will contact you shortly at <strong>${phone}</strong> to finalize details, confirm schedule, and provide a final booking invoice.</p>
            <p style="font-size: 0.9em; text-align: right;">Thank you for choosing George Wood Caskets!</p>
            <footer style="background-color: #135b3a; color: #fff; padding: 15px; margin-top: 20px; text-align: center; border-radius: 5px;">
                <p style="margin: 0; font-size: 0.9em;">Contact Us: <br />
                    Call - 08143904414 | Email - georgewoodcasket@gmail.com
                </p>
            </footer>
        </div>
        `;

        // Admin Email Template
        const adminEmailBody = `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #135b3a; border-bottom: 2px solid #135b3a; padding-bottom: 10px;">NEW SERVICE BOOKING REQUEST</h2>
            <p><strong>Customer Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Requested Service:</strong> ${detectedService} (User input: "${serviceName}")</p>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Preferred Date:</strong> ${date || 'Not specified'}</p>
            <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;" />
            <h3 style="color: #135b3a;">Calculated Surcharge & Estimate:</h3>
            <p><strong>Base Service Price:</strong> ${basePrice.toLocaleString()} NGN</p>
            <p><strong>Surcharge Details:</strong> ${surchargeReason}</p>
            <p><strong>Travel Surcharge:</strong> ${travelSurcharge.toLocaleString()} NGN</p>
            <p style="font-size: 1.2em; color: #135b3a;"><strong>Estimated Total Cost: ${estimatedCost.toLocaleString()} NGN</strong></p>
            <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;" />
            <h3>Customer Message / Details:</h3>
            <p style="white-space: pre-wrap; background-color: #f5f5f5; padding: 15px; border-radius: 4px;">${message || 'No additional details.'}</p>
        </div>
        `;

        // Send Customer Email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Booking Request Confirmation - ${detectedService}`,
            html: customerEmailBody
        }).catch(err => console.error("Error mailing customer booking confirmation:", err));

        // Send Admin Email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: ADMIN_EMAIL,
            subject: `New Service Booking Alert: ${detectedService} - ${name}`,
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
