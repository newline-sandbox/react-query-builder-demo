# React Query Builder Demo

![](https://www.dl.dropboxusercontent.com/s/hqf6dezrp3sq5ck/Screen%20Shot%202021-04-30%20at%204.14.35%20PM.png)

This [React Query Builder](https://www.npmjs.com/package/react-querybuilder) demo was scaffolded via the [TypeScript template of Create React App](https://create-react-app.dev/docs/adding-typescript/). A **query builder** provides a customizable interface for creating queries to send to a server to fetch data from a database. Each **rule** corresponds to a condition specified within an SQL `WHERE` clause, and each **group** corresponds to the parentheses used within an SQL `WHERE` clause that determine the evaluation order of conditions. Adding a query builder to an admin or analytics dashboard allows users to flexibly access data from a database and immediately answer questions without having to explicitly write and execute SQL statements in a terminal or third-party administrative tool like [pgAdmin](https://www.pgadmin.org/).

In this demo, after the server processes the query and sends back data to the client, the client displays the data within a table and generates a heatmap visualization layer over [Google Maps](https://developers.google.com/maps/documentation/javascript/overview).

## Project Setup

Install the dependencies.

```shell
$ npm install
```

Create a `.env` file in the root of the project directory. Add the `REACT_APP_GOOGLE_MAPS_API_KEY` environment variable to this file, and set it to an [API key](https://developers.google.com/maps/documentation/javascript/get-api-key).

(`.env`)

```
REACT_APP_GOOGLE_MAPS_API_KEY=xxxxxxx-xxxxxxxxxxxxxxxxxxxxxx_xxxxxxxx
```

For the backend, clone the repository of the multi-container Docker application [`nyc-squirrel-census-api`](https://github.com/newline-sandbox/nyc-squirrel-census-api) and follow the directions in the `README.md` file to run it locally alongside this demo.

## Running in Development Environment

Run the application for local development:

```bash
$ npm start
```

Navigate to [localhost:3000](http://localhost:3000/). You should see your application running.