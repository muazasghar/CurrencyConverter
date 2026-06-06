# Currency Converter

A modern, responsive Currency Converter web application built with Vanilla JavaScript, HTML5, and Tailwind CSS. It features a clean, "Google-style" aesthetic, real-time conversion with two-way binding, and custom searchable currency dropdowns with flags.

## Features
- **Real-Time Exchange Rates**: Fetches live rates from an open API.
- **Two-Way Binding**: Updating the 'From' amount instantly updates the 'To' amount, and vice versa.
- **Searchable Dropdowns**: Easily find any currency with flags and names.
- **Swap Functionality**: Quickly swap 'From' and 'To' currencies.
- **Responsive Design**: Works perfectly on mobile and desktop devices.
- **Error Handling**: Friendly status banners alert users when rates fail to load.

## Getting Started

Because this application relies on Vanilla JavaScript and Tailwind CSS via a CDN, no build tools are required!

1. Clone or download this repository.
2. Open the `index.html` file in any modern web browser.
   - Example: `file:///path/to/project/index.html`
3. Start converting currencies!

## How to add your own API Key

By default, this application uses the free tier of [ExchangeRate-API](https://www.exchangerate-api.com/) via the open endpoint (`https://open.er-api.com/v6/latest/`). This endpoint is free and does not require an API key, making it excellent for testing, but it has some limitations (like update frequency).

If you want to use your own private API key for more accurate rates or a higher rate limit:

1. Sign up for an API key at [ExchangeRate-API](https://www.exchangerate-api.com/).
2. Open `main.js` in a code editor.
3. Locate the `fetchRates` function (around line 30):
   ```javascript
   const response = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`);
   ```
4. Replace the URL with your private API key URL. It should look like this:
   ```javascript
   const response = await fetch(`https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/${baseCurrency}`);
   ```
5. Save the file and refresh your browser.

## Technologies Used
- HTML5
- CSS3 (Tailwind CSS via CDN)
- Vanilla JavaScript (ES6+)
- ExchangeRate-API (Rates)
- FlagCDN (Flags)
