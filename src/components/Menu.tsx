import { useState, useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { X, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import "./Menu.scss";

type Variant = {
  label: string;
  price: number;
};

type MenuItem = {
  id: string;
  name: string;
  description: string;
  img: string;
  status: "Freshly Baked" | "Frozen" | "Fresh" | "Best Seller";
  // NEW: Control where the status appears. Defaults to true if omitted.
  showStatusOnCard?: boolean;
  showStatusInModal?: boolean;
  variants: Variant[];
};

type Category = {
  id: string;
  name: string;
  items: MenuItem[];
};

const CATEGORIES: Category[] = [
  {
    id: "cupcakes",
    name: "Cupcakes",
    items: [
      { 
        id: "c1", 
        name: "Classic Vanilla", 
        description: "Our signature vanilla cupcake is baked to perfection using pure Madagascar vanilla extract, resulting in a moist, fluffy sponge. Topped with a generous swirl of silky vanilla bean frosting and a delicate dusting of gold dust.",
        img: "/images/double chcoc bronie copy.jpg", 
        status: "Freshly Baked",
        showStatusOnCard: false,  // Shows on grid
        showStatusInModal: true, // Shows in popup
        variants: [
          { label: "Box of 6", price: 1200 },
          { label: "Box of 12", price: 2200 },
        ],
      },
      { 
        id: "c2", 
        name: "Double Chocolate", 
        description: "A chocolate lover's dream. This deep, rich chocolate cake is filled with a molten chocolate center and topped with a velvety dark chocolate ganache. Perfectly balanced, not too sweet, and incredibly indulgent.",
        img: "/images/carrot cupcake.webp", 
        status: "Best Seller",
        showStatusOnCard: true, // Hidden on grid
        showStatusInModal: true, // Shows in popup only
        variants: [
          { label: "Box of 6", price: 1400 },
          { label: "Box of 12", price: 2600 },
        ],
      }
    ],
  },
  {
    id: "loaves",
    name: "Loaf Cakes",
    items: [
      { 
        id: "l1", 
        name: "Banana Bread", 
        description: "Baked with ripe bananas and a touch of cinnamon, this moist banana bread is perfect for breakfast or a quick snack. Freezes beautifully for up to 2 months.",
        img: "/images/banana bread.jpg", 
        status: "Frozen",
        showStatusOnCard: true,   // Shows on grid
        showStatusInModal: false, // Hidden in popup
        variants: [
          { label: "Half Loaf", price: 800 },
          { label: "Full Loaf", price: 1500 },
        ],
      },
    ],
  },
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const { addToCart, cartCount, cartTotal, openCart, isCartOpen } = useCart();

  const menuRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleAddToCart = (item: MenuItem, variant: Variant) => {
    addToCart({
      itemId: item.id,
      name: item.name,
      boxSize: variant.label,
      price: variant.price,
      img: item.img,
    });
    setSelectedItem(null); 
  };

  return (
    <section 
      id="menu" 
      ref={menuRef}
      className={`menu section-padding ${inView ? "is-in" : ""}`}
    >
      <div className="container">
        
        <div className="menu__header">
          <p className="menu__eyebrow">Our Menu</p>
          <h2 className="menu__title">Pick your favorites.</h2>
        </div>

        <div className="menu__nav">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`menu__nav-btn ${activeCategory === cat.id ? "is-active" : ""}`}
              onClick={() => {
                setActiveCategory(cat.id);
                document.getElementById(`cat-${cat.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="menu__content">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} id={`cat-${cat.id}`} className="menu__category">
              <h3 className="menu__category-title">{cat.name}</h3>
              
              <div className="menu__grid">
                {cat.items.map((item, index) => (
                  <button 
                    key={item.id} 
                    className="menu-card"
                    style={{ "--i": index } as CSSProperties}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="menu-card__image-wrap">
                      <img 
                        src={item.img} 
                        alt={item.name} 
                        className="menu-card__image"
                        loading="lazy"
                        width={400}
                        height={400}
                      />
                      {/* Only shows if showStatusOnCard is true (or omitted) */}
                      {item.showStatusOnCard !== false && (
                        <span className="menu-card__status">{item.status}</span>
                      )}
                    </div>
                    
                    <div className="menu-card__content">
                      <h4 className="menu-card__name">{item.name}</h4>
                      <p className="menu-card__desc">{item.description}</p>
                      <div className="menu-card__price">
                        <span>From</span> Rs. {item.variants[0].price}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Floating Cart */}
      {cartCount > 0 && !isCartOpen && (
        <button className="floating-cart" onClick={openCart}>
          <div className="floating-cart__left">
            <div className="floating-cart__icon-wrap">
              <ShoppingBag size={18} />
              <span className="floating-cart__badge">{cartCount}</span>
            </div>
            <span className="floating-cart__text">View Cart</span>
          </div>
          <span className="floating-cart__total">Rs. {cartTotal}</span>
        </button>
      )}

      {/* Product Modal */}
      <div className={`product-modal ${selectedItem ? "is-open" : ""}`}>
        <div className="product-modal__overlay" onClick={() => setSelectedItem(null)} />
        
        {selectedItem && (
          <div className="product-modal__content">
            <div className="product-modal__handle" />
            
            <button className="product-modal__close" onClick={() => setSelectedItem(null)}>
              <X size={20} />
            </button>
            
            <div className="product-modal__scroll-area">
              <div className="product-modal__image-wrap">
                <img src={selectedItem.img} alt={selectedItem.name} className="product-modal__image" />
              </div>
              
              <div className="product-modal__details">
                {/* Only shows if showStatusInModal is true (or omitted) */}
                {selectedItem.showStatusInModal !== false && (
                  <p className="product-modal__eyebrow">{selectedItem.status}</p>
                )}
                <h3 className="product-modal__title">{selectedItem.name}</h3>
                <p className="product-modal__desc">{selectedItem.description}</p>
              </div>
            </div>
            
            <div className="product-modal__footer">
              <div className="product-modal__actions">
                {selectedItem.variants.map((variant, idx) => (
                  <button 
                    key={variant.label}
                    className={`product-modal__btn ${idx === 0 ? "product-modal__btn--soft" : "product-modal__btn--primary"}`}
                    onClick={() => handleAddToCart(selectedItem, variant)}
                  >
                    <span className="product-modal__btn-label">{variant.label}</span>
                    <span className="product-modal__btn-price">Rs. {variant.price}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

    </section>
  );
};

export default Menu;