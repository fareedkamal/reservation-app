import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import EventItem from "./EventItem";
import axios from "axios";

const EventsList = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/events/user/${user._id}`
      );
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEvent = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/events/${id}`);
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="bg-gray-100 w-full">
      <div className="w-[300px] sm:w-[500px] md:w-[800px] lg:w-[1100px] m-auto py-[5em] flex flex-col gap-[1em]">
        <h1 className="font-bold text-[35px]">Your Booked Events.</h1>
        <div className="flex flex-col gap-[1em]">
          {events.map((event) => (
            <EventItem
              key={event._id}
              event={event}
              handleClick={() => deleteEvent(event._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsList;
