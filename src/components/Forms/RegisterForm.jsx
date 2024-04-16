import { TextField } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const initial_values = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    city: '',
    country: '',
  };
  const [msg, setMsg] = useState(null);
  const [values, setValues] = useState(initial_values);

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:3000/api/auth/register',
        values
      );
      setMsg(res.data);
      setValues(initial_values);
      //navigate("/register");
    } catch (err) {
      //console.log(err);
      setMsg(err.response.data);
    }
  };

  return (
    <div className='w-full m-auto py-[5em] flex justify-center bg-gray-100'>
      <form
        className='border flex flex-col p-[3em] w-[50%] gap-[2em] bg-white'
        onSubmit={handleSubmit}
      >
        <div className='flex gap-[1em]'>
          <TextField
            id='firstName'
            type='text'
            variant='outlined'
            label='First Name'
            required
            fullWidth
            onChange={handleChange}
          />
          <TextField
            id='lastName'
            type='text'
            variant='outlined'
            label='Last Name'
            required
            fullWidth
            onChange={handleChange}
          />
        </div>
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
        <div className='flex gap-[1em]'>
          <TextField
            id='city'
            type='text'
            variant='outlined'
            label='City'
            required
            fullWidth
            onChange={handleChange}
          />
          <TextField
            id='country'
            type='text'
            variant='outlined'
            label='Country'
            required
            fullWidth
            onChange={handleChange}
          />
        </div>
        {msg && <div className='text-black text-[15px] text-center'>{msg}</div>}
        <button
          className='bg-stone-800 text-white p-[1em] rounded-full'
          type='submit'
        >
          JOIN NOW
        </button>
        <a className='text-center cursor-pointer' href='/reservation-app/login'>
          Already have an account? Sign in.
        </a>
      </form>
    </div>
  );
};

export default RegisterForm;
