import React, { useState, useMemo } from 'react';
import type { InteractiveComponentProps } from '../../types';
import { useAuth } from '../../hooks/useAuth';

const sampleData = `product,sales,region
Widget A,150,North
Widget B,200,South
Widget A,120,North
Widget C,75,West`;

const DataVisualizer: React.FC<InteractiveComponentProps> = ({ interactiveId }) => {
    const { user, addPoints, updateProgress } = useAuth();
    const [csv, setCsv] = useState(sampleData);

    const hasCompleted = user?.progress.completedInteractives.includes(interactiveId);

    const { headers, data, stats, error } = useMemo(() => {
        try {
            const lines = csv.trim().split('\n');
            if (lines.length < 2) return { headers: [], data: [], stats: {}, error: 'Not enough data to parse.' };

            const headers = lines[0].split(',');
            const data = lines.slice(1).map(line => {
                const values = line.split(',');
                const obj: Record<string, string> = {};
                headers.forEach((header, i) => {
                    obj[header] = values[i];
                });
                return obj;
            });
            
            const numericColumn = headers.find(h => data.every(row => !isNaN(parseFloat(row[h]))));
            
            let stats = {};
            if (numericColumn) {
                const values = data.map(row => parseFloat(row[numericColumn]));
                const sum = values.reduce((a, b) => a + b, 0);
                const avg = sum / values.length;
                stats = {
                    'Total Rows': data.length,
                    'Numeric Column': numericColumn,
                    'Average': avg.toFixed(2),
                    'Max': Math.max(...values),
                    'Min': Math.min(...values)
                };
            }


            return { headers, data, stats, error: null };
        } catch (e) {
            return { headers: [], data: [], stats: {}, error: 'Failed to parse CSV data.' };
        }
    }, [csv]);
    
    const handleDataChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCsv(e.target.value);
         if (!hasCompleted) {
            addPoints(10);
            updateProgress(interactiveId, 'interactive');
        }
    }

    return (
        <div className="my-8 p-6 bg-brand-bg rounded-2xl shadow-neumorphic-out">
            <h4 className="font-bold text-lg text-brand-text mb-2 text-center">Data Visualizer</h4>
            <p className="text-center text-brand-text-light mb-4 text-sm">Input CSV data to see a simple visualization and analysis.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h5 className="font-semibold text-brand-text mb-2">Input Data (CSV)</h5>
                    <textarea value={csv} onChange={handleDataChange} rows={8} className="w-full p-2 font-mono text-sm bg-brand-bg rounded-lg shadow-neumorphic-in" />
                </div>
                <div>
                    <h5 className="font-semibold text-brand-text mb-2">Visualization</h5>
                    <div className="p-2 bg-brand-bg rounded-lg shadow-neumorphic-in h-48 flex flex-col justify-end gap-2">
                        {error && <p className="text-red-500 text-center">{error}</p>}
                        {data.length > 0 && stats['Numeric Column'] && (
                            <div className="flex justify-around items-end h-full gap-2">
                                {data.map((row, i) => (
                                     <div key={i} className="flex-1 bg-brand-primary/80 rounded-t-md hover:bg-brand-primary transition-colors" style={{ height: `${(parseFloat(row[stats['Numeric Column']]) / stats['Max']) * 100}%`}}></div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="mt-4 p-2 bg-brand-bg rounded-lg shadow-neumorphic-in text-sm">
                        <h5 className="font-semibold text-brand-text mb-2">Stats</h5>
                        {Object.entries(stats).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                                <span className="text-brand-text-light">{key}:</span>
                                <span className="font-semibold text-brand-text">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataVisualizer;
