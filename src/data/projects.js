export const projectCategories = ['ALL', 'ENGINE & TOOLS', 'AI / AUTOMATION', 'SYSTEMS & SOFTWARE'];

export const projectsData = [
  {
    id: 'aarkonam-world-engine',
    title: 'Aarkonam World Engine',
    category: 'ENGINE & TOOLS',
    status: 'In Active Development',
    statusType: 'active',
    image: '/images/game-neo-aarkonam-dusk.jpg',
    description:
      'A proprietary procedural metropolis generation framework designed for massive urban density, seamless multi-tier transit networks, and dynamic environmental simulation.',
    features: [
      'Procedural highway layout generation with continuous bezier flow',
      'High-throughput crowd and vehicle agent simulation',
      'Real-time day/dusk/night atmospheric light transitions',
      'Integrated spatial audio emitter mapping'
    ],
    techStack: ['WebGPU', 'Vulkan', 'C++', 'Custom Compute Shaders'],
    scope: 'Core Technology Research',
    metric: '1.2M Concurrent Agent Vectors @ 60 FPS'
  },
  {
    id: 'sentinel-neural-framework',
    title: 'Sentinel: Neural Agent Framework',
    category: 'AI / AUTOMATION',
    status: 'Research & Prototype',
    statusType: 'prototype',
    image: '/images/studio-grand-archive.png',
    description:
      'An intelligent behavioral framework enabling NPCs and virtual agents to exhibit situational memory, contextual voice synthesis, and goal-oriented problem-solving.',
    features: [
      'Short-term situational memory buffer with vector lookup',
      'Autonomous hierarchy-of-needs behavioral solver',
      'Real-time emotional valence & tension modeling',
      'Seamless fallback to deterministic scripted behavior'
    ],
    techStack: ['ONNX Runtime', 'Python', 'Vector DB', 'C# Systems'],
    scope: 'Applied AI Laboratory',
    metric: '< 4ms Decision Latency'
  },
  {
    id: 'chronos-volumetric-pipeline',
    title: 'Chronos Atmospheric Lighting',
    category: 'ENGINE & TOOLS',
    status: 'Production Ready',
    statusType: 'production',
    image: '/images/game-gothic-citadel.jpg',
    description:
      'High-fidelity volumetric fog, raymarched godrays, and dark-gothic ambient scattering engineered specifically for dramatic cathedral interiors and dark fantasy worlds.',
    features: [
      'Temporal reprojection for noise-free volumetric shafts',
      'Stained-glass color caustics and light projection',
      'Hardware-accelerated shadow map frustum slicing',
      'Adaptive quality scaling based on frame targets'
    ],
    techStack: ['HLSL', 'Compute Shaders', 'Vulkan / DirectX 12'],
    scope: 'Graphics Engine Integration',
    metric: 'Zero Visible Stutter On Ultra Presets'
  },
  {
    id: 'vanguard-studio-network',
    title: 'Nexus Studio Telemetry Hub',
    category: 'SYSTEMS & SOFTWARE',
    status: 'In Active Development',
    statusType: 'active',
    image: '/images/home-background.png',
    description:
      'A distributed creative telemetry suite empowering distributed game developers to inspect build health, run automated playtests, and collaborate in real-time.',
    features: [
      'Zero-latency distributed asset review streams',
      'Automated build validation & crash trace reporting',
      'Cryptographically secure build distribution nodes',
      'Cross-platform telemetry dashboards'
    ],
    techStack: ['React', 'WebSockets', 'Go', 'Tailored Microservices'],
    scope: 'Studio Production Infrastructure',
    metric: 'Sub-15ms Synchronization'
  }
];
