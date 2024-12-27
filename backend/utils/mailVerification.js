import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email, token) => {
    const verificationUrl = `http://localhost:5173/verify-email?token=${token}`;

    const transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: '"TEST" <noreply@TEST.com>',
        to: email,
        subject: 'Verify Your Email Address',
        text: `Please verify your email by clicking on the following link: ${verificationUrl}`,
        html: `<p>Please verify your email by clicking on the following link:</p>
             <a href="${verificationUrl}">${verificationUrl}</a>`,
    });

    console.log('Verification email sent to:', email);
};
