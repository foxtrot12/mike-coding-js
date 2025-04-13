import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Weather from "./components/weather";
import TodoList from "./components/todoList";
import StarRating from "./components/starRating";
import Tictactoe from "./components/tictactoe";
import JobBoard from "./components/jobBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/todo" element={<TodoList />} />
        <Route path="/star" element={<StarRating />} />
        <Route path="/tictactoe" element={<Tictactoe />} />
        <Route path="/jobboard" element={<JobBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
