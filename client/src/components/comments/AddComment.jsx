import React from 'react';


function AddComment({ arrOfComments, setArrOfComments, setAddScreen, user ,post}) {

    function getGenralCommentsId(event) {
        event.preventDefault();
        let comment = {
            postId: post.id,
            id: 0,
            email: user.email,
            name: event.target[0].value,
            body: event.target[1].value,
        }
        fetch(`http://localhost:8081/generalNumberOfEachItem/comments`).
            then(response => (response.json()))
            .then(data => addCommentToDb(data, comment))
    }

    function addCommentToDb(generalNumberOfComment, currentComment) {
        currentComment.id = (JSON.parse(parseInt(generalNumberOfComment.commentsGeneralNumber)) + 1).toString();
        fetch(`http://localhost:8081/comments`, {
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
                alert("added ");
                setArrOfComments([...arrOfComments, currentComment]);
                setAddScreen(false)
            })
        updateGeneralNumberOfComment(currentComment.id)
    }

    function updateGeneralNumberOfComment(number) {
        fetch(`http://localhost:8081/generalNumberOfEachItem/comments`, {
            method: "PATCH",
            body: JSON.stringify({
                commentsGeneralNumber: number
            }),
        }).then(response => response.json());
    }

    return (<>
        <div>
            <form onSubmit={getGenralCommentsId}>
            <label >name:</label>
            <input type="text" />
            <label >body:</label>
            <input type="text" />
            <button type='submit'>add</button>
        </form></div>
    </>)
}
export default AddComment
