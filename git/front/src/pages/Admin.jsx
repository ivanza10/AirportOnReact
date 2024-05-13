import { useState, useEffect } from "react";
import axios from "axios";
import Cusers from "../components/admin/Cusers";
import Cshopcard from "../components/admin/Cshopcard";
import CvipRoom from "../components/admin/CvipRoom";
import "../assets/sass/Admin.sass";

export default function Admin() {
  const [selectedContent, setSelectedContent] = useState("VIPUsers");
  const [isAdmin, setIsAdmin] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [userData, setUserData] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/users/profile",
          {
            withCredentials: true,
          }
        );
        setUserData(response.data);
        setIsAdmin(response.data.user_type === "admin");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      if (isAdmin) {
        try {
          const response = await axios.get("http://localhost:3000/users", {
            withCredentials: true,
          });
          setUsers(response.data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    };

    fetchUsers();
  }, [isAdmin]);

  const isButtonActive = (content) => selectedContent === content;

  if (!isAdmin) {
    return (
      <div className="container">
        <h2 className="title">Вы не имеете прав администратора</h2>
      </div>
    );
  }

  return (
    <main>
      <div className="container">
        <h1 className="title">Админ-панель</h1>
        <div className="admin_content">
          <div className="admin_btn">
            <button
              className={`admin_btn_card ${
                isButtonActive("VIPUsers") ? "admin_btn_card__active" : ""
              }`}
              onClick={() => setSelectedContent("VIPUsers")}
            >
              VIP-пользователи
            </button>
            <button
              className={`admin_btn_card ${
                isButtonActive("ShopCards") ? "admin_btn_card__active" : ""
              }`}
              onClick={() => setSelectedContent("ShopCards")}
            >
              Карточки магазинов/кафе
            </button>
            <button
              className={`admin_btn_card ${
                isButtonActive("VIPRoom") ? "admin_btn_card__active" : ""
              }`}
              onClick={() => setSelectedContent("VIPRoom")}
            >
              VIP-зал
            </button>
          </div>
          <div className="admin_right">
            {selectedContent === "VIPUsers" && <Cusers users={users} />}
            {selectedContent === "ShopCards" && <Cshopcard />}
            {selectedContent === "VIPRoom" && <CvipRoom />}
          </div>
        </div>
      </div>
    </main>
  );
}
