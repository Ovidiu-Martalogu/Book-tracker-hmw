import { useEffect, useState } from "react";
import type { Book } from "../components/types";


const apiUrl = `${import.meta.env.VITE_API_URL}/books`;


export function Books() {
    const [book, setBooks] = useState<Book[]>([]);
    const [addBook, setAddBook] = useState(false);

    const toogleaddBooks = () => {
        setAddBook(!addBook);
    };

    useEffect(() => {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => setBooks(data));

    }, []);



    return (
        <>
            <p>test</p>
            <div>
                {book.map((m) => (
                    <ul>
                        <li>key={m.id}</li>
                        <li>title={m.title}</li>
                        <li>author={m.author}</li>
                        <li>read status={m.isRead}</li>


                    </ul>
                )
                )}
            </div>
        </>
    )
}