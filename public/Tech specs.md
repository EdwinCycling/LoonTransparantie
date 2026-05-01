# Tech Specs KPI Agent

Dit document is leidend voor de technische implementatie van KPI-berekeningen in de HR & Payroll KPI Agent.

Doel:
- per KPI exact vastleggen welke data wordt gebruikt;
- stap voor stap beschrijven hoe API-data wordt omgezet naar HAM snapshots;
- borgen dat de YAML-definitie, backendlogica en AI-rapportage consistent blijven.

Algemene keten voor alle KPI's:
1. Exact API ophalen (met actieve division context).
2. Data mappen naar interne datasets.
3. Snapshotlogica toepassen op peildatum (T-0, T-12, T-24).
4. HAM snapshot JSON opbouwen.
5. YAML + HAM + Tech Specs toevoegen aan AI prompt.
6. Rapport teruggeven aan frontend met monitorstappen.

Onderhoudsregels:
- Voeg bij elke nieuwe KPI altijd een nieuw hoofdstuk toe.
- Houd API bronnen, formules en validatieregels gelijk aan de YAML.
- Werk backend en documentatie in dezelfde wijziging bij.

<!-- PAGE BREAK -->

# KPI 1 - Gemiddelde Leeftijd Actieve Medewerkers

## Functioneel doel
Bepaal de gemiddelde leeftijd van medewerkers die actief in dienst zijn op een peildatum.

## API-bronnen
- `/api/v1/{division}/payroll/Employments`
- `/api/v1/{division}/payroll/Employees`

## Snapshotlogica
Actief op peildatum X:
- `StartDate <= X`
- en `(EndDate >= X of EndDate is null)`

Per actieve medewerker:
- lees `BirthDate`;
- bereken leeftijd op peildatum;
- tel alleen geldige leeftijden mee.

## Formule
`Gemiddelde Leeftijd = gemiddelde(leeftijd_op_peildatum)`

## YAML-koppeling
- metric: `average_age_active_employees`
- unit: `years`
- parameters: `nu`, `vorig_jaar`, `trend`

## HAM-opbouw
Per medewerker in snapshot:
- `Identificatie.Geboortedatum`
- `Dienstverbanden.Dienstverband.Startdatum/Einddatum`
- `Capaciteit.*` voor aanvullende context

Header:
- `Header.Peildatum`
- `Header.Versie`

## AI-rapportage
Verplicht:
- Kerncijfers met tabel per beschikbare peildatum.
- Geen trendparagraaf als slechts 1 snapshot beschikbaar is.
- Executive Summary als laatste sectie.

## Validatie
- Controleer of actieve populatie > 0.
- Als geen populatie: benoem ontbrekende basisdata in rapport.

<!-- PAGE BREAK -->

# KPI 2 - Gemiddelde Contracturen Per Week Actieve Medewerkers

## Functioneel doel
Bepaal de gemiddelde contracturen per week van actieve medewerkers op peildatum.

## API-bronnen
- `/api/v1/{division}/payroll/Employments`
- `/api/v1/{division}/payroll/EmploymentSalaries`

## Snapshotlogica
Actieve populatie:
- zelfde selectie als KPI 1 op `Employments`.

Contracturen:
- gebruik actuele salarisregel op peildatum.
- veld: `AverageHoursPerWeek`.
- alleen positieve numerieke waarden meenemen.

## Formule
`Gemiddelde Contracturen = gemiddelde(AverageHoursPerWeek)`

## YAML-koppeling
- metric: `average_contract_hours_active_employees`
- unit: `hours_per_week`
- parameters: `nu`, `vorig_jaar`, `trend`

## HAM-opbouw
Per medewerker in snapshot:
- `Dienstverbanden.Dienstverband.Capaciteit.ContractUrenPerWeek`
- aanvullend: `FTEFactor`, `BrutoSalarisFulltime`, `Uurloon`

## AI-rapportage
Verplicht:
- Tabel met peildatum en gemiddelde contracturen.
- Zakelijke interpretatie bij korte modus.
- Geen trendtekst als trendvergelijking niet mogelijk is.

## Validatie
- Als `AverageHoursPerWeek` ontbreekt: noem ontbrekende velden expliciet.
- Als data incompleet is, geen aannames buiten beschikbare dataset.

<!-- PAGE BREAK -->

# KPI 3 - Jongste X Actieve Medewerkers

## Functioneel doel
Geef de jongste actieve medewerkers met naam en leeftijd op peildatum.

## API-bronnen
- `/api/v1/{division}/payroll/Employments`
- `/api/v1/{division}/payroll/Employees`

## Snapshotlogica
- Gebruik actieve populatie op peildatum.
- Bereken per medewerker leeftijd op peildatum.
- Sorteer oplopend op leeftijd.
- Pas list-size parameter `X` toe.

## Formule
`youngest_X = top_X(sort_asc(leeftijd_op_peildatum))`

## YAML-koppeling
- metric: `youngest_active_employees`
- parameter: `list_size = X`
- scope: `nu`

## HAM-opbouw
- Naam uit `Identificatie.VolleldigeNaam` (gemapte bronnaam).
- Leeftijd afgeleid uit `Identificatie.Geboortedatum` t.o.v. peildatum.

## AI-rapportage
- Toon tabel met minimaal: naam, leeftijd.
- Als X niet is opgegeven: gebruik standaard X=5.

