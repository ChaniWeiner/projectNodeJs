import React, { useEffect, useRef, useState } from 'react';
import { BiSearchAlt } from "react-icons/bi";


function SearchTodo({ arrOfTodos, setArrTodosToDisplay }) {
    const searchValue = useRef(null);
    const [typeSearch, setTypeSearch] = useState("id")

    function search() {
        let filtered = [];
        let value = searchValue.current.value;

        switch (typeSearch) {
            case "all":
                filtered = [...arrOfTodos]
                break;
            case "id":
                filtered = arrOfTodos.filter(obj => {
                    return obj.id == value;
                });
                break;
            case "title":
                filtered = arrOfTodos.filter(obj => {
                    return obj.title == value;
                });
                break;
            case "complete":
                filtered = arrOfTodos.filter(obj => {
                    return (obj.completed).toString() == value
                });
                break;

        }
        setArrTodosToDisplay(filtered)
    }

    function searchTodos(event) {
        event.preventDefault();
        switch (event.target.value) {
            case "searchByAll":
                setTypeSearch("all")
                break;
            case "searchById":
                setTypeSearch("id")
                break;
            case "searchBytitle":
                setTypeSearch("title")
                break;
            case "searchComplited":
                setTypeSearch("complete")
                break;
            default:
                break;
        }
        searchValue.current.value='';
    }
    return (<>
            <select onChange={searchTodos}>
                <option value="searchByAll">all</option>
                <option value="searchById">by id</option>
                <option value="searchBytitle">by title</option>
                <option value="searchComplited">completed</option>
            </select>

            <input  type="text" ref={searchValue} id='searchValue'  className="input" placeholder="🔍Search..." />
            <button onClick={search}><BiSearchAlt /></button>
    </>)
}
export default SearchTodo