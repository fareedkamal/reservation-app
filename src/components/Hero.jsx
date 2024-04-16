import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div
      className='w-full h-auto lg:h-[100vh]'
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)), url(/reservation-app/hotel_${
          Math.floor(Math.random() * 10) + 1
        }.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className='w-[300px] sm:w-[500px] md:w-[800px] lg:w-[1100px] m-auto pt-[3em]'>
        <SearchBar />
        <div className='flex flex-col gap-[1em] items-start mt-[1em] md:mt-[5em] pb-[2em]'>
          <h1 className='text-white font-medium  text-[15px]  md:text-[40px]'>
            15% off for 3 Days Booking
          </h1>
          <p className='text-white text-[15px] md:text-[25px]'>
            Enjoy your Exclusive Offer.
          </p>
          <button
            className='bg-white rounded-full py-[1em] px-[2em] text-[10px] md:text-[15px]'
            onClick={() => navigate('/reservation-app/hotels')}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
