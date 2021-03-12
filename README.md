# think-progress

Reimagining progress bars in the light of the principles of good thinking 
and good map making. A progress bar for known out of known step counts with 
uniform step sizes which gives a better sense than a traditional progress 
bar of how long you have to go and how progress has been in the past.

Traditional progress bars, if I'm being generous since many of them actually 
do far worse than this, tend to look something like this:

> [XXXXX#####] (50% completed, 50% remaining)

Take a moment to try to answer questions using the progress visualization 
like:

 - How much longer will it take to complete?
 - What is the recent history of progress?
 - How is progress momentum developing? It is getting faster? Slower?
 - Should I hold my breath?

If you had trouble answering those questions then it might be a bit more
clear why the current state of the art in progress visualization design
tends to celebrate not even attempting to give a means of inferring
progression.

![Game Loading Progress Visualization](docs/images/hearthstone_loading-2-1.gif)

In contrast this project makes progress visualizations that give a good sense 
for how things have been progressing by showing both the underlying progress 
updates and the extrapolation of remaining updates as part of a timeseries.

![Think Progress Example](docs/images/progress.png)

It also takes a different approach to communicating how long things will take 
to complete. Instead of giving only one estimate it renders multiple possible 
extrapolated completion times and lets the viewers mind conclude which one is 
the most reasonable.


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
