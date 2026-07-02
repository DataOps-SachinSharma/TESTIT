# GTRTeK HR Knowledge Base (Static Site)

A plain HTML/CSS/JS site covering GTRTeK LLC's HR policies for 2026 — built to be:

1. Hosted free on **GitHub Pages**.
2. Read directly by **GTRTeK AIVA** (Microsoft Copilot Studio) as a public website source, since every page is plain server-rendered HTML — no JavaScript is required to see the content.
3. Easy to extend — add a new page without touching a framework or build tool.

## Pages included

| Page | File | Covers |
|---|---|---|
| Home | `index.html` | Directory of every topic |
| Leave Policy | `leave-policy.html` | Standard leave entitlements, national holidays summary, how to apply |
| Holiday Calendar | `holiday-calendar.html` | National + 10 location-wise 2026 calendars |
| Comp Off Policy | `comp-off-policy.html` | Eligibility, approval email flow, usage limits |
| Health Insurance | `health-insurance.html` | Coverage, dependents, optional parent coverage |
| Recreational Benefits | `recreational-benefits.html` | ₹30,000 allowance, eligible items, claim form fields |
| TMS Portal Guide | `tms-portal.html` | Direct links for timecards, leave, approvals, history |
| HR & AIVA FAQ | `hr-faq.html` | Laptop process, annual meeting/town hall, career, performance, culture, employee spotlight |
| Search | `search.html` | Simple keyword filter across topic cards |

Shared styling lives in `assets/style.css`, shared behaviour (mobile nav, tabs, search filter) in `assets/script.js`.

---

## 1. Host it on GitHub Pages

```bash
# from inside this folder
git init
git add .
git commit -m "GTRTeK HR knowledge base"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

Then in your GitHub repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save.**

Your site will be live at:
```
https://<your-username>.github.io/<your-repo>/
```

(If you want it at the root of `https://<your-username>.github.io/`, name the repo exactly `<your-username>.github.io`.)

GitHub Pages typically takes 1–2 minutes to publish after each push.

---

## 2. Point Copilot Studio at it

In Copilot Studio, add the published GitHub Pages URL as a **public website** knowledge source for GTRTeK AIVA. Because every page is static HTML with real text (not JS-rendered), Copilot Studio's crawler can read it directly — no headless-browser rendering needed.

Tips for good grounding:
- Re-crawl / re-sync in Copilot Studio whenever you push content changes.
- Keep one topic per page (already done) — this keeps AIVA's citations focused.
- `sitemap.xml` is included to help the crawler discover every page.

---

## 3. Add more content (no build tools required)

**Option A — new standalone page (recommended for a new policy):**

1. Duplicate the closest existing page, e.g. `cp comp-off-policy.html new-policy.html`.
2. Edit the `<title>`, the `<h1>`, and the body content — everything else (header, footer, styles) already matches the rest of the site.
3. Add a link to it from `index.html`'s card grid, and to the `main-nav` list if it deserves top-level navigation. Search `main-nav` in `index.html`, `leave-policy.html`, etc. — it appears once per page (or edit `build.py`'s `NAV_ITEMS` list and re-run `python3 build.py` to regenerate every page's header at once).
4. Commit and push — GitHub Pages updates automatically.

**Option B — regenerate everything from `build.py`:**

`build.py` is the Python script that generated every page in this folder. If you're comfortable editing Python:

1. Add a new `..._content` string with your HTML.
2. Add a `write("new-page.html", head(...) + "<body>" + topbar("new-page.html") + ... + footer())` call.
3. Add the page to `NAV_ITEMS` (top navigation) if needed.
4. Run `python3 build.py` — it rewrites every `.html` file in the folder in one pass, so navigation stays identical across all pages.

**Option C — drop in a source document (Word/PDF/Excel) for someone else to convert:**

Put the raw file in a `/source-docs` folder in the repo (create it if it doesn't exist) purely for reference — GitHub Pages won't render `.docx`/`.pdf`/`.xlsx` as web pages, so any policy document still needs to become an `.html` page (Option A or B) to show up on the site and be readable by AIVA.

---

## Design notes

- Colors, fonts and spacing are defined once in `assets/style.css` (`:root` custom properties) — change the palette there and it updates everywhere.
- The site works with JavaScript disabled: content, links and tables all render server-side. JS only powers the mobile nav toggle, holiday-calendar location tabs, and the client-side search filter.
- Every page has a sticky in-page sub-navigation (left sidebar) generated per page — update the `<nav class="side-nav">` block in that page (or in `build.py`) if you add new sections.

## Local preview

No build step needed — just open `index.html` in a browser, or serve it locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```
