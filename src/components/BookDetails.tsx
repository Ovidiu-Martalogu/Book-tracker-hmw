import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Book } from "./types";
import styles from './Book.module.css';


const apiUrl = `${import.meta.env.VITE_API_URL}/books`;

type Props = {

    onSetChange: (book: Book) => void;
    onDelete: (id: number) => void;
};

export function BookDetails({ onSetChange, onDelete }: Props) {
    const { id } = useParams();
    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        fetch(`${apiUrl}/${id}`)
            .then(res => res.json())
            .then(data => setBook(data));
    }, [id]);








    if (!book) return <div>Loading...</div>;

    return (
        <article className={styles.container}>
            <h1>{book.title}</h1>
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
        </article>
    );
}

