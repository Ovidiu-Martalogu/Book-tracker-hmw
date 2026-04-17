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
                <h2>{book.title}</h2>
            </Link>
        </article>

    )
}