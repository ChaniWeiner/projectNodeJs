import React, { useEffect, useState } from 'react';
import { AiFillDelete } from "react-icons/ai";
import { RiEdit2Fill } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import { currentUserContext } from '../Main'
import './comments.css'
import AddComment from './AddComment';
import { useContext } from 'react';



function Comments() {
    const [user, setUser] = useContext(currentUserContext);
    const location = useLocation();
    const post = location.state

    const [arrOfComments, setArrOfComments] = useState([])
    const [addScreen, setAddScreen] = useState(false)
    const [indexOfComment, setIndexOfComment] = useState()

    useEffect(() => {
        fetch(`http://localhost:8081/comment?postId=${post.id}`)
            .then(response => (response.json()))
            .then(data => setArrOfComments(data));
    }, [])

    function deleteComment(commentId) {
        let filtered
        fetch(`http://localhost:8081/comment/${commentId}`, {
            method: "DELETE",
        })
            .then(response => response.json())
            .then(filtered = arrOfComments.filter(obj => {
                return obj.id != commentId;
            })
            ).then(setArrOfComments(filtered))
    }

    function updateComment(event, idComment, i) {
        let filtered
        event.preventDefault()
        fetch(`http://localhost:8081/comment/${idComment}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json', 'charset':'UTF-8' },
            body: JSON.stringify({
                name: event.target[0].value,
                body: event.target[1].value
            }),
        }).then(response => response.json())
            .then(filtered = arrOfComments.filter(obj => {
                return obj.id != idComment
            })
            ).then(data => setArrOfComments((prev) => {
                const tempArrOfComments = [
                    ...prev.slice(0, i),
                    data,
                    ...prev.slice(i + 1)
                ];
                return tempArrOfComments
            })).then(setIndexOfComment())
    }

    return (
        <>
            <h2>post number: {post.id}</h2>
            <h3 >title: {post.title}</h3>
            <h5>{post.body}</h5>
            <h3>comments</h3>
            <button onClick={() => addScreen == true ? setAddScreen(false) : setAddScreen(true)}>add comment</button>
            {addScreen && <AddComment arrOfComments={arrOfComments} setArrOfComments={setArrOfComments} setAddScreen={setAddScreen} post={post} user={user} />}
            {arrOfComments.map((comment, i) => {
                return (
                    <div key={i}>
                        <form onSubmit={() => updateComment(event, comment.id, i)}>
                            {indexOfComment != i ? <p>{1 + i + ". name: " + comment.name}</p> : <input type="text" defaultValue={comment.name} />}
                            <p>{"email: " + comment.email}</p>
                            {indexOfComment != i ? <p>{"body: " + comment.body}</p> : <input type="text" defaultValue={comment.body} />}
                            {indexOfComment == i && <button type='submit'>update</button>}
                        </form>
                        {comment.email == user.email && <button disabled={indexOfComment == i} onClick={() => deleteComment(comment.id)} ><AiFillDelete /></button>}
                        {comment.email == user.email && <button onClick={() => { indexOfComment == i ? setIndexOfComment(-1) : setIndexOfComment(i) }}><RiEdit2Fill /></button>}
                        <br></br>
                    </div>)
            })}
        </>
    )
}

export default Comments