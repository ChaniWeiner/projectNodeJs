import React from 'react';


function SortTodo({ arrTodosToDisplay, setArrTodosToDisplay }) {

    function sortTaskById() {
        const numAscending = [...arrTodosToDisplay].sort((a, b) => a.id - b.id);
        setArrTodosToDisplay(numAscending);
    }

    function sortTaskByAlphabetical() {
        const strAscending = [...arrTodosToDisplay]
        setArrTodosToDisplay(strAscending.sort((a, b) =>
            a.title > b.title ? 1 : -1,
        ));
    }

    function sortComplited() {
        const completeArr = [...arrTodosToDisplay]
        setArrTodosToDisplay(completeArr.sort((a, b) =>
            Number(b.completed) - Number(a.completed)
        ));
    }

    function randomSort() {
        const randomArr = [...arrTodosToDisplay]
        setArrTodosToDisplay(randomArr.sort(() => 0.5 - Math.random()
        ));
    }



    function sortTodos(event) {
        event.preventDefault();
        switch (event.target.value) {
            case "sortTaskById":
                sortTaskById()
                break;
            case "sortComplited":
                sortComplited()
                break;
            case "sortTaskByAlphabetical":
                sortTaskByAlphabetical()
                break;
            case "randomSort":
                randomSort()
                break;
            default:
                break;
        }
    }

    return (<>
        <select onChange={sortTodos}>
            <option value="sortTaskById">serial</option>
            <option value="sortComplited">cmpleted</option>
            <option value="sortTaskByAlphabetical">alphabetical</option>
            <option value="randomSort">random</option>
        </select>
        <br />
    </>)
}
export default SortTodo