# KPI Agent – Cursus Handleiding (voor collega’s)

Dit document is bedoeld als cursusmateriaal voor collega’s die zelf KPI’s willen bouwen en beheren in de HR & Payroll KPI Agent. Het beschrijft het volledige werkende proces: van gebruikersvraag in de agent, via Exact Online API’s, naar snapshots (HAM), YAML-definities en rapportage.

Deze handleiding is geschreven voor niet-technische én technische collega’s. Codevoorbeelden en termen zijn technisch, maar de stappen zijn zo concreet mogelijk.

## Inhoudsopgave
1. Doel en begrippen
2. Wat je krijgt in de applicatie (gebruikersreis)
3. Architectuur overzicht (frontend, backend, ngrok, Exact)
4. Dataflow: van Exact API naar rapport
5. YAML: opbouw en betekenis van alle velden
6. KPI types: “waarde”, “lijst”, “trend”, “vorig jaar”
7. Statisch versus Dynamisch (schakelaar in de agent)
8. Data dictionary (HR/Payroll bronnen en velden)
9. Werken met Exact Online API-documentatie (hoe je endpoints kiest)
10. KPI Builder Wizard: KPI’s ontwerpen, valideren en opslaan
11. Uitbreiden naar Finance met RGS (concept en aanpak)
12. Troubleshooting (meest voorkomende problemen)
13. Checklist: “klaar om te testen”
14. Voorstel cursusopbouw + oefeningen

---

## 1. Doel en begrippen

### Wat is de KPI Agent?
De KPI Agent is een chat-achtige interface waarin je in gewone taal vragen stelt zoals:
- “Wat is de gemiddelde leeftijd van actieve medewerkers?”
- “Laat de trend zien van gemiddelde contracturen.”
- “Geef de jongste 10 medewerkers.”

De agent haalt data op uit Exact Online (HR/Payroll), rekent KPI’s uit, en laat een rapport zien met tabellen en interpretatie.

### Belangrijkste begrippen
- **Exact Online**: bronsysteem (API) waar de HR/Payroll data vandaan komt.
- **Division**: administratie binnen Exact Online (bijna alle API-calls hebben dit nodig).
- **Snapshot**: een berekening op een peildatum (bijv. nu, 12 maanden terug, 24 maanden terug).
- **HAM**: “HR Analysis Model”: een interne datastructuur die snapshots opbouwt per medewerker.
- **YAML (yaml.json)**: configuratiebestand met KPI-definities (metric code, formule, unit, bronnen, voorbeelden).
- **Tech specs (Tech specs.md)**: technische procesbeschrijving per KPI (bron → mapping → regels).
- **Statisch / Dynamisch**: twee manieren om KPI’s te herkennen en te berekenen (schakelbaar in de UI).

---

## 2. Wat je krijgt in de applicatie (gebruikersreis)

### Stap A — Inloggen en koppelen
1. Open de applicatie.
2. Log in op de app (app-auth) als dit gevraagd wordt.
3. Koppel Exact Online via OAuth (login bij Exact).
4. Kies een **division** (administratie).

### Stap B — KPI Agent gebruiken
1. Kies “HR & Payroll KPI Agent”.
2. Ontgrendel met pincode (als geconfigureerd).
3. Kies:
   - **Analysemodus**: Statisch of Dynamisch
   - **Periode**: nu / vorig jaar / trend (waar beschikbaar)
   - **Antwoordlengte**: kort / lang
4. Stel je vraag en druk op “Verzenden”.

### Wat je terugkrijgt
De agent toont:
- Het antwoord (rapport)
- De gebruikte KPI/mode/period
- Een lijst met stappen (“API-calls / monitoring”), zodat je ziet wat er gebeurd is

---

## 3. Architectuur overzicht (frontend, backend, ngrok, Exact)

