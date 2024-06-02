# MERN

## Setup

1. create 'vite' project -> `npm create vite@latest`, cd then `npm i`

## Git setup

1. `git init`
2. add in `.gitignore`
3. `git add` & `git commit -m ...`
4. in github, create new empty repo (no gitignore/readme).
5. `git remote add origin .....` , `git branch -M main`, `git push -u origin main`.

## Optional lint-staged + git-hooks + prettier

`npm install -D prettier`
`npx mrm@2 lint-staged`

`husky` -> git hook manager
`lint-staged`

install into `package.json` in devDepencies

new `lint-staged` in `package.json`
new `.husky`

- `pre-commit` -> `npx lint-staged`

## Setup (continued)

1. `npm run build` --> creates dist(build) folder
   - why? after lunch..
2. SKIP express generator for now, but we are using the same structure.
3. `npm i express morgan serve-favicon debug`
4. in #root folder, touch `server.js`
   - in `.eslintrc.cjs` ADD env: { browser: true, es2020: true , `node: true`},
   - in `package.json` REMOVE `type: "module"`
   - take codes from slides, but inside `server.js` amend
     - `build` to `dist` to adapt from CRA to VITE.
   - `favicon.ico` to `vite.svg`
5. setup nodemon --> `npm i -D nodemon`, in package.json scripts: `nodemon server.js`
6. use 2 different terminals to run server (express) and client (vite)

## Clean Up (continued)

1. inside `main.jsx` remove `index.css`
2. inside `app.jsx` remove all content, `<main className="App">App</main>`
3. amend index.html header
4. remove unused files.

```bash
rm src/*.css
rm -r src/assets
```

## React Convention, Move components into folders, pages into pages, components into components.

1. mkdir for folders with the name EXACTLY same as the component.

```bash
mkdir src/App
mkdir src/components src/pages
```

2. drag and drop the component in and amend import route. (should be auto)

- App.jsx into App
- App into Pages

## Add Folders to Organise Express Server Code

1. `mkdir config routes models controllers`
2. `npm i dotenv`
3. touch .env
4. in `server.js`, `require("dotenv").config()`
   - can check with `console.log(process.env.DATABASE_URL)`

## Link to Mongo

5. install mongoose `npm i mongoose`
6. touch `config/database.js` , update this file to connect to database
7. using the connection string. rmb to change the database name
8. update `server.js` to `require("./config/database")`

### using DEBUG (Optional)

1. In `server.js` -> `const debug = require("debug")("mern:server");`
   - In `config/database.js` -> `const debug = require("debug")("mern:config:database");`
2. replace `console.log()` with `debug()`
3. in package.json scripts, in dev:express, `set debug=mern:* & nodemon server.js`

in `App.js` as well as every other file you want to log

```js
import debug from "debug";
const log = debug("mern:pages:App:App");
```

then use `log(xxx)`

in `main.jsx` -> write once -> `localStorage.debug = "mern:*";`

## Structure

method1:
React is contained within src/ . all pages and components etc
Express -> server.js, models, controllers etc
vs
method2:
one folder --> client(react)
one folder --> server(express)

but method 2: while cleaner, is harder to deploy online.

## Proxy Setup

### for Vite

within `vite.config.js`

```js
	server: {
		proxy: {
			"/api": "http://localhost:3000",
		},
	},
```

## Configure App.jsx

- add in folders and pages.
- `npm i react-router-dom`
- wrap routes in main and app

## Routing

- React -> React Router -> /order
- Express -> ALL start with /api like /api/order

try to follow RESTful convention in React routes too

## Why Class Compoent

Last time, functional components had NO hooks.

## Sign Up

- `/` -> AuthPage -> SignUpForm
- User fills in the SignUpForm -> Submit
- preventDefault() -> users-service -> users-api -> FETCH

Fetch (Network Tab) -> `/api/users`, POST + JSON Body (Bruno Also)

### Express

`server.js` -> `/api/users` route -> calls usersRouter
`usersRouter` -> `/` ( `/api/users`) + `POST` -> `usersController.create`
`usersController (create) -> req.body` -> //_testing_
`const user = await User.create() -> res.json(user)` //then database etc...
`//NORMALLY, but in this case, following notes we are sending JWT.
`user -> makeJTW -> JWT -> res.json(jwt)` // JSON WEB TOKEN

### React

users-api -> JSON -> users-service
users-service -> SignUpForm(onSubmit) -> console.log -> //_testing_

## JWT

### Security Terms

encrypt <-> decrypt : Caesar Cypher
plain text + key -> algo -> encrypted text

encode -> change format (no key) -> decode
<https://www.google.com.sg/search?q=singapore's+best+boot+camp>

hashing -> algo(text) -> hash

- this is a one-way method, irrevesible (or at least v difficult)
- faster compared to encryption
- hash("abcdefg") -> "1234567"
- hash("abcdefgh") -> "52632877"

Authentication -> check if the person is who he says he is
Authorization -> check if the person can do he wants

## encrpyting the password

- `npm i bcrypt`
- `AMEND MODEL`

## create JWT

- `npm i jsonwebtoken`
- create a SECRET in the .env file

## userData

- parse userData in server side (users-service)
- lift state to allow setUser in SignUpForm

## others

`//eslint-disable-next-line no-unused-vars`

add rule to .eslintrc to remove props.validation warning
`"react/prop-types": "off"`
