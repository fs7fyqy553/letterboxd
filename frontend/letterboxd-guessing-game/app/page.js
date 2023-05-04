import Image from 'next/image';
// import styles from './page.module.css';
import "./styles/App.css";
import Game from './components/Game';

export default function App() {
  return (
    <div className="App">
      <Game />
      <footer aria-label="Miscellaneous links">
        <a
          aria-label="Link to GitHub repository"
          href="https://github.com/JamesGJ5/letterxbod-higher-or-lower"
        >
          {/* TODO: sort out image */}
          <Image
            src="/logos/github-mark.svg"
            alt=""
            width={50}
            height={50}
            priority
          />
        </a>
        <a
          aria-label="Link to LinkedIn profile"
          href="https://www.linkedin.com/in/james-graca-jones/"
        >
          {/* TODO: sort out image dimensions */}
          <Image
            src="/logos/LI-In-Bug.png"
            alt=""
            width={50}
            height={50}
            priority
          />
        </a>
      </footer>
    </div>
  );
}
