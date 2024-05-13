import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./PaginateShop";
import "../assets/sass/shopCard.sass";
import { Buffer } from "buffer";

export default function ShopCard() {
  const [shopData, setShopData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [shopPerPage] = useState(6);
  const [isLargeText, setIsLargeText] = useState(false);

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/service/shop");
        setShopData(response.data);
      } catch (error) {
        console.error("Error fetching shop data:", error);
      }
    };

    fetchShopData();

    // Проверяем размер текста из localStorage
    const savedTextSize = localStorage.getItem("textSize");
    if (savedTextSize === "large") {
      setIsLargeText(true);
    }
  }, []);

  const decodeBase64Image = (base64Image) => {
    const decodedImage = Buffer.from(base64Image, "base64").toString("binary");
    return decodedImage;
  };

  const lastShopIndex = currentPage * shopPerPage;
  const firstShopIndex = lastShopIndex - shopPerPage;
  const currentShop = shopData.slice(firstShopIndex, lastShopIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className={`cards_shop ${isLargeText ? "large-text_cards_shop" : ""}`}>
        {currentShop.map((shop, index) => (
          <div key={index} className={`card_shop ${isLargeText ? "large-text" : ""}`}>
            {shop.photo && shop.photo.data && typeof shop.photo.data === "object" ? (
              <img
                className={`card_shop__img ${isLargeText ? "large-text_img" : ""}`}
                src={`http://localhost:3000/${decodeBase64Image(
                  shop.photo.data
                )}`}
                alt=""
              />
            ) : (
              <div>No image available</div>
            )}
            <div className={`card_shop_text ${isLargeText ? "large-text_card_shop_text" : ""}`}>
              <h4 id="1">
                {shop.name}{" "}
                <span className={`card_shop_floor ${isLargeText ? "large-text" : ""}`}>
                  Этаж: {shop.floor}
                </span>
              </h4>
              <h4 id="3">{shop.signature}</h4>
            </div>
          </div>
        ))}
      </div>
      <div className={`paginate ${isLargeText ? "large-text" : ""}`}>
        <Pagination
          shopPerPage={shopPerPage}
          totalshop={shopData.length}
          paginate={paginate}
        />
      </div>
    </>
  );
}
