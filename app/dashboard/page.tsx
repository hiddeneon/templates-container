import styles from "../page.module.css";
import TemplatesWrapper from "../ui/templates-wrapper";
import { fetchTemplates, fetchSymbols } from "../lib/data";
import ScrollToTopButton from "../ui/buttons/ScrollToTopButton";
import fallbackTemplates from "../data/templates";
import fallbackSymbols from "../data/symbols";
import Aurora from "../ui/background/Aurora";
import SideNav from "./sidenav";
import Toast from "../ui/buttons/Toast";
import SideCopyBar from "../ui/side-copy-bar/SideCopyBar";

export default async function Dashboard() {

  // Server-side data fetching with fallback
  let templates;
  try {
    templates = await fetchTemplates();
  } catch (error) {
    console.warn('Failed to fetch from database, using fallback templates:', error);
    templates = fallbackTemplates;
  }

  let symbols;
  try {
    symbols = await fetchSymbols();
  } catch (error) {
    console.warn('Failed to fetch from database, using fallback symbols:', error);
    symbols = fallbackSymbols;
  }

    return (
        <>
        {/* <Aurora /> */}
        <Toast />
        <SideNav />
        <SideCopyBar initialSymbols={symbols as any} />
        <div className={styles.page}>
          
            <main className={styles.main}>
            <div className="temp-wrapper-layout">
              <TemplatesWrapper initialTemplates={templates} />
            </div>
            </main>
        <ScrollToTopButton />
        </div>
        </>
    )
}