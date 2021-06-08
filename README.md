Simple app that can show songlists.

Modify `App.js` to change the songlist endpoints.

It uses Flow for some static type hinting.

## Commands

* `yarn start` - run the application in development mode
* `yarn build` - build production
* `yarn transfer` - rsync the build folder. Set `deploy_path "myserver:/where/you/want/it"` in `.yarnrc`
* `yarn deploy` - build + transfer in one command
