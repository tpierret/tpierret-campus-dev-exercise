import { r as registerInstance, h } from './index-68f6b1dd.js';

const appRootCss = "header{background:#000080;color:#fff;height:56px;display:flex;align-items:center;box-shadow:0 2px 5px 0 rgba(0, 0, 0, 0.26)}h1{font-size:1.4rem;font-weight:500;padding:0 12px}";

const AppRoot = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h("div", null, h("header", null, h("h1", null, "Movie Search")), h("main", null, h("stencil-router", null, h("stencil-route-switch", { scrollTopOffset: 0 }, h("stencil-route", { url: ['/', '/search'], component: 'app-search', exact: true }), h("stencil-route", { url: '/results', component: 'app-results' }))))));
    }
};
AppRoot.style = appRootCss;

export { AppRoot as app_root };
