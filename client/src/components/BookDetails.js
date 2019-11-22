import React, { useMemo, useCallback, useState } from 'react';
import { graphql } from 'react-apollo';
import { useQuery } from '@apollo/react-hooks';
import { getBookQuery } from '../queries/queries';

const BookDetails = ({ bookId }) => {
  const { loading, error, data } = useQuery(getBookQuery, {
    skip: !bookId,
    variables: { id: bookId }
  });

  let content = '';
  if (loading) content = <p>Loading...</p>;
  else if (error) content = <p>Error :(</p>;
  else if (!bookId) content = <p>No book selected</p>;
  else {
    const {
      book: { name, genre, author }
    } = data;

    const books = author.books.map(({ id, name }) => {
      return <li key={id}>{name}</li>;
    });
    content = (
      <>
        <h2>{name}</h2>
        <p>{genre}</p>
        <p>{author.name}</p>
        <p>All books by {author.name}:</p>
        <ul className="other-books">{books}</ul>
      </>
    );
  }

  return <div id="book-details">{content}</div>;
};

export default BookDetails;
