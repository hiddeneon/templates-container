'use client'

import { useState } from "react";
import TempContainer from "./temp-container";
import { Template } from "../data/types";

interface TemplatesWrapperProps {
  initialTemplates: Template[];
}

export default function TemplatesWrapper({ initialTemplates }: TemplatesWrapperProps) {
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);

  const handleDeleteTemplate = (id: number) => {
    setTemplates(prevTemplates => prevTemplates.filter(template => template.id !== id));
  };

  const handleUpdateTemplate = (updatedTemplate: Template) => {
    setTemplates(prevTemplates => 
      prevTemplates.map(template => 
        template.id === updatedTemplate.id ? updatedTemplate : template
      )
    );
  };

  return (
    <div className="temp-wrapper">
      {templates.map((temp) => (
        <TempContainer 
          key={temp.id}
          id={temp.id}
          category={temp.category}
          content={temp.content} 
          name={temp.name}
          onDelete={handleDeleteTemplate}
          onUpdate={handleUpdateTemplate}
        />
      ))}
    </div>
  );
}