import "../assets/sass/footer.sass";

export default function Footer() {
  return (
    <footer>
      <div className="img_footer"></div>
      <ul className="footer_li">
        <li>
          <a href="/about" id="1" className="footer_li_a">
            ПАССАЖИРАМ
          </a>
        </li>
        <li>
          <a href="/online" id="3" className="footer_li_a">
            ОНЛАЙН ТАБЛО
          </a>
        </li>
        <li>
          <a href="/shop" id="4" className="footer_li_a">
            МАГАЗИНЫ
          </a>
        </li>
        <li>
          <a href="/kafe" id="5" className="footer_li_a last">
            КАФЕ И РЕСТОРАНЫ
          </a>
        </li>
      </ul>
    </footer>
  );
}
