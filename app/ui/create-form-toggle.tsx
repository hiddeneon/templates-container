'use client'

import { useState } from 'react';
import CreateTempForm from './create-temp-interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fas, far, fab);

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
        {isFormVisible ? <FontAwesomeIcon icon="fa-regular fa-circle-xmark" /> : <FontAwesomeIcon icon="fa-solid fa-square-plus" />}
      </button>
      
      {isFormVisible && (
        <div className="form-container">
          <CreateTempForm />
        </div>
      )}
    </div>
  );
}