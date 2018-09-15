import createHistory from 'history/createBrowserHistory';

/**
 * BrowserHistory
 */
const history = createHistory({basename: process.env.PUBLIC_URL});

export default history;
