# Loontransparantie Landing Page - Technische Specificatie & Bouwdocument

## Inhoudsopgave
1. [Technische Stack](#technische-stack)
2. [Project Structuur](#project-structuur)
3. [Design Systeem](#design-systeem)
4. [Component Architectuur](#component-architectuur)
5. [Animatie Specificaties](#animatie-specificaties)
6. [Responsive Design](#responsive-design)
7. [Implementatie Details per Component](#implementatie-details-per-component)
8. [Dependencies](#dependencies)

---

## 1. Technische Stack

### Framework & Libraries
- **React 18.3.1** - Component-based UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite 6.3.5** - Build tool en development server
- **Tailwind CSS 4.1.12** - Utility-first CSS framework
- **Motion (motion/react) 12.23.24** - Moderne animatie library (voorheen Framer Motion)
- **Lucide React 0.487.0** - Icon library

### Build Configuration
- **Node modules**: Gebruikt pnpm als package manager
- **Import alias**: `@` wijst naar `/src` directory
- **TypeScript configuratie**: Strict mode enabled

---

## 2. Project Structuur

```
/src
├── /app
│   ├── App.tsx                    # Main component (entry point)
│   └── /components
│       ├── Header.tsx             # Fixed navigation header
│       ├── Hero.tsx               # Hero section met animaties
│       ├── InfoSection.tsx        # Feature cards sectie
│       ├── Timeline.tsx           # Historische tijdlijn
│       ├── QuotesSection.tsx      # Testimonial quotes
│       ├── CTASection.tsx         # Call-to-action sectie
│       ├── Footer.tsx             # Footer met links
│       └── /ui                    # Shadcn UI components
│           └── button.tsx         # Button component
└── /styles
    ├── fonts.css                  # Font imports
    ├── index.css                  # Main CSS entry
    ├── tailwind.css              # Tailwind imports
    └── theme.css                  # Theme tokens
```

---

## 3. Design Systeem

### Kleurenpalet

**Primaire Kleuren:**
- **Rood (Primary)**: `#C62828` (rgb(198, 40, 40))
- **Donker Rood**: `#B71C1C` (rgb(183, 28, 28))
- **Paars (Secondary)**: `#8E24AA` (rgb(142, 36, 170))
- **Geel (Accent)**: `#FFEB3B` / `#FDD835` (yellow-400/500)

**Gradient Combinaties:**
```css
/* Hoofdgradient */
from-[#C62828] to-[#8E24AA]

/* Hero achtergrond */
from-[#C62828] to-[#B71C1C]

/* Paars gradient */
from-purple-500 to-purple-700

/* Geel gradient */
from-yellow-400 to-yellow-600
```

**Neutrale Kleuren:**
- Wit: `#FFFFFF`
- Grijs 50: `#FAFAFA`
- Grijs 100: `#F5F5F5`
- Grijs 600: `#757575`
- Grijs 700: `#616161`
- Grijs 900: `#212121`

### Typografie

**Font Stack:**
- System fonts (default Tailwind)
- Fallback: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

**Font Sizes (Tailwind classes):**
- Hero titel: `text-6xl md:text-7xl lg:text-8xl` (48px -> 60px -> 72px+)
- Section titels: `text-4xl md:text-5xl` (36px -> 48px)
- Subtitels: `text-xl md:text-2xl` (20px -> 24px)
- Body text: `text-base md:text-lg` (16px -> 18px)
- Small text: `text-sm` (14px)

**Font Weights:**
- Bold: `font-bold` (700)
- Semibold: `font-semibold` (600)
- Medium: `font-medium` (500)
- Light: `font-light` (300)

### Spacing Systeem
- Container padding: `px-6` (24px horizontal)
- Section padding: `py-24` (96px vertical)
- Card padding: `p-6` of `p-8` (24px of 32px)
- Gap tussen elementen: `gap-4`, `gap-6`, `gap-8` (16px, 24px, 32px)

### Border Radius
- Small: `rounded-lg` (8px)
- Medium: `rounded-xl` (12px)
- Large: `rounded-2xl` (16px)
- Full: `rounded-full` (volledig rond)

### Shadows
- Card shadow: `shadow-lg` 
- Hover shadow: `shadow-2xl`
- Button shadow: `shadow-2xl`

---

## 4. Component Architectuur

### App.tsx (Main Entry Point)

**Functie:** Root component die alle secties in volgorde rendert

**Structuur:**
```tsx
export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <InfoSection />
      <Timeline />
      <QuotesSection />
      <CTASection />
      <Footer />
    </div>
  );
}
```

**Imports:**
- Alle components uit `@/app/components/[ComponentName]`
- Gebruikt absolute imports met `@` alias

---

## 5. Animatie Specificaties

### Motion Library Gebruik

**Import Statement:**
```tsx
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
```

### Animatie Patronen

#### 1. Initial Page Load Animations
```tsx
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}
```

#### 2. Scroll-triggered Animations (met useInView)
```tsx
const ref = useRef(null);
const isInView = useInView(ref, { once: true, amount: 0.3 });

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 50 }}
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
  transition={{ duration: 0.6 }}
>
```

**Parameters:**
- `once: true` - Animatie speelt 1x af
- `amount: 0.3` - Trigger wanneer 30% van element zichtbaar is

#### 3. Continuous Animations (Infinite Loop)
```tsx
animate={{
  y: [0, 30, 0],
  x: [0, 20, 0],
  scale: [1, 1.2, 1],
}}
transition={{
  duration: 8,
  repeat: Infinity,
  ease: "easeInOut",
}}
```

#### 4. Hover Animations
```tsx
whileHover={{ y: -10, scale: 1.05 }}
transition={{ duration: 0.3 }}
```

#### 5. Rotation Animations
```tsx
animate={{ rotate: 360 }}
transition={{
  duration: 20,
  repeat: Infinity,
  ease: "linear",
}}
```

### Easing Functions
- `"easeInOut"` - Smooth start en einde
- `"easeOut"` - Snelle start, langzame einde
- `"linear"` - Constante snelheid

### Stagger Delays
Voor lijsten met meerdere items:
```tsx
transition={{ duration: 0.6, delay: index * 0.1 }}
```
Elk volgend item heeft 0.1s extra delay.

---

## 6. Responsive Design

### Breakpoints (Tailwind default)
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px

### Responsive Patterns

#### Grid Layouts
```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
```
- Mobile: 1 kolom
- Tablet: 2 kolommen
- Desktop: 4 kolommen

#### Typography Scaling
```tsx
className="text-4xl md:text-5xl lg:text-6xl"
```

#### Flex Direction
```tsx
className="flex flex-col sm:flex-row gap-4"
```
- Mobile: verticaal gestapeld
- Tablet+: horizontaal naast elkaar

#### Visibility
```tsx
className="hidden md:inline-flex"  // Verberg op mobile
className="md:hidden"               // Toon alleen op mobile
```

---

## 7. Implementatie Details per Component

### 7.1 Header Component

**Bestand:** `/src/app/components/Header.tsx`

**Functionaliteit:**
- Fixed positie (blijft bovenaan bij scrollen)
- Transparante achtergrond met blur effect
- Responsive navigatie
- Prominent "Inloggen" knop

**Key Features:**

1. **Fixed Positioning:**
```tsx
className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50"
```
- `fixed` - Element blijft op positie bij scrollen
- `z-50` - Hoge z-index om boven andere content te blijven
- `bg-white/95` - 95% opacity wit
- `backdrop-blur-md` - Blur effect voor achtergrond

2. **Entry Animation:**
```tsx
initial={{ y: -100 }}
animate={{ y: 0 }}
transition={{ duration: 0.6, ease: "easeOut" }}
```
- Schuift van boven (-100px) naar positie (0px)

3. **Logo Design:**
```tsx
<div className="w-10 h-10 bg-gradient-to-br from-[#C62828] to-[#8E24AA] rounded-lg">
  <span className="text-white font-bold text-lg">LT</span>
</div>
```
- Vierkant logo met gradient achtergrond
- Initialen "LT" in wit

4. **Navigation Links:**
```tsx
<a href="#over" className="text-gray-700 hover:text-[#C62828] transition-colors">
  Over ons
</a>
```
- Grijze standaard kleur
- Rode hover kleur
- Smooth color transition

5. **Inloggen Button:**
```tsx
<Button className="bg-gradient-to-r from-[#C62828] to-[#8E24AA] hover:opacity-90 text-white px-6 rounded-full shadow-lg">
  Inloggen
</Button>
```
- Gradient achtergrond (rood naar paars)
- Volledig ronde hoeken
- Opacity verlaagt bij hover

**Responsive Behavior:**
- Navigation links: `hidden md:flex` (verborgen op mobile)
- Inloggen button: `hidden md:inline-flex` (verborgen op mobile)
- Hamburger menu: `md:hidden` (alleen zichtbaar op mobile)

---

### 7.2 Hero Component

**Bestand:** `/src/app/components/Hero.tsx`

**Functionaliteit:**
- Fullscreen hero sectie met dramatische rode achtergrond
- Meerdere zwevende/bewegende achtergrond elementen
- Geometrische vormen die continue animeren
- Hoofdtekst met staggered animations
- Call-to-action buttons
- Scroll indicator onderaan

**Achtergrond Gradient:**
```tsx
className="relative min-h-screen bg-gradient-to-br from-[#C62828] to-[#B71C1C] overflow-hidden"
```
- Volledig scherm hoogte (`min-h-screen`)
- Diagonale gradient van linksboven naar rechtsonder
- `overflow-hidden` - Voorkomt dat animaties buiten sectie komen

**Animated Background Blobs (3 stuks):**

**Blob 1 - Geel:**
```tsx
<motion.div
  className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl"
  animate={{
    y: [0, 30, 0],
    x: [0, 20, 0],
    scale: [1, 1.2, 1],
  }}
  transition={{
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>
```
- Positie: linksboven
- Kleur: Geel met 20% opacity
- Blur: Zeer groot (`blur-3xl`)
- Beweging: Y-as (0→30→0), X-as (0→20→0), Scale (1→1.2→1)
- Duur: 8 seconden per cyclus

**Blob 2 - Paars:**
```tsx
<motion.div
  className="absolute top-40 right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"
  animate={{
    y: [0, -40, 0],
    x: [0, -30, 0],
    scale: [1, 1.3, 1],
  }}
  transition={{
    duration: 10,
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>
```
- Positie: rechtsboven
- Groter (160px diameter)
- Beweging omgekeerd (negatieve waarden)
- Langere duur: 10 seconden

**Blob 3 - Geel:**
```tsx
<motion.div
  className="absolute bottom-20 left-1/3 w-48 h-48 bg-yellow-300/15 rounded-full blur-3xl"
  animate={{
    y: [0, 20, 0],
    x: [0, -15, 0],
  }}
  transition={{
    duration: 7,
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>
```
- Positie: linksonder (1/3 van links)
- Grootste blob (192px diameter)
- 7 seconden cyclus

**Floating Geometric Shapes:**

**Shape 1 - Vierkant frame:**
```tsx
<motion.div
  className="absolute top-1/4 right-1/4 w-20 h-20 border-4 border-white/10"
  animate={{
    rotate: 360,
    y: [0, -20, 0],
  }}
  transition={{
    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
    y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
  }}
/>
```
- Holle vierkant (alleen border)
- Combineert rotatie (360° in 20s) met verticale beweging
- Aparte transition timings voor elke animatie

**Shape 2 - Gevuld vierkant:**
```tsx
<motion.div
  className="absolute bottom-1/3 right-1/3 w-16 h-16 bg-purple-500/20 rounded-lg"
  animate={{
    rotate: -360,
    x: [0, 30, 0],
    y: [0, 20, 0],
  }}
  transition={{
    rotate: { duration: 15, repeat: Infinity, ease: "linear" },
    x: { duration: 6, repeat: Infinity, ease: "easeInOut" },
    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  }}
/>
```
- Rotatie in tegengestelde richting (-360°)
- 3 aparte animaties: rotatie, x-beweging, y-beweging
- Verschillende durations creëren complex bewegingspatroon

**Shape 3 - Cirkel frame:**
```tsx
<motion.div
  className="absolute top-1/2 left-1/4 w-24 h-24 border-4 border-yellow-400/20 rounded-full"
  animate={{
    scale: [1, 1.2, 1],
    opacity: [0.3, 0.6, 0.3],
  }}
  transition={{
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>
```
- Pulserend effect (scale + opacity samen)
- Creëert "ademend" visueel effect

**Content Container:**
```tsx
<div className="container mx-auto px-6 relative z-10">
  <div className="max-w-4xl">
    {/* Content hier */}
  </div>
</div>
```
- `z-10` - Boven de achtergrond elementen
- Max breedte: 896px
- Gecentreerd met auto margins

**Badge/Label:**
```tsx
<motion.div
  className="inline-block mb-6 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.2 }}
>
  <span className="text-white/90 text-sm font-medium">Januari 2026 • EU-Richtlijn</span>
</motion.div>
```
- Semi-transparante achtergrond met blur
- Pil-vorm (rounded-full)
- Fade in + scale animatie met 0.2s delay

**Hoofdtitel:**
```tsx
<motion.h1
  className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3, duration: 0.8 }}
>
  Loontransparantie
</motion.h1>
```
- Zeer grote tekst (responsive: 48px → 60px → 72px+)
- Fade in van beneden met 0.3s delay
- Tight line-height voor compacte look

**Subtitel:**
```tsx
<motion.p
  className="text-2xl md:text-3xl text-white/90 mb-4 font-light"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4, duration: 0.8 }}
>
  Het Einde van het Salaristaboe
</motion.p>
```
- Lichtere font weight
- 0.4s delay (na titel)

**Beschrijving:**
```tsx
<motion.p
  className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl leading-relaxed"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5, duration: 0.8 }}
>
  Transparantie is geen doel op zich, het is een middel om vertrouwen te bouwen. 
  Ontdek hoe de nieuwe EU-richtlijn uw organisatie beïnvloedt.
</motion.p>
```
- Max breedte: 672px
- Relaxed line-height voor leesbaarheid
- 0.5s delay

**CTA Buttons:**
```tsx
<motion.div
  className="flex flex-wrap gap-4"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.6, duration: 0.8 }}
>
  <Button size="lg" className="bg-white text-[#C62828] hover:bg-white/90 text-lg px-8 py-6 rounded-full shadow-2xl">
    Ontdek meer
    <ArrowRight className="ml-2 h-5 w-5" />
  </Button>
  
  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-full backdrop-blur-sm">
    Download het dossier
  </Button>
</motion.div>
```
- Primaire button: Wit met rode tekst
- Secundaire button: Transparant met witte border
- Beide: Grote padding, rounded-full, icon in primaire
- 0.6s delay (laatste element)

**Scroll Indicator:**
```tsx
<motion.div
  className="absolute bottom-10 left-1/2 -translate-x-1/2"
  animate={{ y: [0, 10, 0] }}
  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
>
  <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
    <motion.div
      className="w-1 h-2 bg-white/60 rounded-full"
      animate={{ y: [0, 12, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
</motion.div>
```
- Gecentreerd onderaan
- Buitenste container: bounce up/down
- Binnenste dot: scrollt binnen container
- Simuleert scroll wheel beweging

---

### 7.3 InfoSection Component

**Bestand:** `/src/app/components/InfoSection.tsx`

**Functionaliteit:**
- Grid met 4 feature cards
- Scroll-triggered animations
- Hover effecten op cards
- Achtergrond decoratie blobs

**Section Container:**
```tsx
<section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
```
- Verticale gradient van licht grijs naar wit
- Grote vertical padding (96px)

**Background Decoration:**
```tsx
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
```
- Zeer subtiele achtergrond blob (5% opacity)
- Pulse effect met scale en opacity

**Features Data Structure:**
```tsx
const features = [
  {
    icon: Scale,                    // Lucide icon component
    title: 'Gelijke Beloning',
    description: 'Doorbreek de loonkloof en zorg voor eerlijke beloning voor iedereen',
    color: 'from-purple-500 to-purple-700',  // Gradient classes
  },
  // ... 3 meer
];
```

**Section Header:**
```tsx
<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 30 }}
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
  transition={{ duration: 0.8 }}
  className="text-center mb-16"
>
  <motion.span
    className="inline-block px-6 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
    transition={{ delay: 0.2 }}
  >
    Waarom Nu?
  </motion.span>
  
  <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#C62828] to-[#8E24AA] bg-clip-text text-transparent">
    De Impact van Loontransparantie
  </h2>
  
  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
    De roep om loontransparantie wordt gedreven door drie hoofdfactoren die de toekomst van werk vormgeven
  </p>
</motion.div>
```

**Gradient Text Effect:**
```tsx
className="bg-gradient-to-r from-[#C62828] to-[#8E24AA] bg-clip-text text-transparent"
```
- `bg-gradient-to-r` - Gradient als achtergrond
- `bg-clip-text` - Clip gradient naar text shape
- `text-transparent` - Maak text zelf transparant (toont gradient)

**FeatureCard Sub-Component:**

```tsx
function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
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
      className="relative group"
    >
      {/* Card content */}
    </motion.div>
  );
}
```

**Key Features van FeatureCard:**

1. **Staggered Entry:** `delay: index * 0.1`
   - Card 0: 0s delay
   - Card 1: 0.1s delay
   - Card 2: 0.2s delay
   - Card 3: 0.3s delay

2. **Hover Effect:**
```tsx
whileHover={{ y: -10, transition: { duration: 0.3 } }}
```
- Card lift up 10px bij hover
- Quick 0.3s transition

3. **Icon Container:**
```tsx
<motion.div
  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6`}
  whileHover={{ rotate: 360, scale: 1.1 }}
  transition={{ duration: 0.6 }}
>
  <Icon className="w-8 h-8 text-white" />
</motion.div>
```
- Vierkant met gradient achtergrond
- Icon roteert 360° en schaalt bij hover
- Elke feature heeft eigen gradient kleur

4. **Card Styling:**
```tsx
<div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow border border-gray-100">
```
- Witte achtergrond
- Grote border radius
- Shadow wordt groter bij hover (via CSS transition)
- Subtiele grijze border

**Grid Layout:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  {features.map((feature, index) => (
    <FeatureCard key={index} feature={feature} index={index} />
  ))}
</div>
```
- Mobile: 1 kolom (stacked)
- Tablet: 2 kolommen
- Desktop: 4 kolommen (alle naast elkaar)
- 32px gap tussen cards

---

### 7.4 Timeline Component

**Bestand:** `/src/app/components/Timeline.tsx`

**Functionaliteit:**
- Verticale tijdlijn met alternerend links/rechts layout
- 5 historische gebeurtenissen
- Geanimeerde dots op centrale lijn
- Gradient lijn als verbinding

**Timeline Events Data:**
```tsx
const timelineEvents = [
  {
    period: "Jaren '50-'90",
    title: "De Taboe-fase",
    description: "Praten over geld is not-done. De werkgever heeft alle macht in de onderhandeling.",
    color: "from-gray-400 to-gray-600",
  },
  // ... 4 meer events
];
```

**Section Container:**
```tsx
<section className="py-24 bg-white relative overflow-hidden">
```

**Animated Background Blob:**
```tsx
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
```

**Central Timeline Line:**
```tsx
<div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-200 via-purple-200 to-red-200 -translate-x-1/2" />
```
- Verticale lijn van boven naar beneden
- Gecentreerd horizontaal (`left-1/2 -translate-x-1/2`)
- Gradient van grijs → paars → rood
- 4px breed (`w-1`)

**TimelineItem Sub-Component:**

```tsx
function TimelineItem({ event, index }: { event: typeof timelineEvents[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative flex items-center justify-center"
    >
      {/* Content */}
    </motion.div>
  );
}
```

**Alternerend Layout Logic:**
- Even index (0, 2, 4): Card links, animatie van links
- Oneven index (1, 3): Card rechts, animatie van rechts

**Layout Structure:**
```tsx
<div className="flex-1 flex justify-end pr-8 md:pr-12">
  {index % 2 === 0 && (
    <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-xl p-6 shadow-lg max-w-md border border-gray-100">
      {/* Card content */}
    </motion.div>
  )}
</div>

<motion.div className="relative z-10" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
  <div className={`w-6 h-6 bg-gradient-to-br ${event.color} rounded-full border-4 border-white shadow-lg`} />
</motion.div>

<div className="flex-1 flex justify-start pl-8 md:pl-12">
  {index % 2 !== 0 && (
    <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-xl p-6 shadow-lg max-w-md border border-gray-100">
      {/* Card content */}
    </motion.div>
  )}
</div>
```

**3-Column Flex Layout:**
1. **Linker kolom** (flex-1): Card voor even items
2. **Centrale kolom**: Animated dot
3. **Rechter kolom** (flex-1): Card voor oneven items

**Timeline Dot Animation:**
```tsx
<motion.div
  className="relative z-10"
  animate={{ scale: [1, 1.2, 1] }}
  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
>
  <div className={`w-6 h-6 bg-gradient-to-br ${event.color} rounded-full border-4 border-white shadow-lg`} />
</motion.div>
```
- Pulserend effect (scale 1 → 1.2 → 1)
- Witte border om dot heen (scheidt van lijn)
- Shadow voor depth

**Period Badge:**
```tsx
<span className={`inline-block px-4 py-1 bg-gradient-to-r ${event.color} text-white rounded-full text-sm font-semibold mb-3`}>
  {event.period}
</span>
```
- Gradient achtergrond (uniek per event)
- Pill shape

**Spacing tussen Items:**
```tsx
<div className="space-y-16">
  {timelineEvents.map((event, index) => (
    <TimelineItem key={index} event={event} index={index} />
  ))}
</div>
```
- 64px verticale ruimte tussen timeline items

---

### 7.5 QuotesSection Component

**Bestand:** `/src/app/components/QuotesSection.tsx`

**Functionaliteit:**
- 3 testimonial quotes in grid layout
- Elk met unieke gradient kleur
- Quote icon met rotatie animatie bij hover
- Scroll-triggered entry animations

**Quotes Data:**
```tsx
const quotes = [
  {
    text: "Transparantie is geen doel op zich...",
    author: "HR-Directeur",
    company: "Nederlandse Tech-scaleup",
    gradient: "from-purple-500 to-purple-700",
  },
  // ... 2 meer quotes
];
```

**Section Background:**
```tsx
<section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
```
- Omgekeerde gradient van InfoSection (wit → grijs)

**Background Blobs:**
```tsx
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
```
- 2 blobs (paars linksboven, rood rechtsonder)
- Beweging op X en Y as
- Langzame 12s cyclus

**QuoteCard Sub-Component:**

```tsx
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
      className="relative group"
    >
      {/* Card content */}
    </motion.div>
  );
}
```

**Stagger Delays:**
- Quote 1: 0s
- Quote 2: 0.2s  
- Quote 3: 0.4s

**Quote Icon:**
```tsx
<motion.div
  className={`w-12 h-12 bg-gradient-to-br ${quote.gradient} rounded-lg flex items-center justify-center mb-6`}
  whileHover={{ rotate: 180, scale: 1.1 }}
  transition={{ duration: 0.5 }}
>
  <Quote className="w-6 h-6 text-white" />
</motion.div>
```
- Vierkant icoon container met gradient
- Roteert 180° bij hover
- Scale up effect

**Quote Text:**
```tsx
<p className="text-lg text-gray-700 mb-6 leading-relaxed italic">
  "{quote.text}"
</p>
```
- Italic voor quote styling
- Leading-relaxed voor leesbaarheid
- Wrapped in aanhalingstekens

**Author Section:**
```tsx
<div className={`border-t-2 border-gradient-to-r ${quote.gradient} pt-4`}>
  <p className={`font-bold bg-gradient-to-r ${quote.gradient} bg-clip-text text-transparent`}>
    {quote.author}
  </p>
  <p className="text-sm text-gray-500">{quote.company}</p>
</div>
```
- Border top met gradient kleur (note: CSS limitation, gebruikt solid border)
- Naam met gradient text effect
- Grijze company tekst

**Grid Layout:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
```
- Mobile: 1 kolom
- Tablet: 2 kolommen
- Desktop: 3 kolommen

**Card Full Height:**
```tsx
className="... h-full"
```
- Zorgt dat alle cards in rij dezelfde hoogte hebben

---

### 7.6 CTASection Component

**Bestand:** `/src/app/components/CTASection.tsx`

**Functionaliteit:**
- Dramatische gradient achtergrond met beweging
- Zwevende geometrische vormen
- 2 CTA buttons met icons
- 3 statistiek kaarten

**Animated Gradient Background:**
```tsx
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
```
- 3-stop gradient (rood → paars → rood)
- Background position animatie creëert "bewegende gradient"
- 200% size maakt animatie mogelijk
- 20 seconden per cyclus

**Floating Shapes:**

**Shape 1 - Cirkel:**
```tsx
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
```
- Holle cirkel (border-only)
- Combineert Y-beweging, rotatie en scale

**Shape 2 - Vierkant:**
```tsx
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
```
- Gevuld vierkant
- Rotatie in tegengestelde richting

**Shape 3 - Gele blob:**
```tsx
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
```
- Pulserend geel licht

**Deadline Badge:**
```tsx
<motion.div
  className="inline-block mb-6 px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30"
  initial={{ opacity: 0, scale: 0.9 }}
  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
  transition={{ delay: 0.2 }}
>
  <span className="text-white text-sm font-medium">Deadline: Juni 2026</span>
</motion.div>
```
- Glasmorphism effect (blur + transparancy)

**CTA Buttons:**
```tsx
<Button size="lg" className="bg-white text-[#C62828] hover:bg-white/90 text-lg px-8 py-6 rounded-full shadow-2xl">
  <Download className="mr-2 h-5 w-5" />
  Download het Dossier
</Button>

<Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-full backdrop-blur-sm">
  <Calendar className="mr-2 h-5 w-5" />
  Plan een Consultatie
</Button>
```
- Primaire: Wit met rode tekst, icoon links
- Secundaire: Outline met backdrop blur
- Beide: Large size, rounded-full, grote padding

**Stats Grid:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {[
    { value: '100+', label: 'Werknemers?', sublabel: 'Rapportageplicht geldt' },
    { value: 'Juni 2026', label: 'Deadline', sublabel: 'Implementatie wetgeving' },
    { value: '27', label: 'EU-Lidstaten', sublabel: 'Moeten implementeren' },
  ].map((stat, index) => (
    <motion.div
      key={index}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-colors"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
      <div className="text-lg text-white/90 font-semibold">{stat.label}</div>
      <div className="text-sm text-white/70 mt-1">{stat.sublabel}</div>
    </motion.div>
  ))}
</div>
```

**Stat Card Features:**
- Glassmorphism (bg-white/10 + backdrop-blur-md)
- Hover: Lichtere achtergrond + scale up
- 3 text lagen: value (groot), label (medium), sublabel (klein)
- Responsive: 1 kolom op mobile, 3 kolommen op tablet+

**IMPORTANT - Color Animation Fix:**
De `backgroundColor` property in `whileHover` is VERWIJDERD omdat dit een niet-animeerbare kleur error veroorzaakt. In plaats daarvan wordt CSS `hover:bg-white/15 transition-colors` gebruikt.

---

### 7.7 Footer Component

**Bestand:** `/src/app/components/Footer.tsx`

**Functionaliteit:**
- 4-kolom link grid
- Logo herhaling
- Copyright en legal links

**Footer Container:**
```tsx
<footer className="bg-gray-900 text-white py-12">
```
- Donkere achtergrond
- Witte tekst
- Grote vertical padding

**Grid Layout:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
```
- Mobile: Gestapeld (1 kolom)
- Tablet+: 4 kolommen naast elkaar

**Logo Kolom:**
```tsx
<div>
  <div className="flex items-center gap-2 mb-4">
    <div className="w-10 h-10 bg-gradient-to-br from-[#C62828] to-[#8E24AA] rounded-lg flex items-center justify-center">
      <span className="text-white font-bold text-lg">LT</span>
    </div>
    <span className="text-xl font-bold">Loontransparantie</span>
  </div>
  <p className="text-gray-400 text-sm">
    Uw gids voor transparantie in beloning en compliance met EU-wetgeving.
  </p>
</div>
```
- Zelfde logo styling als header
- Grijze beschrijving tekst

**Link Kolommen (3x):**
```tsx
<div>
  <h4 className="font-bold mb-4">Informatie</h4>
  <ul className="space-y-2 text-gray-400 text-sm">
    <li><a href="#" className="hover:text-white transition-colors">Over loontransparantie</a></li>
    <li><a href="#" className="hover:text-white transition-colors">EU-richtlijn</a></li>
    // ... meer links
  </ul>
</div>
```
- Witte kopjes
- Grijze links die wit worden bij hover
- Smooth color transition

**Bottom Bar:**
```tsx
<div className="border-t border-gray-800 pt-8">
  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
    <p className="text-gray-400 text-sm">
      © 2026 Loontransparantie. Alle rechten voorbehouden.
    </p>
    <div className="flex gap-6 text-sm text-gray-400">
      <a href="#" className="hover:text-white transition-colors">Privacy statement</a>
      <a href="#" className="hover:text-white transition-colors">Cookie statement</a>
      <a href="#" className="hover:text-white transition-colors">Voorwaarden</a>
    </div>
  </div>
</div>
```
- Border top scheidt van link grid
- Flex layout: copyright links, legal links rechts
- Responsive: Stacked op mobile, naast elkaar op tablet+

---

## 8. Dependencies

### Package.json Essentials

**Moet geïnstalleerd zijn:**
```json
{
  "dependencies": {
    "motion": "12.23.24",
    "lucide-react": "0.487.0",
    "@radix-ui/react-slot": "1.1.2",
    "class-variance-authority": "0.7.1",
    "clsx": "2.1.1",
    "tailwind-merge": "3.2.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "4.1.12",
    "@vitejs/plugin-react": "4.7.0",
    "tailwindcss": "4.1.12",
    "vite": "6.3.5"
  },
  "peerDependencies": {
    "react": "18.3.1",
    "react-dom": "18.3.1"
  }
}
```

### Import Statements Gebruikspatroon

**Motion:**
```tsx
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
```

**Lucide Icons:**
```tsx
import { ArrowRight, Download, Calendar, Menu, Quote, Scale, Users, TrendingUp, FileText } from 'lucide-react';
```

**Components:**
```tsx
import { Button } from '@/app/components/ui/button';
import { ComponentName } from '@/app/components/ComponentName';
```

---

## 9. Critical Implementation Notes

### 9.1 Motion Library - Color Animation

**PROBLEEM:**
```tsx
// ❌ NIET DOEN - Veroorzaakt error
whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
```

**OPLOSSING:**
```tsx
// ✅ WEL DOEN - Gebruik CSS transitions
className="hover:bg-white/15 transition-colors"
whileHover={{ scale: 1.05 }}
```

Motion kan niet alle CSS kleurformaten animeren. Gebruik CSS transitions voor kleur changes en Motion alleen voor transform properties (x, y, scale, rotate, opacity).

### 9.2 useInView Hook Pattern

**Correcte implementatie:**
```tsx
function Component() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
    >
      {/* Content */}
    </motion.div>
  );
}
```

**Parameters:**
- `once: true` - Animatie speelt maar 1x (niet elke keer bij scrollen)
- `amount: 0.3` - Trigger wanneer 30% zichtbaar (0.0-1.0)

### 9.3 Gradient Text Effect

**Vereiste classes in exacte volgorde:**
```tsx
className="bg-gradient-to-r from-[#C62828] to-[#8E24AA] bg-clip-text text-transparent"
```

1. `bg-gradient-to-r` - Gradient als achtergrond
2. `from-[color]` en `to-[color]` - Gradient kleuren
3. `bg-clip-text` - Clip gradient naar text
4. `text-transparent` - Maak text transparent om gradient te tonen

### 9.4 Glassmorphism Effect

**Complete pattern:**
```tsx
className="bg-white/10 backdrop-blur-md border border-white/20"
```

- `bg-white/10` - 10% opacity witte achtergrond
- `backdrop-blur-md` - Blur achtergrond content
- `border border-white/20` - Subtiele border voor definitie

### 9.5 Absolute Positioning met Centering

**Horizontaal centreren:**
```tsx
className="absolute left-1/2 -translate-x-1/2"
```

**Verticaal centreren:**
```tsx
className="absolute top-1/2 -translate-y-1/2"
```

**Beide:**
```tsx
className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
```

### 9.6 Z-index Layering

**Layer volgorde (van achter naar voor):**
1. Background blobs: Geen z-index (z-0 default)
2. Background gradient: `z-0` of geen
3. Floating shapes: Geen z-index
4. Content container: `z-10`
5. Header (fixed): `z-50`

### 9.7 Animation Performance

**Goede properties voor animatie (GPU-accelerated):**
- `opacity`
- `scale`
- `rotate`
- `x`, `y`

**Vermijd animeren:**
- `width`, `height`
- `padding`, `margin`
- `backgroundColor` (via Motion)
- `border`

### 9.8 Container Pattern

**Standaard container:**
```tsx
<div className="container mx-auto px-6">
  {/* Content */}
</div>
```

- `container` - Max width op verschillende breakpoints
- `mx-auto` - Horizontaal centreren
- `px-6` - 24px padding links en rechts

**Met max-width beperking:**
```tsx
<div className="container mx-auto px-6">
  <div className="max-w-4xl">
    {/* Content max 896px breed */}
  </div>
</div>
```

---

## 10. Step-by-Step Implementatie Checklist

### Stap 1: Project Setup
- [ ] Vite + React + TypeScript project aanmaken
- [ ] Dependencies installeren (zie sectie 8)
- [ ] Tailwind CSS 4 configureren
- [ ] Import alias `@` naar `/src` configureren

### Stap 2: Basis Structuur
- [ ] `/src/app/App.tsx` maken (main component)
- [ ] `/src/app/components/` directory aanmaken
- [ ] `/src/app/components/ui/` directory aanmaken

### Stap 3: UI Components
- [ ] Button component maken in `/src/app/components/ui/button.tsx`
  - Gebruik Radix UI Slot
  - Class Variance Authority voor variants
  - Tailwind Merge voor class merging

### Stap 4: Componenten Bouwen (in volgorde)
- [ ] Header.tsx - Start hiermee, test fixed positioning
- [ ] Hero.tsx - Test animaties en bewegende elementen
- [ ] InfoSection.tsx - Test grid en scroll animations
- [ ] Timeline.tsx - Test alternerend layout
- [ ] QuotesSection.tsx - Test gradient text
- [ ] CTASection.tsx - Test glassmorphism en gradient background
- [ ] Footer.tsx - Eenvoudigste component

### Stap 5: App.tsx Assembleren
- [ ] Importeer alle componenten
- [ ] Render in correcte volgorde
- [ ] Test scroll flow

### Stap 6: Testing & Refinement
- [ ] Test op verschillende schermbreedtes
- [ ] Verifieer alle animaties werken
- [ ] Check performance (geen jank)
- [ ] Valideer toegankelijkheid

---

## 11. Troubleshooting

### Probleem: Animaties werken niet

**Check:**
1. Is Motion correct geïmporteerd? `import { motion } from 'motion/react';`
2. Zijn de juiste props gebruikt? `animate={}` niet `animation={}`
3. Is `transition` object correct geformatteerd?

### Probleem: Scroll animations triggeren niet

**Check:**
1. Is `useRef` en `useInView` correct gebruikt?
2. Is `ref={ref}` op de juiste element?
3. Is `amount` waarde te hoog? (probeer 0.2)

### Probleem: Gradient text werkt niet

**Check:**
1. Alle 4 classes aanwezig?
2. Juiste volgorde?
3. Tekst in element aanwezig?

### Probleem: Layout breekt op mobile

**Check:**
1. Responsive classes correct? (`md:`, `lg:`)
2. Container padding aanwezig?
3. Flex direction changes? (`flex-col sm:flex-row`)

---

## 12. Content Data

### Alle Teksten in de Applicatie

**Header:**
- Logo: "LT" + "Loontransparantie"
- Nav links: "Over ons", "Wetgeving", "Impact", "Contact"
- CTA: "Inloggen"

**Hero:**
- Badge: "Januari 2026 • EU-Richtlijn"
- Titel: "Loontransparantie"
- Subtitel: "Het Einde van het Salaristaboe"
- Beschrijving: "Transparantie is geen doel op zich, het is een middel om vertrouwen te bouwen. Ontdek hoe de nieuwe EU-richtlijn uw organisatie beïnvloedt."
- Button 1: "Ontdek meer"
- Button 2: "Download het dossier"

**InfoSection:**
- Badge: "Waarom Nu?"
- Titel: "De Impact van Loontransparantie"
- Beschrijving: "De roep om loontransparantie wordt gedreven door drie hoofdfactoren die de toekomst van werk vormgeven"
- Features:
  1. "Gelijke Beloning" - "Doorbreek de loonkloof en zorg voor eerlijke beloning voor iedereen"
  2. "Vertrouwen & Cultuur" - "Bouw een cultuur van openheid en vertrouwen binnen uw organisatie"
  3. "Beter Talent" - "Trek hoogwaardig talent aan met transparante salarisschalen"
  4. "EU Compliance" - "Voldoe aan de nieuwe EU-richtlijn voor loontransparantie"

**Timeline:**
- Badge: "Een stukje Geschiedenis"
- Titel: "De Evolutie van Transparantie"
- Beschrijving: "Van taboe naar transparantie: de reis naar eerlijke beloning"
- Events:
  1. "Jaren '50-'90" - "De Taboe-fase" - "Praten over geld is not-done. De werkgever heeft alle macht in de onderhandeling."
  2. "Jaren '00-'10" - "Crowdsourced Transparency" - "Opkomst van Glassdoor en Payscale. Werknemers beginnen data te delen."
  3. "2010-heden" - "Europees Voortouw" - "Scandinavische landen en IJsland nemen het voortouw in loontransparantie."
  4. "2023" - "EU-Richtlijn" - "De Europese Unie neemt definitief de Richtlijn Loontransparantie aan."
  5. "Juni 2026" - "Implementatie Nederland" - "Deadline voor implementatie in nationale wetgeving."

**QuotesSection:**
- Badge: "Wat Experts Zeggen"
- Titel: "Stemmen uit de Praktijk"
- Beschrijving: "Ontdek hoe loontransparantie de werkwereld transformeert volgens professionals"
- Quotes:
  1. "Transparantie is geen doel op zich, het is een middel om vertrouwen te bouwen. Als wij niet kunnen uitleggen waarom iemand verdient wat hij verdient, is het probleem niet de transparantie, maar ons beleid." - "HR-Directeur" - "Nederlandse Tech-scaleup"
  2. "Vroeger was salaris een geheim wapen in de onderhandeling. Nu is het een open kaart. Het dwingt ons als bedrijf om eerlijk te zijn en zorgt ervoor dat we talent aantrekken dat kiest voor onze waarden, niet alleen voor de hoogste bieder." - "CEO" - "Zakelijke dienstverlening"
  3. "Eindelijk hoef ik niet meer te pokeren tijdens een sollicitatie. Ik weet wat de baan waard is, en het bedrijf weet wat ik kan. Dat start de relatie op basis van gelijkwaardigheid in plaats van wantrouwen." - "Senior Specialist" - "Sollicitant"

**CTASection:**
- Badge: "Deadline: Juni 2026"
- Titel: "Bereid Uw Organisatie Voor"
- Beschrijving: "Wachten tot 2026 is onverstandig. De voorbereiding kost tijd. Start nu met het op orde brengen van uw beloningsbeleid."
- Button 1: "Download het Dossier"
- Button 2: "Plan een Consultatie"
- Stats:
  1. "100+" - "Werknemers?" - "Rapportageplicht geldt"
  2. "Juni 2026" - "Deadline" - "Implementatie wetgeving"
  3. "27" - "EU-Lidstaten" - "Moeten implementeren"

**Footer:**
- Logo: "LT" + "Loontransparantie"
- Tagline: "Uw gids voor transparantie in beloning en compliance met EU-wetgeving."
- Kolom 1: "Informatie" - "Over loontransparantie", "EU-richtlijn", "Nederlandse wetgeving", "Actieplan"
- Kolom 2: "Resources" - "Download dossier", "Whitepapers", "Webinars", "FAQ"
- Kolom 3: "Contact" - "Neem contact op", "Plan een consultatie", "Support", "Locatie"
- Copyright: "© 2026 Loontransparantie. Alle rechten voorbehouden."
- Legal: "Privacy statement", "Cookie statement", "Voorwaarden"

---

## 13. Quick Reference

### Motion Animation Cheatsheet

```tsx
// Fade in from bottom
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}

// Fade in from left
initial={{ opacity: 0, x: -50 }}
animate={{ opacity: 1, x: 0 }}

// Scale in
initial={{ opacity: 0, scale: 0.9 }}
animate={{ opacity: 1, scale: 1 }}

// Hover lift
whileHover={{ y: -10 }}

// Hover scale
whileHover={{ scale: 1.05 }}

// Hover rotate
whileHover={{ rotate: 360 }}

// Continuous float
animate={{ y: [0, 20, 0] }}
transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}

// Continuous rotation
animate={{ rotate: 360 }}
transition={{ duration: 20, repeat: Infinity, ease: "linear" }}

// Pulse (scale + opacity)
animate={{
  scale: [1, 1.2, 1],
  opacity: [0.5, 1, 0.5],
}}
transition={{ duration: 3, repeat: Infinity }}
```

### Tailwind Utility Combinations

```tsx
// Glassmorphism
className="bg-white/10 backdrop-blur-md border border-white/20"

// Gradient text
className="bg-gradient-to-r from-[#C62828] to-[#8E24AA] bg-clip-text text-transparent"

// Card with hover
className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow"

// Centered absolute
className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"

// Responsive grid
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"

// Responsive text
className="text-4xl md:text-5xl lg:text-6xl"

// Button primary
className="bg-gradient-to-r from-[#C62828] to-[#8E24AA] text-white px-8 py-6 rounded-full shadow-2xl hover:opacity-90"

// Button secondary
className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 rounded-full backdrop-blur-sm"
```

### Color Palette Quick Copy

```tsx
// Reds
#C62828  // Primary red
#B71C1C  // Dark red

// Purple
#8E24AA  // Secondary purple

// Gradients
from-[#C62828] to-[#8E24AA]        // Main brand gradient
from-purple-500 to-purple-700      // Purple feature
from-yellow-400 to-yellow-600      // Yellow feature
from-red-500 to-red-700            // Red feature
from-gray-400 to-gray-600          // Gray (timeline)
from-red-600 to-purple-600         // Red-purple mix

// Opacity variations
bg-purple-500/20   // 20% opacity
bg-white/10        // 10% opacity
text-white/90      // 90% opacity
```

---

## Eindconclusie

Dit document bevat alle informatie die nodig is om de Loontransparantie landing page exact te reproduceren. Elk component is tot in detail beschreven met:

- Exacte class names
- Animatie parameters
- Layout structuur
- Responsive behavior
- Kleuren en styling
- Content teksten

Volg de stap-voor-stap checklist in sectie 10 voor een gestructureerde implementatie.

Bij problemen: raadpleeg sectie 11 (Troubleshooting) en sectie 13 (Quick Reference).
