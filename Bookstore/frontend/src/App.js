import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import AddBook from "./components/AddBook/AddBook";
import DeleteBook from "./components/DeleteBook/DeleteBook";
import UpdateBook from "./components/UpdateBook/UpdateBook";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/createBook" element={<AddBook />} />
        <Route path="/deleteBook/:id" element={<DeleteBook />} />
        <Route path="/updateBook/:id" element={<UpdateBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
