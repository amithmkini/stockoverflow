'use client'

import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="grid h-[90vh] place-items-center">
      <SignIn />
    </div>
  )
}

