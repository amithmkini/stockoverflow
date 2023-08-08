import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton
} from "@clerk/nextjs";

export function AvatarDropdown() {
  return (
    <>
      <SignedIn>
        <UserButton afterSignOutUrl="/"/>
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </>
  )
}
