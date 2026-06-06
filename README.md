# Currency Converter

A responsive Currency Converter web application built with Vanilla JavaScript, HTML5, and local CSS. It features a modern UI, bidirectional conversion inputs, and searchable currency dropdowns with flag icons.

## Features
- **Live Exchange Rates**: Fetches rates from the open ExchangeRate-API endpoint.
- **Bidirectional Conversion**: Changing either the source or target amount updates the other field instantly.
- **Searchable Currency Selectors**: Filter currencies by code or name.
- **Swap Button**: Swap the selected currencies in one click.
- **Responsive Layout**: Works well on mobile and desktop screens.
- **Error Handling**: Displays an inline status banner if rates fail to load.

## Getting Started

This application is static and does not require build tools or installation.

1. Clone or download this repository.
2. Open the `index.html` file in any modern web browser.
   - Example: `file:///path/to/project/index.html`
3. Start converting currencies.

## How it works

- `index.html` contains the page structure and connects the app assets.
- `style.css` contains the custom visual styling.
- `currencies.js` provides the available currency list and flag codes.
- `main.js` handles live rate fetching, conversion logic, dropdown behavior, and UI updates.

## Using your own API Key

The app currently uses the ExchangeRate-API open endpoint (`https://open.er-api.com/v6/latest/`) which does not require an API key.

If you want to use a private API key instead:

1. Sign up for an API key at [ExchangeRate-API](https://www.exchangerate-api.com/).
2. Open `main.js`.
3. Find the `fetchRates` function:
   ```javascript
   const response = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`);
   ```
4. Replace it with your API key URL:
   ```javascript
   const response = await fetch(`https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/${baseCurrency}`);
   ```
5. Save and refresh the page.

## Technologies Used
- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- ExchangeRate-API
- FlagCDN
