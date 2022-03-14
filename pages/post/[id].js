import { useQuery, gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import CommentForm from '../../components/CommentForm'
import CommentList from '../../components/CommentList'
import { FETCH_POSTS_QUERY } from '..'
import { AuthContext } from '../../context/auth'

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      username
      commentCount
      comments {
        id
        username
        body
      }
    }
  }
`
const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`

const SinglePost = () => {
    const router = useRouter()
  const { id } = router.query
  
    const ctx = useContext(AuthContext)

    const {
        data
      } = useQuery(FETCH_POST_QUERY, {
        variables: {
          postId: id
        }
      })
    
  const getPost = data ? data.getPost : ''

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
        const data = proxy.readQuery({
            query: FETCH_POSTS_QUERY
        })
        
        let newData = [...data.getPosts]
        newData.filter(p => p.id !== id)
        console.log(newData)
        proxy.writeQuery({
            query: FETCH_POSTS_QUERY, data: {
              getPosts: newData
            }
        })
     window.location.href = '/'
    },
    variables: {
        postId: id,
    }
})
  
  const deleteHandler = () => {
    deletePost()
}
  
    if (!getPost) {
        return <p>No such post...</p>
    } else {
        const { body, username, comments, commentCount } = getPost
        
        return (
            <div>
                <p>{body}</p>
                <p>{username}</p>
            {ctx.user.username === username && <button onClick={deleteHandler} type="button">Delete your Post</button>}
            <CommentForm postId={id} />
            <p>{commentCount} { commentCount === 1 ? 'comment': 'comments' }</p>
            <CommentList postId={id} comments={comments} />
            </div>
        )
    }
    
  
}

export default SinglePost