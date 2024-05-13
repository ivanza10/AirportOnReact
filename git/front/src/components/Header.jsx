import "../assets/sass/header.sass";
import Hub from "./Hub";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Slider from "./Slider";
import { MdAccountCircle } from "react-icons/md";
import { FaPlaneDeparture, FaEye } from "react-icons/fa";
import { CiCoffeeCup, CiCreditCard1, CiShoppingBasket } from "react-icons/ci";

export default function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const [menuVisible, setMenuVisible] = useState(false); // Состояние видимости меню
  const [zoomLevel, setZoomLevel] = useState(() => {
    // Начальное значение из localStorage
    const savedZoomLevel = localStorage.getItem("zoomLevel");
    return savedZoomLevel ? savedZoomLevel : "normal";
  });

  const toggleMenu = () => {
    setMenuVisible(!menuVisible); // Переключение видимости меню
  };

  const changeFontSize = (newZoomLevel) => {
    setZoomLevel(newZoomLevel); // Изменение состояния
    document.documentElement.setAttribute("data-zoom", newZoomLevel); // Установка атрибута на html
    localStorage.setItem("zoomLevel", newZoomLevel); // Сохранение в localStorage
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-zoom", zoomLevel); // Применение выбранного уровня при загрузке
  }, [zoomLevel]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/users/profile",
          { withCredentials: true }
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (!userData) {
      fetchUserData();
    }
  }, [userData]);

  const handleAccountClick = () => {
    if (userData) {
      navigate("/profile");
    } else {
      navigate("/auth");
    }
  };

  return (
    <header className={isHomePage ? "" : "header_second"}>
      {isHomePage && <Slider />}
      <div className="header_hight">
        <div className="header_left">
          <a href="/">
            <img
              className="header_left_photo"
              src="/photo/Airplane_thumbnail 1.png"
              alt="Главная страница"
            />
          </a>
        </div>

        <div className="header_right">
          <div className="buttons">
            <button
              title="Настройки для слабовидящих"
              className="buttons_eye"
              onClick={toggleMenu} // Переключение видимости меню
            >
              <FaEye className="buttons_item" />
            </button>

            {menuVisible && (
              <div className="font-size-popup">
                {/* Стиль для всплывающего окна */}
                <button
                  className={`font-size-option ${
                    zoomLevel === "small" ? "font-size-option_active" : ""
                  }`}
                  onClick={() => changeFontSize("small")}
                >
                  Меньше
                </button>
                <button
                  className={`font-size-option ${
                    zoomLevel === "normal" ? "font-size-option_active" : ""
                  }`}
                  onClick={() => changeFontSize("normal")}
                >
                  Обычный
                </button>
                <button
                  className={`font-size-option ${
                    zoomLevel === "large" ? "font-size-option_active" : ""
                  }`}
                  onClick={() => changeFontSize("large")}
                >
                  Больше
                </button>
              </div>
            )}

            <button
              title="Профиль"
              className="buttons_acc"
              onClick={handleAccountClick}
            >
              <MdAccountCircle className="buttons_item" />
            </button>
          </div>
          <Hub />
        </div>
      </div>
      {isHomePage && (
        <div className="container">
          <div className="header_low">
            <a
              title="Магазины"
              className="header_low_btn_a header_low_btn_a__dark"
              href="/shop"
            >
              <span className="header_low_btn">
                <CiShoppingBasket className="header_low_btn_icon" />
                Магазины
              </span>
            </a>
            <a
              aria-label="Кафе и рестораны"
              className="header_low_btn_a header_low_btn_a__dark"
              href="/kafe"
            >
              <span className="header_low_btn">
                <CiCoffeeCup className="header_low_btn_icon" />
                Кафе и рестораны
              </span>
            </a>
            <a
              aria-label="VIP и бизнес-залы"
              className="header_low_btn_a header_low_btn_a__dark"
              href="/vip"
            >
              <span className="header_low_btn">
                <CiCreditCard1 className="header_low_btn_icon" />
                VIP и бизнес-залы
              </span>
            </a>
            <div className="header_low_btn__right">
              <a href="/online">
                <span className="header_low_btn header_low_btn__dark">
                  <FaPlaneDeparture className="header_low_btn_icon header_low_btn_icon__dark" />
                  Онлайн-табло
                </span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
