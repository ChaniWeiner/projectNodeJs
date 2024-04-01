import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";

function SearchPost({ arrOfPosts, setArrPostsToDisplay, arrOfAllPosts,showAllPosts}) {
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
        }
        setArrPostsToDisplay(filtered)
    }

    function searchPost(event) {
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
            default:
                break;
        }
        searchValue.current.value='';

    }
    return (<>

        <div>
            <select onChange={searchPost}>
                <option value="searchByAll">all</option>
                <option value="searchById">by id</option>
                <option value="searchBytitle">by title</option>
            </select>

            <input type="text" ref={searchValue} id='searchValue' className="input" placeholder="🔍Search... "></input>
            <button onClick={()=>search(showAllPosts==true?arrOfAllPosts:arrOfPosts)}><BiSearchAlt /></button>
        </div>
    </>)
}
export default SearchPost