### Componenten
- **Frontend (Vite + React)**: draait lokaal op poort **3000**
- **Backend (Express + TypeScript)**: draait lokaal op poort **3020**
- **ngrok**: maakt een publieke HTTPS URL die naar je lokale frontend (3000) wijst. Dit is nodig omdat Exact Online een HTTPS redirect URL vereist voor OAuth.

### Waarom gaat OAuth via de frontend-poort (3000)?
In deze setup handelt de backend `/callback` af, maar de browser komt via de **ngrok URL** binnen op poort 3000 (frontend). De frontend proxy stuurt `/callback` door naar de backend.

### Starten voor testen (standaard)
Gebruik één van deze opties:
- Dubbelklik: `start_all.bat`
- Of: `npm run start:all`

Dat start:
- backend op 3020
- frontend op 3000
- ngrok naar 3000
en doet korte lokale checks met timeouts.

---

## 4. Dataflow: van Exact API naar rapport

Dit is de kernlogica die je moet begrijpen om KPI’s goed te bouwen.

### 4.1 Overzicht in 7 stappen
1. **Vraag**: gebruiker stelt vraag in de agent
2. **KPI selectie**:
   - Statisch: eenvoudige herkenning op keywords
   - Dynamisch: match op YAML-definities (metric + user_phrases)
3. **Data ophalen (Exact API)**:
   - HR/Payroll datasets worden opgehaald (parallel)
4. **Snapshot selectie**:
   - “nu” → alleen peildatum T-0
   - “vorig jaar” → peildatum T-12
   - “trend” → T-0 + T-12 + T-24 (indien beschikbaar)
5. **Mapping → HAM**:
   - interne modelstructuur per medewerker (en dienstverbanden)
6. **Berekening KPI**:
   - waarde KPI: gemiddeldes, aantallen, ratio’s
   - lijst KPI: top X, sorteringen, selecties
7. **Rapport**:
   - YAML + Tech specs + HAM snapshots worden aan de AI prompt toegevoegd
   - de AI genereert een rapport in een vast format

### 4.2 Waarom YAML + Tech specs + HAM?
Het doel is consistentie:
- YAML definieert KPI’s (wat is het en welke bronnen horen erbij)
- Tech specs beschrijft “hoe” we de data omzetten
- HAM snapshots zijn de concrete data die gebruikt wordt voor het antwoord

---

## 5. YAML: opbouw en betekenis van alle velden

Belangrijk: het bestand heet `public/yaml.json`, maar de inhoud is **YAML** (niet JSON). Het is bewust als tekst-config opgebouwd.

### 5.1 Structuur: één KPI-definitie
Elke KPI start met:

```yaml
- metric: "average_age_active_employees"
  category: "Demographics"
  description: "Gemiddelde leeftijd van actieve medewerkers op een gekozen peildatum."
  formula: "average(floor((peildatum - geboortedatum) / 365.25))"
  unit: "years"
  aggregation: "average"
  api_source:
    - "/api/v1/{division}/payroll/Employees"
    - "/api/v1/{division}/payroll/Employments"
  parameters:
    period:
      - "nu"
      - "vorig_jaar"
      - "trend"
  mapping_model: "HAM_2.0"
  xml_extension:
    context_path: "HRAnalysisModel/Medewerkers/Medewerker"
    employee_attribute_path: "HRAnalysisModel/Medewerkers/Medewerker/KPIAttributen/Attribuut"
    employee_attribute_code: "average_age_active_employees"
    employee_attribute_type: "decimal"
    source_field: "Identificatie.Geboortedatum"
  interpretation: "Stijgende trend duidt op vergrijzing; dalende trend op verjonging of instroom."
  validation_rules:
    - "Controleer populatie > 0."
    - "Controleer verplichte bronvelden."
  user_phrases:
    - "Wat is de gemiddelde leeftijd van actieve medewerkers nu?"
    - "Laat de trend in gemiddelde leeftijd zien."
```

