import React, { useState, useMemo, useCallback } from 'react';
import type { InteractiveComponentProps } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { getAiClient } from '../../services/aiService';
import AiOutputBlock from '../AiOutputBlock';
import { SparklesIcon } from '../icons/SparklesIcon';

// Constants for the visualization
const WIDTH = 500;
const HEIGHT = 250;
const GLOBAL_MIN_X = 280;

// 1D Loss Function: y = f(x)
// A combination of a parabola (for a global minimum) and a cosine wave (for local minima)
const lossFn = (x: number): number => {
    const parabola = Math.pow(x - GLOBAL_MIN_X, 2) / 3000;
    const wave = Math.cos((x - GLOBAL_MIN_X) / 30) * 30;
    return parabola + wave + 60;
};

// Gradient (derivative) of the loss function: f'(x)
const gradientFn = (x: number): number => {
    const parabola_grad = (2 * (x - GLOBAL_MIN_X)) / 3000;
    const wave_grad = -Math.sin((x - GLOBAL_MIN_X) / 30);
    return parabola_grad + wave_grad;
};


const LossLandscapeNavigator: React.FC<InteractiveComponentProps> = ({ interactiveId }) => {
    const { user, addPoints, updateProgress } = useAuth();
    
    const [ballX, setBallX] = useState<number | null>(50);
    const [learningRate, setLearningRate] = useState(20);
    const [steps, setSteps] = useState(0);
    const [path, setPath] = useState<{ x: number; y: number }[]>(ballX ? [{ x: ballX, y: lossFn(ballX) }] : []);
    const [analysis, setAnalysis] = useState('');
    const [loadingAnalysis, setLoadingAnalysis] = useState(false);
    const [analysisError, setAnalysisError] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    
    const hasCompleted = user?.progress.completedInteractives.includes(interactiveId);
    
    // Generate the SVG path for the loss curve
    const landscapePath = useMemo(() => {
        let d = `M 0 ${lossFn(0)}`;
        for (let x = 1; x <= WIDTH; x++) {
            d += ` L ${x} ${lossFn(x)}`;
        }
        return d;
    }, []);

    const ballY = ballX !== null ? lossFn(ballX) : null;
    const currentGradient = ballX !== null ? gradientFn(ballX) : null;

    const handleReset = useCallback(() => {
        setIsRunning(false);
        setBallX(50);
        setSteps(0);
        setPath([{ x: 50, y: lossFn(50) }]);
        setAnalysis('');
        setAnalysisError('');
    }, []);

    // Set initial position on click
    const handleCanvasClick = (e: React.MouseEvent<SVGSVGElement>) => {
        if (isRunning) return;
        const svg = e.currentTarget;
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse());
        const newX = Math.max(0, Math.min(WIDTH, svgP.x));
        
        setBallX(newX);
        setPath([{ x: newX, y: lossFn(newX) }]);
        setSteps(0);
        setAnalysis('');
    };

    const takeStep = useCallback(() => {
        if (ballX === null) return;

        const grad = gradientFn(ballX);
        // Gradient Descent update rule
        const newX = ballX - learningRate * grad;
        const clampedX = Math.max(0, Math.min(WIDTH, newX));
        
        setBallX(clampedX);
        setPath(prev => [...prev, { x: clampedX, y: lossFn(clampedX) }]);
        setSteps(prev => prev + 1);
        
        // Stop if converged or too many steps
        if (Math.abs(grad) < 0.01 || steps + 1 >= 100) {
            setIsRunning(false);
        }

    }, [ballX, learningRate, steps]);

    const handleRun = () => {
        if (ballX === null) handleReset(); // If no ball, reset to start
        if (isRunning) {
            setIsRunning(false);
        } else {
            setIsRunning(true);
             if (!hasCompleted) {
                addPoints(25);
                updateProgress(interactiveId, 'interactive');
            }
        }
    };

    React.useEffect(() => {
        let interval: number;
        if (isRunning) {
            interval = window.setInterval(takeStep, 200);
        }
        return () => window.clearInterval(interval);
    }, [isRunning, takeStep]);

    const handleAnalyze = async () => {
        if (ballX === null || path.length === 0) return;
        setLoadingAnalysis(true);
        setAnalysisError('');

        const startPos = path[0];

        const prompt = `An AI model training with gradient descent has just finished a run.
- Starting parameter (x): ${startPos.x.toFixed(2)}
- Starting loss (y): ${startPos.y.toFixed(2)}
- Learning Rate: ${learningRate}
- Number of steps: ${steps}
- Final parameter (x): ${ballX.toFixed(2)}
- Final loss (y): ${lossFn(ballX).toFixed(2)}
- Final gradient: ${gradientFn(ballX).toFixed(2)}

Based on this data, analyze the training run. Did it converge successfully? Did it find the global minimum or get stuck in a local minimum? What is the significance of the learning rate in this process? Explain it like you are teaching a beginner, using markdown for structure. The global minimum is at x=${GLOBAL_MIN_X}.`;

        try {
            const ai = await getAiClient();
            const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            setAnalysis(response.text);
        } catch (e) {
            setAnalysisError('Could not get analysis from Gemini.');
            console.error(e);
        } finally {
            setLoadingAnalysis(false);
        }
    };

    // For rendering tangent line
    const tangentLine = useMemo(() => {
        if (ballX === null || ballY === null || currentGradient === null) return null;
        const length = 40;
        const angle = Math.atan(currentGradient);
        const dx = length * Math.cos(angle);
        const dy = length * Math.sin(angle) * (WIDTH / HEIGHT) ; // Adjust for aspect ratio
        return {
            x1: ballX - dx,
            y1: ballY - dy,
            x2: ballX + dx,
            y2: ballY + dy,
        };
    }, [ballX, ballY, currentGradient]);

    return (
        <div className="my-8 p-6 bg-brand-bg rounded-2xl shadow-neumorphic-out">
            <h4 className="font-bold text-lg text-brand-text mb-2 text-center">Interactive Loss Landscape Navigator</h4>
            <p className="text-center text-brand-text-light mb-4 text-sm">Click on the landscape to set a starting point. Adjust the learning rate and watch gradient descent find the minimum loss.</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                <div className="p-3 bg-brand-bg rounded-lg shadow-neumorphic-in">
                    <label htmlFor="learningRate" className="text-xs text-brand-text-light">Learning Rate: <span className="font-bold text-brand-text">{learningRate}</span></label>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-mono">1</span>
                        <input
                            id="learningRate"
                            type="range"
                            min="1"
                            max="80"
                            value={learningRate}
                            onChange={e => setLearningRate(Number(e.target.value))}
                            className="w-full h-2 bg-brand-bg rounded-lg appearance-none cursor-pointer shadow-neumorphic-in"
                            disabled={isRunning}
                        />
                        <span className="text-sm font-mono">80</span>
                    </div>
                </div>
                <div className="p-3 bg-brand-bg rounded-lg shadow-neumorphic-in text-center">
                     <p className="text-xs text-brand-text-light">Current Loss</p>
                     <p className="font-bold text-brand-primary text-xl">{ballY?.toFixed(2) ?? 'N/A'}</p>
                </div>
                <div className="p-3 bg-brand-bg rounded-lg shadow-neumorphic-in text-center">
                     <p className="text-xs text-brand-text-light">Steps</p>
                     <p className="font-bold text-brand-primary text-xl">{steps}</p>
                </div>
            </div>

            <div className="w-full bg-brand-bg rounded-lg shadow-neumorphic-in p-2">
                <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full cursor-crosshair" onClick={handleCanvasClick}>
                    <path d={landscapePath} stroke="#A78BFA" strokeWidth="2" fill="rgba(167, 139, 250, 0.1)" />
                    
                    {/* Minima markers */}
                    <circle cx={GLOBAL_MIN_X} cy={lossFn(GLOBAL_MIN_X)} r="5" fill="#10B981" />
                    <text x={GLOBAL_MIN_X} y={lossFn(GLOBAL_MIN_X) + 15} fontSize="10" textAnchor="middle" fill="#10B981">Global Minimum</text>
                    <circle cx={85} cy={lossFn(85)} r="4" fill="#F59E0B" />
                    <text x={85} y={lossFn(85) + 15} fontSize="10" textAnchor="middle" fill="#F59E0B">Local Minimum</text>
                     <circle cx={470} cy={lossFn(470)} r="4" fill="#F59E0B" />
                    <text x={470} y={lossFn(470) + 15} fontSize="10" textAnchor="middle" fill="#F59E0B">Local Minimum</text>

                    {/* Path taken */}
                    {path.length > 1 && (
                        <polyline points={path.map(p => `${p.x},${p.y}`).join(' ')} fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3"/>
                    )}
                    
                    {/* Tangent line */}
                    {tangentLine && (
                         <line {...tangentLine} stroke="#f87171" strokeWidth="1.5" />
                    )}

                    {/* Ball */}
                    {ballX !== null && ballY !== null && (
                         <circle cx={ballX} cy={ballY} r="6" fill="#ef4444" stroke="white" strokeWidth="1.5" className="transition-all duration-200 ease-linear"/>
                    )}
                </svg>
            </div>
             <div className="flex justify-center gap-4 mt-6">
                <button onClick={handleRun} className="px-6 py-2 w-40 text-center rounded-lg shadow-neumorphic-out hover:shadow-neumorphic-in font-semibold">
                    {isRunning ? 'Pause' : 'Run Descent'}
                </button>
                <button onClick={handleReset} className="px-6 py-2 rounded-lg shadow-neumorphic-out hover:shadow-neumorphic-in font-semibold">
                    Reset
                </button>
                <button onClick={handleAnalyze} disabled={loadingAnalysis || path.length < 2} className="inline-flex items-center gap-2 px-6 py-2 rounded-lg shadow-neumorphic-out hover:shadow-neumorphic-in disabled:opacity-50 font-semibold">
                   <SparklesIcon /> Analyze Run
                </button>
            </div>
            <AiOutputBlock
                content={analysis}
                isLoading={loadingAnalysis}
                error={analysisError}
                title="Gemini's Analysis"
                containerClassName="mt-6"
                placeholder="After a run, click 'Analyze Run' for Gemini's explanation."
            />
        </div>
    );
};

export default LossLandscapeNavigator;
