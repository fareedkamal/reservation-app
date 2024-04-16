import { useNavigate } from 'react-router-dom';

const RoomItem = ({ room }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    window.scrollTo(0, 0);
    navigate(`/reservation-app/rooms/${room._id.$oid}`);
  };

  return (
    <div
      className='w-full h-[80px] sm:h-[200px] bg-white rounded-lg flex overflow-hidden items-center
        drop-shadow-md justify-between
        '
    >
      <img
        src={room.img}
        className='h-full w-[100px]
            sm:w-[150px] md:w-[350px]'
      />

      <div className='p-[1em] flex flex-col gap-[1em] flex-1 '>
        <div>
          <h1
            className='text-[5px] sm:text-[10px]
                    md:text-[20px] font-medium'
          >
            {room.title}
          </h1>
          <p
            className='text-[5px]
                    sm:text-[15px] text-gray-500'
          >
            {room.description}
          </p>
        </div>
        <div>
          <div>
            <span className='font-bold text-[10px] md:text-[35px]'>
              {room.price}
            </span>
            <span className='font-bold text-[10px]'> EUR / night</span>
          </div>
        </div>
      </div>

      <button
        className='bg-stone-800 text-white px-[3em] py-[1em] m-[1em] rounded-full
            text-[5px] sm:text-[20px]'
        onClick={handleClick}
      >
        SELECT
      </button>
    </div>
  );
};
export default RoomItem;
