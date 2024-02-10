import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UploadImagePage from "./components/UploadImagePage.js"

function App() {
  return (
    <div className="App">
      {<UploadImagePage/>}
      
    </div>
  );
}

export default App;
