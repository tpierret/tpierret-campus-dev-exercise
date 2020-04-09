import { r as registerInstance, h } from './index-68f6b1dd.js';

const appResultsCss = ".app-results{padding:10px;font-family:sans-serif}.resultInfoGrid{display:grid;grid-template-columns:1fr auto;grid-column-gap:10px}.title{border-top:1px solid #f0f0f0;font-size:22px;color:#000;font-weight:bold;padding:20px 0}@media (max-width:600px){.container{grid-template-columns:repeat( 1, 1fr)}}@media (min-width:700px) and (max-width: 1400px){.container{grid-template-columns:repeat( 2, 1fr)}}@media (min-width:1400px){.container{grid-template-columns:repeat( 3, 1fr)}}.container{grid-gap:20px;display:grid}.resultGrid{display:grid;width:calc(100% - 24px);border:2px #f0f0f0 solid;padding:10px;font-size:16px}.poster{max-height:150px;margin:auto;max-width:100px;cursor:pointer}.noResults{color:#000;margin-top:20px;text-align:center}";

const AppResults = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.loading = false;
    }
    goToPoster(link) {
        window.location.href = link;
    }
    render() {
        if (this.results) {
            return (h("div", { class: 'app-results' }, this.loading
                ? null
                : h("div", null, this.results.Response && this.results.Response == "False"
                    ? h("div", { class: "noResults", style: { display: (this.loading ? 'none' : '') } }, "No results found. Try to edit your search.")
                    : h("div", null, h("div", { class: "container" }, this.results.map((item) => h("div", { class: "resultGrid", style: { gridTemplateColumns: (item.Poster == "N/A" ? '1fr' : '1fr 100px') } }, h("div", null, h("div", { style: { marginBottom: '3px', fontSize: '20px', fontWeight: 'bold' } }, item.Title), h("div", { style: { marginBottom: '3px' } }, item.Year), h("a", { href: "https://imdb.com/title/" + item.imdbID }, "IMDB profile")), h("div", { style: { display: (item.Poster == "N/A" ? 'none' : '') } }, h("img", { onClick: () => this.goToPoster(item.Poster), class: "poster", src: item.Poster })))))))));
        }
        else {
            h("div", null);
        }
    }
};
AppResults.style = appResultsCss;

export { AppResults as app_results };