### 5.2 Uitleg per veld
- `metric` (verplicht): unieke code; wordt gebruikt door agent en backend.
- `category`: groepeert KPI’s (bijv. Demographics, Capacity).
- `description`: wat de KPI betekent in gewone taal.
- `formula`: formule als “menselijke” beschrijving (wordt niet automatisch geëvalueerd als code, maar helpt consistentie).
- `unit`: eenheid (years, hours_per_week, employees, percent, euro).
- `aggregation`: hoe je meerdere waarden samenvoegt (bijv. average, sum, count). In de huidige implementatie is dit vooral documentatie/metadata.
- `api_source`: lijst met Exact API endpoints die nodig zijn.
- `parameters`: mogelijke instellingen voor de KPI:
  - `period`: nu/vorig_jaar/trend (peildatums)
  - KPI-specifiek: `list_size`, `horizon_days`, etc.
- `mapping_model`: welk intern model gebruikt wordt (hier: HAM_2.0).
- `xml_extension`: metadata om KPI’s als attribuut aan medewerkers te koppelen (voor uitbreidingen):
  - `context_path`: waar in HAM je je bevindt
  - `employee_attribute_*`: definieert een KPI-attribuut in het model
  - `source_field`: bronveld of pad waar je de waarde uit afleidt
- `interpretation`: zakelijke duiding (wat betekent stijging/daling).
- `validation_rules`: checks die je altijd moet doen (data aanwezig, populatie > 0).
- `user_phrases`: voorbeeldvragen waarmee dynamische matching kan werken.

### 5.3 Regels voor metric codes
Hanteer deze regels:
- alleen lowercase letters, cijfers en underscores
- beschrijvend maar kort
- stabiel: verander metric codes niet zomaar (anders breken links en referenties)

---

## 6. KPI types: “waarde”, “lijst”, “trend”, “vorig jaar”

### 6.1 Waarde-KPI (scalar)
Voorbeeld: gemiddelde contracturen.
Eigenschap:
- per snapshot 1 waarde (number of null)
In rapportage wil je:
- tabel met peildatum, populatie, waarde, unit

### 6.2 Lijst-KPI (ranking/top X)
Voorbeeld: jongste medewerkers.
Eigenschap:
- per snapshot een lijst (top X)
In rapportage wil je:
- tabel met rang, medewerker, waarde, detail

### 6.3 Periode: nu / vorig jaar / trend
- **nu**: huidige peildatum (T-0)
- **vorig_jaar**: peildatum 12 maanden terug (T-12)
- **trend**: meerdere peildatums (T-0, T-12, T-24) om verschil te tonen

Tip: voeg in YAML alleen period modes toe die je KPI echt kan ondersteunen. Als je KPI data maar 1 snapshot heeft, zet dan alleen `nu`.

---

## 7. Statisch versus Dynamisch (schakelaar in de agent)

### 7.1 Wat is “statisch”?
Statisch betekent:
- de backend herkent KPI’s met vaste logica (keywords)
- de berekeningen zijn hard-coded voor de bestaande KPI set

Pluspunten:
- voorspelbaar
- snel en robuust voor de KPI’s die al bestaan

### 7.2 Wat is “dynamisch”?
Dynamisch betekent:
- de backend leest KPI definities uit `yaml.json`
- de KPI wordt gekozen op basis van `metric` + `user_phrases`
- er wordt zoveel mogelijk berekend op basis van bestaande snapshotvelden

Pluspunten:
- nieuwe KPI’s uit de wizard zijn sneller “bruikbaar” zonder nieuwe hard-coded herkenning
- makkelijker uitbreidbaar

Belangrijk:
- voor sommige KPI’s is extra backend mapping nodig (als de benodigde data nog niet in snapshots zit)

### 7.3 Hoe gebruik je dit in de praktijk?
In de agent kies je bovenin:
- Statisch (bestaand)
- Dynamisch (nieuw)

