import { useState, useEffect } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

export default function VipCard() {
  const [vipRoomData, setVipRoomData] = useState([]);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVipRoomData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/viproom");
        setVipRoomData(response.data);
      } catch (error) {
        console.error("Error fetching vip-room data:", error);
      }
    };

    fetchVipRoomData();
  }, []);

  const decodeBase64Image = (base64Image) => {
    const decodedImage = Buffer.from(base64Image, "base64").toString("binary");
    return decodedImage;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users/profile', { withCredentials: true });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Выполняем запрос только при монтировании компонента и если нет данных о пользователе
    if (!userData) {
      fetchUserData();
    }
  }, [userData]); // Указываем userData как зависимость, чтобы запрос выполнялся только при её изменении

  // Обработчик нажатия на кнопку аккаунта
  const handleAccountClick = () => {
    // Проверяем наличие данных о пользователе
    if (userData) {
      navigate("/decorate"); // Перенаправляем на страницу профиля
    } else {
      navigate("/auth"); // Перенаправляем на страницу аутентификации
    }
  };

  return (
    <ul>
      {vipRoomData.map((vipRoom, index) => (
        <button onClick={handleAccountClick} key={index} className="card_vip">
          {vipRoom.photo &&
          vipRoom.photo.data &&
          typeof vipRoom.photo.data === "object" ? (
            <img
              src={`http://localhost:3000/${decodeBase64Image(
                vipRoom.photo.data
              )}`}
              alt=""
            />
          ) : (
            <div>No image available</div>
          )}
          <div  className="card_vip_text">
            <span aria-label={`VIP-зал ${vipRoom.name}`} >{vipRoom.name}</span>
            <h4>Цена: {vipRoom.price} руб.</h4>
          </div>
        </button>
      ))}
    </ul>
  );
}
