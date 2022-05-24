import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './Header/Header';
import Products from './Products/Products';
import Login from './Checkout/Login';
import Checkout from './Checkout/Checkout';
// import gql from 'graphql-tag';
import Cart from './Cart/Cart';

// import ApolloClient from 'apollo-client';
import {
  ApolloClient,
  InMemoryCache,
  gql
} from "@apollo/client";
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { setContext } from 'apollo-link-Context';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = isAuthenticated;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});



const isAuthenticated = sessionStorage.getItem('token');
const cache = new InMemoryCache();
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {

  },
  typeDefs: `
   extend type Query {
   limit: Int!
   }
  `,
});
cache.writeQuery({
  query: gql`
  query Limit($limit: Int!) {
    limit
  }`,
  data: { limit: 5 },
});


const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const AppWrapper = styled.div`
  text-align: center;
`;

const App = () => (
  <ApolloProvider client={client}>
    <GlobalStyle />
    <AppWrapper>
      <Header />
      <Switch>
        <Route exact path='/' component={Products} />
        <Route path='/cart' component={Cart} />
        <Route
          path='/checkout'
          render={props =>
            isAuthenticated
              ? <Checkout />
              : <Redirect to='/login' />
          }
        />
        <Route path='/login' component={Login} />
      </Switch>
    </AppWrapper>
  </ApolloProvider>
);

export default App;
