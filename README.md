Play at https://letterboxd-guessing-game.up.railway.app/

Game in each round of which the player must guess which of two films is more highly rated on the review site letterboxd.com. The Letterboxd API is not publicly accessible (see letterboxd.com/api-beta/), so the web scraper in the backend of this repo scrapes Letterboxd pages for film data and stores them in a database. A server in the backend contains an API which is currently used to serve film data to the frontend web game.

Ongoing:

- Finishing Frontend Tests
- Implementing Rate Limiting in API

Tools:

- Frontend:

    - Written in React within NextJS
    - WCAG Level A Accessibility
    - Responsive Design using Vanilla CSS and Material UI
    - Tested (unfinished) using the React Testing Library in Jest

- Backend:

    - Written in NodeJS within Express
    - Accessible using a REST API with Authentication
    - Uses a MongoDB Database
    - Tested using MongoDB In-Memory Server and Supertest in Jest
    - Contains a Web Scraper written in TypeScript and using Puppeteer (see database-updater/)