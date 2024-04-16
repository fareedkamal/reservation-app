import { useContext, useEffect, useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import {
  addDays,
  format,
  differenceInDays,
  isSameDay,
  areIntervalsOverlapping,
} from 'date-fns';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import Payment from '../Payment';
import { roomsData } from '../../data/roomsData';

const Room = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openPayment, setOpenPayment] = useState(null);
  const [msg, setMsg] = useState(null);
  const [bill, setBill] = useState({
    d: '',
    tc: '',
    pdc: '',
  });
  const [room, setRoom] = useState([]);
  const { user } = useContext(AuthContext);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection',
    },
  ]);

  const showMessage = (message) => {
    setMsg(message);
    setTimeout(() => {
      setMsg(null);
    }, 3000);
  };

  const getRoom = async () => {
    try {
      const res = roomsData.find((room) => room._id.$oid === id);
      //await axios.get(`http://localhost:3000/api/rooms/${id}`);
      setRoom(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoom();
  }, []);

  const reserveClick = async () => {
    if (await isDuplicateReservation()) return;
    if (isRoomUnavailable()) return;
    if (!user) {
      navigate('/login');
      return;
    }
    setBill({
      d: differenceInDays(dates[0].endDate, dates[0].startDate),
      tc: room.price * differenceInDays(dates[0].endDate, dates[0].startDate),
      pdc: room.price,
    });
    setOpenPayment(!openPayment);
  };

  const handleClick = async () => {
    if (!user) {
      navigate('/login');
    }
    const response = await axios.get(
      `http://localhost:3000/api/hotels/${room.hotel_id}`
    );
    const hotel = response.data;
    try {
      const res = await axios.post(`http://localhost:3000/api/reservations/`, {
        check_in: dates[0].startDate,
        check_out: dates[0].endDate,
        room_title: room.title,
        hotel_name: hotel.name,
        hotel_address: hotel.address,
        room_id: room._id,
        hotel_id: room.hotel_id,
        user_id: user._id,
      });
      showMessage(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const isRoomUnavailable = () => {
    for (const reservation of room.reservations) {
      const check_in = new Date(reservation.check_in);
      const check_out = new Date(reservation.check_out);
      if (
        areIntervalsOverlapping(
          { start: dates[0].startDate, end: dates[0].endDate },
          { start: check_in, end: check_out }
        )
      ) {
        showMessage(
          'Sorry for inconvenience. This room is not available on the selected dates.'
        );
        return true; // Room is unavailable for the selected dates
      }
    }
    return false;
  };

  const isDuplicateReservation = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/reservations/user/${user._id}`
      );
      const reservations = res.data;
      const duplicateReservation = reservations.find((reservation) => {
        const check_in = new Date(reservation.check_in);
        const check_out = new Date(reservation.check_out);
        return (
          reservation.room_id === room._id &&
          isSameDay(check_in, dates[0].startDate) &&
          isSameDay(check_out, dates[0].endDate)
        );
      });
      showMessage(
        'You have already made reservation for this room on the selected dates.'
      );
      return Boolean(duplicateReservation);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='bg-gray-100 w-full py-[5em] relative'>
      <div className='w-[300px] sm:w-[500px] md:w-[800px] lg:w-[1100px] m-auto bg-white'>
        <div className='flex-col md:flex-row flex items-center'>
          <img
            src={room.img}
            className='h-[200px] md:h-[400px] w-[600px] object-cover'
          />
          <div className='p-[1em] flex flex-col gap-[2em]'>
            <h1 className='text-[25px] font-medium'>{room.title}</h1>

            <div className='z-10 rounded-lg border-[1px] border-gray-400 p-[6px]'>
              <div className='flex gap-2 items-center justify-between'>
                <p className='text-[12px] font-bold'>
                  Select dates for reservation.
                </p>
              </div>
              <div
                className=' text-[25px] cursor-pointer'
                onClick={() => setOpenCalendar(!openCalendar)}
              >
                {format(dates[0].startDate, 'EEE, MMMM d')} -{' '}
                {format(dates[0].endDate, 'EEE, MMMM d')}
              </div>
              {openCalendar && (
                <DateRange
                  className='absolute rounded-lg border-[1px] border-gray-400 p-[6px]'
                  editableDateInputs={true}
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                  moveRangeOnFirstSelection={false}
                />
              )}
            </div>
            {msg && (
              <div className='text-black text-[15px] text-center'>{msg}</div>
            )}

            <button
              className='bg-stone-800 text-white p-[1em] rounded-full'
              onClick={reserveClick}
            >
              RESERVE
            </button>
          </div>
        </div>

        <div className='p-[3em]'>
          <p>{room.description}</p>
        </div>

        {openPayment && (
          <Payment
            bill={bill}
            close={() => setOpenPayment(!openPayment)}
            handleClick={() => {
              setOpenPayment(!openPayment);
              handleClick();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Room;
