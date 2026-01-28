import React, { useEffect, useState } from 'react';

const developer = {
  name: 'Dainampally Akshay Kireet',
  title: 'AI Researcher & Full-Stack Developer',
  summary:
    'A highly motivated professional with a solid foundation in Data Structures and Algorithms (DSA) and Machine Learning (ML) algorithms, capable of analyzing complex problems and developing efficient solutions.',
  avatar: 'https://res.cloudinary.com/dadapse5k/image/upload/v1759377580/akshay4_k1qqtn.png',
  tags: [
    { icon: '📚', label: 'B.Tech Graduate' },
    { icon: '💼', label: 'Microsoft Intern' },
    { icon: '🚀', label: 'Quick Learner' },
  ],
  mission:
    'To bridge the gap between cutting-edge AI research and practical software solutions, creating intelligent systems that solve real-world problems while fostering collaboration and innovation in dynamic technological environments.',
  vision:
    `To become a leading innovator in AI-driven full-stack development, pushing the boundaries of what's possible while maintaining a strong focus on ethical AI practices and sustainable technological growth.`,
  experience:
    'Microsoft intern with a passion for technology and an insatiable curiosity for emerging innovations. As a dedicated student pursuing advanced degrees, I bring hands-on experience from my internship while bridging academic knowledge with real-world applications in AI and software development.',
  skills: [
    { category: 'Artificial Intelligence', skills: ['Langchain'] },
    { category: 'Cloud Platforms', skills: ['Microsoft Azure', 'IaaS / PaaS / SaaS'] },
    { category: 'Databases', skills: ['MongoDB', 'SQL'] },
    { category: 'Data Analysis', skills: ['NumPy / Pandas', 'Matplotlib'] },
    { category: 'Frontend', skills: ['React.js', 'HTML/CSS', 'JavaScript'] },
    { category: 'Backend', skills: ['Node.js / Express.js', 'FastAPI'] },
    { category: 'Languages', skills: ['Python', 'C++', 'JavaScript'] },
  ],
  strengths: [
    { icon: '⚡', text: 'Fast Learner' },
    { icon: '🔍', text: 'Problem Solver' },
    { icon: '🤝', text: 'Team Player' },
    { icon: '🚀', text: 'Innovative' },
  ],
  contactCta: {
    heading: `Let's Build Something Amazing Together`,
    text: 'Ready to collaborate on innovative projects and push technological boundaries.',
    link: 'https://www.linkedin.com/in/dainampallyakshay/',
    button: 'Get In Touch',
  },
};

const getTheme = () => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  return 'light';
};

