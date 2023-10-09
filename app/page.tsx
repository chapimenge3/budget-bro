// 'use client'
import { redirect } from "next/navigation"
import MySignInButton from "@/components/mySignInButton"
import { getServerSession } from "next-auth"

export default async function IndexPage() {

  const session = await getServerSession()
  if (session) {
    redirect('/dashboard')
  }

  return (
    <div>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-400 to-blue-600 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 ring-1 ring-indigo-600 hover:ring-2">
              Making this while learning NexJs.{' '}
              <a href="https://chapimenge.com" target='blank' className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Chapi Menge <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="tracking-tigh text-4xl font-bold sm:text-6xl">
              Control your spending habits with
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Budget bro is a simple budgeting app that helps you track your
              spending habits. It is easy to use and free.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <div>
                <MySignInButton />
              </div>
              <a href="#" className="text-sm font-semibold leading-6">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
