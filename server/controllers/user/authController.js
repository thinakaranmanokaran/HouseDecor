const nodemailer = require("nodemailer");
const crypto = require("crypto"); // For generating OTP
const { OTP } = require("../../models/User");

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // Use 465 for SSL
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


// Function to generate a random OTP
const generateOTP = () => crypto.randomInt(10000, 99999).toString(); // 5-digit OTP

// Send OTP to any given email
exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });

        // Generate OTP and store in DB
        const otp = generateOTP();
        await OTP.create({ email, otp });

        // Styled Email Template
        const htmlContent = `
        <html>
            <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Poppins:wght@400;600&display=swap"
        rel="stylesheet">
    <style>
        div {
            font-family: 'Poppins', sans-serif;
        }
    </style>
</head>
       <body style="margin: 0; padding: 0; font-family: 'Poppins', sans-serif;  ">
    <div style="display: flex; align-items: center; justify-content: center;  width: 100vw;">
        <div style="max-width: 500px; width: 90%; padding: 20px; border-radius: 20px; background-color: #fcf7f2; 
                     position: relative; text-align: center; border: 1px black ">
            
            <!-- Thank You Heading -->
            <h1 style="margin-top: 30px; font-size: 32px; font-weight: bold; color: #ff4081; text-transform: uppercase; 
                       text-shadow: 3px 3px 0 #ffdd44; ">
                Thank You !
            </h1>

            <!-- Registration Badge -->
            <div style="background-color: #fad241; padding: 10px 20px; font-size: 16px; font-weight: bold; 
                        border-radius: 20px; position: absolute; top: -20px; right: 20px;">
                For your Registration
            </div>

            

            <!-- OTP Section -->
            <h2 style="color: #000; font-weight: 800; font-size: 26px; margin-top: 20px;">
                Your OTP for House Decor
            </h2>
            <p style="font-size: 16px; color: #6b7280; margin-top: 12px;">
                Use the following One-Time Password (OTP) to complete your login.
            </p>

            <!-- OTP Code -->
            <div style="text-align: center; margin: 20px 0;">
                <span style="display: inline-block; font-size: 30px; font-weight: bold; color: #f72f75; 
                             padding: 10px 20px; border-radius: 5px; ">
                             ${otp}
                </span>
            </div>

            <p style="font-size: 16px; color: #6b7280;">
                This OTP is valid for <b>5 minutes</b>. Please do not share this code with anyone.
            </p>

            <p style="font-size: 16px; color: #6b7280; margin-top: 6px;">
                If you did not request this OTP, please ignore this message.
            </p>

            <p style="font-size: 16px; text-align: right; margin-top: 16px; color: #000;">
                Regards, <br> <b>House Decor</b>
            </p>
        </div>
    </div>
</body>
        </html>
        `;

        // Send OTP email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP Code",
            html: htmlContent, // Styled HTML content
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error("Error sending OTP:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


// Verify OTP
exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required" });

        // Find OTP in DB
        const otpRecord = await OTP.findOne({ email, otp });

        if (!otpRecord) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        // Delete OTP after verification
        await OTP.deleteOne({ email });

        return res.status(200).json({ success: true, message: "OTP verified successfully" });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
