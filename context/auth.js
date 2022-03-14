import React, { useReducer, createContext } from 'react'
import jwtDecode from 'jwt-decode'

const initialState = {
  user: null
}

if (typeof window !== 'undefined' && localStorage.getItem('jwtToken')) {
  const decodedToken = jwtDecode(localStorage.getItem('jwtToken'))

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken')
  } else {
    initialState.user = decodedToken
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {}
})

function authReducer(state, action) {
    if (action.type === 'LOGIN') {
        return {
            ...state,
            user: action.payload,
        }
    } else if (action.type === 'LOGOUT') {
        return {
            ...state,
            user: null
        }
    } else {
        return state
    }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const login = (userData) => {
    localStorage.setItem('jwtToken', userData.token)
    dispatch({
      type: 'LOGIN',
      payload: userData
    })
  }

  const logout = () => {
    localStorage.removeItem('jwtToken')
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };