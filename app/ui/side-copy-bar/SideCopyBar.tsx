'use client';

import CopyComp from "../CopyComp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { Symbol } from '../../data/types';
import AddSymbolForm from '../add-symbol-form';
import { useState } from 'react';

interface SymbolsWrapperProps {
    initialSymbols: Symbol[];
}

export default function SideCopyBar({ initialSymbols }: SymbolsWrapperProps) {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className='side-copy-bar'>
            <button
                className="symbol-add-btn"
                onClick={() => setShowForm((prev) => !prev)}
            >
                <FontAwesomeIcon style={{color: showForm == false ? 'white': 'rgb(160, 40, 50)',
                                         transform: showForm == false ? 'rotate(0deg)' : 'rotate(45deg)',
                                         transition: '.15s'
                }} icon={faSquarePlus} id='add-symbol-icon' />
                <p>Добавить символы</p>
            </button>
            {showForm && <AddSymbolForm />}
            <div className='outside-frame-sidebar-wrapper'>
                <CopyComp symbols={initialSymbols} />
            </div>
        </div>
    );
}