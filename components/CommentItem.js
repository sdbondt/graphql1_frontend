import React, { useContext } from 'react'
import { AuthContext } from '../context/auth'
import {  useMutation, gql } from '@apollo/client'

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: String!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        body
      }
      commentCount
    }
  }
`


const CommentItem = ({ comment: { body, username, id }, postId }) => {
    const ctx = useContext(AuthContext)
    const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
        update(proxy) {
            
        },
        variables: {
          postId: postId,
          commentId: id,
        }
    })
    const deleteCommentHandler = () => {
        deleteComment()
        
    }

  return (
      <div>
          <p>{username}</p>
          <p>{body}</p>
          {ctx.user.username === username && <button onClick={deleteCommentHandler}>Delete Comment</button>}
      </div>
  )
}

export default CommentItem