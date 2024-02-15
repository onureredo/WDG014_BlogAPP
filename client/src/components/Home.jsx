import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { SpinnerCircularFixed } from 'spinners-react';
import axios from 'axios';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // console.log(import.meta.env.VITE_API_URL);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/posts`
        );
        setPosts(response.data);
        setLoading(false);
        // console.log(response.data);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className='h-screen flex flex-times justify-center'>
        <SpinnerCircularFixed
          size={50}
          thickness={100}
          speed={100}
          color='rgba(57, 107, 172, 1)'
          secondaryColor='rgba(0, 0, 0, 0.44)'
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-2xl text-blue-500 h-screen flex items-center justify-center'>
        <p>Server not available, please try again later</p>
      </div>
    );
  }

  return (
    <div className='flex justify-center flex-wrap my-4'>
      {posts.map((post) => {
        const formattedDate = post.date
          ? format(new Date(post.date), 'MMM dd, yyyy @HH:mm')
          : '';
        return (
          <div
            className='lg:w-1/4 h-full m-4 border-2 border-slate-50 rounded-xl shadow-xl shadow-gray-500'
            key={post._id}
          >
            <div className='m-4 flex flex-col'>
              <h2 className='text-3xl font-semibold mb-4 text-center'>
                {post.title}
              </h2>
              <img
                className='rounded-xl my-4 h-full w-full'
                src={post.image}
                alt={post.title}
              />
              <p>{post.content}</p>
              <p className='my-4'>
                <Link className='text-blue-500 hover:underline' to='/'>
                  @{post.author ? post.author.username : 'Unknwon Author'}
                </Link>{' '}
                · {formattedDate}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
