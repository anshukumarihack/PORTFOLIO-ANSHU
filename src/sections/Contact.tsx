import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import SectionTitle from '../components/SectionTitle';
import { useInView } from '../hooks/useInView';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { ref, isInView } = useInView(0.1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate form submission - in production, integrate with EmailJS
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Get In Touch" subtitle="Let's work together" />

        <div ref={ref} className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-dark-50 mb-4">
              Let's build something{' '}
              <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                amazing
              </span>{' '}
              together
            </h3>
            <p className="text-dark-200 mb-8 leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              Feel free to reach out!
            </p>

            <div className="space-y-4">
              <motion.a
                href={`mailto:${portfolioData.email}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-neon-blue/30 transition-all group"
                whileHover={{ x: 5 }}
              >
                <div className="w-12 h-12 rounded-xl bg-neon-blue/10 flex items-center justify-center group-hover:bg-neon-blue/20 transition-colors">
                  <Mail size={20} className="text-neon-blue" />
                </div>
                <div>
                  <div className="text-dark-400 text-sm">Email</div>
                  <div className="text-dark-50 font-medium">{portfolioData.email}</div>
                </div>
              </motion.a>

              <motion.div
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
                whileHover={{ x: 5 }}
              >
                <div className="w-12 h-12 rounded-xl bg-neon-purple/10 flex items-center justify-center">
                  <MapPin size={20} className="text-neon-purple" />
                </div>
                <div>
                  <div className="text-dark-400 text-sm">Location</div>
                  <div className="text-dark-50 font-medium">{portfolioData.location}</div>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
                whileHover={{ x: 5 }}
              >
                <div className="w-12 h-12 rounded-xl bg-neon-green/10 flex items-center justify-center">
                  <Phone size={20} className="text-neon-green" />
                </div>
                <div>
                  <div className="text-dark-400 text-sm">Phone</div>
                  <div className="text-dark-50 font-medium">{portfolioData.phone}</div>
                </div>
              </motion.div>
            </div>

            {/* Availability */}
            <div className="mt-8 p-4 rounded-xl bg-neon-blue/5 border border-neon-blue/20">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-neon-green animate-pulse" />
                <span className="text-neon-blue font-medium">{portfolioData.availability}</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="game-card p-6 md:p-8 backdrop-blur-sm">
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-dark-300 text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-dark-900/50 border border-white/10 text-dark-50 placeholder-dark-500 focus:outline-none focus:border-neon-blue/50 transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-dark-300 text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-dark-900/50 border border-white/10 text-dark-50 placeholder-dark-500 focus:outline-none focus:border-neon-blue/50 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-dark-300 text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-dark-900/50 border border-white/10 text-dark-50 placeholder-dark-500 focus:outline-none focus:border-neon-blue/50 transition-colors"
                    placeholder="Project inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-dark-300 text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-dark-900/50 border border-white/10 text-dark-50 placeholder-dark-500 focus:outline-none focus:border-neon-blue/50 transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-dark-50 font-semibold shadow-lg shadow-neon-blue/25 hover:shadow-neon-blue/40 transition-all disabled:opacity-70"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : status === 'success' ? (
                    <>
                      <CheckCircle size={18} />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </motion.button>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle size={16} />
                    Something went wrong. Please try again.
                  </div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
