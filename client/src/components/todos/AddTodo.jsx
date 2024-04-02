import React from 'react';

function AddTodo({ arrOfTodos, setArrOfTodos, setAddScreen, setArrTodosToDisplay, user }) {

    function getGenralTodoId(event) {
        event.preventDefault();
        let todo = JSON.stringify({
            id: null,
            userId: user.id,
            title: event.target[0].value,
            completed: event.target[1].checked,
        })
        // fetch(`http://localhost:8081/generalNumberOfEachItem/todos`).
        //     then(response => (response.json()))
        //     .then(data => addTodoToDb(data, todo))
        addTodoToDb(null, todo)
    }

    function addTodoToDb(generalNumberOfTodo, currentTodo) {
        // currentTodo.id = (JSON.parse(parseInt(generalNumberOfTodo.todosGeneralNumber)) + 1).toString();
        console.log(currentTodo);
        fetch(`http://localhost:8081/todo`,
            {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "id": currentTodo.id,
                    "userId": currentTodo.userId,
                    "title": currentTodo.title,
                    "completed": currentTodo.completed
                })
            })
            // fetch(`http://localhost:8081/todo`, {
            //             method: 'POST',
            //             body: currentTodo
            //             // JSON.stringify({
            //             //     "id": currentTodo.id,
            //             //     "userId": currentTodo.userId,
            //             //     "title": currentTodo.title,
            //             //     "completed": currentTodo.completed
            //             // })
            //         }).then(response => (response.toString()))
            .then(() => {
                alert("added ");
                setArrTodosToDisplay([...arrOfTodos, currentTodo]);
                setArrOfTodos([...arrOfTodos, currentTodo]);
            }).catch(ex=>console.log(ex))
        // updateGeneralNumberOfTodo(currentTodo.id)
    }


    function updateGeneralNumberOfTodo(number) {
        fetch(`http://localhost:8081/generalNumberOfEachItem/todos`, {
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