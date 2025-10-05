import React from 'react';

export default function Footer() {
  return React.createElement(
    'footer',
    { style: { marginTop: 32, padding: 16, borderTop: '1px solid #eee', fontSize: 12, color: '#666' } },
    '© ', new Date().getFullYear(), ' Mueblería Hermanos Jota'
  );
}
