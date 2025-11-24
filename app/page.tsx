import styles from "./page.module.css";
import TemplatesWrapper from "./ui/templates-wrapper";
import { fetchTemplates } from "./lib/data";
import fallbackTemplates from "./data/templates";
import CreateFormToggle from "./ui/create-form-toggle";
import Aurora from "./ui/background/Aurora";

// Force dynamic rendering - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = 0; // Disable caching

export default async function Home() {
  // Server-side data fetching with fallback
  let templates;
  try {
    templates = await fetchTemplates();
  } catch (error) {
    console.warn('Failed to fetch from database, using fallback templates:', error);
    templates = fallbackTemplates;
  }

  return (
    <>
      {/* <Aurora /> */}
      <div className={styles.page}>
          <CreateFormToggle />
        <main className={styles.main}>
          <TemplatesWrapper initialTemplates={templates} />
        </main>
      </div>
    </>
  );
}
