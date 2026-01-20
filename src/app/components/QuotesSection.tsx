import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Quote } from 'lucide-react';

const quotes = [
  {
    text: "Transparantie is geen doel op zich, het is een middel om vertrouwen te bouwen. Als wij niet kunnen uitleggen waarom iemand verdient wat hij verdient, is het probleem niet de transparantie, maar ons beleid.",
    author: "HR-Directeur",
    company: "Nederlandse Tech-scaleup",
    gradient: "from-purple-500 to-purple-700",
  },
  {
    text: "De loonkloof is geen natuurverschijnsel, het is het resultaat van systemische ongelijkheid die we nu eindelijk met data-gedreven transparantie kunnen aanpakken.",
    author: "Beleidsadviseur",
    company: "Europese Commissie",
    gradient: "from-[#C62828] to-[#B71C1C]",
  },
  {
    text: "Werknemers van de nieuwe generatie accepteren 'omdat het zo is' niet meer. Ze willen eerlijkheid, en loontransparantie is daar de ultieme lakmoesproef voor.",
    author: "Talent Acquisition Lead",
    company: "Global Innovations",
    gradient: "from-yellow-500 to-yellow-700",
  },
];

function QuoteCard({ quote, index }: { quote: typeof quotes[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="relative group h-full"
    >
      <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 h-full flex flex-col relative overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:border-gray-200">
        {/* Subtle background gradient hint */}
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${quote.gradient}`} />
        
        <motion.div
          className={`w-12 h-12 bg-gradient-to-br ${quote.gradient} rounded-lg flex items-center justify-center mb-8 shadow-lg`}
          whileHover={{ rotate: 180, scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <Quote className="w-6 h-6 text-white" />
        </motion.div>

        <p className="text-xl text-gray-700 mb-8 leading-relaxed italic flex-grow">
          "{quote.text}"
        </p>

        <div className="pt-6 border-t border-gray-100">
          <p className={`text-lg font-bold bg-gradient-to-r ${quote.gradient} bg-clip-text text-transparent inline-block`}>
            {quote.author}
          </p>
          <p className="text-sm text-gray-500 font-medium">{quote.company}</p>
        </div>
      </div>
    </motion.div>
  );
}

const QuotesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="quotes" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Blobs */}
      <motion.div
        className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 15,
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
          <span className="inline-block px-6 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold mb-4 shadow-sm">
            Wat Experts Zeggen
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#C62828] to-[#8E24AA] bg-clip-text text-transparent pb-1">
            Stemmen uit de Praktijk
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ontdek hoe loontransparantie de werkwereld transformeert volgens professionals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quotes.map((quote, index) => (
            <QuoteCard key={index} quote={quote} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuotesSection;
