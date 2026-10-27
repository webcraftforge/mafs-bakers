import { useState } from "react";
import type { FormEvent } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import "./Contact.scss";

// Replace this with your real WhatsApp number later
const WHATSAPP_NUMBER = "923001234567";

const Contact = () => {
  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Format the message for WhatsApp
    const whatsappMessage = `Hi MAFS Bakers! 👋%0A%0A*New message from your website:*%0A%0A👤 *Name:* ${form.name}%0A📞 *Contact:* ${form.contact}%0A%0A💬 *Message:*%0A${form.message}`;
    
    // Open WhatsApp in a new tab
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`, "_blank");
    
    // Show success state
    setSubmitted(true);
    setTimeout(() => {
      setForm({ name: "", contact: "", message: "" });
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact" className="contact section-padding">
      <div className="container">
        
        <div className="contact__header">
          <p className="contact__eyebrow">Get in touch</p>
          <h2 className="contact__title">Let's talk treats.</h2>
        </div>

        <div className="contact__grid">
          {/* Left Column - Info */}
          <div className="contact__info">
            <p className="contact__desc">
              Planning a birthday, a gift, or just craving something sweet? Send us a message and we'll get back to you within a few hours.
            </p>

            <ul className="contact__list">
              <li className="contact__list-item">
                <div className="contact__icon"><MapPin size={20} /></div>
                <div>
                  <span className="contact__list-label">Where we bake</span>
                  <span className="contact__list-value">Home kitchen, Johar Town, Lahore</span>
                </div>
              </li>
              
              <li className="contact__list-item">
                <div className="contact__icon"><Phone size={20} /></div>
                <div>
                  <span className="contact__list-label">WhatsApp us</span>
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="contact__list-value">+92 300 1234567</a>
                </div>
              </li>

              <li className="contact__list-item">
                <div className="contact__icon"><Mail size={20} /></div>
                <div>
                  <span className="contact__list-label">Email</span>
                  <a href="mailto:hello@mafsbakers.com" className="contact__list-value">hello@mafsbakers.com</a>
                </div>
              </li>

              <li className="contact__list-item">
                <div className="contact__icon"><Clock size={20} /></div>
                <div>
                  <span className="contact__list-label">Baking days</span>
                  <span className="contact__list-value">Mon - Sat · 10am to 8pm</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Right Column - Form */}
          <div className="contact__form-wrap">
            <form onSubmit={handleSubmit} className="contact__form">
              <div className="contact__field">
                <label htmlFor="name" className="contact__label">Name</label>
                <input 
                  id="name" 
                  type="text" 
                  required
                  className="contact__input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                />
              </div>

              <div className="contact__field">
                <label htmlFor="contact" className="contact__label">Phone or Email</label>
                <input 
                  id="contact" 
                  type="text" 
                  required
                  className="contact__input"
                  value={form.contact}
                  onChange={(e) => setForm({ ...form, contact: e.target.value })}
                  placeholder="How can we reach you?"
                />
              </div>

              <div className="contact__field">
                <label htmlFor="message" className="contact__label">Message</label>
                <textarea 
                  id="message" 
                  required
                  rows={4}
                  className="contact__input contact__textarea"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="What are you craving?"
                />
              </div>

              <button type="submit" className="btn btn--primary contact__submit">
                {submitted ? "Opening WhatsApp..." : "Send via WhatsApp"}
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;