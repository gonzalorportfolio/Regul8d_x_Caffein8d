import githubIcon from "../assets/icons/github.png";
import linkedinIcon from "../assets/icons/linkedin.png";
import mediumIcon from "../assets/icons/medium.png";

const Connect = () => {
  return (
      <section className="about-section connect-links connect-section">
          <a
            href="https://medium.com/@gromeroeducation"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img style={{ width: "50px", height: "50px" }} src={mediumIcon} alt="Medium" />
          </a>

          <a
            href="https://github.com/gonzalorportfolio"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img style={{ width: "40px", height: "40px", marginRight: "3.5px" }} src={githubIcon} alt="GitHub" />
          </a>

          <a
            href="https://www.linkedin.com/in/gonzalo-romero-931841230"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img style={{ width: "40px", height: "40px" }} src={linkedinIcon} alt="LinkedIn" width="40" height="40" />
          </a>

      </section>
  );
};

export default Connect;
