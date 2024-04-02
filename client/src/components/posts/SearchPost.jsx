import React, { useState, useRef } from 'react';
import { BiSearchAlt } from "react-icons/bi";

function SearchPost({ arrOfPosts, setArrPostsToDisplay}) {

    const [typeSearch, setTypeSearch] = useState("id")
    const searchValue = useRef(null);

    function search(selectedArr) {
        let value = searchValue.current.value;
        let filtered = [];
        switch (typeSearch) {
            case "all":
                filtered = [...selectedArr]
                setArrPostsToDisplay(filtered);
                break;
            case "id":
                filtered = selectedArr.filter(obj => {
                    return obj.id == value;
                });
                break;
            case "title":
                filtered = selectedArr.filter(obj => {
                    return obj.title == value;
                });
                break;
            case "user":
                filtered = selectedArr.filter(obj => {
                    return obj.userId == value;
                });
                break;
        }
        setArrPostsToDisplay(filtered)
    }

    function searchPost(event) {
        event.preventDefault();
        switch (event.target.value) {
            case "searchByAll":
                setTypeSearch("all");
                setArrPostsToDisplay(arrOfPosts)
                break;
            case "searchById":
                setTypeSearch("id")
                break;
            case "searchBytitle":
                setTypeSearch("title")
                break;
            case "searchByUser":
                setTypeSearch("user")
                break;
            default:
                break;
        }
        searchValue.current.value = '';
    }
    
    return (<>
        <div>
            <select onChange={searchPost}>
                <option value="searchByAll">all</option>
                <option value="searchById">by post id</option>
                <option value="searchBytitle">by title</option>
                <option value="searchByUser">by user id</option>
            </select>
            <input type="text" ref={searchValue} id='searchValue' className="input" placeholder="🔍Search... "></input>
            <button onClick={() => search(arrOfPosts)}><BiSearchAlt /></button>
        </div>
    </>)
}

export default SearchPost