import { stringify } from "querystring";
import Aurora from "./ui/background/Aurora";
import { currentUser } from "@clerk/nextjs/server";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { redirect } from "next/navigation";

// Force dynamic rendering - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = 0; // Disable caching

export default async function Home() {
  const user = await currentUser();
  if (user?.id) {
    redirect("/dashboard");
  }
  return (
    <>
      <Aurora />
      <span>What is here?</span>
      {JSON.stringify(user)}
      <UserButton />
    </>
  );
}
