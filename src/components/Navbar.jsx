import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LuggageOutlinedIcon from '@mui/icons-material/LuggageOutlined';
import EventIcon from '@mui/icons-material/Event';

const LoginButton = () => {
  const navigate = useNavigate();
  return (
    <div className='flex items-center gap-2'>
      <PersonOutlineOutlinedIcon />
      <h1
        className='hover:border-b-2 border-black text-[15px] cursor-pointer'
        onClick={() => navigate('/reservation-app/login')}
      >
        Sign in
      </h1>
      <h1 className='text-[15px]'>or</h1>
      <h1
        className='hover:border-b-2 border-black text-[15px] cursor-pointer'
        onClick={() => navigate('/reservation-app/register')}
      >
        Join
      </h1>
    </div>
  );
};

const LogoutButton = ({ username, dispatch }) => {
  const navigate = useNavigate();

  const logOut = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className='flex items-center gap-[1em] text-[15px] whitespace-nowrap'>
      <div
        className='flex gap-2 cursor-pointer'
        onClick={() => navigate('/events')}
      >
        <EventIcon fontSize='small' />
        <h1 className='hidden sm:block'>Booked Events</h1>
      </div>

      <div
        className='flex gap-2 cursor-pointer'
        onClick={() => navigate('/reservations')}
      >
        <LuggageOutlinedIcon fontSize='small' />
        <h1 className=' hidden sm:block'>My Reservations</h1>
      </div>

      <div className='flex gap-2'>
        <PersonOutlineOutlinedIcon fontSize='small' />
        <h1 className='hidden sm:block'>{username}</h1>
        <h1
          className='text-[10px] sm:text-[15px] cursor-pointer '
          onClick={logOut}
        >
          Sign out
        </h1>
      </div>
    </div>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const navlink =
    'hover:border-b-2 border-black cursor-pointer text-[15px] h-[25px]';
  return (
    <div className='w-[300px] sm:w-[500px] md:w-[800px] lg:w-[1100px] m-auto p-[1em]'>
      <div className='flex justify-between'>
        <a
          className='text-[15px] md:text-[25px] font-bold cursor-pointer'
          href='/'
        >
          Sapphire Hotels
        </a>
        {user ? (
          <LogoutButton username={user.firstName} dispatch={dispatch} />
        ) : (
          <LoginButton />
        )}
      </div>

      <div className=' justify-center gap-[2em] hidden md:flex'>
        <div
          className={navlink}
          onClick={() => navigate('/reservation-app/search/')}
        >
          Find & Reserve
        </div>
        <div
          className={navlink}
          onClick={() => navigate('/reservation-app/aboutus')}
        >
          Our Services
        </div>
        <div
          className={navlink}
          onClick={() => navigate('/reservation-app/hotels')}
        >
          Our Hotels
        </div>
        <div
          className={navlink}
          onClick={() => navigate('/reservation-app/bookevent')}
        >
          Meetings & Events
        </div>
      </div>
    </div>
  );
};

export default Navbar;
