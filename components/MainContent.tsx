import React from 'react';
import SectionRenderer from './SectionRenderer';
import type { Section } from '../types';

interface MainContentProps {
  title: string;
  sections: Section[];
  sectionRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
  visibleSections: Set<string>;
  scrollY: number;
}

const MainContent: React.FC<MainContentProps> = ({ title, sections, sectionRefs, visibleSections, scrollY }) => {
  
  const parallaxStyle = {
      transform: `translateY(${scrollY * 0.4}px)`,
      opacity: Math.max(0, 1 - scrollY / 250),
      willChange: 'transform, opacity'
  };

  const renderSections = (sectionsToRender: Section[], level: number = 0) => {
    return sectionsToRender.map((section) => (
      <div key={section.id} id={section.id} ref={(el) => { sectionRefs.current[section.id] = el; }} className="scroll-mt-28">
        <div className={`transition-opacity duration-700 ease-in-out ${visibleSections.has(section.id) ? 'opacity-100' : 'opacity-0'}`}>
            <div className="group glass-card p-8 md:p-12 mb-16 transition-all duration-300 hover:shadow-glowing-blue hover:-translate-y-2 relative">
              <div className="absolute inset-0 rounded-2xl p-px bg-gradient-to-br from-brand-blue/50 to-transparent opacity-20 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              {level === 0 && <div className="w-24 h-1.5 bg-brand-primary rounded-full mb-8 animate-slide-in-tilt" style={{ animationDelay: '200ms' }}></div>}
              <h2 className={`${
                  level === 0 ? 'text-3xl md:text-4xl' : 
                  level === 1 ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} 
                  font-bold text-brand-text mb-8 tracking-tight animate-slide-in-tilt`} style={{ animationDelay: '300ms' }}>
                {section.title}
              </h2>
              {section.content.map((item, idx) => (
                <SectionRenderer key={`${section.id}-${idx}`} item={item} section={section} itemIndex={idx} />
              ))}
            </div>
             {section.subSections && (
                <div className="ml-4 md:ml-8 border-l-2 border-brand-primary/10 pl-4 md:pl-8">
                    {renderSections(section.subSections, level + 1)}
                </div>
            )}
        </div>
      </div>
    ));
  };

  const overviewContent = sections.find(s => s.id === 'overview')?.content[0]?.content;

  return (
    <div className="py-12">
        <header className="mb-16" style={parallaxStyle}>
            <h1 className="text-4xl md:text-6xl font-extrabold text-brand-text tracking-tighter leading-tight">{title}</h1>
            <p className="mt-4 text-xl text-brand-text-light max-w-3xl">{typeof overviewContent === 'string' ? overviewContent : ''}</p>
        </header>
        {renderSections(sections)}
    </div>
  );
};

export default MainContent;