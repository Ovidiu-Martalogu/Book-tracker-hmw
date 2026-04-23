import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Book } from "./types";
import styles from './Book.module.css';


const apiUrl = `${import.meta.env.VITE_API_URL}/books`;


export function BookDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [book, setBook] = useState<Book | null>(null);
    
    useEffect(() => {
        fetch(`${apiUrl}/${id}`)
            .then(res => res.json())
            .then(data => setBook(data));
    }, [id]);
    
    

    async function SetRead(book: Book) {
        const update = {
            ...book, isRead: !book.isRead
        }
        await fetch(`${apiUrl}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ isRead: update.isRead })
            
        }).then((response) => response.json())
        .then(data => setBook(data));
        
    }
    
    
    async function SetDelete() {
        await fetch(`${apiUrl}/${id}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then(data => setBook(data));

    }


    if (!book) return <div>Loading...</div>;

    return (
        <>
            <article className={styles.containerDetails}>

                <h1>{book.title}</h1>
                <h3>Author: {book.author}</h3>
                <div>
                    <h3>Status: {book.isRead ? "Read" : "Not Read"}</h3>
                </div>
                <div className={styles.displaycards}>
                    <label>
                        Check if is read
                        <input
                            type="checkbox"
                            checked={book.isRead}
                            onChange={() => SetRead(book)}
                        />
                    </label>
                </div>
                <button
                    className={styles.deleteButton}
                    onClick={() => {
                        SetDelete();
                        navigate("/");
                    }}
                >
                    Delete
                </button>
                <Link to="/" className={styles.cancelbutton}>Back</Link>
            </article>
        </>
    );
}

