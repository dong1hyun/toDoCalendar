import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AddToDos from "./Routes/AddCategory";
import Days from "./Routes/Days";
import Home from './Routes/Home';
import Months from "./Routes/Months";
import Years from "./Routes/Years";

function App() {
  return (
    <Router  basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/days/:year/:month" element={<Days />} />
        <Route path="/months/:year" element={<Months />} />
        <Route path="/years" element={<Years />} />
        <Route path="/add" element={<AddToDos />} />
      </Routes>
    </Router>
  );
}

export default App;