const About = () => {
  const [theme, setTheme] = useState(getTheme());
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  const isDark = theme === 'dark';

  return (
    <section
      className={`relative min-h-screen w-full flex flex-col items-center justify-center py-8 px-2 sm:px-6 lg:px-8 transition-colors duration-300 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}
      style={{
        backgroundImage:
          'linear-gradient(' +
          (isDark ? 'rgba(30,41,59,0.98), rgba(30,41,59,0.98)' : 'rgba(241,245,249,0.98), rgba(241,245,249,0.98)') +
          '), url(https://res.cloudinary.com/dunrzq7tv/image/upload/v1769595069/wp12122631_qfcdxn.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="w-full max-w-6xl mx-auto">
        {/* Hero Card */}
        <div className={`rounded-2xl border ${isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-slate-100'} shadow-xl p-6 md:p-10 mb-10`}>
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* Profile Image */}
            <div className="relative group flex-shrink-0">
              <div className={`w-48 h-48 rounded-2xl overflow-hidden border-2 ${isDark ? 'border-slate-700' : 'border-slate-200'} shadow-md`}>
                <img
                  src={developer.avatar}
                  alt={developer.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className={`absolute inset-0 rounded-2xl ring-1 ring-inset ${isDark ? 'ring-white/10' : 'ring-slate-900/10'}`} />
            </div>
            {/* Header Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? 'bg-sky-900 text-sky-200 border-sky-800' : 'bg-sky-100 text-sky-800 border-sky-200'} border mb-4`}>
                <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                <span className="text-sm font-semibold">{developer.title}</span>
              </div>
              <h1 className={`text-4xl lg:text-5xl font-bold ${isDark ? 'text-white' : 'text-slate-900'} mb-4`}>{developer.name}</h1>
              <p className={`text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'} leading-relaxed mb-6`}>{developer.summary}</p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {developer.tags.map((tag) => (
                  <div key={tag.label} className={`px-4 py-2 rounded-xl ${isDark ? 'bg-slate-700 border-slate-600 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-700'} border text-sm font-medium flex items-center gap-1`}>
                    <span>{tag.icon}</span> {tag.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Mission, Vision, Experience */}
          <div className="space-y-8">
            <div className={`rounded-2xl border ${isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-slate-100'} p-6 shadow-md`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl ${isDark ? 'bg-sky-900 text-sky-300' : 'bg-sky-100 text-sky-600'} flex items-center justify-center text-2xl`}>
                  🎯
                </div>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Mission</h3>
              </div>
              <p className={`${isDark ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>{developer.mission}</p>
            </div>
            <div className={`rounded-2xl border ${isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-slate-100'} p-6 shadow-md`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl ${isDark ? 'bg-sky-900 text-sky-300' : 'bg-sky-100 text-sky-600'} flex items-center justify-center text-2xl`}>
                  🔭
                </div>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Vision</h3>
              </div>
              <p className={`${isDark ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>{developer.vision}</p>
            </div>
            <div className={`rounded-2xl border ${isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-slate-100'} p-6 shadow-md`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl ${isDark ? 'bg-sky-900 text-sky-300' : 'bg-sky-100 text-sky-600'} flex items-center justify-center text-2xl`}>
                  🏢
                </div>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Microsoft Intern Experience</h3>
              </div>
              <p className={`${isDark ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>{developer.experience}</p>
            </div>
          </div>
          {/* Right Column: Technical Skills */}
          <div className={`rounded-2xl border ${isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-slate-100'} p-6 shadow-md`}>
            <div className="text-center mb-8">
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Technical Skills</h2>
              <div className="w-16 h-1 bg-sky-500 rounded-full mx-auto mt-3"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
              {developer.skills.map(({ category, skills }) => (
                <div key={category} className="group">
                  <h4 className={`font-semibold mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                    <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span key={skill} className={`px-3 py-1.5 rounded-lg text-sm border transition-colors duration-300 ${isDark ? 'bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'}`}>{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className={`mt-8 pt-8 border-t ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
              <h4 className={`font-semibold mb-4 text-center ${isDark ? 'text-white' : 'text-slate-800'}`}>Key Strengths</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                {developer.strengths.map((strength) => (
                  <div key={strength.text} className={`p-3 rounded-xl border transition-all duration-300 hover:-translate-y-1 ${isDark ? 'bg-slate-700 border-slate-600 hover:bg-slate-600' : 'bg-slate-100 border-slate-200 hover:bg-slate-200'}`}>
                    <div className="text-xl mb-1">{strength.icon}</div>
                    <div className={`text-xs font-medium ${isDark ? 'text-slate-200' : 'text-slate-600'}`}>{strength.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Contact CTA */}
        <div className="mt-10 text-center">
          <div className={`rounded-2xl border ${isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-slate-100'} p-6 shadow-md inline-block`}>
            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{developer.contactCta.heading}</h3>
            <p className={`${isDark ? 'text-slate-300' : 'text-slate-600'} mb-5`}>{developer.contactCta.text}</p>
            <button
              className="px-6 py-3 bg-sky-600 text-white rounded-xl font-semibold shadow-lg shadow-sky-500/20 hover:bg-sky-700 hover:shadow-sky-500/30 hover:-translate-y-0.5 transition-all duration-300 transform"
              onClick={() => window.open(developer.contactCta.link, '_blank')}
            >
              {developer.contactCta.button}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
