function getCardDataFromURL() {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('data');
    if (!encoded) return null;
    try {
        const decoded = decodeURIComponent(atob(encoded));
        return JSON.parse(decoded);
    } catch (e) {
        return null;
    }
}

function renderCard(card) {
    const cardEl = document.getElementById('eidCard');
    if (!card) {
        cardEl.innerHTML = `<div class="eid-card-error">Invalid or missing card data.</div>`;
        return;
    }
    // Choose icon based on template
    let icon = '<i class="fas fa-mosque eid-icon"></i>';
    if (card.template === 'modern') icon = '<i class="fas fa-moon eid-icon"></i>';
    if (card.template === 'family') icon = '<i class="fas fa-heart eid-icon"></i>';

    cardEl.innerHTML = `
        ${icon}
        <h2>Eid al-Adha Mubarak</h2>
        <div class="card-recipient">Dear ${card.recipient || 'Friend'},</div>
        <div class="card-message">${card.message || 'Wishing you a blessed Eid al-Adha!'}</div>
        <div class="card-sender">From, ${card.sender || 'Someone'}</div>
    `;
}

renderCard(getCardDataFromURL()); 