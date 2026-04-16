import type { Book} from "../components/types";
import styles from "../components/Book.module.css";


type Props = {
  book: Book;
  onSetChange: (book: Book) => void;
  onDelete: (id: number) => void;
};

export function BookCard({ book, onSetChange, onDelete }: Props) {
  return (
    <div className={styles.container}>
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Status: {book.isRead ? "Read" : "Not Read"}</p>

      <input
        type="checkbox"
        checked={book.isRead}
        onChange={() => onSetChange(book)}
      />

      <button className={styles.deleteButton} onClick={() => onDelete(book.id)}>
        Delete
      </button>
    </div>
  );
}