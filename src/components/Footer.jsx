import React from 'react';

const Footer = () => {
  return (
    <div className='w-full bg-stone-900'>
      <div className='w-[300px] sm:w-[500px] md:w-[800px] lg:w-[1100px] m-auto h-[300px] sm:h-[500px] py-[5em] text-white text-[10px] md:text-[20px]'>
        <div className='w-full border-b border-white p-[1em]'>
          Top Destinations
        </div>
        <div className='w-full border-b border-white p-[1em]'>For Guests</div>
        <div className='w-full border-b border-white p-[1em]'>Our Company</div>
        <div className='w-full border-b border-white p-[1em]'>Follow us</div>
        <div className='p-[1em] text-[15px]'>
          © 2024 Fareed Kamal All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
