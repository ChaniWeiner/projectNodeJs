import React, { useEffect, useState } from 'react';
import {  useNavigate } from "react-router-dom";
import { currentUserContext } from '../Main'
import AddPost from './AddPost';
import SearchPost from './SearchPost';
import { useContext } from 'react';
import { AiFillDelete } from "react-icons/ai";
import { RiEdit2Fill } from "react-icons/ri";
import { MdOutlineExpandMore } from "react-icons/md";
import './posts.css'

function Posts() {

    const[user,setUser]=useContext(currentUserContext);
    const [arrOfPosts, setArrOfPosts] = useState([])
    const [arrOfAllPosts, setArrOfAllPosts] = useState([])
    const [arrPostsToDisplay, setArrPostsToDisplay] = useState([])
    const [addScreen, setAddScreen] = useState(false)
    const [indexOfPost, setIndexOfPost] = useState()
    const [showBody, setShowBody] = useState(-1)
    const [showAllPosts, setShowAllPosts] = useState(false)
    const [style, setStyle] = useState({ fontWeight: 'bold' })
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:3000/posts?userId=${user.id}`)
            .then(response => (response.json()))
            .then(data => (setArrOfPosts(data), setArrPostsToDisplay(data)));
    }, [])


    function bringAllPostsFromDb() {
        fetch(`http://localhost:3000/posts`)
            .then(response => (response.json()))
            .then((data) => { setArrOfAllPosts(data), setArrPostsToDisplay(data),setShowAllPosts(true) })
    }


    function deletePost(dataId) {
        let filtered
        fetch(`http://localhost:3000/posts/${dataId}`, {
            method: "DELETE",
        })
            .then(response => response.json())
            .then(filtered = arrOfPosts.filter(obj => {
                return obj.id != dataId;
            })
            ).then(setArrPostsToDisplay(filtered)).then(setArrOfPosts(filtered))
    }


    function updatePost(event, idPost, i) {
        let filtered
        event.preventDefault()
        fetch(`http://localhost:3000/posts/${idPost}`, {
            method: "PATCH",
            body: JSON.stringify({
                title: event.target[0].value,
                body: event.target[1].value,
            }),
        }).then(response => response.json())
            .then(filtered = arrOfPosts.filter(obj => {
                return obj.id != idPost
            })
            ).then(data => setArrPostsToDisplay((prev) => {
                const tempArrOfPosts = [
                    ...prev.slice(0, i),
                    data,
                    ...prev.slice(i + 1)
                ];
                return tempArrOfPosts
            })).then(setArrOfPosts(arrPostsToDisplay)).then(setIndexOfPost())
    }

    return (
        <>
            <h3>Posts</h3>
            {!showAllPosts?<button onClick={bringAllPostsFromDb}>show all posts</button>:
            <button onClick={()=>{setArrPostsToDisplay(arrOfPosts);setShowAllPosts(false)}}>show my posts</button>}
            <button onClick={() =>addScreen == true ? setAddScreen(false) :setAddScreen(true) }>add post</button>
            {addScreen && <AddPost arrOfPosts={arrOfPosts} setArrOfPosts={setArrOfPosts} setAddScreen={setAddScreen} setArrPostsToDisplay={setArrPostsToDisplay} user={user} />}
            {<SearchPost arrOfPosts={arrOfPosts} setArrPostsToDisplay={setArrPostsToDisplay} arrOfAllPosts={arrOfAllPosts} showAllPosts={showAllPosts} />}
            <div className='postStyle'>
            {arrPostsToDisplay.map((post, i) => {
                return (

                    <div key={i} id={i}>
                        <h4>post number: {post.id}</h4>
                        <form onSubmit={() => updatePost(event, post.id, i)}>
                            {indexOfPost != i ? null : <label>title:</label>}
                            {indexOfPost != i ? showBody == i ? <p style={style}>title: {post.title}</p> : <p >title: {post.title}</p>
                                : <input type="text" defaultValue={post.title} />}
                            {indexOfPost != i ? null : <label>body:</label>}
                            {indexOfPost != i ? showBody == i && <p>{post.body}</p>
                                : <input type="text" defaultValue={post.body} />}
                            {indexOfPost == i && <button type='submit'>update</button>}
                        </form>
                        <button onClick={() => showBody === i ? setShowBody(-1) : setShowBody(i)}><MdOutlineExpandMore /></button>
                        {showBody == i &&post.userId == user.id && <button onClick={() =>{indexOfPost == i ?setIndexOfPost(-1):setIndexOfPost(i)}}><RiEdit2Fill /></button>}
                        <br/>
                        {showBody == i && <button onClick={() => { navigate(`./${post.id}/comments`, { state:  post  }) }}>comments</button>}
                        {post.userId == user.id && <button disabled={indexOfPost == i} onClick={() => deletePost(post.id)}><AiFillDelete /></button>}
                    </div>
                )})}</div>
            {arrPostsToDisplay.length == 0 && <span>no posts</span>}
        </>
    )
}

export default Posts