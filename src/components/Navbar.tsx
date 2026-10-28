
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import "./Navbar.scss";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, openCart } = useCart();

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="navbar container">
        <Link
          to="/"
          className="navbar__brand"
          aria-label="MAFS Bakers home"
          onClick={closeMenu}
        >
<img
  src="/images/mafs1.webp"
  alt="MAFS Bakers"
  className="navbar__logo"
  fetchPriority="high" // ← ADD THIS
  width={150}          // ← Set the actual rendered size
  height={109}
/>
        </Link>

        <nav
          className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}
          aria-label="Main navigation"
        >
          <Link to="/" onClick={closeMenu}>Home</Link>
          <a href="/#menu" onClick={closeMenu}>Our Menu</a>
          <a href="/#about" onClick={closeMenu}>Our Story</a>
          <a href="/#contact" onClick={closeMenu}>Contact</a>
        </nav>

        <div className="navbar__actions">
          <a href="/#menu" className="navbar__order" onClick={closeMenu}>
            Order Now
          </a>

          <button
            type="button"
            className="navbar__cart"
            aria-label={`Shopping cart, ${cartCount} items`}
            onClick={openCart}
          >
            <ShoppingBag size={19} strokeWidth={1.8} />
            {cartCount > 0 && (
              <span className="navbar__cart-count">{cartCount}</span>
            )}
          </button>

          <button
            type="button"
            className="navbar__toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;