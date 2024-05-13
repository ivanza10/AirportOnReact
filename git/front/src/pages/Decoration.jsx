import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Buffer } from "buffer";
import { RiVipFill } from "react-icons/ri";
import { FaShoppingBag, FaRegAddressCard, FaWifi } from "react-icons/fa";
import "../assets/sass/Decor.sass";

export default function Decorate() {
  const [passportNumber, setPassportNumber] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [time, setTime] = useState("");
  const [vipRoomData, setVipRoomData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [isVIPBooked, setIsVIPBooked] = useState(false);
  const [error, setError] = useState(""); // Новый стейт для сообщения об ошибке
  const history = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/users/profile",
          { withCredentials: true }
        );
        setUserData(response.data);
        setFormVisible(true);
        const vipBookingResponse = await axios.get(
          "http://localhost:3000/vipusers",
          {
            params: { idUser: response.data.id },
            withCredentials: true,
          }
        );
        if (vipBookingResponse.data.length > 0) {
          setIsVIPBooked(true);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  const currentDateTime = new Date().toISOString().slice(0, 16); // Перемещаем сюда
  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentDateTime = new Date().toISOString().slice(0, 16); // Перемещаем сюда
    if (time < currentDateTime) {
      setError("Такую дату нельзя поставить, попробуйте её передвинуть на позже.");
      return;
    }
    if (!phone.startsWith("79") && !phone.startsWith("89")) {
      setError("Номер телефона должен начинаться с '79'.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:3000/vipusers", {
        passportNumber,
        phone,
        time,
        idUser: userData.id,
      });
      console.log("Form submitted successfully:", response.data);
      alert("Успешно оформлен VIP-зал!");
      setPassportNumber("");
      setPhoneNumber("");
      setTime("");
      setError(""); 
      history("/profile");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

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

  return (
    <main className="main_decor">
      <div className="container">
        <h1 className="title">Оформление комнаты</h1>
        {formVisible && userData && (
          <>
            {isVIPBooked ? (
              <>
                <h3 className="title">Вы уже формили вип зал</h3>
                <a className="a_back" href="/">
                  На главную -&gt;
                </a>
              </>
            ) : (
              <>
                {vipRoomData.map((vipRoom, index) => (
                  <div key={index} className="decor_main">
                    <div className="decor_main_left">
                      <img
                        className="decor_img"
                        src={
                          vipRoom.photo && vipRoom.photo.data
                            ? `http://localhost:3000/${decodeBase64Image(
                                vipRoom.photo.data
                              )}`
                            : "Изображение недоступно"
                        }
                        alt=""
                      />
                      <p className="decor_img_text">
                        Располагается в отдельном терминале аэропорта с
                        собственными автомобильным проездом и парковкой:
                        посетители проводят время в ожидании рейса в
                        комфортабельном зале ожидания, не пересекаясь с основным
                        пассажиропотоком. Гостям ВИП-зала предоставляется
                        персональное сопровождение от входа в терминал до
                        самолета: помощь с багажом, индивидуальная регистрация
                        на рейс, прохождение предполётного досмотра и проч.
                        <br /> <br />
                        Для проезда к ВИП-залу необходимо следовать указателям
                        «VIP-ЗОЛД».
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="vip-form">
                      {error && <p className="error-message">{error}</p>}{" "}
                      {/* Сообщение об ошибке */}
                      <div className="vip-form-group">
                        <label
                          htmlFor="passportNumber"
                          className="vip-form-label"
                        >
                          Номер паспорта:
                        </label>
                        <input
                          type="text"
                          id="passportNumber"
                          value={passportNumber}
                          onChange={(e) =>
                            setPassportNumber(e.target.value.slice(0, 10))
                          }
                          required
                          className="vip-form-input"
                          pattern="\d{10}"
                          title="Номер паспорта должен состоять из 10 цифр"
                          onKeyPress={(e) => {
                            if (!/\d/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          maxLength={10}
                          placeholder="1234567890"
                        />
                      </div>
                      <div className="vip-form-group">
                        <label htmlFor="phoneNumber" className="vip-form-label">
                          Номер телефона:
                        </label>
                        <input
                          type="tel"
                          id="phoneNumber"
                          value={phone}
                          onChange={(e) =>
                            setPhoneNumber(e.target.value.slice(0, 11))
                          }
                          required
                          className="vip-form-input"
                          pattern="[0-9]{11}"
                          title="Номер телефона должен состоять из 11 цифр, без знака '+'"
                          onKeyPress={(e) => {
                            if (!/\d/.test(e.key) || e.key === "+") {
                              e.preventDefault();
                            }
                          }}
                          maxLength={11}
                          placeholder="79XXXXXXXXX"
                        />
                      </div>
                      <div className="vip-form-group">
                        <label htmlFor="time" className="vip-form-label">
                          Время:
                        </label>
                        <input
                          type="datetime-local"
                          id="time"
                          value={time}
                          onChange={(e) => {
                            setError(""); // Очистить сообщение об ошибке при изменении
                            setTime(e.target.value);
                          }}
                          required
                          className="vip-form-input"
                          min={currentDateTime} // Минимальное значение - текущее время
                        />
                      </div>
                      <button type="submit" className="vip-form-button">
                        Отправить
                      </button>
                    </form>
                  </div>
                ))}
                <div className="decor_grid">
                  <h3 className="title">Что входит в услугу</h3>
                  <ul className="decor_grid_grid">
                    <div className="decor_grid_grid_d">
                      <RiVipFill className="decor_grid_grid_d_circl" />
                      <li>Комфортабельный зал ожидания</li>
                    </div>
                    <div className="decor_grid_grid_d">
                      <FaShoppingBag className="decor_grid_grid_d_circl" />
                      <li>
                        Персональное прохождение предполетных и постполетных
                        формальностей
                      </li>
                    </div>
                    <div className="decor_grid_grid_d">
                      <FaRegAddressCard className="decor_grid_grid_d_circl" />
                      <li>
                        Регистрация и оформление багажа непосредственно в
                        VIP-зале
                      </li>
                    </div>
                    <div className="decor_grid_grid_d">
                      <FaWifi className="decor_grid_grid_d_circl" />
                      <li>TV, Wi-Fi, пресса</li>
                    </div>
                  </ul>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
}
