import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Business from "./pages/Business";
import Contact from "./pages/Contact";
import Profiles from "./pages/Profiles";
import Account from "./pages/Account";

function App() {
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/business" element={<Business />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;