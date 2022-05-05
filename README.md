# spacey-frontend

This repository contains the spacey Web App written in React/Typescript.

## Getting Started

### Prerequisites

- node and npm need to be installed

### Evnironment Variables

The following environment variable can used to override the base url of the API. It default value points to `localhost:80`

```
REACT_APP_BASE_URL=<api_base_url>
```

### Available Scripts

In the project directory, you can run:

`npm start`<br>
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
<br><br>
`npm run build`<br>
Builds the app for production to the `build` folder.\

## State Management

State management is achieved by an own global state store that uses the inbuild useState/useEffect hooks and works by a simple pub/sub pattern.

## Styling

Styling is achieved through scss modules whereas each \*.module.scss should live within the components directory.

## Precommit Hooks

A precommit is used to check the code for prettier/eslint issues.
