import React from 'react';

export const LabsIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M19.5 16L17 4H7L4.5 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 20H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 16H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 12C12.8284 12 13.5 11.3284 13.5 10.5C13.5 9.67157 12.8284 9 12 9C11.1716 9 10.5 9.67157 10.5 10.5C10.5 11.3284 11.1716 12 12 12Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);