'use client'

import { useState } from 'react';
import CreateTempForm from './create-temp-interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

export default function CreateFormToggle() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div>
      <button 
        className='toggle-form-btn nav-item'
        onClick={toggleForm}
      >
        {isFormVisible
          ? <FontAwesomeIcon icon={faCircleXmark} />
          : <FontAwesomeIcon icon={faPlus} />}
      </button>
      
      {isFormVisible && (
        <div className='form-container'>
          <CreateTempForm />
        </div>
      )}
    </div>
  );
}