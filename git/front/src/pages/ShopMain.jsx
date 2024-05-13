import "../assets/sass/Shop.sass";
import ShopCard from "../components/shopCard";

export default function ShopMain() {
  return (
    <main>
      <div className="container">
        <h1 className="title">Магазины</h1>
        
          <ShopCard />
        
      </div>
    </main>
  );
}
