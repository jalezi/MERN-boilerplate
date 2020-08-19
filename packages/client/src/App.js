import React from 'react';
import useFetch from './hooks/useFetch';

function App() {
  const url = 'api';
  const options = {};
  const res = useFetch({ url, options });
  const { response, isLoading, error } = res;

  if (isLoading) return <div>Loading....</div>;
  if (error) {
    const { message, stack } = error;
    return (
      <div>
        ERROR:
        <p>{message}</p>
        <p>{stack}</p>
      </div>
    );
  }

  return <div>{response?.message}</div>;
}

export default App;
