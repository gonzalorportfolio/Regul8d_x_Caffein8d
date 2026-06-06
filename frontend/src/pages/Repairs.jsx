const projects = [
  {
    title: 'Regul8d & Caffein8d',
    description:
      'This site! A personal brand built around watch reviews, repair guides, and coffee culture. React + Vite frontend, Node/Express backend, deployed on Render.',
    imageUrl: 'https://i.ibb.co/MDZvSN5b/Screenshot-2026-01-06-at-3-53-07-PM.png',
    liveUrl: 'https://regul8d-x-caffein8d.onrender.com',
    sourceUrl: 'https://github.com/gonzalorportfolio',
    tags: ['React', 'Vite', 'Node.js', 'Express'],
  },
  {
    title: 'Local Tapas',
    description:
      'An interactive restaurant finder featuring local tapas bars. Built with vanilla JS, HTML, and CSS with a focus on clean UI and accessibility.',
    imageUrl: '/projects/local-tapas.png',
    liveUrl: 'https://gonzalorportfolio.github.io/Local-taps/',
    sourceUrl: 'https://github.com/gonzalorportfolio/Local-taps',
    tags: ['JavaScript', 'HTML', 'CSS'],
  },
  {
    title: 'Weather App',
    description:
      'A real-time weather application that fetches live data from a public weather API, displaying current conditions and forecasts by location.',
    imageUrl: '/projects/weather-app.png',
    liveUrl: 'https://weather-app.gonzalorportfol.repl.co/',
    sourceUrl: 'https://github.com/gonzalorportfolio',
    tags: ['JavaScript', 'API Integration', 'CSS'],
  },
  {
    title: 'Password Generator',
    description:
      'A pseudo-random password generator with configurable length and character sets. Lightweight, browser-based, and zero dependencies.',
    imageUrl: '/projects/password-gen.jpg',
    liveUrl: 'https://replit.com/@gonzalorportfol/Psudo-random-password-generator',
    sourceUrl: 'https://github.com/gonzalorportfolio',
    tags: ['JavaScript', 'HTML', 'CSS'],
  },
];

const Repairs = () => {
  return (
    <main className="portfolio-page" aria-labelledby="portfolio-heading">
      <header className="portfolio-header">
        <h1 id="portfolio-heading">Portfolio</h1>
        <p className="portfolio-subtitle">
          A selection of projects built across the stack — from interactive frontends to deployed full-stack apps.
        </p>
      </header>

      <div className="portfolio-grid">
        {projects.map((project) => (
          <article key={project.title} className="portfolio-card">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-image-link"
              aria-label={`Open live demo of ${project.title}`}
            >
              <img
                src={project.imageUrl}
                alt={`Screenshot of ${project.title}`}
                className="portfolio-image"
                loading="lazy"
              />
            </a>
            <div className="portfolio-body">
              <h2 className="portfolio-title">{project.title}</h2>
              <p className="portfolio-description">{project.description}</p>
              <ul className="portfolio-tags" aria-label="Technologies used">
                {project.tags.map((tag) => (
                  <li key={tag} className="portfolio-tag">{tag}</li>
                ))}
              </ul>
              <div className="portfolio-links">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-btn portfolio-btn-primary"
                >
                  Live Demo
                </a>
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-btn portfolio-btn-secondary"
                >
                  Source
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
};

export default Repairs;
