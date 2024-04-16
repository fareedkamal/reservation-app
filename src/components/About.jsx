import { useMediaQuery } from '@mui/material';

const AboutCard = ({ img, title }) => {
  return (
    <div
      className={` w-full h-[350px] flex items-end rounded-2xl p-[2em]`}
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.50)), url(${img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div>
        <h1 className='text-[30px] py-[1em] font-medium text-white'>{title}</h1>
        <a
          className='bg-white rounded-3xl px-[18px] py-[8px]'
          href='/reservation-app/bookevent'
        >
          Book Now
        </a>
      </div>
    </div>
  );
};

const About = () => {
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
            Where Can We Take You?
          </h1>
          <p
            className={`${
              sm ? 'text-[10px]' : md ? 'text-[15px]' : 'text-[20px]'
            } `}
          >
            Discover 30 hotel brands in 8,000+ global destinations. Planning a
            getaway? Explore our latest properties around the globe, from
            sun-warmed escapes to stylish city skyrises to intimate boutique
            retreats.
          </p>
        </div>
        <div className='flex flex-col gap-[2em]'>
          <AboutCard
            img='/event_1.jpg'
            title='Find innovative, flexible solutions that work'
          />
          <AboutCard
            img='/event_2.jpg'
            title='Bring your wedding vision to life'
          />
          <AboutCard
            img='/event_3.jpg'
            title='Explore endless ways to honor special moments'
          />
          <AboutCard
            img='/event_4.jpg'
            title='Send teams, students or families on adventures to remember'
          />
        </div>
      </div>
    </div>
  );
};

export default About;
