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
    <>
      <h1>Books</h1>
      <div className={styles.displaycards}>
        {!books && <strong>Loading ...</strong>}

        {books?.map((b) => (
          <BookItem
            key={b.id}
            book={b}

          />
        ))}

      </div>
        {books && <Link to="/book/add" className={styles.addButton}>Add New Book</Link>}

    </>



  )


}


