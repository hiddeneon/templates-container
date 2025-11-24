'use client'

import { useState } from 'react';
import CreateTempForm from './create-temp-interface';

export default function CreateFormToggle() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="create-form-toggle">
      <button 
        className="toggle-form-btn"
        onClick={toggleForm}
      >
        {isFormVisible ? '✕' : '+ Add'}
      </button>
      
      {isFormVisible && (
        <div className="form-container">
          <CreateTempForm />
        </div>
      )}
    </div>
  );
}