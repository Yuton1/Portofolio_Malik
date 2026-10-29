
import { NextResponse } from "next/server";
import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY);

const allowedProjectTypes = [
  "Graphic Design",
  "Brand Identity",
  "Motion Design",
  "Video Editing",
  "Web Development",
  "UI/UX Design",
  "Other",
];

const allowedBudgets = [
  "",
  "Under $100",
  "$100–$300",
  "$300–$500",
  "$500–$1,000",
  "$1,000+",
  "To be discussed",
];

function isString(value: unknown): value is string {
  return typeof value === "string";
}

export async function POST(request: Request) {
  try {
    if (
      !process.env.RESEND_API_KEY ||
      !process.env.CONTACT_TO_EMAIL ||
      !process.env.RESEND_FROM_EMAIL
    ) {
      console.error("Contact email environment variables are missing.");

      return NextResponse.json(
        { error: "Email service is not configured yet." },
        { status: 500 }
      );
    }

    const body: unknown = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request." },
        { status: 400 }
      );
    }

    const data = body as Record<string, unknown>;

    const { name, email, projectType, budget, message, website } =
      data;

    // Honeypot field: bots may fill this hidden field.
    if (isString(website) && website.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    if (
      !isString(name) ||
      !isString(email) ||
      !isString(projectType) ||
      !isString(budget) ||
      !isString(message)
    ) {
      return NextResponse.json(
        { error: "Please provide valid form data." },
        { status: 400 }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    if (
      cleanName.length < 2 ||
      cleanName.length > 100 ||
      cleanEmail.length > 254 ||
      cleanMessage.length < 10 ||
      cleanMessage.length > 5000
    ) {
      return NextResponse.json(
        { error: "Please check the length of your form fields." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!allowedProjectTypes.includes(projectType)) {
      return NextResponse.json(
        { error: "Please select a valid project type." },
        { status: 400 }
      );
    }

    if (!allowedBudgets.includes(budget)) {
      return NextResponse.json(
        { error: "Please select a valid budget." },
        { status: 400 }
      );
    }

    const { data: sentEmail, error } = await resend.emails.send({
      from: `Portfolio Contact <${process.env.RESEND_FROM_EMAIL}>`,
      to: [process.env.CONTACT_TO_EMAIL],
      replyTo: cleanEmail,
      subject: `New project inquiry: ${projectType}`,
      text: [
        "You have received a new message through your portfolio website.",
        "",
        `Name: ${cleanName}`,
        `Email: ${cleanEmail}`,
        `Project type: ${projectType}`,
        `Budget: ${budget || "Not specified"}`,
        "",
        "Project details:",
        cleanMessage,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend email error:", error);

      return NextResponse.json(
        { error: "Unable to send your message right now. Please try again later." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { success: true, id: sentEmail?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
