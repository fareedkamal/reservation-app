import { useMediaQuery } from '@mui/material';

const HotelCard = ({ img, title }) => {
  const md = useMediaQuery('(max-width : 900px)');
  return (
    <div
      className={`${md ? 'w-full h-[200px]' : 'h-[300px] w-[600px]'}
        flex items-end rounded-2xl p-[2em]`}
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.50)), url(${img})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div>
        <h1 className='text-[30px] font-medium text-white'>{title}</h1>
        <button className='bg-white rounded-3xl px-[18px] py-[8px]'>
          View Hotel
        </button>
      </div>
    </div>
  );
};

const Discover = () => {
  const sm = useMediaQuery('(max-width : 600px)');
  const md = useMediaQuery('(max-width : 900px)');
  return (
    <div className='w-full bg-gray-100'>
      <div className='w-[300px] sm:w-[500px] md:w-[800px] lg:w-[1100px] m-auto py-[5em]'>
        <div className='mb-[1em]'>
          <h1
            className={`${
              sm ? 'text-[15px]' : md ? 'text-[20px]' : 'text-[30px]'
            } font-medium`}
          >
            Discover Our Newest Hotels
          </h1>
          <p
            className={`${
              sm ? 'text-[10px]' : md ? 'text-[15px]' : 'text-[20px]'
            } `}
          >
            Planning a getaway? Explore our latest properties around the globe,
            from sun-warmed escapes to stylish city skyrises to intimate
            boutique retreats.
          </p>
        </div>
        <div
          className={`${
            md ? 'flex-col' : 'flex-row'
          } flex items-center gap-[1em]`}
        >
          <HotelCard
            img='/reservation-app/hotel_3.jpg'
            title='JW Marriot Masai Lodge'
          />
          <HotelCard
            img='/reservation-app/hotel_5.jpg'
            title='Moxy Brooklyn Williamsburg'
          />
        </div>
      </div>
    </div>
  );
};

export default Discover;
