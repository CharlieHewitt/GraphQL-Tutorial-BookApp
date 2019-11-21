import React from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

function BookList(props) {
  return (
    <div>
      <ul id="book-list">{displayBooks(props.data)}</ul>
    </div>
  );
}

function displayBooks(data) {
  if (data.loading) {
    return <div>Loading books...</div>;
  }
  return data.books.map(book => {
    return <li key={book.id}> {book.name}</li>;
  });
}

export default graphql(getBooksQuery)(BookList);
