import React, { useState, useContext } from 'react'
import { useMutation, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import { AuthContext } from '../context/auth'

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      token
    }
  }
`

const signup = () => {
  const router = useRouter()
  const ctx = useContext(AuthContext)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  
  const { username, email, password, confirmPassword } = formData
  const [addUser, { loading, error }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result)
      const { data: { register: userData } } = result
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
    addUser()
  }

  if (ctx.user) {
    router.push('/')
  } else {
    return (
      <div>
        <h2>Sign up</h2>
        <form onSubmit={submitHandler}>
          <label htmlFor="username">Username</label><br />
          <input type="text" name="username" value={username} onChange={changeHandler} id="username" /><br />
          <label htmlFor="email">Email</label><br />
          <input type="email" name="email" value={email} onChange={changeHandler} id="email" /><br />
          <label htmlFor="password">Password</label><br />
          <input type="password" name="password" value={password} onChange={changeHandler} id="password" /><br />
          <label htmlFor="confirmPassword">Confirm Password</label><br />
          <input type="password" name="confirmPassword" value={confirmPassword} onChange={changeHandler} id="confirmPassword" /><br />
          <button type='submit'>Sign up</button>
        </form>    
      </div>
    )
  }

  
}

export default signup