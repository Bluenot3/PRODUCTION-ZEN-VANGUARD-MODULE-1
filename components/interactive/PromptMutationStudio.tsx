import React, { useState } from 'react';
import type { InteractiveComponentProps } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { getAiClient } from '../../services/aiService';
import { WandIcon } from '../icons/WandIcon';
// FIX: Add import for AiOutputBlock
import AiOutputBlock from '../AiOutputBlock';

const PromptMutationStudio: React.FC<InteractiveComponentProps> = ({ interactiveId }) => {
    const { user, addPoints, updateProgress } = useAuth();
    const [basePrompt, setBasePrompt] = useState('a cat wearing a wizard hat');
    const [mutations, setMutations] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const hasCompleted = user?.progress.completedInteractives.includes(interactiveId);

    const handleGenerate = async () => {
        if (!basePrompt.trim()) {
            setError('Please enter a base prompt.');
            return;
        }
        setLoading(true);
        setError('');
        setMutations([]);

        const prompt = `You are a creative prompt engineer for an AI image generator. Take the user's simple idea and generate 5 diverse and creative variations. Each variation should be more detailed, exploring different styles, moods, and compositions. Return the result as a JSON array of strings.
        
User Idea: "${basePrompt}"`;

        try {
            const ai = await getAiClient();
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: { responseMimeType: "application/json" }
            });
            
            const resultText = response.text.trim();
            // Clean the response from markdown and parse
            const jsonString = resultText.replace(/^```json\s*|```\s*$/g, '');
            const parsedMutations = JSON.parse(jsonString);

            setMutations(parsedMutations);

            if (!hasCompleted) {
                addPoints(25);
                updateProgress(interactiveId, 'interactive');
            }
        } catch (e) {
            console.error(e);
            setError('Failed to generate mutations. The AI may have returned an invalid format. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="my-8 p-6 bg-brand-bg rounded-2xl shadow-neumorphic-out">
            <h4 className="font-bold text-lg text-brand-text mb-2 text-center">Prompt Mutation Studio</h4>
            <p className="text-center text-brand-text-light mb-4 text-sm">Enter a simple idea, and Gemini will evolve it into several creative, detailed prompts.</p>
            
            <div className="flex flex-col sm:flex-row items-center gap-2">
                <input
                    type="text"
                    value={basePrompt}
                    onChange={e => setBasePrompt(e.target.value)}
                    placeholder="Enter your simple idea..."
                    className="flex-grow w-full px-4 py-3 bg-brand-bg rounded-full focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text shadow-neumorphic-in"
                />
                <button onClick={handleGenerate} disabled={loading} className="w-full sm:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 bg-brand-primary text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-neumorphic-out hover:shadow-neumorphic-in transform hover:scale-95 disabled:opacity-50">
                    <WandIcon />
                    {loading ? 'Mutating...' : 'Mutate'}
                </button>
            </div>
            
            {error && <p className="text-center text-red-500 mt-4">{error}</p>}
            
            <div className="mt-6 space-y-3">
                {loading && (
                    Array.from({ length: 5 }).map((_, i) => (
                       <AiOutputBlock key={i} isLoading={true} title={`Mutation ${i + 1}`} />
                    ))
                )}
                {mutations.map((mutation, index) => (
                    <AiOutputBlock 
                        key={index}
                        content={mutation}
                        title={`Mutation ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default PromptMutationStudio;