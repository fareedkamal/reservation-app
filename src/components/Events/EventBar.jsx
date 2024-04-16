import { useState, useEffect, useContext } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { addDays, format } from "date-fns";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Payment from "../Payment";
import DateRangeIcon from "@mui/icons-material/DateRange";

const EventBar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [openPayment, setOpenPayment] = useState(false);
  const [msg, setMsg] = useState(null);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [hotel, setHotel] = useState("");
  const [hotels, setHotels] = useState([]);
  const [openHotels, setOpenHotels] = useState(false);
  const [type, setType] = useState("");
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  const getHotels = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/hotels");
      setHotels(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const showMessage = (message) => {
    setMsg(message);
    setTimeout(() => {
      setMsg(null);
    }, 2000);
  };

  const checkFields = () => {
    if (!user) {
      navigate("/login");
    }
    if (!hotel || type == "") {
      showMessage("Please select all fields.");
      return;
    }
    const rooms = document.getElementById("roomsno").value;
    const attendees = document.getElementById("attendeesno").value;
    if (rooms == "" || attendees == "") {
      showMessage("Please fill all fields for booking.");
      return;
    }
    setOpenPayment(!openPayment);
  };

  const bookEvent = async () => {
    setOpenPayment(!openPayment);
    const rooms = document.getElementById("roomsno").value;
    const attendees = document.getElementById("attendeesno").value;
    try {
      const res = await axios.post("http://localhost:3000/api/events", {
        check_in: dates[0].startDate,
        check_out: dates[0].endDate,
        hotel_name: hotel.name,
        hotel_address: hotel.address,
        type: type,
        rooms: rooms,
        attendees: attendees,
        hotel_id: hotel._id,
        user_id: user._id,
      });
      showMessage(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHotels();
  }, []);

  return (
    <>
      <div
        className="w-[300px] sm:w-[500px] md:w-[800px] lg:w-[1100px]
    px-[3em] py-[1em] m-auto bg-white rounded-xl drop-shadow-2xl relative z-10"
      >
        <div className=" flex flex-col sm:flex-row py-[1em] items-center gap-[1em]">
          <div className="flex-1">
            <div className="flex gap-2 ">
              <LocationOnOutlinedIcon sx={{ color: "#ffa48b" }} />
              <p className="text-[12px] font-medium">DESTINATION</p>
            </div>
            <TextField
              fullWidth
              variant="standard"
              placeholder="Select a hotel"
              id="hotelname"
              onClick={() => setOpenHotels(!openHotels)}
            />
            {openHotels && (
              <div
                className="w-[400px] h-[400px] bg-white 
                overflow-scroll scrollbar-none absolute z-20
                drop-shadow-2xl rounded-2xl text-[12px]"
              >
                {hotels.map((hotel) => (
                  <div
                    className="p-[1em] border-b flex justify-between items-center"
                    key={hotel._id}
                  >
                    <div>
                      <p className="font-medium">{hotel.name}</p>
                      <p>{hotel.address}</p>
                    </div>
                    <button
                      className="bg-stone-800 text-white p-[1em] rounded-full "
                      onClick={() => {
                        setHotel(hotel);
                        setOpenHotels(!openHotels);
                        const textField = document.getElementById("hotelname");
                        textField.placeholder = hotel.name;
                      }}
                    >
                      SELECT
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex-1 z-10">
            <div className="flex gap-2 items-center">
              <DateRangeIcon sx={{ color: "#ffa48b" }} />
              <p className="text-[12px] font-medium">CHECK IN</p>
            </div>
            <div
              className=" text-[25px] cursor-pointer"
              onClick={() => setOpenCalendar(!openCalendar)}
            >
              {format(dates[0].startDate, "EEE, MMMM d")} -{" "}
              {format(dates[0].endDate, "EEE, MMMM d")}
            </div>
            {openCalendar && (
              <DateRange
                className="absolute"
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                minDate={new Date()}
                ranges={dates}
                moveRangeOnFirstSelection={false}
              />
            )}
          </div>
          <FormControl className="flex-1 " required fullWidth>
            <InputLabel id="type">Event for</InputLabel>
            <Select
              id="type"
              onChange={(e) => setType(e.target.value)}
              value={type}
            >
              <MenuItem value="Wedding">Wedding</MenuItem>
              <MenuItem value="Social">Social</MenuItem>
              <MenuItem value="Business">Business</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="flex flex-col sm:flex-row gap-[1em] my-[1em]">
          <TextField
            className="flex-1"
            type="number"
            label="Guest rooms"
            placeholder="No. of rooms"
            variant="outlined"
            id="roomsno"
            required
          />
          <TextField
            className="flex-1"
            type="number"
            label="Event space"
            placeholder="No. of attendees"
            id="attendeesno"
            required
          />
          <button
            className="bg-stone-800 text-white flex-1 rounded-full text-[20px] h-[50px]"
            onClick={checkFields}
          >
            BOOK EVENT
          </button>
        </div>
        {msg && <div className="text-black text-[15px] text-center">{msg}</div>}
      </div>
      {openPayment && (
        <Payment
          close={() => setOpenPayment(!openPayment)}
          handleClick={bookEvent}
        />
      )}
    </>
  );
};

export default EventBar;
