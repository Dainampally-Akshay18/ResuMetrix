import React from 'react';

const About = () => {
  return (
    <section
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-8 px-2 sm:px-6 lg:px-8"
      style={{
        backgroundColor: 'rgba(241,245,249,1)', // bg-slate-50
        backgroundImage:
          'linear-gradient(rgba(241,245,249,0.98), rgba(241,245,249,0.98)), url(https://res.cloudinary.com/dunrzq7tv/image/upload/v1769595069/wp12122631_qfcdxn.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'background 0.3s',
      }}
    >
      <div className="w-full max-w-6xl mx-auto">
        {/* Hero Card */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shadow-xl p-6 md:p-10 mb-10">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* Profile Image */}
            <div className="relative group flex-shrink-0">
              <div className="w-48 h-48 rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-md">
                <img
                  src="https://res.cloudinary.com/dadapse5k/image/upload/v1759377580/akshay4_k1qqtn.png"
                  alt="Dainampally Akshay Kireet"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-900/10 dark:ring-white/10" />
            </div>
            {/* Header Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-200 border border-sky-200 dark:border-sky-800 mb-4">
                <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                <span className="text-sm font-semibold">AI Researcher & Full-Stack Developer</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                Dainampally Akshay Kireet
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                A highly motivated professional with a solid foundation in Data Structures and Algorithms (DSA) and
                Machine Learning (ML) algorithms, capable of analyzing complex problems and developing efficient solutions.
              </p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <div className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-sm">
                  📚 B.Tech Graduate
                </div>
                <div className="px-4 py-2 rounded-xl bg-sky-100 dark:bg-sky-900 border border-sky-200 dark:border-sky-800 text-sky-800 dark:text-sky-200 text-sm font-medium">
                  💼 Microsoft Intern
                </div>
                <div className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-sm">
                  🚀 Quick Learner
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Mission, Vision, Experience */}
          <div className="space-y-8">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-6 shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-900 flex items-center justify-center text-sky-600 dark:text-sky-300 text-2xl">
                  🎯
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Mission</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                To bridge the gap between cutting-edge AI research and practical software solutions,
                creating intelligent systems that solve real-world problems while fostering collaboration
                and innovation in dynamic technological environments.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-6 shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-900 flex items-center justify-center text-sky-600 dark:text-sky-300 text-2xl">
                  🔭
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Vision</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                To become a leading innovator in AI-driven full-stack development, pushing the boundaries
                of what's possible while maintaining a strong focus on ethical AI practices and sustainable
                technological growth.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-6 shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-900 flex items-center justify-center text-sky-600 dark:text-sky-300 text-2xl">
                  🏢
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Microsoft Intern Experience</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Microsoft intern with a passion for technology and an insatiable curiosity for emerging innovations.
                As a dedicated student pursuing advanced degrees, I bring hands-on experience from my internship
                while bridging academic knowledge with real-world applications in AI and software development.
              </p>
            </div>
          </div>
          {/* Right Column: Technical Skills */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-6 shadow-md">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Technical Skills
              </h2>
              <div className="w-16 h-1 bg-sky-500 rounded-full mx-auto mt-3"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
              {[
                { category: 'Artificial Intelligence', skills: ['Langchain'] },
                { category: 'Cloud Platforms', skills: ['Microsoft Azure', 'IaaS / PaaS / SaaS'] },
                { category: 'Databases', skills: ['MongoDB', 'SQL'] },
                { category: 'Data Analysis', skills: ['NumPy / Pandas', 'Matplotlib'] },
                { category: 'Frontend', skills: ['React.js', 'HTML/CSS', 'JavaScript'] },
                { category: 'Backend', skills: ['Node.js / Express.js', 'FastAPI'] },
                { category: 'Languages', skills: ['Python', 'C++', 'JavaScript'] },
              ].map(({ category, skills }) => (
                <div key={category} className="group">
                  <h4 className="text-slate-800 dark:text-white font-semibold mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span key={skill} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-200 text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
              <h4 className="text-slate-800 dark:text-white font-semibold mb-4 text-center">Key Strengths</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                {[
                  { icon: '⚡', text: 'Fast Learner' },
                  { icon: '🔍', text: 'Problem Solver' },
                  { icon: '🤝', text: 'Team Player' },
                  { icon: '🚀', text: 'Innovative' }
                ].map((strength) => (
                  <div key={strength.text} className="p-3 bg-slate-100 dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600 hover:-translate-y-1 transition-all duration-300">
                    <div className="text-xl mb-1">{strength.icon}</div>
                    <div className="text-slate-600 dark:text-slate-200 text-xs font-medium">{strength.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-10 text-center">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-6 shadow-md inline-block">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Let's Build Something Amazing Together</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-5">Ready to collaborate on innovative projects and push technological boundaries.</p>
            <button
              className="px-6 py-3 bg-sky-600 text-white rounded-xl font-semibold shadow-lg shadow-sky-500/20 hover:bg-sky-700 hover:shadow-sky-500/30 hover:-translate-y-0.5 transition-all duration-300 transform"
              onClick={() => window.open('https://www.linkedin.com/in/dainampallyakshay/', '_blank')}
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
