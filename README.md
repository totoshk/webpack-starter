<h1>Webpack project template using sass/babel/react/redux</h1>

## How to use the files?

1. Clone this repo
2. Run `npm install` in command line to install all the dependencies
3. Run `npm run dev` for development mode (In this mode there is no files created)
4. New browser window should open automatically.
5. For production just run `npm run prod` (dist folder with compressed files will be created)

Also you can run `npm run clean` to clean the dist directory content.

For windows users one need to change line
    `"prod": "npm run clean && NODE_ENV=production webpack -p",`
in package.json on
    `"prod": "npm run clean && set NODE_ENV=production&& webpack -p",`
