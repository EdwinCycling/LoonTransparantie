import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Scale, Users, TrendingUp, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: Scale,
    title: 'Gelijke Beloning',
    description: 'Doorbreek de loonkloof en zorg voor eerlijke beloning voor iedereen',
    color: 'from-purple-500 to-purple-700',
  },
  {
    icon: Users,
    title: 'Vertrouwen & Cultuur',
    description: 'Bouw een cultuur van openheid en vertrouwen binnen uw organisatie',
    color: 'from-[#C62828] to-[#B71C1C]',
  },
  {
    icon: TrendingUp,
    title: 'Beter Talent',
    description: 'Trek hoogwaardig talent aan met transparante salarisschalen',
    color: 'from-yellow-400 to-yellow-600',
  },
  {
    icon: ShieldCheck,
    title: 'EU Compliance',
    description: 'Voldoe aan de nieuwe EU-richtlijn voor loontransparantie',
    color: 'from-blue-500 to-blue-700',
  },
];

const FeatureCard: React.FC<{ feature: typeof features[0]; index: number }> = ({ feature, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="relative group h-full"
    >
      <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow border border-gray-100 h-full flex flex-col">
        <motion.div
          className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <Icon className="w-8 h-8 text-white" />
        </motion.div>
        
        <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
        <p className="text-gray-600 leading-relaxed flex-grow">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

const InfoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="impact" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-6 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4 shadow-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
          >
            Waarom Nu?
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#C62828] to-[#8E24AA] bg-clip-text text-transparent pb-1">
            De Impact van Loontransparantie
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            De roep om loontransparantie wordt gedreven door drie hoofdfactoren die de toekomst van werk vormgeven
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
