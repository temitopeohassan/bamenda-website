// Small inline icon set (stroke icons, currentColor).
const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export const Icon = {
  Crane: (p) => (
    <svg {...base} {...p}><path d="M3 21h18M6 21V5l12 0M6 5l4-2v2M18 5v5M16 10h4v3h-4zM6 9h4M6 13h4M6 17h4" /></svg>
  ),
  Building: (p) => (
    <svg {...base} {...p}><path d="M4 21V8l8-5 8 5v13M9 21v-6h6v6M9 10h.01M15 10h.01" /></svg>
  ),
  Plane: (p) => (
    <svg {...base} {...p}><path d="M10.5 13.5L3 11l1.5-1.5 8 1 4-4.5c1-1 2.5-1.2 3-.7s.3 2-.7 3l-4.5 4 1 8L13.5 21l-2.5-7.5-3.5 3V19L6 20.5 5 17l-1.5-1L5 14.5h2.5z" /></svg>
  ),
  Key: (p) => (
    <svg {...base} {...p}><circle cx="8" cy="15" r="4" /><path d="M11 12l9-9M16 7l3 3M14 9l2 2" /></svg>
  ),
  Search: (p) => (
    <svg {...base} {...p}><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
  ),
  Shield: (p) => (
    <svg {...base} {...p}><path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z" /><path d="M9 12l2 2 4-4" /></svg>
  ),
  Handshake: (p) => (
    <svg {...base} {...p}><path d="M3 12l4-4 4 2 3-2 7 4M7 8l-4 8 3 2M21 12l-3 5-3-1-2 2-3-2-2 1" /></svg>
  ),
  Map: (p) => (
    <svg {...base} {...p}><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14" /></svg>
  ),
  Book: (p) => (
    <svg {...base} {...p}><path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2zM4 5v16M8 7h7" /></svg>
  ),
  Users: (p) => (
    <svg {...base} {...p}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5M16 4.5a3.5 3.5 0 010 7M18 14.5c1.9.7 3.1 2.5 3.5 5.5" /></svg>
  ),
  Ruler: (p) => (
    <svg {...base} {...p}><path d="M3 17L17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2" /></svg>
  ),
  Clock: (p) => (
    <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
  ),
  Phone: (p) => (
    <svg {...base} {...p}><path d="M5 3h4l2 5-2.5 1.5a11 11 0 006 6L16 13l5 2v4a2 2 0 01-2 2A16 16 0 013 5a2 2 0 012-2" /></svg>
  ),
  Mail: (p) => (
    <svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
  ),
  Pin: (p) => (
    <svg {...base} {...p}><path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
  ),
  Check: (p) => (
    <svg {...base} strokeWidth={2.6} {...p}><path d="M5 12l5 5L20 7" /></svg>
  ),
  Doc: (p) => (
    <svg {...base} {...p}><path d="M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6" /></svg>
  ),
  WhatsApp: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
      <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 2.9 2.9 0 00-.9 2.1 5 5 0 001.1 2.7 11.4 11.4 0 004.4 3.9c1.6.7 2.3.8 3.1.6a2.7 2.7 0 001.8-1.2 2.2 2.2 0 00.1-1.3c0-.1-.2-.2-.5-.3z" />
    </svg>
  ),
};
