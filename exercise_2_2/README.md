# Exercise 2.2 — Responsive Helpdesk Request Interface

## Case scenario
A campus IT helpdesk needs a small responsive interface where a user can describe a technical issue and review a confirmation summary. This is a local educational prototype for the Secure Application Development workshop at UNSIET, VBSPU Jaunpur. All sample requests are synthetic.

## Objective
Practice accessible form design, client-side input validation, safe rendering of user text, responsive layout, and clear status feedback with plain HTML, CSS, and JavaScript.

## Features
- Responsive helpdesk landing page, request form, confirmation panel, and footer.
- Required category, short title, description, urgency, and preferred contact method.
- Inline validation and character counts.
- Locally generated synthetic reference ID and on-page submission summary.
- Filterable static sample tickets by category, urgency, and status.
- No external requests or collection of contact details.

## Technology stack
HTML5, CSS3 (Grid, Flexbox, media queries), and vanilla JavaScript. No framework or server is required.

## Project structure
```text
exercise_2_2/
├── index.html
├── css/style.css
├── js/app.js
├── assets/
├── screenshots/
├── tests/validation_test_cases.md
└── README.md
```
`assets/` is available for future local assets. `screenshots/` is reserved for screenshots; none are included unless explicitly created in the environment.

## Run locally
Open `exercise_2_2/index.html` in a modern browser. Alternatively, from the project directory run `python -m http.server 8000` and visit `http://localhost:8000`. The page does not require network access.

## Form fields
- Category: Hardware, Software, Network, Account Access, Other.
- Short title: 5–100 characters.
- Description: 10–1,000 characters.
- Urgency: Low, Medium, High.
- Preferred contact method: Email, Phone, In-person. No actual contact details are requested.

## Validation rules
All five fields are required. Text is trimmed before validation, whitespace-only values are rejected, and title/description length limits are checked. Select values are checked against explicit allowlists. Invalid fields receive nearby text errors and `aria-invalid`; the first invalid control receives keyboard focus. Browser submission is prevented.

## Security practices
- No backend, external form action, or network submission.
- User-controlled text is rendered using `textContent` and safe DOM creation, never HTML parsing.
- Allowlisted select values, trimmed input, and length limits are checked before display.
- No `eval`, `Function`, secrets, personal contact details, or real campus data.
- Friendly validation feedback; no implementation errors are shown to users.

These are suitable educational client-side safeguards, not production security controls. Production systems must validate on a trusted server and use appropriate identity, authorization, storage, privacy, and abuse protections.

## Accessibility features
Semantic landmarks, a skip link, visible associated labels, keyboard-operable native controls, clear focus rings, inline errors referenced with `aria-describedby`, `aria-invalid`, and polite live regions for form status, summary, character counts, and filters. Errors include text and do not rely on color alone. Reduced-motion preferences are respected.

## Responsive design
The layout uses Grid and Flexbox, with breakpoints at 768px and 480px. On narrower screens the form and summary stack, the form fields and ticket cards become single-column, filters reflow, and buttons remain full-width and easy to tap. Intended viewport checks are 375 × 667 (mobile), 768 × 1024 (tablet), and 1440 × 900 (desktop); see the test matrix for execution status.

## Test cases
See [`tests/validation_test_cases.md`](tests/validation_test_cases.md) for the UI validation, injection-like text, boundary, keyboard, filter, and viewport test matrix. Actual results are marked only after execution.

## Known limitations
- No real backend or database; nothing persists after reload.
- No real authentication or authorization.
- No real email, phone, or SMS notifications.
- Request IDs are synthetic and generated locally; collisions are possible.
- Client-side validation can be bypassed and is insufficient for a production service.
- Screenshots depend on available browser tooling and are not required for the page to run.

## Future improvements
Add server-side validation, authenticated ticket storage, privacy review, a real support workflow, robust unique IDs, and automated accessibility/security checks only as part of an appropriately secured backend implementation.
