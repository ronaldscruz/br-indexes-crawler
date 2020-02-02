# Brazilian Indexes Crawler

A NodeJS API that crawls some brazilian indexes. The following instructions may be changed in the future, since it's simply a initial plan.

## The folder structure

### Crawlers

This is the first step of the API workflow. Crawlers are responsible for fetching the DOM Element containing the desired indexes. e.g. `<table>`, `<ul>`, etc.

### Handlers

The second step is to handle data from the DOM Element and make it "JavaScript Readable". The aim is to make it fit to a predefined TypeScript interface or type.
In most cases, indexes will keep the following structure:
`[ { value: 0.16, date: 2019-01-01 } ]`

### Controllers

Controllers will have the same role of a MVC Structure. They will receive data from handlers and send it back to the requester as a JSON.
