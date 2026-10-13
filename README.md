# Bamenda website

React + Vite rebuild of bamenda.com.ng. Three divisions (Formworks, Properties, Travels). Properties and Travels use enquiry forms instead of listings or packages. Submissions are sent by email through Formspree.

## Run it

```bash
npm install
cp .env.example .env   # then add the Formspree IDs
npm run dev            # http://localhost:5173
npm run build          # production build in /dist
```

## Pages

| Route | Purpose |
|---|---|
| `/` | Group hub: hero, three division cards, why Bamenda, contact CTA |
| `/about` | Company story and values (client copy needed) |
| `/formworks` | Services description, then **Request a quote** (goes to `/contact?division=formworks`) |
| `/properties` | Description and how it works, then a link to the enquiry form |
| `/properties/enquiry` | Rent / Lease / Purchase brief: type, location, budget (changes with intent), timing, must-haves, contact |
| `/travels` | Description and services, then a link to the enquiry form |
| `/travels/enquiry` | Who's travelling, purpose, destinations, dates, budget, services needed, passports, contact |
| `/contact` | General contact form (switches to a formwork quote form when Formworks is selected) plus direct contact details |

## Connect the forms (Formspree)

1. Create a free account at https://formspree.io with Bamenda's email.
2. Create 3 forms: **Properties**, **Travels**, **Contact**.
3. Copy each form ID (the part after `formspree.io/f/`) into `.env`.
4. Restart `npm run dev`. On your host (Vercel or Netlify), add the same 3 variables in the project's environment settings.

Each submission arrives with a descriptive subject line, e.g. `Property enquiry: Rent – Apartment / flat (Lagos)`.

## Before launch: replace placeholders

- `src/config/site.js`: phone, WhatsApp number, email, office address, opening hours, social links
- **Logo:** in `src/components/Layout.jsx`, swap the "B" mark for the real logo (`public/logo.svg`)
- **Photos:** `<Media kind="..." />` shows a coloured placeholder. Pass `src="/images/xyz.jpg"` to use a real photo.
- **Home stats strip** (`src/pages/Home.jsx`): replace with real numbers (years, projects, clients)
- **About page:** company story, founding year, leadership team
- **Formworks:** a projects gallery once photos are available

## Colours

Built around the logo's light green. All tokens are at the top of `src/styles.css`.

| Token | Hex | Use |
|---|---|---|
| `--green` | `#8cc63f` | Logo green: primary buttons, accents on dark backgrounds |
| `--forest` | `#123524` | Header CTA, hero, footer, dark buttons |
| `--green-ink` | `#3f7a14` | Green text and links on white (meets contrast) |
| `--sand` | `#f7f5ef` | Page background |
| `--formworks` | `#c98a2b` | Formworks accent (ochre) |
| `--properties` | `#2f7d4f` | Properties accent (leaf green) |
| `--travels` | `#1f7a8c` | Travels accent (teal) |

If the logo's exact green differs, change `--green` and everything else follows.

## Deploy

- **Vercel:** import the repo. `vercel.json` handles SPA routing.
- **Netlify:** build `npm run build`, publish `dist`. `public/_redirects` handles routing.
- **cPanel / shared hosting:** upload the contents of `dist/`, and add an `.htaccess` rewrite to `index.html`.
