

// import Dashboard from "./dashboard/page";
import Aurora from "./ui/background/Aurora";
import ScrollToTopButton from "./ui/buttons/ScrollToTopButton";

// Force dynamic rendering - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = 0; // Disable caching

export default function Home() {

  return (
    <>
      <Aurora />
      <ScrollToTopButton />
    </>
  );
}
