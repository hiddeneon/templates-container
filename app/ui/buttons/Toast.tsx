'use client';

import styles from "../page.module.css";
import{ Toaster } from 'react-hot-toast';

export default function Toast() {
  return (
    <div>
      <Toaster
        toastOptions={{
            className: 'toaster',
            style: {
                fontFamily: 'var(--font-geist-sans)',
                color: 'rgba(1, 1, 1, 1)',
            }
        }} />
    </div>
  );
};