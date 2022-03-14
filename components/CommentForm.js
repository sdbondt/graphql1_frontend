import React, { useState } from "react"
import { useMutation, gql } from "@apollo/client"

const SUBMIT_COMMENT_MUTATION = gql`
  mutation ($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      body
      username
    }
  }
`

const CommentForm = ({ postId }) => {
  const [comment, setComment] = useState("")
  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
      update() {
          window.location.href = `/post/${postId}`
    },
    variables: {
      postId,
      body: comment,
    },
  })

  const commentChangeHandler = (e) => {
    setComment(e.target.value)
  }

    const submitCommentHandler = (e) => {
      e.preventDefault()
    submitComment()
  }

  return (
    <form onSubmit={submitCommentHandler}>
      <label htmlFor="comment">Add your comment</label>
      <br />
      <textarea
        name="comment"
        id="comment"
        onChange={commentChangeHandler}
        value={comment}
        cols="30"
        rows="10"
      ></textarea>
      <br />
      <button type="submit">Add your comment</button>
    </form>
  )
}

export default CommentForm
