import { TextField } from '@mui/material';
import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      // const res = await axios.post(
      //   "http://localhost:3000/api/auth/login",
      //   values
      // );
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      navigate('/');
    } catch (err) {
      //console.log(err);
      setError(err.response.data);
    }
  };

  return (
    <div className='w-full m-auto py-[5em] flex justify-center bg-gray-100'>
      <form
        className=' border flex flex-col p-[3em] w-[50%] gap-[2em] bg-white '
        onSubmit={handleSubmit}
      >
        <TextField
          id='email'
          type='email'
          variant='outlined'
          label='Email'
          required
          onChange={handleChange}
        />
        <TextField
          id='password'
          type='password'
          variant='outlined'
          label='Password'
          required
          onChange={handleChange}
        />
        {error && (
          <div className='text-black text-[15px] text-center'>{error}</div>
        )}
        <button
          className='bg-stone-800 text-white p-[1em] rounded-full'
          type='submit'
        >
          SIGN IN
        </button>
        <a
          className='text-center cursor-pointer'
          href='/reservation-app/register'
        >
          Don't have an account? Create one.
        </a>
      </form>
    </div>
  );
};

export default LoginForm;
