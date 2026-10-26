# Asott Martech Solutions website

Static one-page site built from the Asott media kit. Plain HTML, CSS and JS, with no build step.

- `index.html` – all page content
- `styles.css` – styling (brand colours are the variables at the top)
- `script.js` – mobile menu
- `favicon.svg` – browser tab icon
- `contact.php` – contact form handler; emails each enquiry to info@asottmartech.com

Preview: open `index.html` in a browser. The contact form only sends from a host running PHP.

Deploy: upload all files to a host with PHP and mail enabled, such as Hostinger (`public_html`). Netlify, Vercel and GitHub Pages do not run PHP, so the form will not work there.

## Contact form email

- Enquiries go to `TO_EMAIL` in `contact.php` (info@asottmartech.com).
- They are sent from `FROM_EMAIL` (noreply@asottmartech.com). Keep this on your own domain. On Hostinger, create that mailbox, or change it to an existing one, so the mail passes SPF/DKIM checks and doesn't land in spam.
- Reply-To is set to the visitor's address, so hitting Reply answers them directly.
- After going live, send a test enquiry and check both the inbox and the spam folder.

The booking button links to https://calendly.com/asottmartechsolutions/30min, the link used in the media kit.
