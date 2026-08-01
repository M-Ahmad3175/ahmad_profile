import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

import messageService from "../../../services/messageService";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      await messageService.create(formData);
      toast.success("Message sent successfully");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="bg-gray-100 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">

        <motion.h2
          className="mb-10 text-center text-3xl font-bold sm:text-4xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Contact Me
        </motion.h2>

        <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit} aria-busy={submitting}>

          <div className="space-y-1">
            <label htmlFor="contact-name" className="text-sm font-medium text-gray-700">
              Name
            </label>

            <input
              id="contact-name"
              type="text"
              placeholder="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 sm:text-base"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="contact-email" className="text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              id="contact-email"
              type="email"
              placeholder="Your Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 sm:text-base"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="contact-subject" className="text-sm font-medium text-gray-700">
              Subject
            </label>

            <input
              id="contact-subject"
              type="text"
              placeholder="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              autoComplete="off"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 sm:text-base"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="contact-message" className="text-sm font-medium text-gray-700">
              Message
            </label>

            <textarea
              id="contact-message"
              rows="5"
              placeholder="Your Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 sm:text-base"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            aria-label="Send contact message"
            className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-8 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {submitting ? "Sending..." : "Send Message"}
          </button>

        </form>

      </div>
    </section>
  );
}

export default Contact;