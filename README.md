# Finance dashboard

This is my pet-project to show my skills in Tailwind, CSS, JS, React.js, Node.js.

## Setup

### Tokens

Go to a directory with module 'CommonJS' and type in the console twice: \
`require('crypto').randomBytes(64).toString('hex')` 

Then go to this project's directory and create a .env file in the root 
- Create 2 lines that should look like this: 
- `ACCESS_TOKEN_SECRET=` 
- `REFRESH_TOKEN_SECRET=` 
- And enter the 2 different tokens in the console that you got with the command above(no spaces)

### Database

Now go to [MongoDB](https://www.mongodb.com/) and 
- Create an account or sign in
- Create a new project
- Create a cluster
- Then follow the instuctions and copy the URI
- Go to your .env and paste in the URI
- Type `DATABASE_URI=`
- Replace the <password> and <username> with your data

## Start

- Open 2 consoles
- In the 1st one type `npm run dev`
- In the 2nd type `nodemon server`
- Go to http://localhost:5173
