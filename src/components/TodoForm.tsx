import { useState } from "react";
import type { TodoFormProps } from "../types.ts";

const TodoForm = ({dispatch, inputRef}: TodoFormProps) => {

    const [text, setText] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (text.trim() !== '') {
            dispatch({type: 'ADD', payload: text});
            setText('');
            inputRef.current?.focus()
        }
    }

    return (
        <>
            <form
                className="flex gap-4 mb-4"
                onSubmit={handleSubmit}
            >
                <input
                    ref={inputRef}
                    type="text"
                    value={text}
                    onChange={handleChange}
                    className="flex-1 border rounded p-2"
                    placeholder="New task..."
                />
                <button
                    type="submit"
                    className="bg-cf-dark-gray text-white px-4 py-2 rounded"
                >
                    Add
                </button>
            </form>
        </>
    )
}

export default TodoForm;