import createHistory from 'history/createBrowserHistory';
// import createHistory from 'history/createHashHistory';

/**
 * BrowserHistory
 */
const history = createHistory({basename: process.env.PUBLIC_URL});

export default history;
