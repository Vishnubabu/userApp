Welcome to User App!
===================

This is a user app, allows login, see details and user preferences

Setup
-------------

clone the repository and from root folder run
> - npm run-script build
> - npm start

open localhost:3000

Requires nodejs 8.8.1 (latest)  -> using (async / await), promisify

**OR**

clone the repository and from root folder run
> - docker-compose up

Backend
-------------
Supports 4 apis
> - /api/login
> - /api/logout
> - /api/user-details
> - /api/reading-preference


There is a caching layer for reading-preference Requests, uses [node-cache](https://www.npmjs.com/package/node-cache)

For input request validations using [express-validator](https://github.com/ctavan/express-validator)

Frontend
-------------
Its a React App. It proxies all '/api' requests to the Backend.
Its in the folder [./client](https://github.com/Vishnubabu/iTunesApp/tree/master/client)
Used - [create-react-app](https://github.com/facebookincubator/create-react-app) for creation

It has 3 react components

> - SearchBox
> - LookupBox
> - ItemResults

Uses Routes from [react-router](https://github.com/ReactTraining/react-router).
'search' and 'lookup' actions change the route and the components listen to the route changes and fetch data from the backend.

Uses [redux-promise-middleware](https://github.com/pburtchaell/redux-promise-middleware/blob/master/docs/introduction.md) for handling async requests

Uses [React-Bootstrap](https://react-bootstrap.github.io/) for these components

- Table
- Forms
- Tabs
- Button
