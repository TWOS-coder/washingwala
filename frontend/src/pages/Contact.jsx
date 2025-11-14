import React, { useState } from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  const [ticketData, setTicketData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketData(prev => ({ ...prev, [name]: value }));
  };

  const submitTicket = (e) => {
    e.preventDefault();
    // TODO: Implement backend submission logic here
    setTicketSubmitted(true);
    setTicketData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 select-none">
      {/* Header */}
      <h2 className="text-center text-3xl sm:text-4xl font-semibold text-gray-700 mb-12">
        CONTACT <span className="text-gray-900 font-bold">US</span>
      </h2>

      {/* Info and Image */}
      <div className="flex flex-col md:flex-row items-center gap-14 md:gap-20 text-gray-600 text-sm">
        <img
          src={assets.contact_image}
          alt="Contact Us"
          className="w-full max-w-md rounded-lg shadow-lg object-contain object-center"
          style={{ maxHeight: '360px' }}
        />

        <div className="flex flex-col justify-center items-start gap-8 md:w-2/5">
          {/* Office Info */}
          <div>
            <p className="font-semibold text-lg text-gray-700 mb-3">OUR OFFICE</p>
            <address className="not-italic space-y-3 text-gray-600 leading-relaxed">
              <p>
                Registered: 196, Part 2, Phase 2<br />
                Chaitanya City, Jabalpur (M.P.), India
              </p>
              <p>
                Corporate: 3rd Floor, JIC, Udhyog Bhawan<br />
                Katanga, Jabalpur (M.P.), India
              </p>
              <p>
                Tel: <a href="tel:+919977166001" className="underline hover:text-primary">+91-9977166001/02</a><br />
                Customer Care: <a href="mailto:support@washingwala.com" className="underline hover:text-primary">support@washingwala.com</a><br />
                Vendor Support: <a href="mailto:info@washingwala.com" className="underline hover:text-primary">info@washingwala.com</a>
              </p>
            </address>
          </div>

          {/* Vendor Section */}
          <div>
            <p className="font-semibold text-lg text-gray-700 mb-2">Join As Vendor</p>
            <p className="text-gray-600 mb-5">Learn more about our Vendor Program.</p>
            <button
              className="border border-primary text-primary px-8 py-3 rounded-full font-semibold hover:bg-primary hover:text-white transition duration-300"
              aria-label="Explore Vendor Program"
            >
              Explore More
            </button>
          </div>
        </div>
      </div>

      {/* Business Hours */}
      <div className="max-w-4xl mx-auto my-16 text-center text-gray-700 text-lg">
        <h3 className="font-semibold mb-4">BUSINESS HOURS</h3>
        <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
        <p>Sunday: Closed</p>
      </div>

      {/* Support Ticket / Feedback Form */}
      <div className="max-w-3xl mx-auto mb-20 p-8 border border-gray-300 rounded-lg">
        <h3 className="text-xl font-semibold mb-6 text-gray-700 text-center">Support Ticket / Feedback</h3>
        {ticketSubmitted && (
          <p className="text-green-600 text-center mb-4 font-medium">Thank you for your feedback. We will get back to you shortly.</p>
        )}
        <form onSubmit={submitTicket} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={ticketData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={ticketData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={ticketData.subject}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            name="message"
            placeholder="Your message"
            value={ticketData.message}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-dark transition"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Location Map */}
      <div className="max-w-7xl mx-auto mb-20 rounded-lg overflow-hidden shadow-lg h-72">
        <iframe
          title="Washing Wala Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.209759521776!2d79.93387301561607!3d23.172713084847563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398262d9bb0fc071%3A0x3f813d6236ff56e5!2sJabalpur%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1699700000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
          className="border-0"
        />
      </div>

      {/* Live Chat / Chatbot Support */}
      <ChatBot />
    </section>
  );
};

// Simple Floating ChatBot as described before
const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: 'Hi! How can I help you today?', from: 'bot' }]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input.trim(), from: 'user' }]);
    setInput('');
    setTimeout(() => {
      setMessages(msgs => [...msgs, { text: 'Thanks for your message! We will get back shortly.', from: 'bot' }]);
    }, 1500);
  };

  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-primary text-white cursor-pointer shadow-lg z-50 flex items-center justify-center w-14 h-14 select-none"
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? '✕' : '💬'}
      </div>

      {open && (
        <div className="fixed bottom-20 right-6 w-80 max-h-[400px] bg-white rounded-md shadow-lg flex flex-col overflow-hidden z-50">
          <header className="bg-primary text-white p-4 font-semibold">Chat Support</header>
          <main className="flex-1 overflow-auto p-4 space-y-3 text-gray-800">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[75%] p-2 rounded ${
                  msg.from === 'bot' ? 'bg-gray-200 self-start' : 'bg-primary-light self-end text-primary'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </main>
          <footer className="flex p-3 border-t border-gray-200 bg-gray-50">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendMessage();
              }}
              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={sendMessage}
              className="ml-3 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
              aria-label="Send message"
            >
              Send
            </button>
          </footer>
        </div>
      )}
    </>
  );
};

export default Contact;
