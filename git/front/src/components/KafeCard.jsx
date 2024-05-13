import { useState, useEffect } from "react";
import axios from "axios";
import "../assets/sass/kafeCard.sass";
import { Buffer } from "buffer";
import Pagination from "./PaginationKafe";

export default function KafeCard() {
  const [kafeData, setKafeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [kafePerPage] = useState(6);

  useEffect(() => {
    const fetchKafeData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/service/kafe");
        setKafeData(response.data);
      } catch (error) {
        console.error("Error fetching kafe data:", error);
      }
    };

    fetchKafeData();
  }, []);

  const decodeBase64Image = (base64Image) => {
    const decodedImage = Buffer.from(base64Image, "base64").toString("binary");
    return decodedImage;
  };

  const lastKafeIndex = currentPage * kafePerPage;
  const firstKafeIndex = lastKafeIndex - kafePerPage;
  const currentKafe = kafeData.slice(firstKafeIndex, lastKafeIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="cards_kafe ">
        {currentKafe.map((kafe, index) => (
          <div key={index} className="card_kafe">
            {kafe.photo &&
            kafe.photo.data &&
            typeof kafe.photo.data === "object" ? (
              <img
                className="card_kafe__img"
                src={`http://localhost:3000/${decodeBase64Image(
                  kafe.photo.data
                )}`}
                alt=""
              />
            ) : (
              <div>No image available</div>
            )}

            <div className="card_kafe_text">
              <h4>
                {kafe.name}{" "}
                <span className="card_kafe_floor">
                  <h4>Этаж: {kafe.floor}</h4>
                </span>
              </h4>

              <h4>{kafe.signature}</h4>
            </div>
          </div>
        ))}
      </div>

      <div className="paginate">
        <Pagination
          kafePerPage={kafePerPage}
          totalKafe={kafeData.length}
          paginate={paginate}
        />
      </div>
    </>
  );
}