## Validatie
- Als minder dan X medewerkers beschikbaar zijn: toon alleen beschikbare records.

<!-- PAGE BREAK -->

# KPI 4 - Oudste X Actieve Medewerkers

## Functioneel doel
Geef de oudste actieve medewerkers met naam en leeftijd op peildatum.

## API-bronnen
- `/api/v1/{division}/payroll/Employments`
- `/api/v1/{division}/payroll/Employees`

## Snapshotlogica
- Gebruik actieve populatie op peildatum.
- Bereken per medewerker leeftijd op peildatum.
- Sorteer aflopend op leeftijd.
- Pas list-size parameter `X` toe.

## Formule
`oldest_X = top_X(sort_desc(leeftijd_op_peildatum))`

## YAML-koppeling
- metric: `oldest_active_employees`
- parameter: `list_size = X`
- scope: `nu`

## HAM-opbouw
- Zelfde leeftijdsafleiding als KPI 3.
- Rapportage gebruikt geaggregeerde lijst uit snapshotresultaat.

## AI-rapportage
- Toon tabel met minimaal: naam, leeftijd.
- Als X niet is opgegeven: gebruik standaard X=5.

## Validatie
- Bij ontbrekende geboortedatum medewerker uitsluiten van ranking.

<!-- PAGE BREAK -->

# KPI 5 - Komende Verjaardagen (4 weken)

## Functioneel doel
Toon actieve medewerkers met een verjaardag in de komende 28 dagen, gesorteerd op dichtstbijzijnde datum.

## API-bronnen
- `/api/v1/{division}/payroll/Employments`
- `/api/v1/{division}/payroll/Employees`

## Snapshotlogica
- Gebruik actieve populatie op peildatum T-0.
- Bepaal per medewerker eerstvolgende verjaardag op basis van geboortedatum.
- Neem alleen records met `days_until` tussen 0 en 28.
- Sorteer oplopend op `days_until`.

## Formule
`upcoming_birthdays = sort_asc(filter(next_birthday_days <= 28))`

## YAML-koppeling
- metric: `upcoming_birthdays_4_weeks`
- parameter: `horizon_days = 28`
- sortering: `days_until_asc`

## HAM-opbouw
- Geboortedatum uit `Identificatie.Geboortedatum`.
- Outputrecord bevat:
  - naam
  - huidige leeftijd
  - leeftijd die medewerker wordt
  - datum eerstvolgende verjaardag
  - dagen tot verjaardag

## AI-rapportage
- Toon lijst of tabel met datumvolgorde van dichtbij tot verder weg.
- Benoem expliciet wanneer geen verjaardagen in komende 4 weken zijn gevonden.

## Validatie
- Onvolledige geboortedatum uitsluiten.
- Geen aannames doen buiten actieve populatie.

<!-- PAGE BREAK -->

# KPI Uitbreiding Standaard

Gebruik deze checklist bij elke nieuwe KPI:
1. Voeg metric toe in `public/yaml.json`.
2. Voeg backend-berekening toe in `server/server.ts`.
3. Voeg commandokaart toe in KPI Parameters paneel.
4. Voeg monitorstappen toe in live API monitor.
5. Voeg hoofdstuk toe in dit document met:
   - functioneel doel
   - API bronnen
   - snapshotlogica
   - formule
   - YAML-koppeling
   - HAM-opbouw
   - AI-rapportage
   - validatie

<!-- PAGE BREAK -->

# KPI Wizard en XML extensie

## Doel
De KPI Wizard is bedoeld om veilig nieuwe KPI's te ontwerpen zonder het bestaande HAM basismodel te breken.

## Nieuwe XML uitbreidingslaag
De HAM-definitie ondersteunt nu twee optionele uitbreidingen:
- `HRAnalysisModel/KPIExtensies`
- `HRAnalysisModel/Medewerkers/Medewerker/KPIAttributen`

Gebruik `KPIExtensies` voor metadata van de KPI:
- code
- naam
- categorie
- beschrijving
- bron-endpoints
- parameters
- formule
- contextpad
- medewerkerpad
- aggregatie

Gebruik `KPIAttributen` per medewerker voor de berekende of gemapte waarde:
- code
- label
- datatype
- waarde
- bronendpoint
- bronveld

## Ontwerpregels
1. Houd bestaande elementen zoals `Identificatie`, `Organisatie`, `Dienstverbanden` en `Operationeel` onaangetast.
2. Voeg nieuwe KPI-data alleen toe via de optionele extensielaag.
3. Gebruik altijd de echte Exact Online endpointnaam en het echte bronveld.
4. Zet alleen medewerker-specifieke waarden in `KPIAttributen`.
5. Zet KPI-brede metadata in `KPIExtensies`.

## Wizardflow
1. Definieer de managementvraag.
2. Zoek in de lokale Exact documentatie naar geschikte endpoints.
3. Kies het bronveld en definieer de formule.
4. Genereer XML snippet, YAML snippet en Tech Specs hoofdstuk.
5. Voeg pas daarna backendlogica en promptinstructies toe.

## Validatie
- Controleer dat de gekozen endpoint echt bestaat in Exact Online documentatie.
- Controleer dat het bronveld voorkomt in de properties van die endpoint.
- Gebruik `No data available` wanneer de bron leeg is.
- Laat fouten expliciet terugkomen met `Error: ...` als validatie of configuratie ontbreekt.
