import '../styles/globals.css'
import React from 'react'
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'
import { AuthProvider } from '../context/auth';
import { setContext } from 'apollo-link-context'

const httpLink = createHttpLink({
  uri: 'http://localhost:5000'
});

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken')
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
})


function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
    <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
    </AuthProvider>
    
  ) 
}

export default MyApp
