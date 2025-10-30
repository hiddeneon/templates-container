'use client'

import React, { useState } from "react";
import  styled  from '@emotion/styled';

interface TempContainerProps {
  id: number;
  name: string;
  content: string;
}

export default function TempContainer({ id, name, content }: TempContainerProps) {

  const Button = styled.button<{ isEditing: boolean }>`
  padding: 32px;
  background-color: ${props => props.isEditing ? 'red' : 'hotpink'};
  font-size: 24px;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  transition: background-color 0.3s ease;
  &:hover {
    color: white;
    cursor: pointer;
  }
`
    const [text, setText] = useState(content);

    const [editBtn, setEditBtn] = useState('edit');
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

    function toggleEditor(): void {
      const tempElem = document.getElementById(`text-area-${id}`);

      // const EBtn = document.getElementById('edit-button');
      tempElem?.toggleAttribute('readOnly');
      if (!tempElem?.hasAttribute('readOnly')) {
        setEditBtn('done');
        setIsEditing(true);
        console.log(`editing mode on ${tempElem?.hasAttribute('readOnly')}`);
      } else {
        setEditBtn('edit');
        setIsEditing(false);
        console.log(`readonly mode on ${tempElem?.hasAttribute('readOnly')}`);
      }
    }

    function deleteTemp(): void {
        console.log(`Deleting template with ID: ${id}`);
        // You can now use the id prop in your function!
        // For example, you could call a parent function to delete this template
        // onDelete?.(id);
    }

    return (
      <div
        style={{
          color: "white",
          textAlign: "center",
          border: "white 2px solid",
        }}
      >
        <h1>{name}</h1>
        <div className="text-container">
          <textarea
            value={text}
            id={`text-area-${id}`}
            onChange={(e) => setText(e.target.value)}
            className="temp-text-container"
            onClick={handleCopyClick}
            readOnly
          ></textarea>
          <Button className="edit-btn" id="edit-button" onClick={toggleEditor} isEditing={isEditing}>
            {editBtn}
          </Button>
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