'use client'

import React, { useState } from "react";
import  styled  from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon,  } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare as faPenToSquareSolid } from '@fortawesome/free-solid-svg-icons';
import { Template } from "../data/types";
import toast from "react-hot-toast";
import { Tooltip } from "radix-ui";

interface TempContainerProps {
  id: number;
  userid?: string;
  category: string;
  name: string;
  content: string;
  onDelete?: (id: number) => void;
  onUpdate?: (template: Template) => void;
}

export default function TempContainer({ id, userid, category, name, content, onDelete, onUpdate }: TempContainerProps) {

  let EditButton = styled.button<{ isEditing: boolean }>`
  padding: .1rem;
  color: black;
  font-size: 1.4rem;
  background-color: white; 
  backdrop-filter: blur(10px); 
  border: none; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
  border-radius: 3px;
  transition: background-color 0.2s ease;
  position: absolute;
  bottom: 7px;
  right: 7px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
  };
  &:active {
    background-color: white;
    color: black;
  }
`
const DeleteButton = styled.button`
  padding: 1rem;
  color: white;
  font-size: 2rem;
  /* background-color: rgba(255, 255, 255, 0.1);*/
  background-color: rgba(207, 18, 18, 0.4);
  backdrop-filter: blur(10px); /* Frosted glass effect */
  border: none; /* Subtle border */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional shadow */
  border-radius: 10px;
  transition: background-color 0.3s ease;
  &:hover {
    color: black;
    cursor: pointer;
  }
`

    const [text, setText] = useState(content);
    const [nameText, setNameText] = useState(name);
    const [nameCategory, setCategory] = useState(category);
    const router = useRouter();

    const [editBtn, setEditBtn] = useState(<FontAwesomeIcon icon={faPenToSquareSolid} />);
    const [isEditing, setIsEditing] = useState(false);

    const handleCopyClick = async () => {
      const tempElem = document.getElementById(`text-area-${id}`);

      if (tempElem?.hasAttribute('readOnly')) {
        try {
            await window.navigator.clipboard.writeText(text);
            toast("✓ Скопировано в буфер обмена!");
            console.log("Copied to clipboard!");
        } catch (err) {
            console.error(
                "Unable to copy to clipboard.",
                err
            );
            console.log("Copy to clipboard failed.");
        }
      } else {

        return;

      }
    };

    async function toggleEditor(): Promise<void> {
      const tempElem = document.getElementById(`text-area-${id}`);

      if (!tempElem?.hasAttribute('readOnly')) {
        // User clicked "done" - save changes
        if (text !== content || nameText !== name || nameCategory !== category) {
          try {
            const { editTemplate } = await import('../lib/actions');
            const result = await editTemplate(id, {
              name: nameText,
              content: text,
              category: nameCategory
            });
            
            if (result.success && result.template) {
              if (onUpdate) {
                onUpdate({ ...result.template, userid: userid ?? 'anonymous' });
              }
              console.log('Template updated successfully');
            } else {
              console.error('Failed to update template:', result.message);
              // Revert changes if update failed
              setText(content);
              setNameText(name);
              setCategory(category);
            }
          } catch (error) {
            console.error('Error updating template:', error);
            // Revert changes if update failed
            setText(content);
            setNameText(name);
            setCategory(category);
          }
        }
        
        // Switch to readonly mode
        tempElem?.setAttribute('readOnly', 'true');
        setEditBtn(<FontAwesomeIcon icon={faPenToSquareSolid} />);
        setIsEditing(false);
        console.log(`readonly mode on ${tempElem?.hasAttribute('readOnly')}`);
      } else {
        // User clicked "edit" - enable editing
        tempElem?.removeAttribute('readOnly');
        setEditBtn(<FontAwesomeIcon icon={faSquareCheck} />);
        setIsEditing(true);
        console.log(`editing mode on ${tempElem?.hasAttribute('readOnly')}`);
      }
    }

    async function deleteTemp(): Promise<void> {
        // Show confirmation dialog
        const confirmed = window.confirm(`Are you sure you want to delete "${nameText}"?`);
        
        if (!confirmed) {
            return;
        }

        try {
            const { deleteTemplate } = await import('../lib/actions');
            const result = await deleteTemplate(id);
            
            if (result.success) {
                console.log('Template deleted successfully');
                // Call the parent's onDelete callback to remove from UI
                if (onDelete) {
                    onDelete(id);
                }
            } else {
                console.error('Failed to delete template:', result.message);
                alert('Failed to delete template. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting template:', error);
            alert('An error occurred while deleting the template.');
        }
    }

    return (
      <div className="temp-box">
        <div className="title-temp-box">
        {isEditing ? (
          <input
            type="text"
            value={nameText}
            onChange={(e) => setNameText(e.target.value)}
            className="template-name-input"
            placeholder="Template name"
          />
        ) : (
          <h2>{nameText}</h2>
        )}
        {isEditing ? (
          <input
            type="text"
            value={nameCategory}
            onChange={(e) => setCategory(e.target.value)}
            className="template-category-input"
            placeholder="Template category"
          />
        ) : (
          <span>{category}</span>
        )}
            		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger asChild>
					<EditButton id="edit-button" onClick={toggleEditor} isEditing={isEditing}>
              {editBtn}
            </EditButton>
				</Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Content className="TooltipContent" sideOffset={5}>
						Редактировать
						<Tooltip.Arrow className="TooltipArrow" />
					</Tooltip.Content>
				</Tooltip.Portal>
			</Tooltip.Root>
		</Tooltip.Provider>
        </div>
        <div className="text-container">
          <textarea
            value={text}
            id={`text-area-${id}`}
            onChange={(e) => setText(e.target.value)}
            className="temp-text-container"
            onClick={handleCopyClick}
            readOnly
          ></textarea>
        </div>
        {isEditing ? (
        <section className="delete-btn-wrapper">
            		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger asChild>
					<DeleteButton onClick={deleteTemp}><FontAwesomeIcon icon={faTrashCan} /></DeleteButton>
				</Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Content className="TooltipContent" sideOffset={5} side="bottom">
						Удалить
						<Tooltip.Arrow className="TooltipArrow" />
					</Tooltip.Content>
				</Tooltip.Portal>
			</Tooltip.Root>
		</Tooltip.Provider>

          </section> ) : 
          (
            <></>
          )
        }
      </div>
    );
}

// export async function copyTextToClipboard(text) {
//   try {
//     await navigator.clipboard.writeText(text);
//     console.log('Text copied to clipboard');
//   } catch (err) {
//     console.error('Failed to copy: ', err);
//   }
// }