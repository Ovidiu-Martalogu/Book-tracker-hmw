import type { Book } from "../components/types";
import styles from "../components/Book.module.css";

import { BookItem } from "../components/BookItem";
import { useEffect, useState } from "react";
import { Link } from "react-router";


const apiUrl = `${import.meta.env.VITE_API_URL}/books`;



export function BookList() {

  const [books, setBooks] = useState<Book[] | null>(null)


  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);

      })
  }, []);

  if (!books) return <strong>Loading...</strong>;

  return (
    <article className={styles.displaycards}>
      <h1>Books</h1>
      {!books && <strong>Loading ...</strong>}

      {books?.map((b) => (
        <BookItem
          key={b.id}
          book={b}
         
        />
      ))}

      {books && <Link to="/book/add" className={styles.addButton}>Add New Book</Link>}

    </article>



  )


}




// type Props = {
//   book: Book;
//   onSetChange: (book: Book) => void;
//   onDelete: (id: number) => void;
// };

// export function BookCard({ book, onSetChange, onDelete }: Props) {
//   return (
//     <div className={styles.container}>
//       <h2>{book.title}</h2>
//       <p>Author: {book.author}</p>
//       <p>Status: {book.isRead ? "Read" : "Not Read"}</p>

//       <input
//         type="checkbox"
//         checked={book.isRead}
//         onChange={() => onSetChange(book)}
//       />

//       <button className={styles.deleteButton} onClick={() => onDelete(book.id)}>
//         Delete
//       </button>
//     </div>
//   );
// }