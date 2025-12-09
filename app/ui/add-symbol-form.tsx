import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { addSymbolAction } from './add-symbol-action';

export default function AddSymbolForm() {

    const [loading, setLoading] = useState(false);

     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
         

        e.preventDefault();
        setLoading(true);
    
        const formData = new FormData(e.currentTarget);
    
        // Call your API to save the template
        const result = await addSymbolAction(formData);
    
        setLoading(false);
    
        if (result.success) {
          window.location.reload();
        } else {
          // Show error message if needed
          alert("Ошибка при сохранении символа!");
        }
      };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset className="symbol-create-form">
                    <label htmlFor="name"><FontAwesomeIcon icon={faPencil} />{'>>'}</label>
                    <input 
                        type="text" 
                        id="symbol-input"
                        name="symbol-input"
                        placeholder='...'
                        maxLength={5}
                        required
                    />
                <button className="add-symbol-btn">+</button>
                </fieldset>
            </form>
        </div>
    )
}