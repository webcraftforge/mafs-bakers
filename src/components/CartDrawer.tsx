
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import "./CartDrawer.scss";

const WHATSAPP_NUMBER = "923001234567"; 

const CartDrawer = () => {
  const { cart, isCartOpen, closeCart, updateQty, clearCart, cartTotal, cartCount } = useCart();

  const handleCheckout = () => {
    if (cart.length === 0) return;

    let message = `Hi MAFS Bakers! 👋%0A%0AI'd like to place an order:%0A%0A`;
    cart.forEach((item) => {
      message += `👉 *${item.qty}x ${item.name}* (${item.boxSize}) - Rs. ${item.price * item.qty}%0A`;
    });
    message += `%0A💰 *Total: Rs. ${cartTotal}*%0A%0AThank you!`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <div className={`cart-drawer ${isCartOpen ? "is-open" : ""}`}>
      <div className="cart-drawer__overlay" onClick={closeCart} />
      
      <div className="cart-drawer__content">
        {/* Handle for mobile */}
        <div className="cart-drawer__handle" />

        <div className="cart-drawer__header">
          <div className="cart-drawer__header-title">
            <h3>Your Order</h3>
            {cartCount > 0 && (
              <span className="cart-drawer__count">{cartCount} item{cartCount > 1 ? "s" : ""}</span>
            )}
          </div>
          <div className="cart-drawer__header-actions">
            {cart.length > 0 && (
              <button 
                className="cart-drawer__clear" 
                onClick={clearCart}
                aria-label="Clear all items"
              >
                <Trash2 size={16} />
                <span>Clear</span>
              </button>
            )}
            <button className="cart-drawer__close" onClick={closeCart} aria-label="Close cart">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="cart-drawer__items">
          {cart.length === 0 ? (
            <div className="cart-drawer__empty">
              <div className="cart-drawer__empty-icon">
                <ShoppingBag size={32} strokeWidth={1.5} />
              </div>
              <p className="cart-drawer__empty-title">Your cart is empty</p>
              <p className="cart-drawer__empty-text">Add some delicious treats to get started.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.cartId} className="cart-item">
                {/* Image thumbnail */}
                <div className="cart-item__image-wrap">
                  {item.img ? (
                    <img src={item.img} alt={item.name} className="cart-item__image" />
                  ) : (
                    <div className="cart-item__image-placeholder" />
                  )}
                </div>

                {/* Info */}
                <div className="cart-item__info">
                  <span className="cart-item__name">{item.name}</span>
                  <span className="cart-item__meta">{item.boxSize}</span>
                  <span className="cart-item__line-total">Rs. {item.price * item.qty}</span>
                </div>

                {/* Controls */}
                <div className="cart-item__controls">
                  <button onClick={() => updateQty(item.cartId, -1)} aria-label="Decrease quantity">
                    <Minus size={14} />
                  </button>
                  <span key={item.qty} className="cart-item__qty">
                    {item.qty}
                  </span>
                  <button onClick={() => updateQty(item.cartId, 1)} aria-label="Increase quantity">
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-drawer__footer">
          <div className="cart-drawer__total">
            <span>Total</span>
            <span>Rs. {cartTotal}</span>
          </div>
          <button 
            className="btn btn--primary cart-drawer__checkout" 
            onClick={handleCheckout}
            disabled={cart.length === 0}
          >
            Checkout via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;