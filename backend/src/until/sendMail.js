import nodemailer from "nodemailer";

export const sendRegistrationMail = async (to, name, password) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"RajHome HR Team" <${process.env.MAIL_USER}>`,
      to,
      subject: "Welcome to RajHome - Your Login Credentials",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #2c3e50;">Welcome to RajHome, ${name}!</h2>
          
          <p>We are excited to have you on board. Your employee account has been successfully created.</p>

          <p><strong>Here are your login credentials:</strong></p>
          <table cellpadding="6" cellspacing="0" border="0" style="background: #f9f9f9; border-radius: 6px; padding: 10px;">
            <tr>
              <td><strong>Email:</strong></td>
              <td>${to}</td>
            </tr>
            <tr>
              <td><strong>Password:</strong></td>
              <td>${password}</td>
            </tr>
          </table>

          <p style="margin-top: 20px;">
            🔐 <strong>Please change your password after your first login for security purposes.</strong>
          </p>

          <p>If you have any questions or need assistance, feel free to contact the HR department.</p>

          <p>Best regards,<br/>
          <strong>RajHome HR Team</strong></p>

          <hr style="margin-top: 30px;" />
          <small style="color: #888;">
            This is an automated message. Please do not reply to this email.
          </small>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Registration email sent to ${to}`);
  } catch (error) {
    console.error(" Email sending failed:", error.message);
  }
};
