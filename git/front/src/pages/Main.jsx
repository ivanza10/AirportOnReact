import "../assets/sass/main.sass";
import { useState } from "react";
import { CiCoffeeCup, CiCreditCard1, CiShoppingBasket } from "react-icons/ci";

export default function Main() {
  const [currentImage, setCurrentImage] = useState("cat");
  const [activeButton, setActiveButton] = useState("cat"); // Устанавливаем первую кнопку активной по умолчанию

  const handleChangeImage = (imageName) => {
    setCurrentImage(imageName);
    setActiveButton(imageName); // Устанавливаем активную кнопку
  };
  return (
    <main>
      <div className="container">
        <section className="second_section">
          <h2 className="second_section_h2 h2_margin">Услуги для пассажиров</h2>
          <div className="cards">
            
            <a href="/kafe" className="card card_1">
              <span className="header_btn second_btn">
                <CiCoffeeCup className="header_low_btn_icon" />
                Кафе и рестораны
              </span>
            </a>
            <a href="/shop" className="card card_2">
              <span className="header_btn second_btn">
                <CiShoppingBasket className="header_low_btn_icon" />
                Магазины
              </span>
            </a>
            <a href="/vip" className="card card_3">
              <span className="header_btn second_btn">
                <CiCreditCard1 className="header_low_btn_icon" />
                VIP и бизнес залы
              </span>
            </a>
          </div>
        </section>
        <section className="third_section">
          <h2 className="second_section_h2 h2_margin">
            Путешествуйте с комфортом
          </h2>
          <div className="cards_info">
            <a className="cards_info_card" href="/about">
              
                <img
                  className="cards_info_card_img"
                  src="/photo/info_Child.webp"
                  alt=""
                />
              
              <span className="cards_info_card_img_text">
                Пассажирам с детьми
              </span>
            </a>
            <a className="cards_info_card" href="/about/#button2">
              
                <img
                  className="cards_info_card_img"
                  src="/photo/info_Dog.webp"
                  alt=""
                />
              
              <span className="cards_info_card_img_text">
                Пассажирам с домашними животными
              </span>
            </a>
            <a className="cards_info_card" href="/about/#button3">
              
                <img
                  className="cards_info_card_img"
                  src="/photo/info_bag.webp"
                  alt=""
                />
              
              <span className="cards_info_card_img_text">
                Провоз багажа и ручной клади
              </span>
            </a>
            <a className="cards_info_card" href="/about/#button4">
              
                <img
                  className="cards_info_card_img"
                  src="/photo/info_airplane.webp"
                  alt=""
                />
              
              <span className="cards_info_card_img_text">
                Трансферным и транзитным пассажирам
              </span>
            </a>
          </div>
        </section>

        <section className="four_section">
          <h2>Карта Аэропорта</h2>
          <div className="cats">
            <div
              className={`cats__item ${activeButton === "cat" ? "cats__item_active" : ""}`}
              onClick={() => handleChangeImage("cat")}
            >
              1 этаж
            </div>
            <div
              className={`cats__item ${
                activeButton === "cats" ? "cats__item_active" : ""
              }`}
              onClick={() => handleChangeImage("cats")}
            >
              2 этаж
            </div>
            <div
              className={`cats__item ${
                activeButton === "cat2" ? "cats__item_active" : ""
              }`}
              onClick={() => handleChangeImage("cat2")}
            >
              3 этаж
            </div>
          </div>

          <div className="second_slider">
            <div
              className={`second_slider__img ${
                currentImage === "cat" ? "second_slider__img_active" : ""
              }`}
            >
              <img
                src="/photo/1-section_airport.png"
                alt="1 этаж"
              />
            </div>
            <div
              className={`second_slider__img ${
                currentImage === "cats" ? "second_slider__img_active" : ""
              }`}
            >
              <img
                src="/photo/2-section_airport.png"
                alt="2 этаж"
              />
            </div>
            <div
              className={`second_slider__img ${
                currentImage === "cat2" ? "second_slider__img_active" : ""
              }`}
            >
              <img
                src="/photo/3-section_airport.png"
                alt="3 этаж"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
