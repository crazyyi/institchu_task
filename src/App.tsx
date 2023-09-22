import Album from './components/Album'
import './App.css';
import { Route, Routes } from 'react-router-dom';
import AddUser from './components/AddUser';
import AfterCreated from './components/AfterCreated';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Album />} />
        <Route path='/addUser' element={<AddUser />} />
        <Route path='/afterCreated' element={<AfterCreated />} />
      </Routes>
    </div>
  );
}

export default App;
