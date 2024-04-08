import React, { useEffect, useState } from 'react';
import { AiFillDelete } from "react-icons/ai";
import { RiEdit2Fill } from "react-icons/ri";
import AddTodo from './AddTodo';
import SearchTodo from './SearchTodo';
import SortTodo from './SortTodo';
import { useContext } from 'react';
import { currentUserContext } from '../Main'
import './todos.css'

function Todos() {
    const [user, setUser] = useContext(currentUserContext);
    const [arrOfTodos, setArrOfTodos] = useState([])
    const [arrTodosToDisplay, setArrTodosToDisplay] = useState([])
    const [addScreen, setAddScreen] = useState(false)
    const [indexOfTodo, setIndexOfTodo] = useState()

    useEffect(() => {
        const curUser = JSON.parse(localStorage.getItem("user"));
        console.log("userId "+curUser.userId)
        fetch(`http://localhost:8081/todo?userId=${curUser.userId}`)
            .then(response => response.json())
            .then(data => { console.log(data); setArrOfTodos(data); setArrTodosToDisplay(data) });
    }, [])

    function deleteTodo(dataId) {
        let filtered
        fetch(`http://localhost:8081/todo/${dataId}`, {
            method: "DELETE",
        })
            .then(response => response.toString())
            .then(filtered = arrOfTodos.filter(obj => {
                return obj.id != dataId;
            })
            ).then(setArrTodosToDisplay(filtered)).then(setArrOfTodos(filtered))
    }

    function updateTodo(event, todo, i) {
        let filtered
        event.preventDefault()
        fetch(`http://localhost:8081/todo/${todo.id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json', 'charset': 'UTF-8' },
            body: JSON.stringify({
                id: todo.id,
                userId: todo.userId,
                title: event.target[0].value,
                completed: event.target[1].checked,
            })
        })
            .then(response => response.json())
            .then(data => {
                filtered = arrOfTodos.filter(obj => {
                    return obj.id != todo.id
                })
                return data["data"]
            })
            .then(data => setArrTodosToDisplay((prev) => {
                const tempArrOfTodos = [
                    ...prev.slice(0, i),
                    data,
                    ...prev.slice(i + 1)
                ];
                return tempArrOfTodos
            }))
            .then(setArrOfTodos(arrTodosToDisplay)).
            then(setIndexOfTodo())
    }

    function todoDisplay() {
        return <div className='todoStyle'>
            {arrTodosToDisplay.map((todo, i) => {
                return (
                    <div key={i} id={i + 1}> <h4>Id todo: {todo.id}</h4>
                        <form onSubmit={() => updateTodo(event, todo, i)}>
                            {indexOfTodo != i ? <h5>{todo.title}</h5> :
                                <input type="text" defaultValue={todo.title} />}
                            <label htmlFor="todoComplete" >complete:
                                {indexOfTodo != i ? <input type="checkbox" checked={todo.completed ? true : false} id="todoComplete" onChange={() => { }} name="todoComplete" />
                                    : <input type="checkbox" />}</label>
                            {indexOfTodo == i && <button type='submit'>update</button>}
                        </form>
                        <br></br>
                        <button disabled={indexOfTodo == i} onClick={() => deleteTodo(todo.id)}><AiFillDelete /></button>
                        <button onClick={() => { indexOfTodo == i ? setIndexOfTodo(-1) : setIndexOfTodo(i) }}><RiEdit2Fill /></button>
                    </div>)
            })}
        </div>
    }

    return (<>
        <h3>Todos</h3>
        <button onClick={() => { addScreen == true ? setAddScreen(false) : setAddScreen(true) }}>add todo </button>
        {addScreen && <AddTodo arrOfTodos={arrOfTodos} setArrOfTodos={setArrOfTodos} setAddScreen={setAddScreen} setArrTodosToDisplay={setArrTodosToDisplay} user={user} />}
        <br />
        <label>search by:  </label>
        {<SearchTodo arrOfTodos={arrOfTodos} setArrTodosToDisplay={setArrTodosToDisplay} />}
        <br />
        <label>sort by:  </label>
        {<SortTodo arrTodosToDisplay={arrTodosToDisplay} setArrTodosToDisplay={setArrTodosToDisplay} />}
        {todoDisplay()}
        {arrTodosToDisplay.length == 0 && <span>no todos</span>}
    </>)
}

export default Todos