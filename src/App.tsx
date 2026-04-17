import { Route, Routes } from "react-router";
import { BookList } from "./components/BookList";
import { BookDetails } from "./components/BookDetails";
import { Books } from "./components/BookForm";




export default function App() {
  return (
    <Routes>
      <Route path="/" element={<BookList />} />
      <Route path="/books/:id" element={<BookDetails />} />
      <Route path="/book/add" element={<Books />} />
    </Routes>
  );
}
