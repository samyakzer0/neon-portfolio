
'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-zinc-800 py-16 px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-mono text-green-400 mb-4">
              Utkarsh
            </h3>
            <p className="text-white/70 leading-relaxed max-w-md font-mono">
              Full-stack developer crafting exceptional digital experiences. 
              Always learning, always building.
            </p>
          </div>
          
          <div className="md:text-right">
            <div className="flex md:justify-end gap-6 mb-8">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-zinc-900 hover:bg-green-400 text-white hover:text-black rounded-full transition-all duration-300 cursor-pointer group"
              >
                <i className="ri-github-fill text-xl"></i>
              </a>
              
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-zinc-900 hover:bg-green-400 text-white hover:text-black rounded-full transition-all duration-300 cursor-pointer group"
              >
                <i className="ri-linkedin-fill text-xl"></i>
              </a>
              
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-zinc-900 hover:bg-green-400 text-white hover:text-black rounded-full transition-all duration-300 cursor-pointer group"
              >
                <i className="ri-twitter-fill text-xl"></i>
              </a>
              
              <a 
                href="https://dribbble.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-zinc-900 hover:bg-green-400 text-white hover:text-black rounded-full transition-all duration-300 cursor-pointer group"
              >
                <i className="ri-dribbble-fill text-xl"></i>
              </a>
            </div>
            
            <div className="text-white/50 text-sm font-mono">
              <p>© {currentYear} Utkarsh. All rights reserved.</p>
              <p className="mt-2">
                Built with Next.js, Tailwind CSS, and lots of ☕
              </p>
            </div>
          </div>
        </div>
        
        {/* Back to Top */}
        <div className="text-center mt-16 pt-8 border-t border-zinc-800">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors cursor-pointer group font-mono"
          >
            <span>Back to Top</span>
            <i className="ri-arrow-up-line group-hover:-translate-y-1 transition-transform"></i>
          </button>
        </div>
      </div>
    </footer>
  );
}