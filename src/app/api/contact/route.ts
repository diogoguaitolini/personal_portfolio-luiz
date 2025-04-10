import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();
    
    // Validate form data
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Configure email transporter
    // OPTION 1: Gmail with App Password (requires 2FA)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, // Must be an App Password if using Gmail
      },
    });
    
    /* 
    // OPTION 2: Use Resend.com (needs npm install resend)
    // Uncomment this and comment out the Gmail option above
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // const data = await resend.emails.send({
    //   from: 'Portfolio <onboarding@resend.dev>',
    //   to: 'luizf.gdigrado@gmail.com',
    //   subject: `Contact Form: Message from ${name}`,
    //   html: `
    //     <h3>New message from your portfolio contact form</h3>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message.replace(/\n/g, '<br>')}</p>
    //   `,
    //   reply_to: email,
    // });
    // return NextResponse.json({ success: true });
    */

    // Email content for Gmail
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'luizf.gdigrado@gmail.com',
      subject: `Contact Form: Message from ${name}`,
      html: `
        <h3>New message from your portfolio contact form</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
} 