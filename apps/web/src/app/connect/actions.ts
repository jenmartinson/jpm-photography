// apps/web/src/app/connect/actions.ts
'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export type FormState = {
  success: boolean
  message: string
}

export async function sendContactEmail(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const message = formData.get('message') as string

  if (!name || !email || !message) {
    return { success: false, message: 'Please fill in all required fields.' }
  }

  try {
    await resend.emails.send({
      from: 'JPM Photography <onboarding@resend.dev>', // Update to custom domain once configured
      to: [process.env.CONTACT_EMAIL || 'your-email@example.com'],
      replyTo: email,
      subject: `New Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    })

    return { success: true, message: 'Thank you for your message. I will get back to you soon!' }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, message: 'Something went wrong. Please try again later.' }
  }
}