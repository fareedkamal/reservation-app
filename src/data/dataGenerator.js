// import mongoose from 'mongoose';
// import Hotel from '../models/Hotel.js';
// import Room from '../models/Room.js';

// const titles = [
//     'Hyde Park View Room, Guest room, 1 King, Hyde Park view',
//     'Grand Executive City Side, Club lounge access, Guest room, 1 King',
//     'Grand Executive Park View, Club lounge access, Guest room, 1 King, Hyde Park view',
//     'Executive Suite, Club lounge access, 1 Bedroom Executive Suite, 1 King, Hyde Park view',
//     'City Side Room, Guest room, 1 King',
//     'Grand Executive Terrace, Club lounge access, Guest room, 1 King, Hyde Park view, Balcony'
// ];

// export const insertRooms = async () => {
//   try {

//     const hotels = await Hotel.find();

//     for(const hotel of hotels) {
//       // Insert 4 room objects for each hotel
//       for (let i = 1; i <= 4; i++) {
//         const room = new Room({
//             title: titles[Math.floor(Math.random() * 6)],
//             price: Math.floor(Math.random() * (1500 - 150 + 1)) + 150,
//             maxPerson: Math.floor(Math.random() * (10 - 5 + 1)) + 5,
//             description: 'Live well in our cozy guest room, offering a comfortable king bed, a large flat-panel HD TV, high-speed internet and a coffee and tea station',
//             img: `/room_${Math.floor(Math.random() * 10) + 1}.jpg`,
//             hotel_id: hotel._id
//         });
//         await room.save();
//       }
//     };

//     console.log('Rooms inserted successfully.');
//   } catch (error) {
//     console.error('Error inserting rooms:', error);
//   }
// };
