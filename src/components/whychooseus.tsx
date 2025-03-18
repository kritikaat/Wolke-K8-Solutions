import { InfiniteMovingCards } from "./ui/infinite-moving-cards"

// SVG Icons as inline components
const CloudIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
  </svg>
);

const ChartBarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const ServerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
  </svg>
);

const CogIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const LightningBoltIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const features = [
  {
    "image": "/whycooseus/automated-scaling-svg.svg",
    "description": "Automatically scale your Kubernetes resources up or down based on workload demands, ensuring optimal performance without overprovisioning.",
    "title": "Automated Scaling for Workload Changes",
    "icon": <CloudIcon />,
    "color": "from-blue-600 to-indigo-600"
  },
  {
    "image": "/whycooseus/cost-visibility-svg.svg",
    "description": "Gain detailed insights into resource usage with granular cost allocation across teams, projects, and namespaces.",
    "title": "Cost Breakdown & Visibility",
    "icon": <ChartBarIcon />,
    "color": "from-emerald-600 to-teal-600"
  },
  {
    "image": "/whycooseus/unified-monitoring-svg.svg",
    "description": "Monitor costs across all your cloud services in one unified dashboard for comprehensive financial oversight.",
    "title": "Full Cost Monitoring Across Services",
    "icon": <ServerIcon />,
    "color": "from-purple-600 to-violet-600"
  },
  {
    "image": "/whycooseus/optimization-insights-svg.svg",
    "description": "Leverage AI-powered recommendations to optimize resource allocation, balancing performance needs with cost efficiency.",
    "title": "Smart Cost vs. Performance Optimization",
    "icon": <CogIcon />,
    "color": "from-amber-600 to-orange-600"
  },
  {
    "image": "/whycooseus/alerts-governance-svg.svg",
    "description": "Set budget thresholds and receive instant alerts when spending approaches limits to maintain financial governance.",
    "title": "Real-time Alerts & Budget Governance",
    "icon": <ShieldCheckIcon />,
    "color": "from-red-600 to-rose-600"
  },
  {
    "image": "/whycooseus/efficiency-tracking-svg.svg",
    "description": "Receive scheduled reports on cost trends and efficiency metrics to track ongoing optimization efforts.",
    "title": "Recurring Reports & Efficiency Tracking",
    "icon": <LightningBoltIcon />,
    "color": "from-cyan-600 to-blue-600"
  }
]

function Whychooseus() {
  return (
    <section className="py-20 w-full bg-gradient-to-b from-slate-900 to-black relative flex flex-col items-center justify-center overflow-hidden">
      {/* Cloud Background Elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-20">
      </div>
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 w-full h-full dark:bg-grid-white/[0.05] z-0"></div>
      
      {/* Cloud Elements */}
      <div className="absolute top-20 left-20 opacity-20 animate-float-slow">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      </div>
      <div className="absolute bottom-40 right-20 opacity-10 animate-float-medium">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      </div>
      <div className="absolute top-40 right-1/3 opacity-15 animate-float-fast">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      </div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 z-10 text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
            Why Choose Us?
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Our platform provides comprehensive cloud cost management tools to optimize your infrastructure spending with intelligent automation.
          </p>
        </div>
        
        {/* Data Flow Line */}
        <div className="">
          <div className="h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 relative">
            {[1, 2, 3, 4, 5].map((i) => (
              <div 
                key={i} 
                className=""
                style={{ top: `${i * 20}%`, animationDelay: `${i * 0.3}s` }}
              >
                <div className="w-full h-full rounded-full bg-blue-400 animate-ping"></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="w-full overflow-hidden relative">
          <InfiniteMovingCards items={features} direction="right" speed="slow" />
        </div>
      </div>
    </section>
  )
}

export default Whychooseus