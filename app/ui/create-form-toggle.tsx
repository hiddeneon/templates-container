'use client'

import { useState } from 'react';
import CreateTempForm from './create-temp-interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Dialog, Tooltip } from "radix-ui";

export default function CreateFormToggle() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div>
      	<Dialog.Root>
		
      <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Dialog.Trigger asChild>
                <button 
        className='toggle-form-btn nav-item'
        onClick={toggleForm}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
      </Dialog.Trigger>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="TooltipContent" sideOffset={5} side="right">
                  Добавить шаблон
                  <Tooltip.Arrow className="TooltipArrow" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
			
		
		<Dialog.Portal>
			<Dialog.Overlay className="DialogOverlay" />
      <Dialog.Title className="DialogTitle"></Dialog.Title>
			<Dialog.Content className="DialogContent">
				<CreateTempForm />
				{/* <Dialog.Close asChild>
					<button className="IconButton" aria-label="Close">
X
					</button>
				</Dialog.Close> */}
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>

      
      {isFormVisible && (
        <div className='form-container'>
          
        </div>
      )}
    </div>
  );
}