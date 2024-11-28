import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Error404 from "./pages/404";
import { Provider } from 'react-redux';
import store from './redux/store';
import Register from './pages/Register';

// Moved the Provider component from Redux to wrap the entire App component.

function App() {
  return (
    <Provider store={store}> 
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/register' element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </div>
    </Provider>
  );
}

export default App;
