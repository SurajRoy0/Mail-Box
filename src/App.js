import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './Components/Pages/SignUp';
import SignIn from './Components/Pages/SignIn';
import { useSelector } from 'react-redux';

function App() {
  const auth = useSelector(state => state.auth)
  console.log(auth)
  return (
    <Routes>
      <Route path={'/sign-up'} element={<SignUp />} />
      <Route path={'/sign-in'} element={<SignIn />} />
    </Routes>
  );
}

export default App;
