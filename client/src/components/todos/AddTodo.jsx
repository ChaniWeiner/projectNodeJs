import React from 'react';

function AddTodo({ arrOfTodos, setArrOfTodos,setAddScreen,setArrTodosToDisplay,user}) {
   
    function getGenralTodoId(event) {
        event.preventDefault();
        let todo = {
            userId: user.id,
            id: 0,
            title: event.target[0].value,
            completed: event.target[1].checked,
        }
        fetch(`http://localhost:3000/generalNumberOfEachItem/todos`).
            then(response => (response.json()))
            .then(data => addTodoToDb(data, todo))

    }

    function addTodoToDb(generalNumberOfTodo, currentTodo) {
        currentTodo.id = (JSON.parse(parseInt(generalNumberOfTodo.todosGeneralNumber)) + 1).toString();

        fetch(`http://localhost:3000/todos`, {
            method: 'POST',
            body: JSON.stringify({
                userId: currentTodo.userId,
                id: currentTodo.id,
                title: currentTodo.title,
                completed: currentTodo.completed
            })
        }).then(response => (response.json()))
            .then(() => {
                alert("added ");
                setArrTodosToDisplay([...arrOfTodos, currentTodo]);
                setArrOfTodos([...arrOfTodos, currentTodo]);
            })
        updateGeneralNumberOfTodo(currentTodo.id)
    }


    function updateGeneralNumberOfTodo(number) {
        fetch(`http://localhost:3000/generalNumberOfEachItem/todos`, {
            method: "PATCH",
            body: JSON.stringify({
                todosGeneralNumber: number
            }),
        }).then(response => response.json()).then(setAddScreen(false));
    }

    return (<> 
    <div>
        <form onSubmit={getGenralTodoId}>
        <label >title of todo</label>
        <input type="text" />
        <label htmlFor="taskComplete">complete:
        <input type="checkbox" id="taskComplete" />
         </label>
        <button type='submit'>add</button>
    </form>
    </div>
    </>)
}
export default AddTodo