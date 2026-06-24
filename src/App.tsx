import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Starfield from "./components/Starfield";

import Home from "./pages/Home";
import Business from "./pages/Business";
import Influencers from "./pages/Influencers";
import Profiles from "./pages/Profiles";
import Contact from "./pages/Contact";
import Account from "./pages/Account";
import ProfileDetails from "./pages/ProfileDetails";

import "./App.css";

function App() {
  return (
    <div className="app">
      <Starfield />
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/business" element={<Business />} />
          <Route path="/influencers" element={<Influencers />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<Account />} />
          <Route path="/profiles/:id" element={<ProfileDetails />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;