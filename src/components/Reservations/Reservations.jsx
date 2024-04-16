import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import ReservationItem from "./ReservationItem";
import axios from "axios";

const Reservations = () => {
  const { user } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);

  const getReservations = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/reservations/user/${user._id}`
      );
      setReservations(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteReservation = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/reservations/${id}`
      );
      setReservations((prevReservations) =>
        prevReservations.filter((reservation) => reservation._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReservations();
  }, []);

  return (
    <div className="bg-gray-100 w-full">
      <div className="w-[300px] sm:w-[500px] md:w-[800px] lg:w-[1100px] m-auto py-[5em] flex flex-col gap-[1em]">
        <h1 className="font-bold text-[35px]">Your Reservations.</h1>
        {reservations.map((reservation) => (
          <ReservationItem
            key={reservation._id}
            reservation={reservation}
            handleClick={() => deleteReservation(reservation._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Reservations;
