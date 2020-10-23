import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


type AddItemFormPropsType = {
    addItem: (title: string) => void
}


function AddItemForm(props: AddItemFormPropsType) {

    const addItem = props.addItem

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onAddTaskClick = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            addItem(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            onAddTaskClick();
        }
    }
    return (

        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={onAddTaskClick}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default AddItemForm;