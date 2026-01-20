import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { Download, Calendar } from 'lucide-react';

interface CTASectionProps {
  onOntdekMeerClick: () => void;
}

const CTASection = ({ onOntdekMeerClick }: CTASectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#C62828] via-[#8E24AA] to-[#C62828]"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: '200% 200%',
        }}
      />

      {/* Floating Shapes & Currency Symbols */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 border-4 border-white/20 rounded-full"
        animate={{
          y: [0, -30, 0],
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Currency Symbols Background */}
      <motion.div
        className="absolute top-[10%] right-[10%] text-white/10 font-bold text-7xl pointer-events-none select-none"
        animate={{
          rotate: [0, -15, 15, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        €
      </motion.div>

      <motion.div
        className="absolute bottom-[10%] left-[10%] text-white/10 font-bold text-8xl pointer-events-none select-none"
        animate={{
          rotate: [0, 20, -20, 0],
          scale: [1, 1.3, 0.8, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        $
      </motion.div>

      <motion.div
        className="absolute top-[40%] left-[5%] text-white/5 font-bold text-6xl pointer-events-none select-none"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.4, 1],
        }}
        transition={{
          rotate: { duration: 45, repeat: Infinity, ease: "linear" },
          scale: { duration: 22, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        $
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-lg"
        animate={{
          y: [0, 30, 0],
          rotate: -360,
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-8 px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-white text-sm font-medium">Deadline: Juni 2026</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Klaar voor de toekomst <br />van beloning?
          </h2>
          
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Wacht niet tot de wetgeving u inhaalt. Begin vandaag met het bouwen van een transparante en eerlijke organisatie.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-20">
            <Button 
              size="xl" 
              className="bg-white text-[#C62828] hover:bg-white/90 rounded-full shadow-2xl border-none px-12"
              onClick={onOntdekMeerClick}
            >
              Ontdek meer
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: '100+', label: 'Werknemers?', sublabel: 'Rapportageplicht geldt' },
              { value: 'Juni 2026', label: 'Deadline', sublabel: 'Implementatie wetgeving' },
              { value: '27', label: 'EU-Lidstaten', sublabel: 'Moeten implementeren' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-lg text-white/90 font-semibold">{stat.label}</div>
                <div className="text-sm text-white/70 mt-1">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
