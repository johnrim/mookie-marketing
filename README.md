# Deploying to Firebase server.

Push changes to Git BEFORE pushing to the firebase server.

## First time firebase-use:

1. Open terminal
2. run `npm install -global firebase-tools~
3. move into your local `mookie-marketing` directory
4. `firebase login`
5. `Y`
6. Browser should open with google auth page. Login with hello@mookie.io
7. Once login is successful, return to terminal
8. while inside local `mookie-marketing` directory, run `firebase init`
9. select `hosting` using arrow keys and enter key
10. run `firebase deploy`

## Non-first time:

1. move to local `mookie-marketing` directory
2. run `firebase init`
3. select `hosting` using arrow keys and enter key
4. run `firebase deploy`

# CDN for images

Stored and distributed by AWS S3+Cloudfront under hello@mookie.io
