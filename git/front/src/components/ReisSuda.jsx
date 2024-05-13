import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/sass/Online.sass";

export default function ReisSuda() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("http://localhost:3000/flight/suda"); // Запрос на рейсы вылета
        setFlights(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Ошибка при получении рейсов:", error);
      }
    };

    fetchFlights();
  }, []);

  const getStatus = (flightTime) => {
    const currentTime = new Date();
    const scheduledTime = new Date();
    scheduledTime.setHours(parseInt(flightTime.substring(0, 2), 10));
    scheduledTime.setMinutes(parseInt(flightTime.substring(3, 5), 10));

    if (currentTime < scheduledTime) {
      return "Ожидается";
    } else if (currentTime > scheduledTime) {
      return "Прилетел";
    }
  };

  if (loading) {
    return <li>Загрузка...</li>;
  }

  return (
    <ul>
      {Array.isArray(flights) &&
        flights.length > 0 &&
        flights.map((flight, index) => (
          <li className="panel_1_ul" key={index}>
            <h4 className="panel_1_ul_li_p panel_1_ul_li_1">{flight.time.substring(0, 5)}</h4>
            <h4 className="panel_1_ul_li_p panel_1_ul_li_2">{flight.direction}</h4>
            <h4 className="panel_1_ul_li_p panel_1_ul_li_3">{flight.aviaComp}</h4>
            <h4 className="panel_1_ul_li_p_3 panel_1_ul_li_4">{flight.terminal}</h4>
            <h4>{getStatus(flight.time)} в   {flight.time.substring(0, 5)}</h4>
          </li>
        ))}
    </ul>
  );
}
