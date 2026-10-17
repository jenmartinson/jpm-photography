// apps/web/src/app/connect/page.tsx
'use client'

import { useActionState } from 'react'
import { sendContactEmail, FormState } from './actions'

const initialState: FormState = {
  success: false,
  message: '',
}

export default function ConnectPage() {
  const [state, formAction, isPending] = useActionState(sendContactEmail, initialState)

  return (
    <div className="max-w-4xl mx-auto pt-6 md:pt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left Column: Direct Info */}
        <div className="space-y-6">
          <h1 className="text-lg md:text-2xl font-light tracking-wide text-zinc-800 uppercase">Connect</h1>
          <p className="text-base text-zinc-600 leading-relaxed">
            Questions, comments, interested in a print?
          <br/>Please reach out using the form, I&apos;d love to connect.</p>


        </div>

        {/* Right Column: Contact Form */}
        <div>
          {state.success ? (
            <div className="p-6 bg-zinc-50 border border-zinc-200 text-sm text-zinc-600 leading-relaxed">
              {state.message}
            </div>
          ) : (
            <form action={formAction} className="space-y-6">
              {state.message && (
                <p className="text-xs text-red-500">{state.message}</p>
              )}

              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-[0.2em] text-zinc-500 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full bg-zinc-50 border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:border-sky-950 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-[0.2em] text-zinc-500 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full bg-zinc-50 border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:border-sky-950 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-[0.2em] text-zinc-500 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full bg-zinc-50 border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:border-sky-950 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-sky-950 hover:bg-sky-900 text-white text-xs uppercase tracking-[0.2em] py-3 transition-colors disabled:opacity-50"
              >
                {isPending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}