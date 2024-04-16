import axios from "axios";
import { format, parseISO } from "date-fns";
import { DateRange } from "react-date-range";
import { useState } from "react";
import { DeleteRounded, Edit } from "@mui/icons-material";
import { Button } from "@mui/material";

const EventItem = ({ event, handleClick }) => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [msg, setMsg] = useState(null);
  const [zindex, setZindex] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: parseISO(event.check_in),
      endDate: parseISO(event.check_out),
      key: "selection",
    },
  ]);

  const showMessage = (message) => {
    setMsg(message);
    setTimeout(() => {
      setMsg(null);
    }, 3000);
  };

  const editClick = () => {
    setZindex(!zindex);
    setOpenCalendar(!openCalendar);
    setDates([
      {
        startDate: parseISO(event.check_in),
        endDate: parseISO(event.check_out),
        key: "selection",
      },
    ]);
  };

  const updateClick = async () => {
    setZindex(!zindex);
    setOpenCalendar(!openCalendar);
    try {
      const res = await axios.put(
        `http://localhost:3000/api/events/${event._id}`,
        {
          ...event,
          check_in: dates[0].startDate,
          check_out: dates[0].endDate,
        }
      );
      showMessage(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`bg-white w-full p-[1em] rounded-2xl drop-shadow-md flex justify-between items-center text-[15px]
    ${zindex && "z-10"}`}
    >
      <div className="flex-1">
        <p className="font-bold">{event.type} Event</p>
        <p>{event.hotel_name}</p>
        <p>{event.hotel_address}</p>
      </div>

      <div className="flex-1 text-center">
        {msg && <p>{msg}</p>}
        <p className="font-bold">
          {format(dates[0].startDate, "EEE, MMMM d")}-{" "}
          {format(dates[0].endDate, "EEE, MMMM d")}
        </p>
        {openCalendar && (
          <div className="bg-white absolute drop-shadow-2xl">
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDates([item.selection])}
              minDate={new Date()}
              ranges={dates}
              moveRangeOnFirstSelection={false}
            />
            <div
              className="bg-stone-800 text-white p-[1em] text-center cursor-pointer"
              onClick={() => {
                updateClick();
              }}
            >
              UPDATE
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 flex gap-[2em] justify-end">
        <Button
          onClick={editClick}
          startIcon={<Edit sx={{ color: "black" }} />}
        />
        <Button
          onClick={handleClick}
          startIcon={<DeleteRounded sx={{ color: "black" }} />}
        />
      </div>
    </div>
  );
};

export default EventItem;
