import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import AddBook from "./components/AddBook/AddBook";
import DeleteBook from "./components/DeleteBook/DeleteBook";
import UpdateBook from "./components/UpdateBook/UpdateBook";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/createBook" element={<AddBook />} />
        <Route path="/deleteBook/:id" element={<DeleteBook />} />
        <Route path="/updateBook/:id" element={<UpdateBook />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
