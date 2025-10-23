import Image from "next/image";
import styles from "./page.module.css";
import TempContainer from "./ui/temp-container";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ol>
          <li>
            Get started by editing <code>app/page.tsx</code>.
          </li>
          <li>ФИО, оставайтесь, пожалуйста, со мной в чате для оперативного решения данного вопроса..</li>
        </ol>
        <TempContainer />
      </main>
    </div>
  );
}
