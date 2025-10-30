'use client'

import { useState } from "react";
import styles from "./page.module.css";
import TempContainer from "./ui/temp-container";
import initialTemplates from "./data/templates";
import { Template } from "./data/types";

export default function Home() {
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);

  // const handleAddTemplate = (newTemplate: Template) => {
  //   setTemplates(prevTemplates => [...prevTemplates, newTemplate]);
  // };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {templates.map((temp) => (
          <TempContainer 
            key={temp.id}
            id={temp.id}
            content={temp.content} 
            name={temp.name} 
          />
        ))}
      </main>
      <nav>
        <div className="manage">
          
        </div>
      </nav>
    </div>
  );
}
