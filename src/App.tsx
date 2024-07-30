import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apollo-client';
import Dashboard from '../src/components/dashboard';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Dashboard />
    </ApolloProvider>
  );
};

export default App;

