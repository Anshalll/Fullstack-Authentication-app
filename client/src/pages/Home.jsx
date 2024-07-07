import React, { useEffect } from 'react';
import { useGetAccessDataQuery } from '../redux/Apis/Apis';

export default function Home() {
  const { data, isLoading, error } = useGetAccessDataQuery('/');

  useEffect(() => {
    if (!isLoading) {
      console.log('Data:', data);
    }
    if (error) {
      console.error('Error:', error);
    }
  }, [data, isLoading, error]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <p>Data loaded successfully!</p>
      )}
      <div>Manish</div>
    </div>
  );
}
