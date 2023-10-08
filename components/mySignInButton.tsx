'use client'
import React from 'react'
import { signIn } from 'next-auth/react'

export default function SignInButton() {
    return (
        <button
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            onClick={() => signIn()}
        >
            Sign in
        </button>
    )
}