Bij testen:
1. Stel dezelfde vraag in beide modi
2. Vergelijk uitkomst en de stappenlijst (apiCalls)
3. Gebruik dit als regressietest

---

## 8. Data dictionary (HR/Payroll bronnen en velden)

Deze data dictionary beschrijft de huidige datasets die de KPI Agent ophaalt en welke velden daadwerkelijk gebruikt worden in snapshots.

### 8.1 Exact endpoints die standaard worden opgehaald
De agent haalt deze 5 datasets op:
1. `payroll/Employees`
2. `payroll/Employments`
3. `payroll/EmploymentContracts`
4. `payroll/EmploymentSalaries`
5. `hrm/LeaveAbsenceHoursByDay`

### 8.2 Belangrijkste velden (bron → betekenis)
#### payroll/Employees
- `ID` (Guid): unieke medewerker
- `Code` (string): medewerker code (optioneel)
- `FullName` / `FirstName` / `LastName`: naam
- `BirthDate`: geboortedatum (nodig voor leeftijd / verjaardag)
- `Gender`: M/V/F/overig (mapping naar numeric in HAM)

#### payroll/Employments
- `Employee` (Guid): verwijzing naar Employee.ID
- `StartDate` / `EndDate`: dienstverbandperiode (actief op peildatum)

#### payroll/EmploymentContracts
- `Employee` (Guid)
- `Type`: contracttype (1=bepaald, 2=onbepaald, anders omschrijving)
- `TypeDescription`: fallback omschrijving
- `StartDate` / `EndDate`

#### payroll/EmploymentSalaries
- `Employee` (Guid)
- `AverageHoursPerWeek`: contracturen per week (belangrijk voor capaciteit)
- `ParttimeFactor`: fallback factor
- `HourlyWage`: uurloon (optioneel)
- `FulltimeAmount`: fulltime salaris (optioneel)
- `StartDate` / `EndDate`

#### hrm/LeaveAbsenceHoursByDay
- `Employee` (Guid)
- `Type` (number): type afwezigheid; huidige implementatie telt `Type=1` op als “ziekte”
- `Hours` (number): uren
- `Date` (date): dag

### 8.3 Interne afgeleide velden (berekend)
- **Actief op peildatum**: StartDate <= X en (EndDate is null of EndDate >= X)
- **Leeftijd op peildatum**: afgeleid uit BirthDate en peildatum
- **Komende verjaardag**: eerstvolgende verjaardag binnen 28 dagen
- **Contracturen per week**: uit `AverageHoursPerWeek` (positieve waarden)

### 8.4 HAM (HR Analysis Model) – belangrijkste paden
De agent bouwt per snapshot een object `HRAnalysisModel` met daaronder medewerkers.
Veelgebruikte paden:
- `HRAnalysisModel/Header/Peildatum`
- `HRAnalysisModel/Medewerkers/Medewerker/Identificatie/*`
- `HRAnalysisModel/Medewerkers/Medewerker/Dienstverbanden/Dienstverband/*`
- `.../Capaciteit/ContractUrenPerWeek`, `FTEFactor`, `BrutoSalarisFulltime`, `Uurloon`
- `.../Operationeel/ZiekteUren`

---

## 9. Werken met Exact Online API-documentatie (hoe je endpoints kiest)

### 9.1 Waar vind je de documentatie?
In deze repository zijn API docs beschikbaar (als markdown bestanden). Ze worden ook gebruikt door de wizard om endpoints te zoeken.

Je zoekt meestal op:
- onderwerp (bijv. “Employments”, “Employees”, “GLAccounts”)
- property (bijv. “BirthDate”, “AverageHoursPerWeek”)
- scope (rechten)

