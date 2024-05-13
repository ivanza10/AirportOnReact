import { useState } from "react";
import axios from "axios";
import { BsArrowUpRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to handle error message
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      }, { withCredentials: true }); // Ensure cookies are sent with the request
      console.log(response.data); // Successful login response
      // Redirect to profile page upon successful login
      navigate("/profile");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        setError("Неверный email или пароль"); // Set error message for invalid credentials
      } else {
        setError("Произошла ошибка при входе."); // Set generic error message for other errors
      }
    }
  };

  return (
    <main>
      <div className="container">
        <h1 className="title">Вход</h1>
        <section className="section_form">
          <h3 className="title__form">Авторизация</h3>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form_text__div"></div>
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
          <a className="form__login" href="/auth">
            У меня нет аккаунта <BsArrowUpRight className="form__login__icon" />
          </a>
          {error && <p className="error-message">{error}</p>}
        </section>
      </div>
    </main>
  );
}
