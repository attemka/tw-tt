# Timewave Test Task

### Overview

This application will show a chart of a price change of $ATOM-$NTRN ticker for the last 7 days.

### Implementation details

The app was bootstrapped using the create-react-app. It was used just to save time and set the initial architecture.
Other modules in use: emotion for CSS styling, axios for requests, date-fns for date formatting.
The app is missing fancy styling and tests, again for the sake of time. Time to complete: 2h30m.

### Run locally

In order to run the app locally you first need to install dependencies by running `npm install` in the root folder of the project.
After this you can either run a development server by running `npm run start`, once the devserver is
started you can open `localhost:3000` (if it wasn't opened automatically).

Other option would be to build the app to production mode by running `npm run build` and serve it locally with e.g `serve -s build` (make sure that serve is installed - `npm i -g serve`)

### Misc

If you'll run the app using the `npm run start` you might notice that the app is rendered twice. This is happening as the React strict mode
will rerender the app in the development mode in order to get rid of all side effects. This shouldn't affect the app in production.
