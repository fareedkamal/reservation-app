import EventBar from './EventBar';

const EventCard = ({ title, src, desc }) => {
  return (
    <div className=' w-[300px] bg-white drop-shadow-md'>
      <img src={src} />
      <div className='p-[1em]'>
        <p className='font-medium text-[20px]'>{title}</p>
        <p className='text-[15px]'>{desc}</p>
      </div>
    </div>
  );
};

const Events = () => {
  return (
    <div className='w-full bg-gray-100 py-[2em]'>
      <EventBar />
      <div className='w-[300px] sm:w-[500px] md:w-[800px] lg:w-[1100px] m-auto py-[5em] flex flex-col gap-[5em]'>
        <div className='flex flex-col sm:flex-row gap-[1em]'>
          <EventCard
            title='Meetings & Conferences'
            src='/reservation-app/event_1.jpg'
            desc='Find innovative, flexible solutions that work.'
          />
          <EventCard
            title='Weddings'
            src='/reservation-app/event_2.jpg'
            desc='Bring your wedding vision to life.'
          />
          <EventCard
            title='Celebrations'
            src='/reservation-app/event_3.jpg'
            desc='Explore endless ways to honor special moments.'
          />
          <EventCard
            title='Group Travel'
            src='/reservation-app/event_4.jpg'
            desc='Send teams, students or families on adventures to remember.'
          />
        </div>
      </div>
    </div>
  );
};

export default Events;
