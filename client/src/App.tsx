import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Coverpage from "./pages/Coverpage";
import MyTask from "./pages/MyTask";
import NewTask from "./pages/NewTask";
import EditTasks from "./pages/EditTasks";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Coverpage />} />
        <Route path="/tasks" element={<MyTask />} />
        <Route path="/new" element={<NewTask />} />
        <Route path="/edit" element={<EditTasks />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
