import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./pages/Main";
import ShopMain from "./pages/ShopMain";
import Kafe from "./pages/Kafe";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import VipRoom from "./pages/vipRoom";
import Online from "./pages/Online";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Decorate from "./pages/Decoration";
import Admin from "./pages/Admin";
import "./assets/sass/App.sass";



function App() {

  

  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/shop" element={<ShopMain />} />
          <Route path="/kafe" element={<Kafe />} />
          <Route path="/about" element={<About />} />
          <Route path="/vip" element={<VipRoom />} />
          <Route path="/online" element={<Online />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/decorate" element={<Decorate />} />
          <Route path="/admin" element={<Admin />} />

        </Routes>
        <Footer />
      </>
    </Router>
    
  );
}

export default App;
