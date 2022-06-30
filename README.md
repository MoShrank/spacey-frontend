# spacey-frontend

This repository contains the spacey Web App written in React/Typescript.

## Getting Started

### Prerequisites

- node and npm need to be installed

### Evnironment Variables

The following environment variable can used to override the base url of the API. Its default value points to `localhost:80`

```
REACT_APP_BASE_URL=<api_base_url>
```

### Available Scripts

In the project directory, you can run:

`npm start`<br>
Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
<br><br>
`npm run build`<br>
Builds the app for production to a `build` folder.

## State Management

State management is achieved by an own global state store that uses the inbuild useState/useEffect hooks and works by a simple pub/sub pattern. Since mainting this to work as expected, we are currently migrating our state store to[ zustand](https://github.com/pmndrs/zustand).

## Styling

Styling is achieved through scss modules whereas each \*.module.scss should live within the components directory.

## Precommit Hooks

A precommit is used to run eslint/prettier to check the code for any styling issues.

## Deployment

The frontend is deployed on AWS Amplify and served as a static website. Amplify takes care of CI/CD by deploying any new version which is pushed to master. Since we do not have any tests yet in the frontend there is not testing stage in the pipeline. To still make sure that the frontend works and looks as expected we either have the posibility to a staging branch and deploy everything to a separete staging environment or Amplify. can create previews of pull requests that we create.