// CTA links — replace YOUR_HANDLE with actual usernames
const INSTAGRAM_URL = 'https://www.instagram.com/regul8dcaffein8d/'; 
const SUBSTACK_URL  = 'https://substack.com/@regul8dxcaffein8d';  

const Home = () => {
  return (
    <section className="banner" aria-label="Hero">
      <div className="landing">
        <div className="welcomeText">
          <h1>REGUL8D &amp; CAFFEIN8D</h1>
          <p className="gdev">Regulation. Accuracy. Coffee.</p>
          <p className="hero-body">
            Watch collecting content for the everyday collector. Vintage watches, mechanical watch
            regulation, homage watch talk, bench work, and honest hobby commentary. No gatekeeping.
            Just the hobby.
          </p>
          <div className="hero-cta">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="cta-btn cta-primary">
              Follow on Instagram
            </a>
            <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className="cta-btn cta-secondary">
              Read on Substack
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
