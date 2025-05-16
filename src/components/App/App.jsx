// import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import NotFound from "path/to/pages/NotFound";

import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App
