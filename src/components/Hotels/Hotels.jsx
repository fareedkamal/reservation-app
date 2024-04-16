import axios from 'axios';
import HotelItem from './HotelItem';
import SearchBar from '../SearchBar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { hotelsData } from '../../data/hotelsData';

const Hotels = () => {
  const [hotels, setHotels] = useState(hotelsData);
  const { input, search } = useParams();
  const [msg, setMsg] = useState(null);

  const getHotels = async () => {
    if (input) {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/hotels/search/${input}`
        );
        setHotels(res.data);
        setMsg(`${res.data.length} Hotels Found in ${input}.`);
      } catch (error) {
        setMsg(error.response.data);
      }
      return;
    }
    try {
      const res = await axios.get('http://localhost:3000/api/hotels');
      setHotels(res.data);
      setMsg(`Showing ${res.data.length} Hotels.`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //getHotels();
  }, [input]);

  return (
    <div className='w-full bg-gray-100 py-[2em]'>
      {search && <SearchBar />}
      <div className='w-[300px] sm:w-[500px] md:w-[800px] lg:w-[1100px] m-auto py-[5em] flex flex-col gap-[2em]'>
        {msg && <div className='text-center'>{msg}</div>}
        <div className='h-[800px] bg-gray-200 overflow-y-scroll scrollbar-none'>
          {hotels.map((hotel) => (
            <HotelItem key={hotel._id.$oid} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hotels;
