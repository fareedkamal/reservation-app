import { useParams } from 'react-router-dom';
import SearchBar from '../SearchBar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import RoomItem from '../Rooms/RoomItem';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneIcon from '@mui/icons-material/Phone';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { hotelsData } from '../../data/hotelsData';
import { roomsData } from '../../data/roomsData';

const HotelHeader = ({ hotel }) => {
  return (
    <div className='bg-stone-800 w-full'>
      <div className='w-[300px] sm:w-[500px] md:w-[800px] lg:w-[1100px m-auto py-[4em] text-white'>
        <h1 className='text-[40px]'>{hotel.name}</h1>
        <div className='flex gap-[1em]'>
          <div className='flex'>
            <LocationOnOutlinedIcon />
            <p>{hotel.address}</p>
          </div>
          <div className='flex'>
            <PhoneIcon />
            <p>{hotel.phone}</p>
          </div>
          <div className='flex'>
            <ThumbUpIcon />
            <p>{hotel.rating} rating</p>
          </div>
        </div>
        <div className='mt-[1em] text-gray-300'>{hotel.description}</div>
      </div>
    </div>
  );
};

const Hotel = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState([]);
  const [rooms, setRooms] = useState([]);

  const getHotel = async () => {
    try {
      const _hotel = hotelsData.find((hotel) => hotel._id.$oid === id);
      const _rooms = roomsData.filter((room) => room.hotel_id === id);
      setHotel(_hotel);
      setRooms(_rooms);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHotel();
  }, []);

  return (
    <>
      <HotelHeader hotel={hotel} />
      <div className='bg-gray-100 w-full'>
        <div
          className='w-[300px] sm:w-[500px] md:w-[800px] lg:w-[1100px] m-auto py-[5em]
        flex flex-col gap-[5em]'
        >
          <div className='flex flex-col gap-[2em]'>
            {rooms.map((room) => (
              <RoomItem key={room._id.$oid} room={room} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hotel;
