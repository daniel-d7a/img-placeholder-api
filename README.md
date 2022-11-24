# project overview

## scripts

test: compiles ts files to js and runs jasmine tests
`npm run test`

lint: runs prettier and eslint
`npm run lint`

dev: runs the server file (src/index.ts) using nodemon
`npm run dev`

## api endpoint

The app has only one route ( /images).
To access an image add a name, width, and height query parameters after the route like this `http://localhost:8080/images?name=<image name>&width=<image width>&height=<image height>`

For example: -
`http://localhost:8080/images?name=fjord&width=400&height=300`

### notes

-   Name should correspond to one of the images in the `images/full` directory.
-   width and height should be valid numbers.
-   all 3 parameters must be included.
