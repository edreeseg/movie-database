# **Movie Database**

## Installation

Created using create-react-app. To install and run this application, perform the steps listed below.

- Fork and clone this repository (e.g. `git clone`)
- Run the command `npm install` in root directory to install all required dependencies.
- Create a `.env` file in the root directory of this repository, and add the `REACT_APP_API_KEY` environmental variable. The value of this variable allows access to the provided back end for consumption, and will be provided through internal communication.
- Run the command `npm run start` to run the application. By default application will start on `http://localhost:3000`.

- Dependencies:

  - @material-ui/core: ^4.8.2
  - @testing-library/jest-dom: ^4.2.4
  - @testing-library/react: ^9.3.2
  - @testing-library/user-event: ^7.1.2
  - axios: ^0.19.0
  - fuse.js: ^3.4.6
  - prop-types: ^15.7.2
  - react: ^16.12.0
  - react-dom: ^16.12.0
  - react-icons: ^3.8.0
  - react-redux: ^7.1.3
  - react-resize-aware: ^3.0.0
  - react-scripts: 3.3.0
  - redux: ^4.0.5
  - redux-logger: ^3.0.6
  - redux-thunk: ^2.3.0
  - reselect: ^4.0.0

- Dev Dependencies:
  - redux-mock-store: ^1.5.4

## Directory Structure:

- Assets: Contains SVG background image and any other asset files.

- Components: Component directory contains several subdirectories containing files related to a particular component of the React application. Within these subdirectories may be found a `styles` directory, which is used to house any CSS files or styles created using Material-UI `makeStyles`.

- Redux: Files related to the management of state within the Redux store are kept within the Redux directory. This directory includes an `actions`, `reducers`, and `selectors` subdirectory.
