'use client'

import { SignUp } from '@clerk/nextjs'

export const runtime = 'edge'

export default function Page() {
  return (
    <div className="grid h-[90vh] place-items-center">
      <SignUp />
    </div>
  )
}
