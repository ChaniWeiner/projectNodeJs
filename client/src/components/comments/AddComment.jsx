import React from 'react';

function AddComment({ arrOfComments, setArrOfComments, setAddScreen, user, post }) {

    function createComment(event) {
        event.preventDefault();
        let comment = {
            postId: post.id,
            id: null,
            email: user.email,
            name: event.target[0].value,
            body: event.target[1].value,
        }
        addCommentToDb(comment)
    }

    function addCommentToDb(currentComment) {
        fetch(`http://localhost:8081/comments`, {
            headers: { 'Content-Type': 'application/json', 'charset':'UTF-8' },
            method: 'POST',
            body: JSON.stringify({
                postId: currentComment.postId,
                id: currentComment.id,
                name: currentComment.name,
                email: currentComment.email,
                body: currentComment.body
            })
        }).then(response => (response.json()))
            .then(() => {
                alert("comment added succefuly!");
                setArrOfComments([...arrOfComments, currentComment]);
                setAddScreen(false)
            })
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
