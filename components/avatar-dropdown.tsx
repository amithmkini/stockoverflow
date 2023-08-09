import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton
} from "@clerk/nextjs"

import { Button } from "@/components/ui/button"

export function AvatarDropdown() {
  return (
    <>
      <SignedIn>
        <UserButton afterSignOutUrl="/"/>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button variant="outline">
            <span>Sign in</span>
          </Button>
        </SignInButton>
      </SignedOut>
    </>
  )
}
