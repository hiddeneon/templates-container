import React, { useState } from "react";
import AddBtn from "./buttons/createBtn";
import { insertTemplate } from "@/app/lib/actions"; 

export default function CreateTempForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    // Call your API to save the template
    const result = await insertTemplate(null, formData);

    setLoading(false);

    if (result.success) {
      window.location.reload();
    } else {
      // Show error message if needed
      alert("Ошибка при сохранении шаблона!");
    }
  };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset className="create-form">
                    <label htmlFor="name">Название:</label>
                    <input 
                        type="text" 
                        id="name"
                        name="name"
                        placeholder="Введите название шаблона"
                        required
                    />

                    <label htmlFor="category">Категория:</label>
                    <input
  list="category-list"
  id="category"
  name="category"
  defaultValue="Разное"
  placeholder="Выберите или введите категорию"
  required
/>
<datalist id="category-list">
  <option value="Общее">Общие</option>
  <option value="Законы">Законы</option>
  <option value="Кредиты">Кредиты</option>
  <option value="Продукты">Продукты</option>
  <option value="Разное">Разное</option>
</datalist>

                    <label htmlFor="content">Текст:</label>
                    <textarea 
                        id="content"
                        name="content"
                        placeholder="Введите текст шаблона"
                        rows={6}
                        required
                    ></textarea>
                    
                    <AddBtn loading={loading} />
                </fieldset>
            </form>
        </div>
    )
}