### 9.2 Wat moet je uitzoeken voor een nieuw endpoint?
Voor elk endpoint dat je wilt gebruiken:
1. **URI**: exacte route (bijv. `/api/v1/{division}/payroll/Employees`)
2. **Scope**: benodigde rechten (Exact Online scopes)
3. **Properties**: welke velden beschikbaar zijn
4. **Filters**: welke filters/queries ondersteund worden

### 9.3 Hoe kies je de “juiste” velden?
Praktische aanpak:
- start met de businessvraag (“Welke KPI wil ik meten?”)
- bepaal welke bronvelden je nodig hebt (bijv. StartDate/EndDate, BirthDate)
- kies het kleinste aantal endpoints dat die velden bevat
- beperk de velden via `$select` (performance)

---

## 10. KPI Builder Wizard: KPI’s ontwerpen, valideren en opslaan

### 10.1 Wat doet de wizard?
De wizard helpt om:
- KPI naam, metric code, beschrijving, businessvraag vast te leggen
- geschikte Exact endpoints te vinden
- YAML snippet + Tech specs snippet te genereren
- validaties te doen voordat je opslaat

### 10.2 “Opslaan” doet echt iets
Wanneer je bevestigt:
- er wordt een nieuw KPI blok toegevoegd aan `public/yaml.json`
- er wordt een nieuw hoofdstuk toegevoegd aan `public/Tech specs.md`

Belangrijk:
- metric code moet uniek zijn
- als er een fout is, krijg je een duidelijke error

### 10.3 Best practice: hoe ontwerp je een KPI
1. Schrijf de KPI als managementvraag (wat wil je beslissen?)
2. Definieer de populatie (wie telt mee?)
3. Definieer de peildatum/period (nu, vorig jaar, trend)
4. Definieer de berekening (sum/avg/count)
5. Definieer validaties (populatie > 0, velden aanwezig)
6. Voeg 5–10 `user_phrases` toe (help dynamische matching)

---

## 11. Uitbreiden naar Finance met RGS (concept en aanpak)

Dit project focust primair op HR/Payroll. Toch kun je dezelfde aanpak toepassen op financiële KPI’s. In Nederland wordt vaak **RGS** (Referentie GrootboekSchema) gebruikt als uniforme classificatie van grootboekrekeningen.

### 11.1 Belangrijk: wat is er al, en wat niet?
Wat er al is:
- een generieke manier om Exact API docs te raadplegen
- YAML-gedreven KPI-definities
- een “agent” die KPI’s kan selecteren en rapporteren

Wat er voor Finance nog ontbreekt (dus extra werk):
- een Finance datamodel (zoals HAM voor HR)
- backend mapping die financiële datasets ophaalt en naar snapshots omzet

### 11.2 Exact concepten die lijken op “RGS mapping”
Exact kent concepten zoals:
- **GLAccounts** (grootboekrekeningen)
- **GLClassifications** (classificaties)
- **GLAccountClassificationMappings** (mapping tussen rekening en classificatie/scheme)

In de documentatie zie je velden zoals:
- `GLSchemeCode`, `GLSchemeDescription`
- `ClassificationCode`, `ClassificationDescription`

Aanpak:
1. Controleer of jouw administratie een scheme gebruikt die overeenkomt met RGS (dit is administratie-afhankelijk).
2. Haal mappings op via `GLAccountClassificationMappings`.
3. Filter op het scheme dat je nodig hebt.
4. Koppel transacties/bedragen aan rekeningen en daarmee aan classificaties (RGS).
5. Definieer KPI’s in YAML met duidelijke `api_source`, `formula`, `unit` en `user_phrases`.

### 11.3 Voorbeeld (conceptueel)
Voorbeeld businessvraag:
- “Wat zijn de personeelskosten (RGS categorie) per maand, trend 24 maanden?”

Dit vereist meestal:
- transactie-endpoints (boekingen)
- grootboekrekeningen
- classificatie mappings
- aggregatie per periode

Let op: dit is een uitbreiding, geen “aan” knop. Hiervoor moet de backend uitgebreid worden om die datasets te laden en te aggregeren.

