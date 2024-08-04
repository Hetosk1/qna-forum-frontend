import { Routes, Route } from "react-router-dom"

import Signin from './pages/signin';
import Signup from './pages/signup';
import Questions from './pages/questions';
import Question from './pages/question';
import Answer from './pages/answer';

import { Toaster } from "react-hot-toast";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Questions/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/question" element={<Question/>}/>
        <Route path="/answer" element={<Answer/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
