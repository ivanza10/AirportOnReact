import { useState, useEffect } from "react";
import "../assets/sass/About.sass";
import Children from "../components/About/Children";
import Bagadge from "../components/About/Bagadge";
import Animals from "../components/About/Animals";
import Transfer from "../components/About/Transfer";

export default function About() {
  const [selectedButton, setSelectedButton] = useState("button1"); // Устанавливаем "button1" по умолчанию

  // Функция для обработки выбора кнопки
  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  // Проверяем URL-адрес при загрузке страницы
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const buttonName = hash.slice(1); // убираем символ #
      if (["button1", "button2", "button3", "button4"].includes(buttonName)) {
        setSelectedButton(buttonName);
      }
    }
  }, []); // Зависимость пуста, так как этот эффект нужно выполнить только при загрузке страницы

  return (
    <main className="About_main">
      <div className="container">
        <h1 className="title">Информация пассажирам</h1>
        <div className="content">
          <div className="btn_left">
            <button
              className={`btn_left_about ${selectedButton === "button1" ? "btn_left_about_active" : ""}`} // Добавляем класс "active" для стилизации активной кнопки
              onClick={() => handleButtonClick("button1")}
            >
              Пассажирам с детьми
            </button>
            <button
              className={`btn_left_about ${selectedButton === "button2" ? "btn_left_about_active" : ""}`}
              onClick={() => handleButtonClick("button2")}
            >
              Пассажирам с домашними животными
            </button>
            <button
              className={`btn_left_about ${selectedButton === "button3" ? "btn_left_about_active" : ""}`}
              onClick={() => handleButtonClick("button3")}
            >
              Провоз багажа и ручной клади
            </button>
            <button
              className={`btn_left_about ${selectedButton === "button4" ? "btn_left_about_active" : ""}`}
              onClick={() => handleButtonClick("button4")}
            >
              Трансферным и транзитным пассажирам
            </button>
          </div>
          <div className="content_right">
            {selectedButton === "button1" && <Children />}
            {selectedButton === "button2" && <Animals />}
            {selectedButton === "button3" && <Bagadge />}
            {selectedButton === "button4" && <Transfer />}
          </div>
        </div>
      </div>
    </main>
  );
}
