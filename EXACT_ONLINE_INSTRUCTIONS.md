# Exact Online Integratie Instructies (TypeScript/Node.js)

Dit document bevat de gedetailleerde stappen om een andere applicatie te koppelen aan Exact Online via Ngrok, gebaseerd op de implementatie in PreciesPlus.

## 1. Project Voorbereiding

De applicatie is gebouwd met **Node.js** en **TypeScript**. Zorg dat de volgende dependencies zijn geïnstalleerd:

```bash
npm install express axios dotenv express-session
npm install --save-dev typescript @types/express @types/node @types/express-session tsx
```

## 2. Omgevingsvariabelen (.env)

Gebruik een `.env` bestand in de root van je project om gevoelige gegevens en configuratie op te slaan. Dit is essentieel voor veiligheid en flexibiliteit.

**Voorbeeld .env structuur:**
```env
# Exact Online App Center Gegevens
CLIENT_ID=jouw_client_id_hier
CLIENT_SECRET=jouw_client_secret_hier

# Redirect URI (moet eindigen op /callback)
REDIRECT_URI=https://jouw-subdomein.ngrok-free.dev/callback

# Applicatie Instellingen
SESSION_SECRET=een_willekeurige_veilige_sleutel
PORT=3000
```

*Let op: De `REDIRECT_URI` moet exact overeenkomen met de URL die je in het Exact Online App Center hebt geconfigureerd.*

## 3. Exact Online App Center Setup

1.  Ga naar het [Exact Online App Center](https://apps.exactonline.com/).
2.  Maak een nieuwe App aan of bewerk een bestaande.
3.  **Redirect URI**: Stel deze in op de waarde van `REDIRECT_URI` uit je `.env` bestand. Bijvoorbeeld: `https://jouw-subdomein.ngrok-free.dev/callback`.
4.  Kopieer de **Client ID** en **Client Secret** naar je `.env` bestand.

## 4. Ngrok Gebruik

Exact Online vereist een HTTPS redirect URL voor OAuth2. Omdat je lokaal op HTTP draait, gebruik je Ngrok om een publieke HTTPS tunnel te maken naar je lokale poort (bijv. 3000).

```bash
ngrok http 3000
```

## 5. OAuth2 Implementatie Flow

### Stap A: Gebruiker naar Login sturen
Maak een route die de gebruiker doorstuurt naar de Exact Online login pagina.

```typescript
const redirectUri = process.env.REDIRECT_URI;
const authUrl = `https://start.exactonline.nl/api/oauth2/auth?client_id=${process.env.CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&force_login=0`;
```

### Stap B: Callback afhandelen en Token ophalen
Wanneer de gebruiker inlogt, stuurt Exact ze terug naar je `/callback` route met een `code`. Wissel deze code in voor een `access_token` en `refresh_token`.

```typescript
// Gebruik axios.post met 'application/x-www-form-urlencoded'
const tokenResponse = await axios.post('https://start.exactonline.nl/api/oauth2/token', new URLSearchParams({
  grant_type: 'authorization_code',
  client_id: process.env.CLIENT_ID!,
  client_secret: process.env.CLIENT_SECRET!,
  redirect_uri: process.env.REDIRECT_URI!,
  code: code // De code uit de URL query
}), {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});

// Sla de tokens op in de sessie
req.session.token = tokenResponse.data;
```

## 6. Divisie Ophalen (Administratie)

Je hebt een `division` ID nodig voor bijna alle API calls. Je kunt de beschikbare administraties ophalen via het `/Me` endpoint of direct de administraties lijst.

```typescript
const accessToken = req.session.token.access_token;

// 1. Haal huidige gebruiker op om de standaard divisie te vinden
const meRes = await axios.get('https://start.exactonline.nl/api/v1/current/Me', {
  headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json' }
});
const currentDivision = meRes.data.d.results[0].CurrentDivision;

// 2. Haal alle beschikbare administraties op
const divisionsRes = await axios.get('https://start.exactonline.nl/api/v1/system/Divisions', {
  headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json' }
});
const divisions = divisionsRes.data.d.results;
```

## 7. Data Ophalen met de Divisie

Zodra je de divisie hebt (bijv. `123456`), gebruik je deze in het pad van je API calls.

**Voorbeeld: Medewerkers ophalen**
```typescript
const division = '123456';
const employeesRes = await axios.get(`https://start.exactonline.nl/api/v1/${division}/payroll/Employees`, {
  headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json' }
});
```

## Belangrijke Tips voor de AI Builder:
*   **Headers**: Stuur altijd `Accept: 'application/json'` mee, anders krijg je XML terug.
*   **Sessies**: Gebruik `express-session` om de tokens vast te houden tussen requests.
*   **Foutafhandeling**: Exact Online API's kunnen fouten geven als velden niet bestaan of de divisie ongeldig is. Gebruik try-catch blokken.
*   **Types**: Gebruik in TypeScript interfaces voor de API responses om type-safety te garanderen.
