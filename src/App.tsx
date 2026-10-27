
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./components/About";
import Menu from "./components/Menu";
import CartDrawer from "./components/CartDrawer";
import "./styles/global.scss";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        
        <main>
          <Home />
          <About />
          <Menu />
          <Contact/>
        </main>

        {/* The Cart Drawer sits at the root level so it can overlay everything */}
        <Footer />
        <CartDrawer />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;