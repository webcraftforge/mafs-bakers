import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, X } from "lucide-react";
import "./Footer.scss";

// All your policies in one place (edit the text here)
const POLICIES = {
  privacy: {
    title: "Privacy Policy",
    content: [
      {
        heading: "What we collect",
        text: "When you order, we collect your name, phone number, and delivery address. That's it.",
      },
      {
        heading: "How we use it",
        text: "Only to process and deliver your order. We never sell or share your data.",
      },
      {
        heading: "Your rights",
        text: "You can ask us to delete your information anytime by messaging us on WhatsApp.",
      },
    ],
  },
  refund: {
    title: "Refund Policy",
    content: [
      {
        heading: "Damaged items",
        text: "If your order arrives damaged, contact us on WhatsApp within 2 hours with a photo. We'll replace it or refund you.",
      },
      {
        heading: "Cancellations",
        text: "Cancel free up to 24 hours before delivery. Same-day cancellations may not be eligible for a full refund.",
      },
      {
        heading: "Refund processing",
        text: "Approved refunds are processed within 3-5 business days via your original payment method.",
      },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    content: [
      {
        heading: "Ordering",
        text: "Orders are only confirmed once our team replies on WhatsApp.",
      },
      {
        heading: "Lead time",
        text: "Standard orders need 24-48 hours. Custom cakes need 3-5 days notice.",
      },
      {
        heading: "Allergens",
        text: "We bake in a home kitchen that handles dairy, eggs, gluten, and nuts. Please inform us of any allergies.",
      },
    ],
  },
};

type PolicyKey = keyof typeof POLICIES;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [activePolicy, setActivePolicy] = useState<PolicyKey | null>(null);

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer__grid">
            
            <div className="footer__brand">
              <Link to="/" className="footer__logo">
                <img src="/images/mafs1.png" alt="MAFS Bakers" width={120} height={50} />
              </Link>
              <p className="footer__tagline">
                A little home kitchen in Lahore, baking treats that taste like home since 2013.
              </p>
            </div>

            <div className="footer__links">
              <h4 className="footer__heading">Explore</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><a href="/#menu">Our Menu</a></li>
                <li><a href="/#about">Our Story</a></li>
                <li><a href="/#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer__links">
              <h4 className="footer__heading">Policies</h4>
              <ul>
                <li><button type="button" onClick={() => setActivePolicy("privacy")}>Privacy Policy</button></li>
                <li><button type="button" onClick={() => setActivePolicy("refund")}>Refund Policy</button></li>
                <li><button type="button" onClick={() => setActivePolicy("terms")}>Terms & Conditions</button></li>
              </ul>
            </div>

            <div className="footer__links">
              <h4 className="footer__heading">Connect</h4>
              <div className="footer__socials">
                <a href="#" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="https://wa.me/923001234567" aria-label="WhatsApp">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                </a>
                <a href="mailto:hello@mafsbakers.com" aria-label="Email">
                  <Mail size={20} />
                </a>
              </div>
            </div>

          </div>

          <div className="footer__bottom">
            <p>© {currentYear} MAFS Bakers. All rights reserved.</p>
            <p>Baked with love from our home kitchen.</p>
          </div>
        </div>
      </footer>

      {/* ───────── Policy Modal ───────── */}
      {activePolicy && (
        <div className="policy-modal">
          <div className="policy-modal__overlay" onClick={() => setActivePolicy(null)} />
          <div className="policy-modal__content">
            <div className="policy-modal__header">
              <h2>{POLICIES[activePolicy].title}</h2>
              <button onClick={() => setActivePolicy(null)} className="policy-modal__close">
                <X size={20} />
              </button>
            </div>
            <div className="policy-modal__body">
              {POLICIES[activePolicy].content.map((section, i) => (
                <div key={i} className="policy-modal__section">
                  <h3>{section.heading}</h3>
                  <p>{section.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;