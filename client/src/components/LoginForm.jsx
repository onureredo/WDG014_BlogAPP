import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import axios from 'axios';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setIsLoggedIn, checkUser } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        navigate('/');
        setIsLoggedIn(true);
        checkUser();
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className='container mt-20 mx-auto max-w-md rounded-xl shadow-xl shadow-gray-500'>
      <div className='p-4'>
        <h2 className='text-2xl font-semibold mb-4'>Login</h2>
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <p className='block mb-2'>Email:</p>
            <input
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='border rounded w-full p-2'
              required
            />
          </div>
          <div className='mb-4'>
            <p className='block mb-2'>Password:</p>
            <input
              type='text'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='border rounded w-full p-2'
              required
            />
          </div>
          <button
            type='submit'
            className='bg-blue-500 text-white rounded p-2 mt-2'
          >
            Login
          </button>
          <p className='mt-4'>
            Not registered yet?{' '}
            <Link to='/register' className='text-blue-500 underline'>
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
