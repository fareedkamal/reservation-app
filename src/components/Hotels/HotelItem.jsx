import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HotelItem = ({ hotel }) => {
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const navigate = useNavigate();
  const handleClick = () => {
    window.scrollTo(0, 0);
    console.log(hotel);
    navigate(`/reservation-app/hotels/${hotel._id.$oid}`);
  };

  return (
    <div
      className={`w-full bg-white rounded-lg flex overflow-hidden
         items-center drop-shadow-md mb-[2em]
         ${isSmallScreen ? 'h-[80px]' : 'h-[200px]'}
         `}
    >
      <img
        src={hotel.img}
        className='h-full w-[100px] sm:w-[150px] md:w-[350px]'
      />

      <div className='p-[1em] flex flex-col gap-[1em] justify-center flex-1 '>
        <div>
          <h1 className='text-[5px] sm:text-[10px] md:text-[20px] font-medium'>
            {hotel.name}
          </h1>
          <p className='text-[5px] sm:text-[10px] md:text-[15px]'>
            {hotel.address}
          </p>

          <div
            className=' gap-[2px] items-center text-[12px]
                    hidden md:flex'
          >
            {Array(hotel.rating)
              .fill()
              .map((_, index) => (
                <div
                  key={index}
                  className='bg-amber-500 rounded-full w-[8px] h-[8px]'
                />
              ))}
            {hotel.rating} rating
          </div>

          <p className='text-[12px] text-gray-500 hidden md:block'>
            {hotel.description}
          </p>
        </div>
        <div>
          <p className='text-[10px]'>From</p>
          <div>
            <span className='font-bold text-[10px] md:text-[35px]'>
              {hotel.price}
            </span>
            <span className='font-bold text-[5px] md:text-[10px]'>
              {' '}
              EUR / night
            </span>
          </div>
        </div>
      </div>

      <button
        className={`bg-stone-800 text-white px-[3em] py-[1em] m-[1em] rounded-full
            text-[5px] sm:text-[10px] md:text-[15px]`}
        onClick={handleClick}
      >
        BOOK NOW
      </button>
    </div>
  );
};
export default HotelItem;
