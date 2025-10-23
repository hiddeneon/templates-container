'use client'

import React, { useState } from "react";

export default function TempContainer() {

    const [text, setText] = useState(
        "Add text you want to copy"
    );

    const handleCopyClick = async () => {
      const tempElem = document.getElementById('text-area');

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

    function activeEditor() {
      const tempElem = document.getElementById('text-area');
      tempElem?.removeAttribute('readOnly');
    }

    return (
      <div
        style={{
          color: "white",
          textAlign: "center",
          border: "white 2px solid",
        }}
      >
        <h1>Hallo</h1>
        <div className="text-container">
          <textarea
            value={text}
            id='text-area'
            onChange={(e) => setText(e.target.value)}
            className="temp-text-container"
            onClick={handleCopyClick}
            readOnly
          ></textarea>
          <button className="edit-btn" onClick={activeEditor}>
            Edit
          </button>
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