import React, { useState } from "react";
import CustomButton from "../components/common/CustomButton";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Message sent! (mock)");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="px-20 py-20 bg-gray-50 min-h-screen">
      
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 text-gray-800">Contact Us</h1>
        <p className="text-gray-600">
          Have questions or ideas? We’d love to hear from you!
        </p>
      </div>

      {/* Form & Info */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <CustomButton text="Send Message" type="submit" />
        </form>

        {/* Contact Info */}
        <div className="bg-white p-8 rounded-lg shadow-md flex flex-col justify-center gap-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600">
            Email: <span className="text-purple-600">contact@wanderwise.com</span>
          </p>
          <p className="text-gray-600">
            Phone: <span className="text-purple-600">+1 (555) 123-4567</span>
          </p>
          <p className="text-gray-600">
            Address: <span className="text-purple-600">123 Spaceway, Universe</span>
          </p>
        </div>

      </div>
    </section>
  );
};

export default Contact;
