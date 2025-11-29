'use client'

import React, { useState } from "react";
import  styled  from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare as faPenToSquareSolid } from '@fortawesome/free-solid-svg-icons';

import { Template } from "../data/types";

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

  const EditButton = styled.button<{ isEditing: boolean }>`
  padding: 1rem;
  color: white;
  font-size: 2rem;
  background-color: rgba(255, 255, 255, 0.1); /* Semi-transparent background */
  backdrop-filter: blur(10px); /* Frosted glass effect */
  border: 1px solid rgba(255, 255, 255, 0.2); /* Subtle border */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional shadow */
  border-radius: 10px;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: rgba(235, 200, 0, 0.4);
    cursor: pointer;
  }
`
const DeleteButton = styled.button`
  padding: 1rem;
  color: white;
  font-size: 2rem;
  background-color: rgba(255, 255, 255, 0.1); /* Semi-transparent background */
  backdrop-filter: blur(10px); /* Frosted glass effect */
  border: 1px solid rgba(255, 255, 255, 0.2); /* Subtle border */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional shadow */
  border-radius: 10px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: rgba(207, 18, 18, 0.4);
    cursor: pointer;
  }
`

    const [text, setText] = useState(content);
    const [nameText, setNameText] = useState(name);

    const [editBtn, setEditBtn] = useState(<FontAwesomeIcon icon={faPenToSquareSolid} />);
    const [isEditing, setIsEditing] = useState(false);

    const handleCopyClick = async () => {
      const tempElem = document.getElementById(`text-area-${id}`);

      if (tempElem?.hasAttribute('readOnly')) {
        try {
            await window.navigator.clipboard.writeText(text);
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
        if (text !== content || nameText !== name) {
          try {
            const { editTemplate } = await import('../lib/actions');
            const result = await editTemplate(id, {
              name: nameText,
              content: text,
              category: 'General'
            });
            
            if (result.success && result.template) {
              if (onUpdate) {
                onUpdate({ ...result.template, userid });
              }
              console.log('Template updated successfully');
            } else {
              console.error('Failed to update template:', result.message);
              // Revert changes if update failed
              setText(content);
              setNameText(name);
            }
          } catch (error) {
            console.error('Error updating template:', error);
            // Revert changes if update failed
            setText(content);
            setNameText(name);
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
          <h1>{nameText}</h1>
        )}
        <span>{category}</span>
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
          <section className="buttons-interface">
            <DeleteButton onClick={deleteTemp}><FontAwesomeIcon icon={faTrashCan} /></DeleteButton>
            <EditButton className="edit-btn" id="edit-button" onClick={toggleEditor} isEditing={isEditing}>
              {editBtn}
            </EditButton>
          </section>
        </div>
        
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