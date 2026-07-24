import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, Calendar, Eye, X, Download, FileText } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import SectionTitle from '../components/SectionTitle';
import { useInView } from '../hooks/useInView';

const certPdfs = import.meta.glob<string>(
  './Certifications/*.pdf',
  { eager: true, query: '?url', import: 'default' }
);

const certProofs: Record<string, string> = {
  '1': certPdfs['./Certifications/vtu24311_fullstack.pdf'] ?? '',
  '2': certPdfs['./Certifications/DSA_certificate.pdf'] ?? '',
  '3': certPdfs['./Certifications/ApanaGhr_internship_certificate.pdf'] ?? '',
  '4': certPdfs['./Certifications/Ethical_Hacking_certificates.pdf'] ?? '',
  '5': certPdfs['./Certifications/explore_machine_learning_mlt.pdf'] ?? '',
  '6': certPdfs['./Certifications/Introduction_to_Cybersecurity_certificate_vtu24311-veltech-edu-in_7272f495-298d-4e2a-82b1-3641f8074b79.pdf'] ?? '',
};

interface PreviewModalProps {
  certName: string;
  pdfUrl: string;
  onClose: () => void;
}

function PreviewModal({ certName, pdfUrl, onClose }: PreviewModalProps) {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-dark-950/90 backdrop-blur-md" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 w-full max-w-4xl bg-dark-900 border border-white/10 rounded-2xl overflow-hidden flex flex-col"
        style={{ maxHeight: 'calc(100vh - 4rem)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-dark-800/50 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-neon-blue/15 flex items-center justify-center shrink-0">
              <FileText size={16} className="text-neon-blue" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-dark-400 font-medium tracking-wide uppercase mb-0.5">Certificate</p>
              <h3 className="text-dark-50 font-semibold text-sm leading-tight truncate">{certName}</h3>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-4">
            <a
              href={pdfUrl}
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neon-blue/10 border border-neon-blue/25 text-neon-blue text-xs font-medium hover:bg-neon-blue/20 transition-colors"
            >
              <Download size={13} />
              Download
            </a>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-dark-400 hover:text-dark-50 hover:bg-white/10 transition-colors"
              aria-label="Close preview"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="relative flex-1 min-h-0 bg-dark-950">
          <iframe
            src={`${pdfUrl}#view=FitH`}
            title={certName}
            className="w-full h-full"
            style={{ minHeight: '520px' }}
          />
          {/* Fallback for browsers that block PDF in iframe */}
          <noscript>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-8">
              <FileText size={48} className="text-dark-500" />
              <p className="text-dark-300 text-sm">PDF preview not available in your browser.</p>
              <a
                href={pdfUrl}
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neon-blue text-dark-50 text-sm font-medium"
              >
                <Download size={16} />
                Download Certificate
              </a>
            </div>
          </noscript>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Certifications() {
  const { ref, isInView } = useInView(0.1);
  const [previewCert, setPreviewCert] = useState<{ name: string; url: string } | null>(null);

  return (
    <section id="certifications" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Certifications" subtitle="Professional credentials" />

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.certifications.map((cert, index) => {
            const proofUrl = certProofs[cert.id];
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="game-card group relative rounded-2xl overflow-hidden"
              >
                {/* Certificate Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-800 to-transparent" />

                  {/* Issuer badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-dark-950/80 backdrop-blur-sm text-dark-50 text-xs font-medium">
                      {cert.issuer}
                    </span>
                  </div>

                  {/* Proof available badge */}
                  {proofUrl && (
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neon-blue/20 border border-neon-blue/40 text-neon-blue text-xs font-semibold backdrop-blur-sm">
                        <Award size={11} />
                        Verified
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-dark-50 mb-2 group-hover:text-neon-blue transition-colors">
                    {cert.name}
                  </h3>

                  <div className="flex items-center gap-2 text-dark-400 text-sm mb-4">
                    <Calendar size={14} />
                    {cert.date}
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-white/5 text-dark-300 text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 flex-wrap">
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-neon-blue text-sm hover:underline"
                      >
                        <Award size={14} />
                        View Credential
                        <ExternalLink size={12} />
                      </a>
                    )}

                    {proofUrl && (
                      <button
                        onClick={() => setPreviewCert({ name: cert.name, url: proofUrl })}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neon-blue/10 border border-neon-blue/25 text-neon-blue text-sm font-medium hover:bg-neon-blue/20 transition-colors"
                      >
                        <Eye size={14} />
                        View Proof
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* PDF Preview Modal */}
      <AnimatePresence>
        {previewCert && (
          <PreviewModal
            certName={previewCert.name}
            pdfUrl={previewCert.url}
            onClose={() => setPreviewCert(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
