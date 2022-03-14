import React, { useState, useContext } from 'react'
import { useMutation, gql } from '@apollo/client'
import { AuthContext } from '../context/auth'
import { useRouter } from 'next/router'

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      token
    }
  }
`

const login = () => {
  const ctx = useContext(AuthContext)
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const { username, password } = formData
  
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      // result is het resultaat van je query/mutation, zelfde als in sandbox
      const { data: { login: userData } } = result
      ctx.login(userData)
      window.location.href = '/'
    },
    variables: formData
  })
  if (error) {
    console.log(error)
  }
  const changeHandler = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    loginUser()
  }
  if (ctx.user) {
    router.push('/')
  } else {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={submitHandler}>
          <label htmlFor="username">Username</label><br />
          <input type="text" value={username} onChange={changeHandler} name='username' id="username" /><br />
          <label htmlFor="password">password</label><br />
          <input type="password" value={password} name='password' onChange={changeHandler} id="password" /><br />
          <button type='submit'>Login</button>
        </form>
      </div>
    )
  }
  
}

export default login