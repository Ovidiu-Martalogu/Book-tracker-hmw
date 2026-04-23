import { useEffect, useState } from "react";
import type { Book } from "../components/types";
import { Link } from "react-router";


import styles from "../components/Book.module.css"

const apiUrl = `${import.meta.env.VITE_API_URL}/books`;


export function Books() {
    const [book, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => setBooks(data));

    }, []);



    async function addBookToDB(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!book) return;

        const form = e.target;
        const data = new FormData(form);
        const title = data.get("title");
        const author = data.get("author");


        const newBook = await fetch(apiUrl,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, author, isRead: false }),
            }).then((response) => response.json());

        setBooks([...book, newBook])

    }
    return (
        <>
            <div className={styles.containerDetails}>
                <h1>Add new Book</h1>

                <form onSubmit={addBookToDB} className={styles.form}>


                    <label htmlFor="title">Insert book title

                        <input type="text" name="title" placeholder="Book title" />
                    </label>
                    <label htmlFor="author">Insert author title

                        <input name="author" placeholder="author" />
                    </label>

                    <button type="submit" className={styles.button}>
                        Add


                    </button>

                </form>
<div>

                <Link to="/" className={styles.cancelbutton}>Cancel</Link>

                <Link to="/" className={styles.cancelbutton} >Back
                </Link>
</div>
            </div>


        </>
    )
}