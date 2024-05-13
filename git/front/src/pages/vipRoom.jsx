import VipCard from "../components/VipCard";
import '../assets/sass/VipRoom.sass'

export default function VipRoom() {
  return (
    <main>
      <div className="container">
        <h1 className="title">VIP-залы</h1>
        <div className="cards_kafe">
            <VipCard />
        </div>
      </div>
    </main>
  );
}
