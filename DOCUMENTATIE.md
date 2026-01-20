# Documentatie: Monitor Loontransparantie (EU-Richtlijn 2023/970)

Dit document beschrijft de werking, de datastructuur en de technische opzet van de Monitor Loontransparantie applicatie. Het dient als blauwdruk voor verdere uitbreiding en de integratie van externe API-bronnen.

## 1. Functionele Beschrijving

De applicatie is ontworpen om organisaties te helpen voldoen aan de rapportageverplichtingen van de **EU-richtlijn loontransparantie (2023/970)**. De kern van de app is het berekenen en visualiseren van de loonkloof tussen mannen en vrouwen binnen een organisatie.

### Kernfunctionaliteiten:
*   **Dashboards & Metrics:** Direct inzicht in de gemiddelde en mediane loonkloof voor basisloon en variabele beloningen.
*   **Hoover Formules:** Gebruikers kunnen over metrics (A t/m D) hooveren om de exacte wiskundige berekening te zien.
*   **Kwartielverdeling:** Visuele weergave van de genderverdeling over vier loonschalen (van laag naar hoog).
*   **Categorie-uitsplitsing:** Gedetailleerde tabel en grafiek die de loonkloof toont per functieniveau (bijv. Junior vs. Executive).
*   **Dataset Viewer:** Een modal waarin de ruwe data (geanonimiseerd) kan worden gecontroleerd.
*   **Exportmogelijkheden:** Genereren van een printvriendelijk rapport en een PDF-export van de volledige analyse.

---

## 2. Technisch Ontwerp

### Tech Stack:
*   **Frontend:** React (v19) met TypeScript.
*   **Styling:** Tailwind CSS (utility-first CSS).
*   **Visualisatie:** Recharts (voor de kwartiel- en categoriegrafieken).
*   **Icons:** Lucide-React.
*   **PDF Export:** `html2canvas` voor rendering en `jspdf` voor documentcreatie.

### Projectstructuur:
*   `types.ts`: Bevat alle interface definities (Employee, AnalysisReport, etc.).
*   `services/calculationService.ts`: De logica-laag die de ruwe dataset transformeert naar de rapportage-metrics.
*   `services/mockDataService.ts`: De huidige generator voor testdata.
*   `components/`: Herbruikbare UI componenten (MetricCard, Charts).
*   `App.tsx`: De centrale controller die staat bewaart en de UI coördineert.

---

## 3. Datamodel & Mock Data

### Employee Interface
Elk object in de dataset representeert één medewerker met de volgende eigenschappen:

| Veld | Type | Beschrijving |
| :--- | :--- | :--- |
| `id` | string | Uniek identificatienummer (bijv. EMP-1001). |
| `gender` | Enum | 'Man' of 'Vrouw'. |
| `age` | number | Leeftijd van de medewerker. |
| `jobCategory` | Enum | Categorie (Junior, Medior, Senior, Management, Directie). |
| `baseHourlyWage` | number | Het vaste bruto uurloon. |
| `variableHourlyComponent` | number | Bonus/toeslagen omgerekend naar bedrag per uur. |
| `totalHourlyWage` | number | Som van basis + variabel per uur. |
| `fte` | number | Arbeidsjaareenheid (0.0 t/m 1.0). |
| `annualHours` | number | FTE * 1976 (o.b.v. 38-urige werkweek). |
| `grossAnnualWage` | number | Totaal bruto jaarloon (totalHourlyWage * annualHours). |

### Huidige Opslag:
Op dit moment wordt de data gegenereerd in `mockDataService.ts` en opgeslagen in de **React State** (`useState`) in `App.tsx`. Bij een refresh van de pagina wordt de data opnieuw gegenereerd. Er is geen persistente database aanwezig.

---

## 4. Berekeningslogica (CalculationService)

De app volgt de standaard EU-berekeningsmethodiek:
1.  **Loonkloof %:** `(Gemiddelde Mannen - Gemiddelde Vrouwen) / Gemiddelde Mannen * 100`.
2.  **Mediane Kloof:** Zelfde formule, maar dan met de middelste waarde van de gesorteerde lijst.
3.  **Kwartielen:** De totale populatie wordt gesorteerd op `totalHourlyWage` en in 4 gelijke groepen verdeeld. Per groep wordt de %-verdeling Man/Vrouw berekend.

---

## 5. Roadmap: Van Mock naar Real-time API

Om deze app te koppelen aan een echt HR-systeem (zoals AFAS, Visma, of Workday), moet een AI-builder de volgende stappen ondernemen:

### A. API Integratie in `App.tsx`
Vervang de `handleGenerateData` functie door een `async` fetch call:

```typescript
const fetchData = async () => {
  try {
    const response = await fetch('https://api.jouw-hr-systeem.nl/v1/employees', {
      headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }
    });
    const data: Employee[] = await response.json();
    setEmployees(data);
    setReport(analyzeData(data));
  } catch (error) {
    console.error("Data kon niet worden geladen", error);
  }
};
```

### B. Data Mapping
Omdat externe API's vaak andere veldnamen gebruiken, moet er een 'Mapper' tussen komen die de externe data vertaalt naar de interne `Employee` interface. Let hierbij vooral op:
*   Omrekening van maandsalaris naar uurloon (indien nodig).
*   Correcte afhandeling van FTE en vakantiegeld.

### C. Backend Vereisten
De API moet bij voorkeur de volgende endpoints bieden:
*   `GET /employees`: Haalt de volledige lijst met benodigde velden op.
*   `GET /metadata`: Voor organisatie-specifieke parameters (zoals standaard werkweek uren).


