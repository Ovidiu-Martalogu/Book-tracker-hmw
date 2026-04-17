import { Link } from "react-router";
import type { Book } from "./types";

import styles from './Book.module.css';

type Props = {
    book: Book;

};


export function BookItem({ book }: Props) {
    return (
        <article className={styles.container}>
            <Link to={`books/${String(book.id)}`}>
                <h2>Title: {book.title}</h2>
                <h3>Author: {book.author}</h3>
                <h3>Status: {book.isRead ? "Read" : "Not Read"}</h3>
            </Link>
        </article>

    )
}