import { useEffect, useReducer } from "react"
import { todoReducer } from "./todoReducer"

const initialState = [
    //     {
    //     id: new Date().getTime(),
    //     description: 'Recolectar la piedra del alma',
    //     done: false,

    // },
    // {
    //     id: new Date().getTime() * 3,
    //     description: 'Recolectar la piedra del tiempo',
    //     done: false,

    // },
];


const init = () => {
    try {
        return JSON.parse(localStorage.getItem('todos') || []);
    } catch (error) {
        console.log('Error', error);
    }
}



export const useTodos = () => {

    const [todos, dispatch] = useReducer(todoReducer, initialState, init);


    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])


    const handleNewTodo = (todo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }

        dispatch(action);
        console.log(todo);

    }

    const handleDeleteTodo = (id) => {

        dispatch({
            type: '[TODO] Remove todo',
            payload: id
        });

    }

    const handleToggleTodo = (id) => {
        console.log({ id });

        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id
        });

    }


    return {
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo => !todo.done).length
    }

}
