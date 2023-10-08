'use client'
import React from 'react'
import { signIn } from 'next-auth/react'

export default function SignInButton() {
    return (
        <button
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            onClick={() => signIn()}
        >
            Sign in
        </button>
    )
}
