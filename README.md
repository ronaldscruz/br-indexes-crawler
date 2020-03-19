## WIP Brazilian Indexes Crawler

Node API that crawls Brazilian indexes.

<br>

### Current progress

Currently, BIC can crawl:

1.  [x] TR
2.  [x] IPCA-E
3.  [x] INPC
4.  [ ] Índice Misto
5.  [ ] JAM
6.  [ ] SELIC

<br>

### How to run (using VSCode Editor)

This guide considers that you already have both Node and NPM installed. If you don't have them, install by following [this guide](https://linuxize.com/post/how-to-install-node-js-on-ubuntu-18.04/). Also, you will need TypeScript, if you don't have it, simply run `sudo npm i -g typescript`

1.  Access the repository directory (probably "br-indexes-crawler")
2.  Install: ESLint, Prettier and editorconfig extensions inside your VSCode
3.  Install required dependencies

    `npm i`

4.  Now run the project in development mode

    `npm run dev`

### Production mode

To run the production version of the project, simply run `npm start`. The bundle will be stored inside the "dist" folder.

### Contributions

Feel free to contribute. Currently, we don't have a standard for Pull Requests, so, if you have an idea just fork, edit and send it! 😃
