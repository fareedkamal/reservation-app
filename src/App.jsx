import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Discover from "./components/Discover";
import Hero from "./components/Hero";
import RegisterForm from "./components/Forms/RegisterForm";
import LoginForm from "./components/Forms/LoginForm";
import Hotels from "./components/Hotels/Hotels";
import Hotel from "./components/Hotels/Hotel";
import Room from "./components/Rooms/Room";
import Reservations from "./components/Reservations/Reservations";
import Events from "./components/Events/Events";
import EventsList from "./components/Events/EventsList";
import About from "./components/About";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/:search/:input?" element={<Hotels />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/rooms/:id" element={<Room />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/bookevent" element={<Events />} />
        <Route path="/events" element={<EventsList />} />
      </Routes>

      <Discover />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
