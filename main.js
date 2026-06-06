// Elements
const fromAmountInput = document.getElementById('fromAmount');
const toAmountInput = document.getElementById('toAmount');
const fromDropdownBtn = document.getElementById('fromDropdownBtn');
const toDropdownBtn = document.getElementById('toDropdownBtn');
const fromDropdownMenu = document.getElementById('fromDropdownMenu');
const toDropdownMenu = document.getElementById('toDropdownMenu');
const fromList = document.getElementById('fromList');
const toList = document.getElementById('toList');
const fromSearch = document.getElementById('fromSearch');
const toSearch = document.getElementById('toSearch');
const swapBtn = document.getElementById('swapBtn');
const rateText = document.getElementById('rateText');
const lastUpdated = document.getElementById('lastUpdated');
const statusBanner = document.getElementById('statusBanner');
const statusMessage = document.getElementById('statusMessage');

const fromCodeEl = document.getElementById('fromCode');
const fromFlagEl = document.getElementById('fromFlag');
const toCodeEl = document.getElementById('toCode');
const toFlagEl = document.getElementById('toFlag');

// State
let rates = {};
let baseCurrency = 'USD';
let fromCurrency = 'USD';
let toCurrency = 'EUR';
let isFetching = false;

// Initialize
async function init() {
    populateDropdowns();
    await fetchRates();
    setupEventListeners();
    updateUI();
    calculateFromTo();
}

// Fetch rates from API
async function fetchRates() {
    isFetching = true;
    hideError();
    try {
        const response = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        rates = data.rates;
        
        const date = new Date(data.time_last_update_unix * 1000);
        lastUpdated.textContent = `Updated: ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
        
    } catch (error) {
        showError('Unable to load live rates. Please check your connection.');
        console.error('Error fetching rates:', error);
    } finally {
        isFetching = false;
    }
}

// Convert
function convert(amount, from, to) {
    if (!rates[from] || !rates[to]) return 0;
    // Conversion formula: amount / rate[from] * rate[to]
    const result = (amount / rates[from]) * rates[to];
    return result;
}

// Update Inputs
function calculateFromTo() {
    const amount = parseFloat(fromAmountInput.value);
    if (isNaN(amount)) {
        toAmountInput.value = '';
        return;
    }
    const result = convert(amount, fromCurrency, toCurrency);
    toAmountInput.value = result.toFixed(2);
    updateRateText();
}

function calculateToFrom() {
    const amount = parseFloat(toAmountInput.value);
    if (isNaN(amount)) {
        fromAmountInput.value = '';
        return;
    }
    const result = convert(amount, toCurrency, fromCurrency);
    fromAmountInput.value = result.toFixed(2);
    updateRateText();
}

function updateRateText() {
    const rate = convert(1, fromCurrency, toCurrency);
    if (rate) {
        rateText.textContent = `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
    }
}

// Populate dropdowns
function populateDropdowns() {
    renderList(fromList, 'from', window.appCurrencies);
    renderList(toList, 'to', window.appCurrencies);
}

function renderList(listEl, type, data) {
    listEl.innerHTML = '';
    data.forEach(currency => {
        const li = document.createElement('li');
        li.className = 'dropdown-item';
        li.onclick = () => selectCurrency(type, currency);
        
        li.innerHTML = `
            <img src="https://flagcdn.com/w20/${currency.countryCode}.png" alt="${currency.code} Flag" class="dropdown-flag" onerror="this.src='https://via.placeholder.com/24x16?text=${currency.code}'">
            <div class="dropdown-item-text">
                <span class="dropdown-item-code">${currency.code}</span>
                <span class="dropdown-item-name">${currency.name}</span>
            </div>
        `;
        listEl.appendChild(li);
    });
}

function selectCurrency(type, currency) {
    if (type === 'from') {
        fromCurrency = currency.code;
        fromCodeEl.textContent = currency.code;
        fromFlagEl.src = `https://flagcdn.com/w20/${currency.countryCode}.png`;
        fromDropdownMenu.classList.remove('show');
    } else {
        toCurrency = currency.code;
        toCodeEl.textContent = currency.code;
        toFlagEl.src = `https://flagcdn.com/w20/${currency.countryCode}.png`;
        toDropdownMenu.classList.remove('show');
    }
    
    // Check if we need to fetch new base rates if fromCurrency changed
    // Since open.er-api provides rates relative to USD by default, 
    // and we just calculate cross-rates, we don't strictly need to fetch.
    // Cross-rate formula: amount / rate[from] * rate[to] works fine.
    
    calculateFromTo();
}

function updateUI() {
    // Initial UI state setup (can be expanded if needed)
}

// Event Listeners
function setupEventListeners() {
    fromAmountInput.addEventListener('input', calculateFromTo);
    toAmountInput.addEventListener('input', calculateToFrom);
    
    // Swap
    swapBtn.addEventListener('click', () => {
        const temp = fromCurrency;
        fromCurrency = toCurrency;
        toCurrency = temp;
        
        // Update UI Elements
        const tempCode = fromCodeEl.textContent;
        fromCodeEl.textContent = toCodeEl.textContent;
        toCodeEl.textContent = tempCode;
        
        const tempFlag = fromFlagEl.src;
        fromFlagEl.src = toFlagEl.src;
        toFlagEl.src = tempFlag;
        
        // Recalculate
        calculateFromTo();
    });

    // Dropdowns open/close
    fromDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toDropdownMenu.classList.remove('show');
        fromDropdownMenu.classList.toggle('show');
        if (fromDropdownMenu.classList.contains('show')) fromSearch.focus();
    });

    toDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        fromDropdownMenu.classList.remove('show');
        toDropdownMenu.classList.toggle('show');
        if (toDropdownMenu.classList.contains('show')) toSearch.focus();
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#fromDropdownContainer')) {
            fromDropdownMenu.classList.remove('show');
        }
        if (!e.target.closest('#toDropdownContainer')) {
            toDropdownMenu.classList.remove('show');
        }
    });

    // Search functionality
    fromSearch.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = window.appCurrencies.filter(c => 
            c.code.toLowerCase().includes(term) || c.name.toLowerCase().includes(term)
        );
        renderList(fromList, 'from', filtered);
    });

    toSearch.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = window.appCurrencies.filter(c => 
            c.code.toLowerCase().includes(term) || c.name.toLowerCase().includes(term)
        );
        renderList(toList, 'to', filtered);
    });
}

// Helpers
function showError(msg) {
    statusMessage.textContent = msg;
    statusBanner.classList.remove('hidden');
}

function hideError() {
    statusBanner.classList.add('hidden');
}

// Start
init();
