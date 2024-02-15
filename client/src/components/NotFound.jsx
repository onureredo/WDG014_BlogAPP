import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='text-center'>
        <h1 className='text-9xl font-bold text-gray-900 mb-4'>404</h1>
        <p className='text-xl text-gray-600 mb-8'>Page Not Found</p>
        <Link to='/'>
          <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full'>
            GO BACK
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
