import React, { useEffect, useState } from 'react';
import { AiFillDelete } from "react-icons/ai";
import { RiEdit2Fill } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import { currentUserContext } from '../Main'
import { useNavigate } from "react-router-dom";
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
        .then(response => {if(!response.ok) throw new Error(`status: ${response.status}`); return response.json()})
        .then(data => setArrOfComments(data))
        .catch((err) => {console.error(err); alert("something went wrong please try later")})

    }, [])

    function deleteComment(commentId) {
        let filtered
        fetch(`http://localhost:8081/comment/${commentId}`, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(filtered = arrOfComments.filter(obj => {
                return obj.id != commentId;
            })
            ).then(setArrOfComments(filtered))
    }

    function updateComment(event, comment, i) {
        let filtered
        event.preventDefault()
        console.log("id comment: " + comment.id)
        fetch(`http://localhost:8081/comment/${comment.id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json', 'charset': 'UTF-8' },
            body: JSON.stringify({
                id: comment.id,
                postId: comment.postId,
                name: event.target[0].value,
                email: user.email,
                body: event.target[1].value
            }),
        })
        .then(response => {if(!response.ok) throw new Error(`status: ${response.status}`); return response.json()})
        .then(data => {
                filtered = arrOfComments.filter(obj => {
                    return obj.id != comment.id
                });
                return data["data"]
            })
            .then(data => setArrOfComments((prev) => {
                console.log("updated data: " + data)
                const tempArrOfComments = [
                    ...prev.slice(0, i),
                    data,
                    ...prev.slice(i + 1)
                ];
                return tempArrOfComments
            })).then(setIndexOfComment())
            .catch((err) => {console.error(err); alert("something went wrong please try later")})

    }

    function commentsDisplay() {
        return arrOfComments.map((comment, i) => {
            return (
                <div key={i}>
                    <form onSubmit={() => updateComment(event, comment, i)}>
                        {indexOfComment != i ? <p>{1 + i + ". name: " + comment.name}</p> : <input type="text" defaultValue={comment.name} />}
                        <p>{"email: " + comment.email}</p>
                        {indexOfComment != i ? <p>{"body: " + comment.body}</p> : <input type="text" defaultValue={comment.body} />}
                        {indexOfComment == i && <button type='submit'>update</button>}
                    </form>
                    {comment.email == user.email && <button disabled={indexOfComment == i} onClick={() => deleteComment(comment.id)} ><AiFillDelete /></button>}
                    {comment.email == user.email && <button onClick={() => { indexOfComment == i ? setIndexOfComment(-1) : setIndexOfComment(i) }}><RiEdit2Fill /></button>}
                    <br></br>
                </div>)
        })
    }

    return (
        <>
            <h2>post number: {post.id}</h2>
            <h3 >title: {post.title}</h3>
            <h5>{post.body}</h5>
            <h3>comments</h3>
            <button onClick={() => addScreen == true ? setAddScreen(false) : setAddScreen(true)}>add comment</button>
            {addScreen && <AddComment arrOfComments={arrOfComments} setArrOfComments={setArrOfComments} setAddScreen={setAddScreen} post={post} user={user} />}
            {commentsDisplay()}
        </>
    )
}

export default Comments