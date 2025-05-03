'use client';
import React from 'react';

const Card = ({ title, children, footer, className }) => (
  <div className={`bg-white border border-gray-200 rounded-xl p-6 shadow-md ${className}`}>
    {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
    <div>{children}</div>
    {footer && <div className="mt-4 text-right">{footer}</div>}
  </div>
);

export default Card;
