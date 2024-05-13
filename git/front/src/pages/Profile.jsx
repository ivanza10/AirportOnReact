import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import "../assets/sass/Profile.sass";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

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
        fetchUserDetails(response.data.id);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/auth");
      }
    };

    fetchUserData();
  }, [navigate]);

  const fetchUserDetails = async (idUser) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/vipusers/${idUser}`
      );
      setUserDetails(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/vipusers/${userDetails.idUser}`
      );
      setUserDetails(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/users/logout", null, {
        withCredentials: true,
      });
      setUserData(null);
      navigate("/auth");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <main>
      <div className="container">
        <h1 className="title">Профиль</h1>
        <section className="section__profile">
          {userData ? (
            <div className="profile_data">
              <p className="profile_data_p">Имя: {userData.name}</p>
              <p className="profile_data_p">Email: {userData.email}</p>
              <p className="profile_data_p">
                Тип пользователя: {userData.user_type}
              </p>
              <button className="btn_exit" onClick={handleLogout}>
                Выйти из аккаунта
              </button>
            </div>
          ) : (
            navigate("/auth")
          )}
          <h2 className="title">Заявка на VIP-зал</h2>
          {userDetails ? (
            <>
              <div className="profile_data">
                <p className="profile_data_p">
                  Номер паспорта: {userDetails.passportNumber}
                </p>
                <p className="profile_data_p">
                  Номер телефона: {userDetails.phone}
                </p>
                <p className="profile_data_p">
                  Время: {format(
                    new Date(
                      new Date(userDetails.time).setHours(
                        new Date(userDetails.time).getHours() - 3
                      )
                    ),
                    "dd/MM/yyyy HH:mm"
                  )}
                </p>
                <button className="btn_exit" onClick={handleDeleteUser}>
                  Удалить запись
                </button>
              </div>
            </>
          ) : (
            <div className="profile_data">
              <h4>Вы пока ничего не бронировали</h4>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
