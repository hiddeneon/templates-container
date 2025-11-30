import AddBtn from "./buttons/createBtn";


export default function CreateTempForm() {

    return (
        <div>
            <form>
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
                    
                    <AddBtn />
                </fieldset>
            </form>
        </div>
    )
}