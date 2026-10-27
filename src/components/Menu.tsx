import { useState } from "react";
import type { CSSProperties } from "react";
import { X, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import "./Menu.scss";

type MenuItem = {
  id: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  img: string;
  price6: number;
  price12: number;
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
        shortDesc: "Fluffy sponge, silky vanilla frosting.",
        longDesc: "Our signature vanilla cupcake is baked to perfection using pure Madagascar vanilla extract, resulting in a moist, fluffy sponge. Topped with a generous swirl of silky vanilla bean frosting and a delicate dusting of gold dust.",
        img: "/images/double chcoc bronie copy.jpg", 
        price6: 1200, 
        price12: 2200 
      },
      { 
        id: "c2", 
        name: "Double Chocolate", 
        shortDesc: "Rich chocolate cake, dark chocolate ganache.",
        longDesc: "A chocolate lover's dream. This deep, rich chocolate cake is filled with a molten chocolate center and topped with a velvety dark chocolate ganache. Perfectly balanced, not too sweet, and incredibly indulgent.",
        img: "/images/carrot cupcake.jpg", 
        price6: 1400, 
        price12: 2600 
      },
      { 
        id: "c2", 
        name: "Double Chocolate", 
        shortDesc: "Rich chocolate cake, dark chocolate ganache.",
        longDesc: "A chocolate lover's dream. This deep, rich chocolate cake is filled with a molten chocolate center and topped with a velvety dark chocolate ganache. Perfectly balanced, not too sweet, and incredibly indulgent.",
        img: "/images/carrot cupcake.jpg", 
        price6: 1400, 
        price12: 2600 
      }
    ],
  },
  {
    id: "cookies",
    name: "Cookies",
    items: [
      { 
        id: "k1", 
        name: "Sea Salt Brown Butter", 
        shortDesc: "Crispy edges, chewy center, flaky sea salt.",
        longDesc: "We brown the butter to give these cookies a deep, nutty flavor. They have perfectly crispy edges with a gooey, chewy center, finished with a sprinkle of flaky Maldon sea salt. The ultimate sweet and salty treat.",
        img: "/images/banana bread.jpg", 
        price6: 1000, 
        price12: 1800 
      },
    ],
  },
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  
  // Bring in cart count, total, and openCart function
  const { addToCart, cartCount, cartTotal, openCart, isCartOpen } = useCart();

  const handleAddToCart = (item: MenuItem, boxSize: "Box of 6" | "Box of 12") => {
    const price = boxSize === "Box of 6" ? item.price6 : item.price12;
    
    addToCart({
      itemId: item.id,
      name: item.name,
      boxSize,
      price,
      img: item.img,
    });
    
    setSelectedItem(null); 
  };

  return (
    <section id="menu" className="menu section-padding">
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
                    </div>
                    
                    <div className="menu-card__content">
                      <h4 className="menu-card__name">{item.name}</h4>
                      <p className="menu-card__short-desc">{item.shortDesc}</p>
                      <div className="menu-card__price">
                        <span>From</span> Rs. {item.price6}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ───────── Floating Cart Button ───────── */}
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

      {/* ───────── Premium Product Modal ───────── */}
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
                <p className="product-modal__eyebrow">Freshly Baked</p>
                <h3 className="product-modal__title">{selectedItem.name}</h3>
                <p className="product-modal__desc">{selectedItem.longDesc}</p>
              </div>
            </div>
            
            <div className="product-modal__footer">
              <div className="product-modal__actions">
                <button 
                  className="product-modal__btn product-modal__btn--soft"
                  onClick={() => handleAddToCart(selectedItem, "Box of 6")}
                >
                  <span className="product-modal__btn-label">Box of 6</span>
                  <span className="product-modal__btn-price">Rs. {selectedItem.price6}</span>
                </button>
                
                <button 
                  className="product-modal__btn product-modal__btn--primary"
                  onClick={() => handleAddToCart(selectedItem, "Box of 12")}
                >
                  <span className="product-modal__btn-label">Box of 12</span>
                  <span className="product-modal__btn-price">Rs. {selectedItem.price12}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

    </section>
  );
};

export default Menu;