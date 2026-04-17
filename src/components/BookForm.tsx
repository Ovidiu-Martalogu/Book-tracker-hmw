import { useEffect, useState } from "react";
import type { Book } from "../components/types";
import { BookItem } from "../components/BookItem";

import styles from "../components/Book.module.css"

const apiUrl = `${import.meta.env.VITE_API_URL}/books`;


export function Books() {
    const [book, setBooks] = useState<Book[]>([]);
    const [addBook, setAddBook] = useState(false);
    const [filter, setFilter] = useState<"all" | "read" | "notRead">("all");
    const [search, setSearch] = useState("");

    const toogleaddBooks = () => {
        setAddBook(!addBook);
    };

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


    async function editBook(book: Book) {
        const update = {
            ...book, isRead: !book.isRead,
        }
        await fetch(`${apiUrl}/${book.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ isRead: update.isRead }),
        }).then((response) => response.json());

        //update

        setBooks((prev) => prev ? prev.map((key) => key.id === book.id ? update : key)
            : prev)
    }


    async function deleteBook(id: number) {

        await fetch(`${apiUrl}/${id}`, {
            method: "DELETE",
        });

        //update
        setBooks((prev) => prev ? prev.filter((key) => key.id !== id) : prev)

    }


    const filteredBook = book.filter((m) => {
        const matchesFilter =
            filter === "all" ||
            (filter === "read" && m.isRead) ||
            (filter === "notRead" && !m.isRead);


        const matchesSearch = m.title
            .toLowerCase()
            .includes(search.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    if (!book) {
        return <strong>Loading...</strong>;
    }

    return (
        <>
            <p>test</p>
            <div className={styles.displaycards}>
                {filteredBook.map((m) => (
                    <BookItem
                        key={m.id}
                        book={m}
                        onSetChange={editBook}
                        onDelete={deleteBook}
                    />
                ))}
            </div>


            {
                addBook && (
                    <form onSubmit={addBookToDB} className={styles.form}>
                        <input name="title" placeholder="Book title" />
                        <input name="author" placeholder="author" />
                        <button type="submit" className={styles.button}>
                            Add
                        </button>
                    </form>
                )
            }
            <div>
                <button onClick={toogleaddBooks} className={styles.button}>
                    {addBook ? "Back" : "Add Book"}
                </button>
            </div>
        </>
    )
}