---

## 12. Troubleshooting (meest voorkomende problemen)

### 12.1 ngrok error: ERR_NGROK_8012
Betekenis:
- ngrok komt wel bij de agent, maar er draait niets op `localhost:3000`.
Oplossing:
- start de frontend op 3000 (gebruik `start_all.bat`)
- check lokaal met timeout:
  - `curl -I --max-time 2 http://127.0.0.1:3000/`

### 12.2 OAuth callback werkt niet
Controleer:
- `REDIRECT_URI` in `.env` eindigt exact op `/callback`
- Exact App Center heeft exact dezelfde Redirect URI
- frontend proxy routes `/callback` door naar de backend
- Vite `allowedHosts` staat de ngrok host toe

### 12.3 Backend status “offline”
Controleer:
- backend draait op 3020
- check:
  - `curl -i --max-time 2 http://127.0.0.1:3020/api/status`

### 12.4 “Geen division beschikbaar”
Betekenis:
- er is wel ingelogd, maar de administratie (division) is niet gezet.
Oplossing:
- kies division in de UI (Division selector)

### 12.5 “API key ontbreekt”
Betekenis:
- er is geen Gemini/Google API key ingesteld.
Oplossing:
- zet `GEMINI_API_KEY` of `GOOGLE_API_KEY` in `.env`

---

## 13. Checklist: “klaar om te testen”

1. Start alles:
   - `start_all.bat` of `npm run start:all`
2. Controleer lokaal (timeout):
   - `curl -I --max-time 2 http://127.0.0.1:3000/`
   - `curl -i --max-time 2 http://127.0.0.1:3020/api/status`
3. Start ngrok en kopieer de Forwarding URL.
4. Zet `REDIRECT_URI` correct in `.env` en Exact App Center.
5. Inloggen via Exact en division kiezen.
6. Test KPI Agent:
   - Statisch: gemiddelde leeftijd, contracturen, jongste X
   - Dynamisch: dezelfde vragen + nieuw gemaakte KPI’s

---

## 14. Voorstel cursusopbouw + oefeningen

### Module 1 — Intro & live demo (30–45 min)
- Wat is een KPI, wat is HAM, wat is YAML?
- Demo: gemiddelde leeftijd nu/trend

Oefening:
- Stel 5 vragen en label welke KPI-type het is (waarde/lijst/trend).

### Module 2 — YAML lezen en schrijven (45–60 min)
- YAML velden leren herkennen
- user_phrases schrijven
- period modes kiezen

Oefening:
- Voeg 5 user phrases toe aan een bestaande KPI (en test dynamische matching).

### Module 3 — Endpoint onderzoek (60 min)
- Exact docs doorzoeken
- properties en filters begrijpen
- endpoint selectie onderbouwen

Oefening:
- Zoek in de docs welke endpoint het veld “AverageHoursPerWeek” bevat.

### Module 4 — KPI bouwen met de wizard (60–90 min)
- KPI ontwerpen: populatie, definitie, validatie
- YAML + Tech specs opslaan
- Test in dynamische modus

Oefening:
- Bouw een KPI “gemiddeld uurloon (actief)”.

### Module 5 — Troubleshooting en governance (30–45 min)
- ngrok/callback problemen
- data ontbreekt: “No data available” correct afhandelen
- security: secrets, scopes, toegangscontrole

---

## Bijlagen en verwijzingen (in deze repo)
- YAML definities: `public/yaml.json`
- Tech specs per KPI: `public/Tech specs.md`
- HAM model voorbeeld: `public/HAM.xml`
- API documentatie (bron voor wizard): `public/Exact_Online_Full_API_Docs.md`
- Server logica (routes en mapping): `server/server.ts`
- KPI Wizard UI: `src/components/KpiBuilderWizard.tsx`
- KPI Agent UI: `src/app/Dashboard.tsx`

