# Rhythmic Squad's Grace Shopper

Welcome to our eCommerce site: A Space Apart.

## Set-Up

Before starting up for the first time, please run:
```
npm install
createdb grace_shopper
npm run seed
```

You can then run in a development environment with the `build:dev` and `start:dev` scripts. These will run webpack and nodemon, respectively, with watch flags to catch any changes. You can also run `test:dev` to run tests with the watch flag.

## Merge Conflicts

If GitHub tells you your pull request has merger conflicts, you can resolve them locally. First, make sure to commit any local changes you have made, as the merge process may make it hard to restore uncommitted changes. Then, you can run the following commands locally:
```
git checkout main
git pull
git checkout <your branch>
git merge main
```
Switching to main, then pulling gives you the most current version of main to merge, then you switch back to your local branch and merge main into it. You can then review and resolve any merge conflicts directly in VSCode. Once you've resolved those conflicts, be sure to run the `test:dev` command to confirm, then stage the files (`git add -A`) and use `git merge --continue` to finish the merge. Finally, push these changes to your branch up to GitHub, where you should no longer get any merge conflict messages and it is thus safe to merge your pull request.
