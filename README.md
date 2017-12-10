Setup for local development
---------------------------------

`git clone --recursive`

or

````
git clone
git submodule init
git submodule update
````

1. Create the initial npm package with sbt:

`sbt apiClientJS/packageForNpm`

2. Run `npm link` from the api-client/target/npm directory to link the directory into local (system-wide) npm repository:

````
cd api-client/target/npm

npm link
````
3. Run `npm link intake24-redux-client` from the web app's directory to link the intake24 module from the local repository:

````
cd web

npm link intake24-redux-client
````

4. Start sbt in watch mode to automatically rebuild the JavaScript module:

````
sbt ~reduxClient/packageForNpm 
````

5. Start the webpack development server

````
cd web
npm run dev-server 
````

The application will be available at http://localhost:8080 and all changes to 
the code, both Scala and JavaScript/TypeScript should be picked up automatically 
by the webpack dev server.

See [npm docs](https://docs.npmjs.com/cli/link) for more details about the 
`npm link` feature.
