import Login from './components/login';
import Register from './components/register';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const handleLogin=()=>{
    setIsLogin(true)
  };
  const handleRegister=()=>{
    setIsLogin(false)
  };

  return (
    <div>
      {isLogin? <Login/>: <Register/>}
      <div className='my-4 mx-3'>
      <Link to='/login'>
      <button type='button' className='btn btn-primary' onClick={handleLogin}>Login</button>
      </Link>
      <Link to='/register'>
      <button type='button' className='btn btn-primary mx-4' onClick={handleRegister}>Register</button>
      </Link>
      </div>
    </div>
  );
}

export default App;
