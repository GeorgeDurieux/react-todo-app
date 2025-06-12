import {useEffect, useReducer, useRef} from "react";
import TodoForm from "./TodoForm.tsx";
import TodoList from "./TodoList.tsx";
import type {TodoProps, Action } from "../types.ts";

const getInitialTodos = () => {
    const stored = localStorage.getItem("todos")
    return stored ? JSON.parse(stored) : [];
}

const toDoReducer = ( state: TodoProps[], action: Action): TodoProps[] => {
    switch (action.type) {
        case 'ADD':
            const newTodo: TodoProps = {
                id: Date.now(),
                text: action.payload,
                completed: false
            }
            return [...state,  newTodo]
        case 'DELETE':
            return state.filter(todo => todo.id !== action.payload)
        case 'EDIT':
            return state.map( todo =>
                todo.id === action.payload.id
                ? {...todo, text: action.payload.newText}
                : todo
            )
        case 'COMPLETE':
            return state.map( todo =>
                todo.id === action.payload
                ? {...todo, completed: !todo.completed}
                : todo
            )
        case 'CLEAR_ALL':
            return []
        default:
            return state;
    }
}

const Todo = () => {
    const [todos, dispatch] = useReducer(toDoReducer, [], getInitialTodos);
    const totalTasks = todos.length;
    const completedTasks = todos.filter(t => t.completed).length
    const activeTasks = totalTasks - completedTasks;

    const inputRef =  useRef<HTMLInputElement>(null);

    const handleClearAll = () => () => {
        dispatch({type: "CLEAR_ALL"})
        inputRef.current?.focus();
    }

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        inputRef.current?.focus();
    }, [])

    return (
        <>
            <div className="max-w-md mx-auto p-6">
                <h1 className="text-center text-2xl mb-4">To-Do List</h1>
                <TodoForm dispatch={dispatch} inputRef={inputRef} />
                <TodoList todos={todos} dispatch={dispatch} />

                { todos.length > 0 && (
                    <>
                        <div className="flex justify-between mt-4 border-t pt-4 text-cf-gray">
                            <span>Total: {totalTasks}</span>
                            <span>Completed: {completedTasks}</span>
                            <span>Active: {activeTasks}</span>
                        </div>
                        <div className="text-end mt-4">
                            <button
                                className="bg-cf-dark-red text-white py-2 px-4 rounded"
                                onClick={handleClearAll}
                            >
                                Clear All
                            </button>
                        </div>
                    </>
                )}

            </div>
        </>
    )
}

export default Todo


