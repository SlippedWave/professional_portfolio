// Email is stored reversed and base64-encoded so the plain address never appears
// in the HTML or the JS bundle, where regex-based harvesters look for it.
// It is only assembled at runtime in the browser.
const ENCODED_EMAIL = 'bW9jLmxpYW1nQDMwem5vZ3Jm';

export const getEmail = () => atob(ENCODED_EMAIL).split('').reverse().join('');

// Build the mailto link only when the visitor actually clicks
export const openMailClient = () => {
    window.location.href = `mailto:${getEmail()}`;
};
