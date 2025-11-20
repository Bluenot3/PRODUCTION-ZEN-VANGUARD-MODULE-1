

import type { Curriculum } from '../types';

export const curriculumData: Curriculum = {
  title: 'Introduction to Machine Learning',
  summaryForAI:
    'ZEN AI VANGUARD is a comprehensive curriculum designed to take students from foundational AI concepts to advanced, real-world applications. It covers the architecture of AI, generative models for various modalities (text, image, audio, video, 3D), ethics, and hands-on projects. The course features interactive labs for concepts like prompt engineering, adversarial attacks, and AI ethics.',
  sections: [
    {
      id: 'overview',
      title: 'Course Overview',
      icon: 'BookOpen',
      content: [
        {
          type: 'paragraph',
          content:
            "Welcome to ZEN AI VANGUARD, a journey into the heart of artificial intelligence. This curriculum is designed not just to teach you the 'how' of AI, but the 'why'. We'll explore the philosophical underpinnings, the technical marvels, and the ethical considerations that shape this transformative technology. Prepare to build, innovate, and lead in the new frontier of AI.",
        },
        {
          type: 'heading',
          content: 'What You Will Learn',
        },
        {
          type: 'list',
          content: [
            'The core principles of AI model architecture and mechanics.',
            'How to engineer prompts for creative and technical generative tasks.',
            'The mechanics of text, image, audio, video, and 3D generation.',
            'The ethical frameworks necessary for responsible AI development.',
            'Hands-on project experience synthesizing your skills.',
          ],
        },
      ],
    },
    {
      id: 'ai-models',
      title: 'AI Models Landscape (2025)',
      icon: 'CubeTransparent',
      content: [
        {
          type: 'paragraph',
          content: 'The field of AI is characterized by a rapidly evolving landscape of models from various providers. Understanding their capabilities, costs, and specializations is key. This interactive explorer provides a snapshot of the major models available in late 2025.'
        },
        {
          type: 'interactive',
          content: '',
          component: 'ModelExplorer',
          interactiveId: 'model-explorer-1'
        }
      ]
    },
    {
      id: 'module-1',
      title: 'Module 1: The Intelligence Inside',
      icon: 'Sparkles',
      content: [
        {
          type: 'paragraph',
          content: 'Every intelligent system, whether biological or artificial, transforms information into action. This section reveals how that happens inside AI models: how data becomes patterns, how patterns become meaning, and how meaning becomes decisions. Through interactive labs, Gemini-powered visualizations, and simulations, you’ll literally watch intelligence form.',
        }
      ],
      subSections: [
        {
            id: '1-1',
            title: '1.1 Understanding the Machine Mind',
            content: [
                { type: 'heading', content: 'Core Concepts'},
                { type: 'list', content: [
                    'Neural networks imitate brain structures through layers of connected “neurons.”',
                    'Transformers changed everything by enabling attention—the ability to weigh relationships among all tokens at once.',
                    'Context windows define short-term memory; embeddings store long-term meaning.',
                    'Foundation models scale to trillions of parameters, each parameter a microscopic dial of understanding.',
                ]},
                { type: 'heading', content: 'Visualizations & Labs'},
                { type: 'interactive', content: '', component: 'NeuralEvolutionChronicle', interactiveId: 'neural-evolution-1'},
                { type: 'interactive', content: '', component: 'ModelArmsRaceTimeline', interactiveId: 'arms-race-1'},
                { type: 'interactive', content: '', component: 'ParameterUniverseExplorer', interactiveId: 'param-universe-1'},
                { type: 'interactive', content: '', component: 'ArchitectureBuilderSandbox', interactiveId: 'arch-builder-1'},
                { type: 'heading', content: 'The Power of the Key: API Access'},
                { type: 'paragraph', content: "Think of an API Key as the secret password that grants access to a powerful AI model like GPT-5. Without it, your requests are rejected. With it, you unlock the model's vast intelligence to generate text, images, and more. This simulation demonstrates the concept."},
                { type: 'interactive', content: '', component: 'ApiKeyChatSimulator', interactiveId: 'api-key-sim-1'},
            ]
        },
        {
            id: '1-2',
            title: '1.2 Exploring Prediction and Learning',
            content: [
                { type: 'paragraph', content: 'Drag the slider for “Hours Studied.” Gemini recalculates the predicted exam score in real time using a simple linear model: Score = 8 × hours + 15 ± noise. You’ll see how adding data improves confidence, introducing the idea of gradient descent.' },
                // FIX: Added missing 'content' property to interactive components.
                { type: 'interactive', content: '', component: 'SimplePredictiveModel', interactiveId: 'simple-model-1' },
                { type: 'paragraph', content: 'Training a model is like navigating a complex "loss landscape" to find the point of lowest error.'},
                // FIX: Added missing 'content' property to interactive components.
                { type: 'interactive', content: '', component: 'LossLandscapeNavigator', interactiveId: 'loss-landscape-1'},
            ]
        },
        {
            id: '1-3',
            title: '1.3 Ethics and Choice in Design',
            content: [
                 { type: 'paragraph', content: "You’re the lead engineer on an autonomous-vehicle system whose brakes have failed. You must choose between two outcomes. Gemini switches philosophical lenses (Utilitarian, Deontological, Virtue) and explains how each theory justifies or condemns your choice."},
                // FIX: Added missing 'content' property to interactive components.
                { type: 'interactive', content: '', component: 'EthicalDilemmaSimulator', interactiveId: 'dilemma-sim-1' },
            ]
        },
        {
            id: '1-4',
            title: '1.4 Data as Fuel',
            content: [
                { type: 'paragraph', content: "Visualize how raw data becomes “features.” Upload a CSV file. Gemini shows missing-value handling, normalization, and split into training/test sets. This builds intuition for why data quality matters more than model size." },
                // FIX: Added missing 'content' property to interactive components.
                { type: 'interactive', content: '', component: 'DataVisualizer', interactiveId: 'data-viz-1' },
            ]
        },
         {
            id: '1-5',
            title: '1.5 Vulnerability and Security',
            content: [
                { type: 'paragraph', content: "A photo of a panda registers 98% confidence—until imperceptible noise flips the label to gibbon. Lesson: intelligence is brittle when perception lacks context." },
                // FIX: Added missing 'content' property to interactive components.
                { type: 'interactive', content: '', component: 'AdversarialAttackSimulator', interactiveId: 'adversarial-sim-1' },
            ]
        },
        {
            id: '1-6',
            title: '1.6 Memory and Attention',
            content: [
                { type: 'paragraph', content: "Upload a paragraph; drag a slider to vary context from 10% to 100%. Gemini highlights which portion the model “sees” and summarizes only visible text—so you feel what attention really means." },
                // FIX: Added missing 'content' property to interactive components.
                { type: 'interactive', content: '', component: 'ContextWindowExplorer', interactiveId: 'context-window-1' },
                { type: 'paragraph', content: "Hold a five-turn chat. Click “Analyze Memory.” Gemini shades remembered tokens green, forgotten ones gray, showing how context falls off as length grows." },
                // FIX: Added missing 'content' property to interactive components.
                { type: 'interactive', content: '', component: 'MemoryDecayLab', interactiveId: 'memory-decay-1' },
            ]
        },
        {
            id: '1-7',
            title: '1.7 Interpretability and Bias',
            content: [
                { type: 'paragraph', content: "Enter a prompt (“a happy dog in a park”). After generation, a heatmap overlays which words drew focus. Gemini narrates causal reasoning: “the model weighted ‘dog’ → ‘park’ → ‘happy’ 0.83 correlation.”" },
                // FIX: Added missing 'content' property to interactive components.
                { type: 'interactive', content: '', component: 'ExplainabilityPanel', interactiveId: 'xai-panel-1' },
                { type: 'paragraph', content: "Type a shared prompt in multiple languages; compare outputs and tone. This lets you see cultural drift." },
                // FIX: Added missing 'content' property to interactive components.
                { type: 'interactive', content: '', component: 'EthicalBiasMirror', interactiveId: 'bias-mirror-1' },
            ]
        },
        {
            id: '1-8',
            title: '1.8 Hands-On Project',
            content: [
                { type: 'heading', content: 'Objective: Machine Mind Map XR' },
                { type: 'paragraph', content: "Synthesize what you’ve learned into a personal neural-architecture map." },
                { type: 'list', content: [
                    "Capture screenshots from: Token Visualizer, Explainability Panel, Architecture Builder, Ethical Bias Mirror.",
                    "Arrange them on a 3-D canvas.",
                    "Add voice-over narration generated by Gemini.",
                    "Export as an animated video or interactive WebGL card to your Digital Diary.",
                ]},
            ]
        },
        {
            id: '1-9',
            title: '1.9 Check Your Understanding',
            content: [
                { type: 'paragraph', content: 'Test your knowledge on the core concepts of this module.'},
                // FIX: Added missing 'content' property to interactive components.
                { type: 'interactive', content: '', component: 'EnergyCarbonTracker', interactiveId: 'energy-tracker-1'},
            ]
        },
        {
            id: '1-10',
            title: '1.10 Reflection & Export',
            content: [
                 { type: 'paragraph', content: "Gemini auto-generates a reflection summary combining your interactions, quiz results, and narration transcript. You’ll receive a downloadable PDF Learning Log, an embeddable replay of your most active simulation, and a ZEN Card verification hash certifying module completion." },
            ]
        }
      ]
    },
    {
        id: 'module-2',
        title: 'Module 2: Generative Intelligence',
        icon: 'Sparkles',
        content: [
            { type: 'paragraph', content: "You’ve learned how machines think. Now you’ll learn how they dream. Generative AI doesn’t simply process information—it creates. From text and art to sound, motion, and 3D space, these models convert data into new possibilities. This section turns you into a creative engineer, blending imagination with algorithmic precision." },
        ],
        subSections: [
            {
                id: '2-1',
                title: '2.1 The Science of Creation',
                content: [
                    { type: 'heading', content: 'Conceptual Primer'},
                    { type: 'list', content: [
                        "Generative models learn probability distributions, predicting what’s plausible next.",
                        "Diffusion models reverse noise into structure.",
                        "GANs pit a generator against a discriminator.",
                        "Transformers generate step-by-step reasoning chains.",
                        "Multimodal embeddings allow text, image, sound, and code to share one meaning space."
                    ]},
                    { type: 'heading', content: 'Visual Walkthrough – Diffusion Field Explorer'},
                    { type: 'paragraph', content: 'A simulation paints pure static; Gemini walks you through each denoising step until a clear image emerges. Use the sliders for steps, guidance scale, and sampling rate to feel how quality trades off with compute.'},
                    // FIX: Added missing 'content' property to interactive components.
                    { type: 'interactive', content: '', component: 'DiffusionFieldExplorer', interactiveId: 'diffusion-explorer-1'}
                ]
            },
            {
                id: '2-2',
                title: '2.2 Language as Design',
                content: [
                    { type: 'paragraph', content: "Words are code. Prompts are blueprints. Here you’ll learn to steer models from chaos to coherence."},
                    { type: 'heading', content: 'Interactive Studio – Prompt Architect Workbench'},
                     { type: 'paragraph', content: 'Design complex prompts with nested roles and constraints. Define tone, medium, and structure. Gemini explains how each token alters attention weights.'},
                    // FIX: Added missing 'content' property to interactive components.
                    { type: 'interactive', content: '', component: 'PromptArchitectWorkbench', interactiveId: 'prompt-architect-1'}
                ]
            },
            {
                id: '2-3',
                title: '2.3 Visual Generation & Design Systems',
                content: [
                    { type: 'heading', content: 'Core Concepts'},
                    { type: 'list', content: [
                        "Latent space = compressed imagination.",
                        "Style transfer manipulates embeddings.",
                        "Compositionality means generating multiple objects with consistent relationships.",
                        "ControlNet & LoRA fine-tune structure while keeping base knowledge stable."
                    ]},
                     { type: 'heading', content: 'Mini Apps'},
                    // FIX: Added missing 'content' property to interactive components.
                    { type: 'interactive', content: '', component: 'CompositorCanvasPro', interactiveId: 'compositor-canvas-1'},
                    // FIX: Added missing 'content' property to interactive components.
                    { type: 'interactive', content: '', component: 'SceneDirectorXR', interactiveId: 'scene-director-1'},
                    // FIX: Added missing 'content' property to interactive components.
                    { type: 'interactive', content: '', component: 'PatternGenomeSynthesizer', interactiveId: 'pattern-synth-1'},
                    // FIX: Added missing 'content' property to interactive components.
                    { type: 'interactive', content: '', component: 'LightingPhysicsLab', interactiveId: 'lighting-lab-1'},
                    // FIX: Added missing 'content' property to interactive components.
                    { type: 'interactive', content: '', component: 'EthicalStyleInspector', interactiveId: 'style-inspector-1'},
                ]
            },
             {
                id: '2-4',
                title: '2.4 Sound, Music & Voice',
                content: [
                    { type: 'heading', content: 'Audio Fundamentals'},
                    { type: 'paragraph', content: "Sound is data with rhythm. Waveforms ↔ vectors ↔ meaning."},
                    { type: 'heading', content: 'Mini Apps'},
                    // FIX: Added missing 'content' property to interactive components.
                    { type: 'interactive', content: '', component: 'MelodyMakerAI', interactiveId: 'melody-maker-1'},
                    // FIX: Added missing 'content' property to interactive components.
                    { type: 'interactive', content: '', component: 'VoiceMorphStudio', interactiveId: 'voice-morph-1'},
                    // FIX: Added missing 'content' property to interactive components.
                    { type: 'interactive', content: '', component: 'AmbientArchitect', interactiveId: 'ambient-architect-1'},
                    // FIX: Added missing 'content' property to interactive components.
                    { type: 'interactive', content: '', component: 'SpeechEmotionAnalyzer', interactiveId: 'speech-analyzer-1'},
                    // FIX: Added missing 'content' property to interactive components.
                    { type: 'interactive', content: '', component: 'AudioVisualSyncLab', interactiveId: 'av-sync-lab-1'},
                ]
            },
            {
                id: '2-5',
                title: '2.5 Video & Motion Synthesis',
                content: [
                    { type: 'heading', content: 'Key Ideas'},
                    { type: 'list', content: [
                        "Motion generation = temporal diffusion.",
                        "Consistency across frames requires latent coherence.",
                        "New models (Gemini 2.5 Video Beta, Runway Gen-3, Pika 1.0) render text-to-video in seconds."
                    ]},
                    { type: 'heading', content: 'Mini Apps'},
                    // FIX: Added missing 'content' property to interactive components.
                    { type: 'interactive', content: '', component: 'StoryboardForgePlus', interactiveId: 'storyboard-forge-1'},
                    // FIX: Added missing 'content' property to interactive components.
                    { type: 'interactive', content: '', component: 'MotionPhysicsPlayground', interactiveId: 'motion-physics-1'},
                    // FIX: Added missing 'content' property to interactive components.
                    { type: 'interactive', content: '', component: 'CinematicPromptSequencer', interactiveId: 'prompt-sequencer-1'},
                    // FIX: Added missing 'content' property to interactive components.
                    { type: 'interactive', content: '', component: 'GestureAnimator', interactiveId: 'gesture-animator-1'},
                    // FIX: Added missing 'content' property to interactive components.
                    { type: 'interactive', content: '', component: 'VoiceDrivenEditingDesk', interactiveId: 'voice-editor-1'},
                ]
            },
             {
                id: '2-6',
                title: '2.6 3D Creation & Spatial Computing',
                content: [
                    { type: 'paragraph', content: "AI now builds spaces you can inhabit. These experiences merge procedural generation, physics, and narrative."},
                    { type: 'heading', content: 'Mini Apps'},
                    // FIX: Added missing 'content' property to interactive components.
                    { type: 'interactive', content: '', component: 'DreamspaceConstructor', interactiveId: 'dreamspace-1'},
                    // FIX: Added missing 'content' property to interactive components.
                    { type: 'interactive', content: '', component: 'TextureAlchemyLab', interactiveId: 'texture-lab-1'},
                    // FIX: Added missing 'content' property to interactive components.
                    { type: 'interactive', content: '', component: 'PhysicsPainter', interactiveId: 'physics-painter-1'},
                    // FIX: Added missing 'content' property to interactive components.
                    { type: 'interactive', content: '', component: 'SpatialNarrativeEngine', interactiveId: 'spatial-narrative-1'},
                    // FIX: Added missing 'content' property to interactive components.
                    { type: 'interactive', content: '', component: 'SoundfieldComposer', interactiveId: 'soundfield-composer-1'},
                ]
            },
            {
                id: '2-7',
                title: '2.7 Ethics & Authenticity in Creation',
                content: [
                    { type: 'paragraph', content: "Every creation carries intent and impact. Gemini facilitates Socratic Dialogues where you debate ownership, authorship, and originality. You’ll explore bias in visual datasets, misinformation in video synthesis, and copyright frameworks emerging worldwide."},
                    { type: 'heading', content: 'Interactive Debates'},
                    // FIX: Added missing 'content' property to interactive components.
                    { type: 'interactive', content: '', component: 'InteractiveDebates', interactiveId: 'interactive-debates-1'},
                ]
            },
            {
                id: '2-8',
                title: '2.8 Hands-On Project',
                content: [
                     { type: 'heading', content: 'Objective: Creative Triptych XR'},
                     { type: 'paragraph', content: "Build a multimodal experience uniting text, image, and sound."},
                     { type: 'list', content: [
                        "Draft a concept brief.",
                        "Generate assets using at least three tools from this module.",
                        "Combine them in a timeline composer.",
                        "Add a Gemini-generated artist statement and metadata.",
                        "Publish to your Digital Diary Gallery.",
                     ]}
                ]
            },
            {
                id: '2-9',
                title: '2.9 Metrics & Mastery Check',
                content: [
                    { type: 'paragraph', content: "Check your mastery of the skills learned in this module against the target metrics."},
                ]
            },
            {
                id: '2-10',
                title: '2.10 Reflection & Export',
                content: [
                    { type: 'paragraph', content: "Gemini compiles all your generated assets into a Portfolio Showreel, layered with transitions. It includes prompts, outputs, ethics notes, performance metrics, and a personalized Gemini feedback audio track. Your ZEN Card verifies completion and embeds a miniature looping clip as your badge."},
                ]
            }
        ]
    }
  ],
};