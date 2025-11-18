'use client';

import { useActionState } from "react";
import { insertTemplate } from "@/app/lib/actions";

export default function AddBtn() {
    const [state, formAction] = useActionState(insertTemplate, null);
    
    return (
        <div className="add-btn-container">
            <button className='add-btn' formAction={formAction} type="submit">
                + Create
            </button>
            
            {state?.message && (
                <div className={`message ${state.success ? 'success' : 'error'}`}>
                    {state.message}
                </div>
            )}
        </div>
    );
}