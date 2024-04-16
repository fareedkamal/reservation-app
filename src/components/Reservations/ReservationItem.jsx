import axios from "axios";
import { areIntervalsOverlapping, format, isSameDay, parseISO } from "date-fns";
import { DateRange } from "react-date-range";
import { useState } from "react";
import Payment from "../Payment";
import { Button } from "@mui/material";
import { DeleteRounded, Edit } from "@mui/icons-material";

const ReservationItem = ({ reservation, handleClick }) => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openPayment, setOpenPayment] = useState(null);
  const [msg, setMsg] = useState(null);
  const [zindex, setZindex] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: parseISO(reservation.check_in),
      endDate: parseISO(reservation.check_out),
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
        startDate: parseISO(reservation.check_in),
        endDate: parseISO(reservation.check_out),
        key: "selection",
      },
    ]);
  };

  const isRoomUnavailable = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/rooms/${reservation.room_id}`
      );
      const room = res.data;
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
            "Sorry for inconvenience. This room is not available on the selected dates."
          );
          return true; // Room is unavailable for the selected dates
        }
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  };

  const noChanges = () => {
    if (
      isSameDay(dates[0].startDate, parseISO(reservation.check_in)) &&
      isSameDay(dates[0].endDate, parseISO(reservation.check_out))
    ) {
      showMessage("No changes made.");
      return true;
    }
    return false;
  };

  const updateClick = async () => {
    setOpenCalendar(!openCalendar);
    try {
      const res = await axios.put(
        `http://localhost:3000/api/reservations/${reservation._id}`,
        {
          ...reservation,
          check_in: dates[0].startDate,
          check_out: dates[0].endDate,
        }
      );
      showMessage(res.data);
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={`bg-white w-full p-[1em] rounded-2xl drop-shadow-md flex justify-between text-[15px] items-center ${
          zindex && "z-10"
        }`}
      >
        <div className="flex-1">
          <p className="font-bold">{reservation.room_title}</p>
          <p>{reservation.hotel_name}</p>
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
                onClick={async () => {
                  if (noChanges()) {
                    setOpenCalendar(!openCalendar);
                    return;
                  }
                  if (await isRoomUnavailable()) return;
                  setOpenPayment(!openPayment);
                }}
              >
                UPDATE
              </div>
            </div>
          )}
        </div>

        <div className="flex-1  flex gap-[2em] justify-end">
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
      {openPayment && (
        <Payment
          close={() => setOpenPayment(!openPayment)}
          handleClick={() => {
            setOpenPayment(!openPayment);
            updateClick();
          }}
        />
      )}
    </>
  );
};

export default ReservationItem;
