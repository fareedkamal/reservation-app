import React, { useState } from 'react';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { TextField, useMediaQuery } from '@mui/material';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { addDays, format } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import DateRangeIcon from '@mui/icons-material/DateRange';

const SearchBar = () => {
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const navigate = useNavigate();

  const [openCalendar, setOpenCalendar] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection',
    },
  ]);

  const handleClick = (e) => {
    e.preventDefault();
    let value = document.getElementById('searchInput').value;
    value = value.replace(/\s/g, '');
    navigate(`/reservation-app/hotels`);
  };

  return (
    <div
      className='w-[300px] sm:w-[500px] md:w-[800px] lg:w-[1100px] px-[3em] py-[1em]
      m-auto bg-white rounded-xl flex flex-col md:flex-row gap-[1em] items-center
      drop-shadow-2xl relative z-10'
    >
      <div className='flex-1 w-full'>
        <div className='flex gap-2 items-center'>
          <LocationOnOutlinedIcon sx={{ color: '#ffa48b' }} />
          <p className='text-[12px] font-medium '>DESTINATION</p>
        </div>
        <form onSubmit={handleClick}>
          <TextField
            InputProps={{
              style: { fontSize: isSmallScreen ? '10px' : '25px' },
            }}
            type='search'
            fullWidth
            id='searchInput'
            variant='standard'
            placeholder='Where are you staying?'
          />
        </form>
      </div>

      <div className='flex-1 z-10 w-full'>
        <div className='flex gap-2 items-center'>
          <DateRangeIcon sx={{ color: '#ffa48b' }} />
          <p className='text-[12px] font-medium'>CHECK IN</p>
        </div>
        <div
          className=' text-[10px] md:text-[25px] cursor-pointer'
          onClick={() => setOpenCalendar(!openCalendar)}
        >
          {format(dates[0].startDate, 'EEE, MMMM d')} -{' '}
          {format(dates[0].endDate, 'EEE, MMMM d')}
        </div>
        {openCalendar && (
          <DateRange
            className='absolute'
            editableDateInputs={true}
            onChange={(item) => setDates([item.selection])}
            minDate={new Date()}
            ranges={dates}
            moveRangeOnFirstSelection={false}
          />
        )}
      </div>

      <button
        className='bg-stone-800 text-white flex-1 rounded-full text-[10px] md:text-[20px]
            h-[50px] p-[1em] md:p-[0em] w-full'
        onClick={handleClick}
      >
        Find Hotels
      </button>
    </div>
  );
};

export default SearchBar;
