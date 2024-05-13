import { useState } from "react";
import ReisSuda from "../components/ReisSuda";
import ReisTuda from "../components/ReisTuda";
import "../assets/sass/Online.sass";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";

export default function Online() {
  const [selectedButton, setSelectedButton] = useState("suda"); // По умолчанию выбрана кнопка 'Прилет'

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <main className="online_main">
      <div className="container">
        <div className="online_buttons">
          <button
            onClick={() => handleButtonClick("suda")}
            className={`suda ${selectedButton === "suda" ? "suda_active" : ""}`}
          >
            <h2><FaPlaneArrival />Прилет</h2>
          </button>
          <button
            onClick={() => handleButtonClick("tuda")}
            className={`tuda ${selectedButton === "tuda" ? "tuda_active" : ""}`}
          >
            <h2><FaPlaneDeparture /> Вылет</h2>
          </button>
        </div>
        <div className="panel_1">
          <ul className="panel_1_ul">
            <li className="panel_1_ul_li panel_1_ul_li_1">
              Время {selectedButton === "suda" ? "прилета" : "вылета"}
            </li>
            <li className="panel_1_ul_li panel_1_ul_li_2">Направление</li>
            <li className="panel_1_ul_li panel_1_ul_li_3">Авиакомпания</li>
            <li className="panel_1_ul_li panel_1_ul_li_4">Терминал</li>
            <li className="panel_1_ul_li">Статус</li>
          </ul>
        </div>
        <div className="online_content">
          {selectedButton === "suda" ? <ReisSuda /> : <ReisTuda />}
        </div>
      </div>
    </main>
  );
}
