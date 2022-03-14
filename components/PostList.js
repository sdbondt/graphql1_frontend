import React from 'react'
import PostItem from './PostItem'

const PostList = ({ posts }) => {
  return (
      <div>
          <h2>Posts</h2>
          {posts.map(p => {
              return <PostItem post={p} key={p.id} />
          })}
      </div>
  )
}

export default PostList