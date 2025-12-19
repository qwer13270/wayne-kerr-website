import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { data, error } = await resend.emails.send({
      from: "Quote Request <onboarding@resend.dev>", // Use your verified domain
      to: ["kcbs96199@gmail.com", "kevchen1129@gmail.com"],
      subject: `New Contact from ${body.name}`,
      html: `
        <h2>New Contact</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Company:</strong> ${body.company}</p>
        <p><strong>Country:</strong> ${body.country}</p>
        <p><strong>Topic:</strong> ${body.topic}</p>
        <p><strong>Model:</strong> ${body.model}</p>
        <p><strong>Message:</strong> ${body.message}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
