import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Briefcase, 
  ChevronRight, 
  Search, 
  Code2, 
  LineChart, 
  Palette, 
  Users 
} from "lucide-react";

interface JobRole {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  icon: JSX.Element;
}

export function CareersPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const jobRoles: JobRole[] = [
    {
      id: "1",
      title: "Senior AI Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Fine-tune RAG pipelines and LLM orchestration for SEO content.",
      icon: <Code2 size={18} className="text-blue-500" />
    },
    {
      id: "2",
      title: "Product Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      description: "Lead UI/UX direction for our analytics and AI writing tools.",
      icon: <Palette size={18} className="text-purple-500" />
    },
    {
      id: "3",
      title: "SEO Strategist",
      department: "Marketing",
      location: "Hybrid",
      type: "Contract",
      description: "Research SEO trends for semantic clustering algorithms.",
      icon: <LineChart size={18} className="text-emerald-500" />
    },
    {
      id: "4",
      title: "Success Lead",
      department: "Operations",
      location: "Remote",
      type: "Full-time",
      description: "Help enterprise clients scale content production.",
      icon: <Users size={18} className="text-orange-500" />
    }
  ];

  const filteredJobs = jobRoles.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-12 px-8 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-blue-500 transition-colors mb-4">
            <ArrowLeft size={14} />
            Back to Home
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight mb-3">
            Join the <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Team</span>
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
            We're a remote-first team obsessed with making SEO simple.
          </p>
          
          <div className="relative max-w-md mx-auto">
            <input 
              type="text"
              placeholder=" &nbsp; Search roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
        </div>
      </section>

      {/* Grid Section with 2-Column Layout */}
      <section className="py-12 px-8 md:px-16 lg:px-24 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold">Open Positions</h2>
          <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md uppercase">
            {filteredJobs.length} Available
          </span>
        </div>

        {/* grid-cols-1: 1 card on mobile
            md:grid-cols-2: stays as 2 cards on tablet and desktop 
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <div 
              key={job.id}
              className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 rounded-xl hover:border-blue-500/50 transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                    {job.icon}
                  </div>
                  <div className="flex flex-col items-end text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                    <span className="flex items-center gap-1"><MapPin size={10} /> {job.location}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold mb-1 group-hover:text-blue-500 transition-colors">
                  {job.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                  {job.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-50 dark:border-gray-800">
                <span className="text-[11px] font-medium text-gray-400 flex items-center gap-1">
                  <Briefcase size={12} /> {job.department}
                </span>
                <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-0.5">
                  View Role <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}