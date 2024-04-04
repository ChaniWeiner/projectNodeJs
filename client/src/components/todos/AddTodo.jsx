import React from 'react';

function AddTodo({ arrOfTodos, setArrOfTodos, setAddScreen, setArrTodosToDisplay, user }) {

    function createTodo(event) {
        event.preventDefault();
        let todo = {
            id: null,
            userId: user.id,
            title: event.target[0].value,
            completed: event.target[1].checked,
        }
        addTodoToDb(todo)
    }

    function addTodoToDb(currentTodo) {
        console.log(currentTodo);
        fetch(`http://localhost:8081/todo`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'charset':'UTF-8' },
                body: JSON.stringify({
                    id: currentTodo.id,
                    userId: currentTodo.userId,
                    title: currentTodo.title,
                    completed: currentTodo.completed
                })
            })
            .then(data=>data.json())
            .then((response) => {
                alert("Todo added succefuly!");
                currentTodo.id=response["id"]
                setArrTodosToDisplay([...arrOfTodos, currentTodo]);
                setArrOfTodos([...arrOfTodos, currentTodo]);
                setAddScreen(false);
            }).catch(ex => console.log(ex))
    }

    return (<>
        <div>
            <form onSubmit={createTodo}>
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