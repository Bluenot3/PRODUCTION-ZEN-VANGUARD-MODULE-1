import React, { useState } from 'react';
import type { InteractiveComponentProps } from '../../types';
import { useAuth } from '../../hooks/useAuth';

const words = ['A', 'happy', 'dog', 'in', 'a', 'park', 'with', 'a', 'red', 'ball'];
const wordInfluences: { [key: string]: number } = {
    dog: 0.95,
    park: 0.88,
    happy: 0.75,
    red: 0.92,
    ball: 0.9,
    default: 0.1
};

const ExplainabilityPanel: React.FC<InteractiveComponentProps> = ({ interactiveId }) => {
    const { user, addPoints, updateProgress } = useAuth();
    const [hoveredWord, setHoveredWord] = useState<string | null>(null);

    const hasCompleted = user?.progress.completedInteractives.includes(interactiveId);

    const handleInteraction = () => {
        if (!hasCompleted) {
            addPoints(25);
            updateProgress(interactiveId, 'interactive');
        }
    }

    return (
        <div className="my-8 p-6 bg-brand-bg rounded-2xl shadow-neumorphic-out">
            <h4 className="font-bold text-lg text-brand-text mb-2 text-center">Explainability Panel (XAI)</h4>
            <p className="text-center text-brand-text-light mb-4 text-sm">Hover over words in the prompt to see their simulated influence on the generated image.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="p-4 bg-brand-bg rounded-lg shadow-neumorphic-in">
                    <h5 className="font-semibold text-brand-text mb-2">Prompt:</h5>
                    <p className="text-lg">
                        {words.map((word, i) => (
                            <span 
                                key={i} 
                                onMouseEnter={() => {
                                    setHoveredWord(word);
                                    handleInteraction();
                                }} 
                                onMouseLeave={() => setHoveredWord(null)}
                                className="cursor-pointer transition-colors p-1 rounded-md"
                                style={{ backgroundColor: `rgba(139, 92, 246, ${wordInfluences[word] || wordInfluences.default})`}}
                            >
                                {word}{' '}
                            </span>
                        ))}
                    </p>
                </div>
                 <div className="p-4 bg-brand-bg rounded-lg shadow-neumorphic-in text-center">
                    <h5 className="font-semibold text-brand-text mb-2">Influence Score</h5>
                    <div className="text-4xl font-bold text-brand-primary h-12">
                        {hoveredWord && ((wordInfluences[hoveredWord] || wordInfluences.default) * 100).toFixed(0) + '%'}
                    </div>
                    <p className="text-sm text-brand-text-light">{hoveredWord ? `Influence of "${hoveredWord}"` : 'Hover over a word'}</p>
                 </div>
            </div>
        </div>
    );
};

export default ExplainabilityPanel;
