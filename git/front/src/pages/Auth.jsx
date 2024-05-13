import "../assets/sass/Auth.sass";
import axios from "axios";
import { useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false); // Флаг успешной регистрации
  const [error, setError] = useState(""); // Сообщение об ошибке
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/users/register",
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      ); // Убедитесь, что куки отправляются с запросом
      console.log(response.data); // Успешный ответ сервера
      setIsRegistered(true); // Установка флага успешной регистрации
      // Перенаправление на страницу профиля после успешной регистрации
      navigate("/login");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 409) {
        // Обработка конфликта уникальности email
        const errorMessage = "Пользователь с такой почтой уже зарегистрирован.";
        setError(errorMessage);
      } else {
        // Обработка остальных ошибок
        setError("Ошибка регистрации");
      }
    }
  };

  return (
    <main>
      <div className="container">
        <h1 className="title">Регистрация</h1>
        <section className="section_form">
          {isRegistered ? ( // Проверяем флаг успешной регистрации
            <div className="suc_reg">
              <h3 className="suc_reg__title">Вы успешно зарегистрированы!</h3>
              <a href="/" className="suc_reg__btn">
                На главную
              </a>
            </div>
          ) : (
            <div>
              <h3 className="title__form">Регистрация</h3>
              {error && <p className="error-message">{error}</p>}{" "}
              {/* Отображение сообщения об ошибке */}
              {/* Отображение сообщения об ошибке */}
              <form className="form" onSubmit={handleSubmit}>
                <div className="form_text__div">
                  <input
                    className="form_text form__name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Name"
                  />
                </div>
                <div className="form_text__div">
                  <input
                    className="form_text form__mail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email"
                  />
                </div>
                <div className="form_text__div">
                  <input
                    className="form_text form__pass"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Пароль"
                  />
                </div>
                <button className="form__btn" type="submit">
                  Отправить
                </button>
              </form>
              <a className="form__login" href="/login">
                У меня уже есть аккаунт{" "}
                <BsArrowUpRight className="form__login__icon" />
              </a>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
