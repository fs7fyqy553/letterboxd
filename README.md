Play at https://letterboxd-guessing-game.up.railway.app/

Game in each round of which the player must guess which of two films is more highly rated on the review site letterboxd.com.

The Letterboxd API is not publicly accessible (see letterboxd.com/api-beta/), so the web scraper in the backend of this repo scrapes Letterboxd pages for film data and stores them in a database.

A server in the backend contains an API which is currently used to serve film data to the frontend web game.

Backend is set up to regularly update the database but the updater isn't deployed yet for cost reasons.

Ongoing:

- Updating frontend tests since migrating to NextJS

Tools:

- Frontend:

    - Written in React within NextJS
    - WCAG Level A accessibility
    - Responsive design using Vanilla CSS and Material UI
    - Tested (unfinished) using the React Testing Library in Jest

- Backend:

    - Written in NodeJS within Express
    - Accessible using a REST API with authentication
    - Uses a MongoDB database
    - Tested using MongoDB In-Memory Server and Supertest in Jest
    - Uses a published web scraper written using TypeScript and Puppeteer to automatically update the database (see github.com/JamesGJ5/letterboxd-list-scraper)