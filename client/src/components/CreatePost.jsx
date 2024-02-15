import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SpinnerDotted } from 'spinners-react';
import axios from 'axios';

function CreatePost() {
  const [sending, setSending] = useState(false);
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    image: '',
  });

  // console.log(import.meta.env.VITE_API_URL);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/posts`,
        postData,
        { withCredentials: true }
      );
      if (response.status === 201) {
        setPostData({
          title: '',
          content: '',
          image: '',
        });
        setSending(false);
        navigate('/');
      }
    } catch (error) {
      setSending(false);
      toast.error(error.response.data.error);
    }
  };

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  if (sending) {
    return (
      <div className=''>
        <SpinnerDotted
          size={50}
          thickness={100}
          speed={100}
          color='rgba(57, 107, 172, 1)'
        />
      </div>
    );
  }

  return (
    <div className='container mx-auto max-w-md mt-20 rounded-xl shadow-xl shadow-gray-500'>
      <div className='p-4'>
        <h2 className='text-2xl font-semibold mb-4'>Create a Blog Post</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <p className='block mb-2'>Title:</p>
            <input
              type='text'
              name='title'
              value={postData.title}
              onChange={handleChange}
              className='border rounded w-full p-2'
            />
          </div>
          <div className='mb-4'>
            <p className='block mb-2'>Content:</p>
            <input
              type='text'
              name='content'
              value={postData.content}
              onChange={handleChange}
              className='border rounded w-full p-2'
            />
          </div>
          <div className='mb-4'>
            <p className='block mb-2'>Image-url:</p>
            <input
              type='text'
              name='image'
              value={postData.image}
              onChange={handleChange}
              className='border rounded w-full p-2'
            />
          </div>
          <button
            type='submit'
            className='bg-blue-500 text-white rounded p-2 mt-4'
          >
            POST
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
