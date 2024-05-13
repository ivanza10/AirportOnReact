import { useState, useEffect } from "react";
import axios from "axios";

export default function Cusers() {
  const [vipOrders, setVipOrders] = useState([]);

  useEffect(() => {
    const fetchVipOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/vipusers");
        setVipOrders(response.data);
      } catch (error) {
        console.error("Error fetching VIP orders:", error);
      }
    };

    fetchVipOrders();
  }, []);

  function formatTime(dateTime) {
    const adjustedTime = new Date(dateTime);
    adjustedTime.setHours(adjustedTime.getHours() - 3); // Вычитаем 3 часа

    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    return new Intl.DateTimeFormat("ru-RU", options).format(adjustedTime); // Используем отформатированное время
  }

  const handleDeleteOrder = async (idUser) => {
    try {
      await axios.delete(`http://localhost:3000/vipusers/${idUser}`);
      setVipOrders(vipOrders.filter((order) => order.idUser !== idUser));
    } catch (error) {
      console.error("Error deleting VIP order:", error);
    }
  };

  return (
    <div className="admin_card">
      <h3 className="title">Заказы на VIP-залы:</h3>
      <ul>
        {vipOrders.map((order, index) => (
          <li className="admin_list" key={index}>
            <div>
              <span className="admin_list_sp">
                Пользователь: {order.idUser}
              </span>
              <span className="admin_list_sp">
                Номер паспорта: {order.passportNumber}
              </span>
              <span className="admin_list_sp">Телефон: {order.phone}</span>
              <span className="admin_list_sp">
                Время: {formatTime(new Date(order.time))}
              </span>
            </div>
            <div>
              <button
                className="btn_exit"
                onClick={() => handleDeleteOrder(order.idUser)}
              >
                Удалить
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
