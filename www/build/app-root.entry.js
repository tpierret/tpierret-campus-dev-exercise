import { r as registerInstance, h } from './index-68f6b1dd.js';

const appRootCss = "header{background:#000080;color:#fff;height:56px;display:grid;align-items:center;box-shadow:0 2px 5px 0 rgba(0, 0, 0, 0.26);grid-template-columns:1fr 80px 80px}h1{font-size:1.4rem;font-weight:500;padding:0 12px}.pageOption{cursor:pointer;text-align:center}";

const AppRoot = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    redirect(path) {
        if (window.location.pathname != path) {
            window.location.href = path;
        }
    }
    render() {
        return (h("div", null, h("header", null, h("h1", null, "Movie Search"), h("div", { class: "pageOption", style: { textDecoration: (window.location.pathname == "/" ? 'underline' : ''), fontWeight: (window.location.pathname == "/" ? 'bold' : '') }, onClick: () => this.redirect('/') }, "Search"), h("div", { class: "pageOption", style: { textDecoration: (window.location.pathname == "/history" ? 'underline' : ''), fontWeight: (window.location.pathname == "/history" ? 'bold' : '') }, onClick: () => this.redirect('/history') }, "History")), h("main", null, h("stencil-router", null, h("stencil-route-switch", { scrollTopOffset: 0 }, h("stencil-route", { url: ['/'], component: 'app-search', exact: true }), h("stencil-route", { url: '/history', component: 'app-history' }))))));
    }
};
AppRoot.style = appRootCss;

export { AppRoot as app_root };
