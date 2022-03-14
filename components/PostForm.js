import React, { useState, useContext } from 'react'
import { useMutation, gql } from '@apollo/client'
import { FETCH_POSTS_QUERY } from '../pages'

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      username
      comments {
        id
        body
        username
      }
      commentCount
    }
  }
`

const PostForm = () => {
    const [body, setBody] = useState('')

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: {
            body,
        },
        update(proxy, result) {
            // de fetch_posts_query heeft al een resultaat in cache opgeslaan, vai deze manier dit ophalen en onze post toevoegen
          const data = proxy.readQuery({
            query: FETCH_POSTS_QUERY
          })
          
          let newData = [...data.getPosts]
          newData = [result.data.createPost, ...newData];
          proxy.writeQuery({
            query: FETCH_POSTS_QUERY, data: {
              ...data,
              getPosts: newData
          }})
          setBody('')
        }
      })

    const changeHandler = (e) => {
        setBody(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        createPost()
    }
  return (
      <div>
          <h2>Post something</h2>
          <form onSubmit={submitHandler} >
              <label htmlFor="body">Type something</label><br />
              <textarea name="body" id="body" value={body} onChange={changeHandler} cols="30" rows="10"></textarea><br />
              <button type='submit'>Post</button>
          </form>
      </div>
  )
}

export default PostForm