import Image from "next/image";
import styles from "./page.module.css";
import TempContainer from "./ui/temp-container";
import templates from "./data/templates";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {templates.map((temp, index) => (
          <TempContainer key={index} content={temp.content} name={temp.name} />
        ))}
      </main>
    </div>
  );
}
