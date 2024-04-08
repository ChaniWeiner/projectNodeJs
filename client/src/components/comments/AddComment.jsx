import React from 'react';

function AddComment({ arrOfComments, setArrOfComments, setAddScreen, user, post }) {

    function createComment(event) {
        event.preventDefault();
        let comment = {
            id: null,
            postId: post.id,
            email: user.email,
            name: event.target[0].value,
            body: event.target[1].value,
        }
        addCommentToDb(comment)
    }

    function addCommentToDb(currentComment) {
        fetch(`http://localhost:8081/comment`, {
            headers: { 'Content-Type': 'application/json', 'charset':'UTF-8' },
            method: 'POST',
            body: JSON.stringify({
                id: currentComment.id,
                postId: currentComment.postId,
                name: currentComment.name,
                email: currentComment.email,
                body: currentComment.body
            })
        })
        .then(response => {if(!response.ok) throw new Error(`status: ${response.status}`); return response.json()})
        .then((response) => {
                alert("comment added succefuly!");
                currentComment.id=response["id"]
                setArrOfComments([...arrOfComments, currentComment]);
                setAddScreen(false)
            })
        .catch((err) => {console.error(err); alert("something went wrong please try later")})

    }

    return (<>
        <div>
            <form onSubmit={createComment}>
                <label >name:</label>
                <input type="text" />
                <label >body:</label>
                <input type="text" />
                <button type='submit'>add</button>
            </form></div>
    </>)
}

export default AddComment
