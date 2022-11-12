Simple app that can show songlists.

Modify `App.tsx` to change the songlist endpoints.

It uses Flow for some static type hinting.

## Commands

* `pnpm start` - run the application in development mode
* `pnpm build` - build production
* `pnpm transfer` - rsync the build folder. Set `deploy_path "myserver:/where/you/want/it"` in `.npmrc`
* `pnpm deploy` - build + transfer in one command
