import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const timelineEvents = [
  {
    period: "Jaren '50-'90",
    title: "De Taboe-fase",
    description: "Praten over geld is not-done. De werkgever heeft alle macht in de onderhandeling.",
    color: "from-gray-400 to-gray-600",
  },
  {
    period: "Jaren '00-'10",
    title: "Crowdsourced Transparency",
    description: "Opkomst van Glassdoor en Payscale. Werknemers beginnen data te delen.",
    color: "from-blue-400 to-blue-600",
  },
  {
    period: "2010-heden",
    title: "Europees Voortouw",
    description: "Scandinavische landen en IJsland nemen het voortouw in loontransparantie.",
    color: "from-purple-400 to-purple-600",
  },
  {
    period: "2023",
    title: "EU-Richtlijn",
    description: "De Europese Unie neemt definitief de Richtlijn Loontransparantie aan.",
    color: "from-red-400 to-red-600",
  },
  {
    period: "Juni 2026",
    title: "Implementatie Nederland",
    description: "Deadline voor implementatie in nationale wetgeving.",
    color: "from-[#C62828] to-[#8E24AA]",
  },
];

const TimelineItem: React.FC<{ event: typeof timelineEvents[0]; index: number }> = ({ event, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div className="relative flex items-center justify-center mb-16 md:mb-24 last:mb-0">
      {/* Left side (even index items) */}
      <div className="hidden md:flex flex-1 justify-end pr-12 lg:pr-20">
        {index % 2 === 0 && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl p-8 shadow-xl max-w-md border border-gray-100 relative group"
          >
            <div className={`absolute top-0 right-0 w-2 h-full bg-gradient-to-b ${event.color} rounded-r-2xl opacity-80`} />
            <span className={`inline-block px-4 py-1 bg-gradient-to-r ${event.color} text-white rounded-full text-xs font-bold mb-4 shadow-sm`}>
              {event.period}
            </span>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">{event.title}</h3>
            <p className="text-gray-600 leading-relaxed">{event.description}</p>
          </motion.div>
        )}
      </div>

      {/* Central dot and line */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className={`w-8 h-8 bg-gradient-to-br ${event.color} rounded-full border-4 border-white shadow-xl`} />
        </motion.div>
      </div>

      {/* Right side (odd index items + mobile view for all) */}
      <div className="flex-1 justify-start pl-8 md:pl-12 lg:pl-20">
        {(index % 2 !== 0 || window.innerWidth < 768) && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl p-8 shadow-xl max-w-md border border-gray-100 relative group"
          >
            <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${event.color} rounded-l-2xl opacity-80`} />
            <span className={`inline-block px-4 py-1 bg-gradient-to-r ${event.color} text-white rounded-full text-xs font-bold mb-4 shadow-sm`}>
              {event.period}
            </span>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">{event.title}</h3>
            <p className="text-gray-600 leading-relaxed">{event.description}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

const Timeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="tijdlijn" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute top-1/4 left-10 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl"
        animate={{
          y: [0, 50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-6 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-6 py-2 bg-red-100 text-[#C62828] rounded-full text-sm font-semibold mb-4 shadow-sm">
            Een stukje Geschiedenis
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#C62828] to-[#8E24AA] bg-clip-text text-transparent pb-1">
            De Evolutie van Transparantie
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Van taboe naar transparantie: de reis naar eerlijke beloning
          </p>
        </motion.div>

        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-200 via-purple-200 to-red-200 md:-translate-x-1/2" />

          <div className="space-y-4 md:space-y-0">
            {timelineEvents.map((event, index) => (
              <TimelineItem key={index} event={event} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
