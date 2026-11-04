'use strict';
// Original line icons drawn for this site (24×24 grid, 1.75 px stroke, round joins).
// They are inlined once per page as an SVG sprite and referenced with <use>.
// Every icon is decorative (aria-hidden) and always sits next to a text label.

const S = 'fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"';
const sym = (id, body) => `<symbol id="i-${id}" viewBox="0 0 24 24" ${S}>${body}</symbol>`;

const symbols = [
  sym('windshield', '<path d="M4 17 6.5 8.5A2 2 0 0 1 8.4 7h7.2a2 2 0 0 1 1.9 1.5L20 17a1 1 0 0 1-1 1.2H5A1 1 0 0 1 4 17Z"/><path d="M7.5 15.5 9 10"/>'),
  sym('chip', '<path d="M4 17 6.5 8.5A2 2 0 0 1 8.4 7h7.2a2 2 0 0 1 1.9 1.5L20 17a1 1 0 0 1-1 1.2H5A1 1 0 0 1 4 17Z"/><path d="m12 12 2.5-2.5M12 12l3 1.5M12 12l-2 2.5M12 12l-2.5-1"/><circle cx="12" cy="12" r="1" fill="currentColor"/>'),
  sym('door', '<path d="M5 20V10.5L10.5 4H19v16H5Z"/><path d="M8 10.5 11.5 6.5H16v4H8Z"/><path d="M14 14.5h2"/>'),
  sym('quarter', '<path d="M4 18V9l4-5h12v14H4Z"/><path d="M14.5 7h3v6h-5l2-6Z"/>'),
  sym('back', '<path d="M5 16 7 9.2A2 2 0 0 1 8.9 8h6.2a2 2 0 0 1 1.9 1.2L19 16a1 1 0 0 1-1 1.3H6A1 1 0 0 1 5 16Z"/><path d="M8 11h8M7.5 13.5h9M7 16h10"/>'),
  sym('adas', '<path d="M7 15.5h10M6 18v-3l1.5-4.5A1.5 1.5 0 0 1 8.9 9.5h6.2a1.5 1.5 0 0 1 1.4 1L18 15v3"/><circle cx="12" cy="6" r="1"/><path d="M9.5 4.5a3.5 3.5 0 0 1 5 0M8 3a5.5 5.5 0 0 1 8 0"/>'),
  sym('phone', '<path d="M6.5 3h3l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5L17 13l4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 4.5 5a2 2 0 0 1 2-2Z"/>'),
  sym('sms', '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H9l-4.5 4v-4A1.5 1.5 0 0 1 4 14.5v-9Z"/><path d="M8 8.5h8M8 11.5h5"/>'),
  sym('mail', '<rect x="3.5" y="5.5" width="17" height="13" rx="1.5"/><path d="m4 7 8 6 8-6"/>'),
  sym('clock', '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),
  sym('menu', '<path d="M4 7h16M4 12h16M4 17h16"/>'),
  sym('close', '<path d="m6 6 12 12M18 6 6 18"/>'),
  sym('van', '<path d="M3 8.5A1.5 1.5 0 0 1 4.5 7H14l4 4h2.5A1.5 1.5 0 0 1 22 12.5V16h-2M3 16V8.5M8 16h7"/><circle cx="6" cy="17" r="2"/><circle cx="17.5" cy="17" r="2"/><path d="M14 7v4h4"/>'),
  sym('star', '<path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L12 16.9l-5.3 2.8 1.1-5.9-4.3-4.1 5.9-.8L12 3.5Z"/>'),
  sym('shield', '<path d="M12 3 5 5.5v5.3c0 4.3 2.9 8 7 9.7 4.1-1.7 7-5.4 7-9.7V5.5L12 3Z"/><path d="m9 12 2 2 4-4.5"/>'),
  sym('wrench', '<path d="M14.5 4.5a4.5 4.5 0 0 0-4.3 5.9L4 16.6a1.7 1.7 0 0 0 2.4 2.4l6.2-6.2a4.5 4.5 0 0 0 5.9-5.9l-2.4 2.4-2.1-.5-.5-2.1 2.4-2.4a4.5 4.5 0 0 0-1.4-.3Z"/>'),
  sym('road', '<path d="M8 20 10 4h4l2 16H8Z"/><path d="M12 7v2M12 11.5v2M12 16v2"/>'),
  sym('check', '<path d="m5 12.5 4.5 4.5L19 7.5"/>'),
  sym('print', '<path d="M7 8V4h10v4M7 16H4.5A1.5 1.5 0 0 1 3 14.5v-4A1.5 1.5 0 0 1 4.5 9h15a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-1.5 1.5H17"/><rect x="7" y="13" width="10" height="7"/>'),
  sym('copy', '<rect x="8" y="8" width="12" height="12" rx="1.5"/><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8"/>'),
  sym('house', '<path d="m4 11 8-7 8 7"/><path d="M6.5 9.5V20h11V9.5"/><path d="M10 20v-5h4v5"/>'),
  sym('building', '<rect x="5" y="4" width="14" height="16"/><path d="M9 8h2M13 8h2M9 12h2M13 12h2M9 16h2M13 16h2"/>'),
  sym('person', '<circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/>'),
];

const sprite = `<svg class="sprite" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><defs>${symbols.join('')}</defs></svg>`;

module.exports = { sprite };
