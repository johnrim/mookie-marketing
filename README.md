# Deploying to Firebase server

Push changes to Git BEFORE pushing to the firebase server.

## First time firebase-use:

1. Open terminal
2. run `npm install -global firebase-tools`
3. move into your local `mookie-marketing` directory
4. `firebase login`
5. `Y`
6. Browser should open with google auth page. Login with rob@mookie.io
7. Once login is successful, return to terminal
8. while inside local `mookie-marketing` directory, run `firebase serve` to check the site locally on localhost: 5000
9. run `firebase init`
10. select `hosting` using arrow keys, spacebar, and enter key
11. confirm public directory as `/`
12. do not run as SPA
13. DO NOT overwrite index.html file
14. run `firebase deploy`

## Non-first time:

1. move to local `mookie-marketing` directory
2. run `firebase init`
3. select `hosting` using arrow keys and enter key
4. run `firebase deploy`

# CDN for images

Images now hosted by Firebase hosting.
