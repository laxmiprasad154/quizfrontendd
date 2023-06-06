import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Layout from './components/Layout';
import Authenticate from './components/Authenticate';
import Registration from './components/Registration';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='' element={<Authenticate/>}>
      <Route path='/' element={<Layout/>}>
      <Route path='/quiz' element={<Quiz/>}/> 
      <Route path='/result' element={<Result/>}/>
      <Route path='/register' element={<Registration/>}/>
      </Route>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
