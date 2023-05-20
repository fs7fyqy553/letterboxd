import Image from 'next/image';
import Game from './components/Game';

export default async function App() {
  return (
    <div className="App">
      <Game />
      <footer aria-label="Miscellaneous links">
        <a
          aria-label="Link to GitHub repository"
          href="https://github.com/JamesGJ5/letterxbod-higher-or-lower"
        >
          <Image
            src="/logos/github-mark.svg"
            alt=""
            width={50/96*98}
            height={50}
            priority
          />
        </a>
        <a
          aria-label="Link to LinkedIn profile"
          href="https://www.linkedin.com/in/james-graca-jones/"
        >
          <Image
            src="/logos/LI-In-Bug.png"
            alt=""
            width={50/540*635}
            height={50}
            priority
          />
        </a>
      </footer>
    </div>
  );
}
