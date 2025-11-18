import styles from "./page.module.css";
import TemplatesWrapper from "./ui/templates-wrapper";
import { fetchTemplates } from "./lib/data";
import fallbackTemplates from "./data/templates";
import CreateFormToggle from "./ui/create-form-toggle";

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
    <div className={styles.page}>
      <header className="page-header">
        <CreateFormToggle />
      </header>
      <main className={styles.main}>
        <TemplatesWrapper initialTemplates={templates} />
      </main>
    </div>
  );
}
