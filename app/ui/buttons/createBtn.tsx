// 'use client';

import React, { useActionState } from "react";
// import { insertTemplate } from "@/app/lib/actions";
// import { useRouter } from 'next/navigation';


export default function AddBtn({ loading }: { loading: boolean }) {
    // const [state, formAction] = useActionState(insertTemplate, null);
    // const router = useRouter();

//     React.useEffect(() => {
//   if (state?.success) {
//     window.location.reload();
//   }
// }, [state?.success]);

    return (
            <div className="add-btn-container">
                                <button className='add-btn' disabled={loading} type="submit">
                                        {loading ? (
                                            <span
                                                className="native-spinner"
                                                role="status"
                                                aria-live="polite"
                                                aria-label="Загрузка"
                                            ></span>
                                        ) : "+ Создать"}
                                </button>
                {loading && <div className="loading-message">Сохраняем шаблон... 🔃Страница перезагрузится</div>}
                {/* {state?.message && (
                    <div className={`message ${state.success ? 'success' : 'error'}`}>
                        {state.message}
                    </div>
                )} */}
            </div>
    );
}