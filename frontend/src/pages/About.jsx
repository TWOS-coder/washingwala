import React, { useState } from 'react';
import { assets } from '../assets/assets';

// Sample data for added sections
const testimonials = [
  {
    name: 'Rajesh Kumar',
    feedback: 'Washing Wala transformed my car care routine! Convenient, eco-friendly & professional.',
    city: 'Mumbai',
  },
  {
    name: 'Sneha Patel',
    feedback: 'Excellent doorstep service with friendly staff and spotless results every time.',
    city: 'Pune',
  },
  {
    name: 'Amit Singh',
    feedback: 'Highly recommend for busy professionals. Saves time and keeps my car looking new.',
    city: 'Bengaluru',
  },
];

const faqs = [
  {
    question: 'What products do you use for car washing?',
    answer:
      'We use eco-friendly, biodegradable cleaning products that are safe for your vehicle and the environment.',
  },
  {
    question: 'Can I schedule a wash outside of regular hours?',
    answer: 'Yes! Our flexible scheduling allows bookings early mornings, evenings, and weekends.',
  },
  {
    question: 'What if I am not satisfied with the service?',
    answer:
      'Customer satisfaction is our priority. We offer a complimentary rewash or refund if you are not happy with the service.',
  },
];

const teamMembers = [
  { name: 'Rahul Sharma', role: 'Founder & CEO', image: assets.team1 },
  { name: 'Priya Verma', role: 'Operations Manager', image: assets.team2 },
  { name: 'Anil Mehta', role: 'Lead Technician', image: assets.team3 },
];

const howItWorksSteps = [
  { step: '1', title: 'Book Online', desc: 'Choose your service and schedule with a few taps.' },
  { step: '2', title: 'Expert Arrival', desc: 'Our trained pros come equipped to your doorstep.' },
  { step: '3', title: 'Spotless Car', desc: 'Enjoy a pristine car without stepping out.' },
];

// --- Simple floating ChatBot component ---
const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hi! How can I help you today?', from: 'bot' },
  ]);
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
        aria-label={open ? "Close chat" : "Open chat"}
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
              onKeyDown={e => (e.key === 'Enter' ? sendMessage() : null)}
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

// --- Main About Component ---
const About = () => {
  return (
    <main className="max-w-7xl mx-auto px-6 md:px-10 py-16 text-gray-800 select-none">
      {/* About Us Header */}
      <h2 className="text-center text-3xl sm:text-4xl font-semibold mb-12 text-gray-700">
        ABOUT <span className="text-gray-900">US</span>
      </h2>

      {/* Introduction Section */}
      <section className="flex flex-col md:flex-row items-center gap-12 mb-20">
        <img
          src={assets.about_image}
          alt="Washing Wala service"
          className="w-full max-w-md rounded-lg shadow-lg object-contain object-center"
          style={{ maxHeight: '360px' }}
        />
        <div className="md:w-2/4 space-y-6 text-base leading-relaxed text-gray-600">
          <p>
            Welcome to Washing Wala, your trusted partner in managing your car washing needs conveniently and efficiently. With easy online booking, trained professionals arrive with eco-friendly products to clean your vehicle at your doorstep.
          </p>
          <p>
            Whether you need a quick wash or thorough detailing, Washing Wala saves your time with water-saving methods and flexible scheduling tailored to your busy life.
          </p>
          <h3 className="font-bold text-gray-900 text-lg mt-4">Our Vision</h3>
          <p>
            To be the most trusted and convenient doorstep car wash service delivering exceptional quality and eco-friendly care for every vehicle owner.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mb-20">
        <h3 className="text-2xl font-semibold mb-8 text-center text-gray-700">
          WHY <span className="text-gray-900">CHOOSE US</span>
        </h3>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 text-gray-700">
          {[
            {
              title: 'EFFICIENCY',
              description:
                'Delivering fast, high-quality car wash services using optimized scheduling, expert staff, and eco-friendly methods.',
            },
            {
              title: 'CONVENIENCE',
              description:
                'Effortless booking and doorstep service, allowing you to get your car professionally cleaned without leaving your home or office.',
            },
            {
              title: 'PERSONALIZATION',
              description:
                'Tailoring car wash services to individual customer preferences, schedules, and vehicle needs, ensuring a unique and satisfying experience every time.',
            },
          ].map(({ title, description }) => (
            <div
              key={title}
              className="flex-1 border border-gray-300 rounded-lg p-8 cursor-pointer transition-colors duration-300 hover:bg-primary hover:text-white"
            >
              <h4 className="font-semibold text-lg mb-4">{title}</h4>
              <p className="text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-20 max-w-4xl mx-auto text-center">
        <h3 className="text-2xl font-semibold mb-8 text-gray-700">HOW IT WORKS</h3>
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {howItWorksSteps.map(({ step, title, desc }) => (
            <div key={step} className="flex-1 bg-gray-100 p-6 rounded-lg shadow-sm">
              <div className="text-primary text-4xl font-bold mb-3">{step}</div>
              <h4 className="font-semibold text-lg mb-2">{title}</h4>
              <p className="text-gray-700">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="mb-20 text-center">
        <h3 className="text-2xl font-semibold mb-12 text-gray-700">MEET OUR TEAM</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {teamMembers.map(({ name, role, image }) => (
            <div key={name} className="flex flex-col items-center">
              <img
                src={image}
                alt={name}
                className="w-32 h-32 rounded-full object-cover mb-4 shadow-md"
              />
              <h5 className="text-lg font-semibold">{name}</h5>
              <p className="text-gray-600">{role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-20 text-center max-w-7xl mx-auto">
        <h3 className="text-2xl font-semibold mb-8 text-gray-700">WHAT OUR CUSTOMERS SAY</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(({ name, feedback, city }) => (
            <div key={name} className="p-6 border border-gray-300 rounded-lg shadow-sm bg-white">
              <p className="text-gray-600 italic mb-4">"{feedback}"</p>
              <p className="font-semibold text-gray-900">{name}</p>
              <p className="text-sm text-gray-500">{city}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Eco-Friendly Commitment */}
      <section className="mb-20 max-w-3xl mx-auto text-center text-gray-600">
        <h3 className="text-2xl font-semibold mb-6 text-gray-700">OUR ECO-FRIENDLY COMMITMENT</h3>
        <p>
          We prioritize sustainability by using biodegradable cleaning products and water-efficient techniques that minimize environmental impact while ensuring your car shines spotless.
        </p>
      </section>

      {/* Service Guarantee */}
      <section className="mb-20 max-w-3xl mx-auto text-center text-gray-600">
        <h3 className="text-2xl font-semibold mb-6 text-gray-700">SERVICE GUARANTEE</h3>
        <p>
          Customer satisfaction is our top priority. We offer guaranteed service quality with options for rewash or refund if you are not completely happy with the results.
        </p>
      </section>

      {/* Frequently Asked Questions */}
      <section className="mb-28 max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold mb-8 text-center text-gray-700">FREQUENTLY ASKED QUESTIONS</h3>
        <div className="space-y-6">
          {faqs.map(({ question, answer }, i) => (
            <div key={i} className="border border-gray-300 rounded-lg p-6 bg-gray-50">
              <h4 className="font-semibold mb-2 text-gray-900">{question}</h4>
              <p className="text-gray-700">{answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Floating ChatBot */}
      <ChatBot />
    </main>
  );
};

export default About;
