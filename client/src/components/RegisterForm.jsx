import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function RegisterForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          firstName,
          lastName,
          username,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        toast.success('Successfully registered! Welcome');
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response.data.error || 'Registration failed');
    }
  };

  return (
    <div className='container mx-auto max-w-md rounded-xl shadow-xl shadow-gray-500'>
      <div className='p-4'>
        <h2 className='text-2xl font-semibold mb-4'>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <p className='block mb-2'>First Name:</p>
            <input
              type='text'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className='border rounded w-full p-2'
              required
            />
          </div>
          <div className='mb-4'>
            <p className='block mb-2'>Last Name:</p>
            <input
              type='text'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className='border rounded w-full p-2'
              required
            />
          </div>
          <div className='mb-4'>
            <p className='block mb-2'>Username:</p>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='border rounded w-full p-2'
              required
            />
          </div>
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
            <p className='block mb-2'>Password</p>
            <input
              type='password'
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
            Register
          </button>
        </form>
        <p className='mt-4'>
          Already have an account?{' '}
          <Link to='/login' className='text-blue-500 underline'>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
