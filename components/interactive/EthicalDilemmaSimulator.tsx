import React, { useState } from 'react';
import type { InteractiveComponentProps } from '../../types';
import { useAuth } from '../../hooks/useAuth';

type Framework = 'Utilitarian' | 'Deontological' | 'Virtue';

const outcomes = {
    A: {
        Utilitarian: 'The greatest good for the greatest number. Sacrificing one to save five is the logical choice.',
        Deontological: 'Violates the rule "do not kill". Taking an action that directly causes harm is impermissible, regardless of outcome.',
        Virtue: 'A virtuous agent might struggle. What does a courageous or compassionate choice look like? There is no clear answer.',
    },
    B: {
        Utilitarian: 'A less optimal outcome. Five lives are lost to save one, resulting in a net loss of well-being.',
        Deontological: 'Upholds the rule "do not kill" by inaction. You did not directly cause the harm, making it the morally correct choice.',
        Virtue: 'Choosing inaction could be seen as cowardly or as wisely avoiding playing God. The virtuous path is ambiguous.',
    }
};

const EthicalDilemmaSimulator: React.FC<InteractiveComponentProps> = ({ interactiveId }) => {
    const { user, addPoints, updateProgress } = useAuth();
    const [choice, setChoice] = useState<'A' | 'B' | null>(null);
    const [framework, setFramework] = useState<Framework>('Utilitarian');

    const hasCompleted = user?.progress.completedInteractives.includes(interactiveId);

    const handleChoice = (madeChoice: 'A' | 'B') => {
        setChoice(madeChoice);
        if (!hasCompleted) {
            addPoints(25);
            updateProgress(interactiveId, 'interactive');
        }
    };
    
    return (
        <div className="my-8 p-6 bg-brand-bg rounded-2xl shadow-neumorphic-out">
            <h4 className="font-bold text-lg text-brand-text mb-2 text-center">Ethical Dilemma Simulator</h4>
            <p className="text-center text-brand-text-light mb-4">An autonomous vehicle's brakes have failed. It is heading towards five pedestrians. You can steer it onto a different path, where there is one pedestrian. What do you do?</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button onClick={() => handleChoice('A')} disabled={!!choice} className="p-4 bg-brand-bg rounded-lg shadow-neumorphic-out text-center disabled:opacity-50 hover:shadow-neumorphic-in">
                    <h5 className="font-bold text-brand-text">Choice A: Steer</h5>
                    <p className="text-sm text-brand-text-light">Sacrifice the one person to save the five.</p>
                </button>
                 <button onClick={() => handleChoice('B')} disabled={!!choice} className="p-4 bg-brand-bg rounded-lg shadow-neumorphic-out text-center disabled:opacity-50 hover:shadow-neumorphic-in">
                    <h5 className="font-bold text-brand-text">Choice B: Do Nothing</h5>
                    <p className="text-sm text-brand-text-light">Allow the vehicle to continue on its path, killing five.</p>
                </button>
            </div>

            {choice && (
                <div className="mt-6 p-4 bg-brand-bg rounded-lg shadow-neumorphic-in animate-fade-in">
                    <h5 className="font-semibold text-brand-text mb-3 text-center">Analysis of Your Choice</h5>
                    <div className="flex justify-center gap-2 mb-3">
                        {(Object.keys(outcomes.A) as Framework[]).map(f => (
                             <button key={f} onClick={() => setFramework(f)} className={`px-3 py-1 text-sm rounded-full ${framework === f ? 'bg-brand-primary text-white' : 'bg-brand-bg shadow-neumorphic-out-sm'}`}>{f}</button>
                        ))}
                    </div>
                    <div className="text-center p-3 bg-brand-bg rounded-lg shadow-inner-sm">
                        <p className="font-bold text-brand-primary mb-1">{framework} Ethics:</p>
                        <p className="text-brand-text-light">{outcomes[choice][framework]}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EthicalDilemmaSimulator;
