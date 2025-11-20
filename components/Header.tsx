import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { PointsIcon } from './icons/PointsIcon';
import { GraduationCapIcon } from './icons/GraduationCapIcon';
import { MagnifyingGlassIcon } from './icons/MagnifyingGlassIcon';
import { RefreshIcon } from './icons/RefreshIcon';

interface HeaderProps {
  completedSections: number;
  totalSections: number;
  onCommandPaletteToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ completedSections, totalSections, onCommandPaletteToggle }) => {
    const { user, resetProgress } = useAuth();
    const [isResetConfirmVisible, setIsResetConfirmVisible] = useState(false);
    const resetRef = useRef<HTMLDivElement>(null);
    const [pointAnims, setPointAnims] = useState<{ id: number; amount: number }[]>([]);


    const getInitials = (name: string) => {
        if (!name) return '';
        const names = name.split(' ');
        if (names.length > 1) {
            return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };
    
    const handleResetClick = () => {
        setIsResetConfirmVisible(prev => !prev);
    };

    const handleConfirmReset = () => {
        resetProgress();
        setIsResetConfirmVisible(false);
    };

    useEffect(() => {
        const handlePointsAdded = (e: Event) => {
            const { amount } = (e as CustomEvent).detail;
            setPointAnims(prev => [...prev, { id: Date.now(), amount }]);
        };
        document.addEventListener('pointsAdded', handlePointsAdded);
        return () => document.removeEventListener('pointsAdded', handlePointsAdded);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (resetRef.current && !resetRef.current.contains(event.target as Node)) {
                setIsResetConfirmVisible(false);
            }
        };

        if (isResetConfirmVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isResetConfirmVisible]);

    return (
        <header className="sticky top-0 z-40 w-full glass-header">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Left side */}
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold text-slate-700 tracking-tight">
                            <span className="text-brand-primary">ZEN</span> VANGUARD
                        </h1>
                    </div>

                    {/* Right side */}
                    {user && (
                        <div className="flex items-center gap-4 md:gap-6">
                             {/* Search Button */}
                            <button 
                                onClick={onCommandPaletteToggle}
                                className="hidden md:flex items-center gap-2 text-sm text-brand-text-light bg-white/50 border border-glass-stroke px-3 py-1.5 rounded-lg hover:bg-white/80 transition-colors"
                            >
                                <MagnifyingGlassIcon className="w-4 h-4" />
                                Search...
                                <kbd className="ml-2 text-xs font-sans font-semibold bg-gray-200/80 text-gray-500 px-1.5 py-0.5 rounded">⌘K</kbd>
                            </button>

                            {/* Points Badge */}
                            <div className="relative flex items-center gap-2 transition-transform hover:-translate-y-px">
                                <PointsIcon />
                                <span className="font-semibold text-sm text-brand-text-light">{user.points} Points</span>
                                {pointAnims.map(anim => (
                                    <span 
                                        key={anim.id}
                                        onAnimationEnd={() => setPointAnims(prev => prev.filter(p => p.id !== anim.id))}
                                        className="absolute top-0 left-1/2 -translate-x-1/2 font-bold text-pale-green animate-float-up-fade"
                                    >
                                        +{anim.amount}
                                    </span>
                                ))}
                            </div>

                            {/* Sections Badge */}
                            <div className="flex items-center gap-2 transition-transform hover:-translate-y-px">
                                <GraduationCapIcon />
                                <span className="font-semibold text-sm text-brand-text-light">
                                    {completedSections} / {totalSections} Sections
                                </span>
                            </div>
                            
                            {/* Separator */}
                            <div className="w-px h-8 bg-black/10 hidden md:block"></div>

                            {/* Reset Button & Confirmation */}
                            <div className="relative" ref={resetRef}>
                                <button onClick={handleResetClick} title="Reset Progress" className="p-2 rounded-full hover:bg-white/50 transition-colors">
                                    <RefreshIcon className="w-5 h-5 text-brand-text-light" />
                                </button>
                                {isResetConfirmVisible && (
                                    <div className="absolute top-full right-0 mt-2 w-60 bg-white/90 backdrop-blur-xl rounded-lg shadow-soft-xl p-4 z-50 animate-fade-in border border-glass-stroke">
                                        <p className="text-sm text-brand-text-light text-center mb-3">Are you sure you want to reset your progress?</p>
                                        <button 
                                            onClick={handleConfirmReset} 
                                            className="w-full bg-red-500 text-white font-bold py-2 rounded-lg animate-glow-red"
                                        >
                                            RESET
                                        </button>
                                    </div>
                                )}
                            </div>


                            {/* User Info & Avatar */}
                            <div className="flex items-center gap-3 group">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-semibold text-brand-text">{user.name}</p>
                                    <p className="text-xs text-brand-text-light">{user.email}</p>
                                </div>
                                {user.picture ? (
                                    <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full transition-transform duration-300 group-hover:scale-110" />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-brand-primary-light flex items-center justify-center text-white font-bold text-sm flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-soft-lg group-hover:ring-2 group-hover:ring-brand-primary/50 ring-offset-2 ring-offset-brand-bg">
                                        {getInitials(user.name)}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;