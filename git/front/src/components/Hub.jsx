import "../assets/sass/hub.sass";

function Hub() {
  return (
    <div className="nav_panel">
      <nav role="navigation">
        <div id="menuToggle">
          <input aria-label="Навигационная панель" type="checkbox" />
          <span></span>
          <span></span>
          <span></span>
          <ul id="menu">
            <a href="/about">
              <li>ИНФОРМАЦИЯ ПАССАЖИРАМ</li>
            </a>
            <a href="/vip">
              <li>VIP-ЗАЛЫ</li>
            </a>
            <a href="/online">
              <li>ОНЛАЙН ТАБЛО</li>
            </a>
            <a href="/shop">
              <li>МАГАЗИНЫ</li>
            </a>
            <a href="/kafe">
              <li>КАФЕ И РЕСТОРАНЫ</li>
            </a>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Hub;
