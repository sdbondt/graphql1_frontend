import React from 'react'
import CommentItem from './CommentItem'

const CommentList = ({ comments, postId }) => {
  return (
      <div>
          <h2>Comments:</h2>
          {comments.map((c, i) => {
              return <CommentItem postId={postId} key={i} comment={c} />
          })}
      </div>
  )
}

export default CommentList