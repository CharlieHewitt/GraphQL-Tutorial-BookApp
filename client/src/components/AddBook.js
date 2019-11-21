import React, { useMemo, useCallback, useState } from 'react';
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from '../queries/queries';
import { useQuery, useMutation } from '@apollo/react-hooks';

const getOptions = (loading, error, data) => {
  if (loading) {
    return <option disabled>Loading Authors...</option>;
  } else if (error) {
    return <option disabled>Error loading Authors</option>;
  } else {
    return data.authors.map(({ name, id }) => {
      return (
        <option key={id} value={id}>
          {name}
        </option>
      );
    });
  }
};

const AddBook = () => {
  const { loading, error, data } = useQuery(getAuthorsQuery);

  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [author, setAuthor] = useState('');

  const [addBook] = useMutation(addBookMutation);

  const options = useMemo(() => getOptions(loading, error, data), [
    loading,
    error,
    data
  ]);

  const nameCB = useCallback(e => setName(e.target.value), []);
  const genreCB = useCallback(e => setGenre(e.target.value), []);
  const authorCB = useCallback(e => setAuthor(e.target.value), []);
  const addCB = useCallback(
    e => {
      e.preventDefault();
      addBook({
        variables: {
          name: name,
          genre: genre,
          authorId: author
        },
        refetchQueries: [{ query: getBooksQuery }]
      }).then(res => console.log(res));
      console.log(`name: ${name}, genre: ${genre}, author: ${author} `);
    },
    [name, genre, author]
  );

  return (
    <form id="add-book" onSubmit={addCB}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={nameCB} />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={genreCB} />
      </div>

      <div className="field">
        <label>Author:</label>
        <select onChange={authorCB}>
          <option>Select Author</option>
          {options}
        </select>
      </div>

      <button>+</button>
    </form>
  );
};

export default AddBook;
// import { React, useState } from 'react';
// import { graphql } from 'react-apollo';
// import { getAuthorsQuery } from '../queries/queries';

// function AddBook(props) {
//   const [name, setName] = useState('');
//   const [genre, setGenre] = useState('');
//   const [authorId, setAuthorId] = useState('');

//   return (
//     <form id="add-book">
//       <div className="field">
//         <label>Book name:</label>
//         <input type="text" onChange={e => setName(e.target.value)} />
//       </div>

//       <div className="field">
//         <label>Genre:</label>
//         <input type="text" onChange={e => setGenre(e.target.value)} />
//       </div>
//       <div className="field">
//         <label>Author:</label>
//         <select onChange={e => setAuthorId(e.target.value)}>
//           <option>Select author</option>
//           {displayAuthors(props.data)}
//         </select>
//       </div>

//       <button>+</button>
//     </form>
//   );
// }

// function displayAuthors(data) {
//   if (data.loading) {
//     return <option disabled>Loading Authors ...</option>;
//   }

//   return data.authors.map(author => {
//     return (
//       <option key={author.id} value={author.id}>
//         {author.name}
//       </option>
//     );
//   });
// }

// export default graphql(getAuthorsQuery)(AddBook);
