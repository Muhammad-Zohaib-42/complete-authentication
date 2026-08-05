export function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString()
}

export function getOtpHtml(otp,username) {
    return `
        <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f6f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f6f9; padding: 40px 0;">
            <tr>
                <td align="center">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); overflow: hidden;">
                        
                        <!-- Header Banner -->
                        <tr>
                            <td align="center" style="background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); padding: 35px 20px;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.5px;">Security Verification</h1>
                            </td>
                        </tr>

                        <!-- Body Content -->
                        <tr>
                            <td style="padding: 40px 30px; color: #334155;">
                                <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.5;">Hi <strong>${username}</strong>,</p>
                                <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.5; color: #64748b;">
                                    Thank you for registering! To complete your sign-up process and verify your email address, please use the One-Time Password (OTP) below:
                                </p>

                                <!-- OTP Box Container -->
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td align="center" style="padding: 10px 0 30px;">
                                            <div style="display: inline-block; background-color: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 8px; padding: 16px 32px; letter-spacing: 6px; font-size: 32px; font-weight: 700; color: #4f46e5;">
                                                ${otp}
                                            </div>
                                        </td>
                                    </tr>
                                </table>

                                <p style="margin: 0 0 8px; font-size: 14px; color: #64748b; line-height: 1.5;">
                                    ⏱️ This code is valid for <strong>10 minutes</strong>. Do not share this code with anyone.
                                </p>
                                <p style="margin: 0; font-size: 14px; color: #64748b; line-height: 1.5;">
                                    If you didn't request this, you can safely ignore this email.
                                </p>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td align="center" style="background-color: #f8fafc; padding: 20px 30px; border-top: 1px solid #e2e8f0;">
                                <p style="margin: 0; font-size: 13px; color: #94a3b8;">
                                    &copy; ${new Date().getFullYear()} Your App Name. All rights reserved.
                                </p>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `
}