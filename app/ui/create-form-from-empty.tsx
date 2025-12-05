'use client'

import { useState } from 'react';
import CreateTempForm from './create-temp-interface';
import { Dialog, Tooltip } from "radix-ui";

export default function CreateFormEmpty() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div>
      	<Dialog.Root>
		
                <Dialog.Trigger asChild>
                <button 
        className='create-form-btn-empty'
        onClick={toggleForm}
      >Создать шаблон</button>
      </Dialog.Trigger>			
		
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
    <img className='curved-arrow' src="/curved_arrow.png" alt="Curved Arrow" width="100px" />
    </div>
  );
}