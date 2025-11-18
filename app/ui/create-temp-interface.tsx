import AddBtn from "./buttons/createBtn"

export default function CreateTempForm() {

    return (
        <div>
            <form>
                <fieldset className="create-form">
                    <label htmlFor="name">Title:</label>
                    <input 
                        type="text" 
                        id="name"
                        name="name"
                        placeholder="Enter template title"
                        required
                    />

                    <label htmlFor="category">Categories:</label>
                    <select id="category" name="category" defaultValue="General">
                        <option value="General">Общие</option>
                        <option value="gos">Государственные</option>
                        <option value="credits">Кредиты</option>
                        <option value="products">Продукты</option>
                        <option value="misc">Разное</option>
                    </select>

                    <label htmlFor="content">Template:</label>
                    <textarea 
                        id="content"
                        name="content"
                        placeholder="Enter text here"
                        rows={6}
                        required
                    ></textarea>
                    
                    <AddBtn />
                </fieldset>
            </form>
        </div>
    )
}