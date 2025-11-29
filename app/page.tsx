

// import Dashboard from "./dashboard/page";
import { stringify } from "querystring";
import Aurora from "./ui/background/Aurora";
import ScrollToTopButton from "./ui/buttons/ScrollToTopButton";

// Force dynamic rendering - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = 0; // Disable caching

export default async function Home() {

  return (
    <>
      <Aurora />
      
      <ScrollToTopButton />
    </>
  );
}
