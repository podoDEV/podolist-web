// import createHistory from 'history/createBrowserHistory';
import createHashHistory from 'history/createHashHistory';

/**
 * BrowserHistory
 */
const history = createHashHistory({basename: process.env.PUBLIC_URL});

export default history;
