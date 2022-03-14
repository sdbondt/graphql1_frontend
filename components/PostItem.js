import React from 'react'
import Link from 'next/link'
const PostItem = ({ post: { body, commentCount, comments, username, id } }) => {
    
  return (
      <div>
          <p>{username}</p>
      <p>{body}</p>
      <p>{commentCount}</p>
      <Link href={`/post/${id}`} >
        <a>See Post</a>
      </Link>
      </div>
  )
}

export default PostItem