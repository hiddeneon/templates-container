'use client'

import React from "react";
import { useState } from "react";
import TempContainer from "./temp-container";
import { Template } from "../data/types";
import { Tooltip } from "radix-ui";
import CreateFormEmpty from './create-form-from-empty';

interface TemplatesWrapperProps {
  initialTemplates: Template[];
}

export default function TemplatesWrapper({ initialTemplates }: TemplatesWrapperProps) {
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Extract unique categories from templates
  const categories = Array.from(
    new Set(templates.map(template => template.category))
  );

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

  // Filter templates by selected category
  const filteredTemplates = selectedCategory
    ? templates.filter(template => template.category === selectedCategory)
    : templates;

  return (
    <div>
      {/* Category Panel */}
      <div className='cat-panel-wrapper'>
      <div className='cat-panel'>
        <Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger asChild>
					<button
          key="all"
          onClick={() => setSelectedCategory(null)}
          style={{ fontWeight: selectedCategory === null ? 'bold' : 'normal' }}
        >
          Все
        </button>
				</Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Content className="TooltipContent" sideOffset={5} side="bottom">
						Выбрать категорию
						<Tooltip.Arrow className="TooltipArrow" />
					</Tooltip.Content>
				</Tooltip.Portal>
			</Tooltip.Root>
		</Tooltip.Provider>
        
        {categories.map(cat => (
  <React.Fragment key={cat}>
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            onClick={() => setSelectedCategory(cat)}
            style={{ fontWeight: selectedCategory === cat ? 'bold' : 'normal' }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        </Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Content className="TooltipContent" sideOffset={5} side="bottom">
						Выбрать категорию
						<Tooltip.Arrow className="TooltipArrow" />
					</Tooltip.Content>
				</Tooltip.Portal>
			</Tooltip.Root>
    </Tooltip.Provider>
  </React.Fragment>
))}
      </div>
        </div>
      {/* Templates List */}
      <div className="temp-wrapper">
        {filteredTemplates.length === 0 ? (
        <div className="empty-state">
          <CreateFormEmpty />
          
        </div>
      ) : (
        filteredTemplates.map((temp) => (
          <TempContainer 
            key={temp.id}
            id={temp.id}
            category={temp.category}
            content={temp.content} 
            name={temp.name}
            onDelete={handleDeleteTemplate}
            onUpdate={handleUpdateTemplate}
          />
        )))}
      </div>
    </div>
  );
}