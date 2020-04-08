import { r as registerInstance, h } from './index-68f6b1dd.js';

const appResultsCss = ".app-results{padding:10px;font-family:sans-serif}.resultInfoGrid{display:grid;grid-template-columns:1fr auto;grid-column-gap:10px}.title{font-size:22px;color:#000;font-weight:bold;margin-bottom:15px}.subTitle{color:#000;margin-bottom:3px}@media (max-width:600px){.container{grid-template-columns:repeat( 1, 1fr)}}@media (min-width:600px) and (max-width: 1200px){.container{grid-template-columns:repeat( 2, 1fr)}}@media (min-width:1200px){.container{grid-template-columns:repeat( 3, 1fr)}}.container{grid-gap:20px;display:grid}.resultGrid{display:grid;width:calc(100% - 24px);border:2px #f0f0f0 solid;padding:10px;font-size:16px}.poster{max-height:150px;margin:auto;max-width:100px}.button{background:#000080;color:white;margin:auto;border:none;font-size:13px;font-weight:700;text-transform:uppercase;padding:16px 16px;border-radius:2px;box-shadow:0 8px 16px rgba(0,0,0,.1), 0 3px 6px rgba(0,0,0,.08);outline:0;letter-spacing:.04em;transition:all .15s ease;cursor:pointer;text-align:center}.button:hover{box-shadow:0 3px 6px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.1);transform:translateY(1px)}.moreResults{padding:30px 10px}i{border:solid black;border-width:0 3px 3px 0;display:inline-block;padding:3px;text-align:center;cursor:pointer}.right{transform:rotate(-45deg);-webkit-transform:rotate(-45deg)}.left{transform:rotate(135deg);-webkit-transform:rotate(135deg)}.pageControl{width:100%;display:grid;grid-template-columns:1fr 30px 150px 30px 1fr;padding:20px 0;grid-template-rows:50px}.pageInfo{font-weight:bold;text-align:center;line-height:50px}";

const AppResults = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.apiKey = "c2ff56a4";
        this.apiUrl = "http://www.omdbapi.com";
        this.typeName = "";
        this.search = "";
        this.type = "";
        this.loading = true;
        this.page = 1;
        this.maxPage = 1;
        this.minPage = 1;
    }
    componentWillLoad() {
        this.loading = true;
        this.urlParams = new URLSearchParams(window.location.search);
        this.search = this.urlParams.get('s');
        this.type = this.urlParams.get('type');
        this.getResults(this.search, this.type, this.page);
        if (this.type == "movie") {
            this.typeName = "Movies";
        }
        else if (this.type == "series") {
            this.typeName = "Series";
        }
        else if (this.type == 'episode') {
            this.typeName = "Episodes";
        }
        else {
            this.typeName = "Any";
        }
    }
    substractPage() {
        this.page--;
        this.getResults(this.search, this.type, this.page);
        document.scrollingElement.scrollTop = 0;
    }
    addPage() {
        this.page++;
        this.getResults(this.search, this.type, this.page);
        document.scrollingElement.scrollTop = 0;
    }
    getPageInfo(data) {
        if (data.totalResults) {
            this.maxPage = parseInt(data.totalResults) / 10;
            this.maxPage = Math.ceil(this.maxPage);
        }
        else {
            this.maxPage = 0;
            this.page = 0;
        }
    }
    getResults(search, type, page) {
        this.loading = true;
        return fetch(this.apiUrl + '?apikey=' + this.apiKey + '&s=' + search + '&type=' + type + "&page=" + page)
            .then((response) => {
            return response.json();
        })
            .then((data) => {
            this.loading = false;
            this.getPageInfo(data);
            return this.results = data;
        });
    }
    returnToSearch() {
        window.location.href = '/search?s=' + this.search + '&type=' + this.type;
    }
    render() {
        return (h("div", { class: 'app-results' }, h("div", { class: "resultInfoGrid" }, h("div", null, h("div", { class: "title" }, "Results:"), h("div", { class: "subTitle" }, 'Search: ' + this.search), h("div", { class: "subTitle" }, 'Type: ' + this.typeName), h("div", { style: { marginBottom: '10px' }, class: "subTitle" }, 'Page: ' + this.page + " of " + this.maxPage)), h("div", { onClick: () => this.returnToSearch(), class: "button" }, "Edit Search")), this.loading
            ? null
            : h("div", null, this.results && this.results.totalResults && this.results.totalResults != 0
                ? h("div", null, h("div", { class: "container" }, this.results.Search.map((item) => h("div", { class: "resultGrid", style: { gridTemplateColumns: (item.Poster == "N/A" ? '1fr' : '1fr 100px') } }, h("div", null, h("div", { style: { marginBottom: '3px', fontSize: '20px', fontWeight: 'bold' } }, item.Title), h("div", { style: { marginBottom: '3px' } }, item.Year), h("a", { href: "https://imdb.com/title/" + item.imdbID }, "IMDB profile")), h("div", { style: { display: (item.Poster == "N/A" ? 'none' : '') } }, h("img", { class: "poster", src: item.Poster }))))), h("div", { class: "pageControl" }, h("div", { style: { gridArea: '1/ 2/ span 1/ span 1', margin: 'auto' }, onClick: (this.page > this.minPage) ? (() => this.substractPage()) : null }, h("i", { style: { opacity: ((this.page > this.minPage) ? "1" : '.3') }, class: "arrow left" })), h("div", { style: { gridArea: '1/ 3/ span 1/ span 1' }, class: "pageInfo" }, this.page + " of " + this.maxPage), h("div", { style: { gridArea: '1/ 4/ span 1/ span 1', margin: 'auto' }, onClick: (this.page < this.maxPage) ? (() => this.addPage()) : null }, h("i", { style: { opacity: ((this.page < this.maxPage) ? "1" : '.3') }, class: "arrow right" }))))
                : h("div", { style: { display: (this.loading ? 'none' : '') } }, "No results found. Try to edit your search."))));
    }
};
AppResults.style = appResultsCss;

export { AppResults as app_results };
