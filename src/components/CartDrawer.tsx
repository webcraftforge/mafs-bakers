import { X, Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";
import "./CartDrawer.scss";

const WHATSAPP_NUMBER = "923001234567"; 

const CartDrawer = () => {
  const { cart, isCartOpen, closeCart, updateQty, cartTotal } = useCart();

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
        <div className="cart-drawer__header">
          <h3>Your Order</h3>
          <button className="cart-drawer__close" onClick={closeCart}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-drawer__items">
          {cart.length === 0 ? (
            <div className="cart-drawer__empty">
              <p>Your cart is empty.</p>
              <p>Add some treats to get started!</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.cartId} className="cart-item">
                <div className="cart-item__info">
                  <span className="cart-item__name">{item.name}</span>
                  <span className="cart-item__meta">{item.boxSize} • Rs. {item.price}</span>
                </div>
                <div className="cart-item__controls">
                  <button onClick={() => updateQty(item.cartId, -1)}>
                    <Minus size={14} />
                  </button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.cartId, 1)}>
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