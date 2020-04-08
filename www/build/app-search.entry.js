import { r as registerInstance, h } from './index-68f6b1dd.js';

const appSearchCss = ".app-search{padding:15px;display:grid;grid-template-columns:1fr;grid-row-gap:20px;max-width:500px;margin:auto;font-family:sans-serif}.directions{text-align:center;color:#000;font-size:20px}.searchTitles{color:#000;font-size:18px;font-weight:bold;margin-bottom:10px}.searchInput{width:calc(100% - 20px);font-size:14px;border:#000080 2px solid;padding:8px;border-radius:0px}.typeSelect{width:100%;font-size:14px;border:#000080 2px solid;-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:8px;border-radius:0px;grid-area:1/ 1/ span 1/ span 2;background:none}.expandArrow{grid-area:1/ 2/ span 1/ span 1;margin:auto}i{border:solid black;border-width:0 3px 3px 0;display:inline-block;padding:3px;margin-bottom:2px}.down{transform:rotate(45deg);-webkit-transform:rotate(45deg)}.selectGrid{width:100%;display:grid;grid-template-columns:1fr 40px}.button{background:#000080;color:white;margin:auto;border:none;font-size:13px;font-weight:700;text-transform:uppercase;padding:16px 40px;border-radius:2px;box-shadow:0 8px 16px rgba(0,0,0,.1), 0 3px 6px rgba(0,0,0,.08);outline:0;letter-spacing:.04em;transition:all .15s ease;cursor:pointer;text-align:center}.button:hover{box-shadow:0 3px 6px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.1);transform:translateY(1px)}.requiredText{color:red;font-size:12px;margin-top:5px}i{border:solid black;border-width:0 3px 3px 0;display:inline-block;padding:3px;text-align:center;cursor:pointer}.right{transform:rotate(-45deg);-webkit-transform:rotate(-45deg)}.left{transform:rotate(135deg);-webkit-transform:rotate(135deg)}.pageControl{width:100%;display:grid;grid-template-columns:1fr 30px 150px 30px 1fr;padding:20px 0;grid-template-rows:50px}.pageInfo{font-weight:bold;text-align:center;line-height:50px}.recordCount{margin-bottom:10px;margin-top:10px;font-size:14px;margin-left:15px}";

const AppHome = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.apiKey = "c2ff56a4";
        this.apiUrl = "http://www.omdbapi.com";
        this.page = 1;
        this.maxPage = 1;
        this.minPage = 1;
        this.pageSize = 10;
        this.previousSearch = '';
        this.previousType = '';
        this.initSearchVal = '';
        this.initTypeVal = '';
        this.showRequiredText = false;
        this.loading = true;
    }
    componentWillLoad() {
        this.showRequiredText = false;
    }
    search() {
        if (this.searchVal.value && this.searchVal.value != "") {
            this.getResults(this.searchVal.value, this.typeVal.value, this.page);
        }
        else {
            this.searchVal.style.borderColor = "red";
            this.showRequiredText = true;
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
            this.results = data;
            console.log(data);
            if (this.results.Search) {
                this.resultsEl['results'] = this.results.Search;
                this.storeSearch(search, type, true);
            }
            else {
                console.log(this.results.Error);
                this.resultsEl['results'] = this.results;
                this.storeSearch(search, type, false, this.results.Error);
            }
            return;
        });
    }
    storeSearch(search, type, success, error = false) {
        console.log(error);
        if (search != this.previousSearch || type != this.previousType) {
            let searchData = {};
            if (error) {
                searchData = {
                    "search": search,
                    "type": type,
                    "success": success,
                    "errorMessage": error,
                    "searchDate": new Date().toUTCString()
                };
            }
            else {
                searchData = {
                    "search": search,
                    "type": type,
                    "success": success,
                    "errorMessage": null,
                    "searchDate": new Date().toUTCString()
                };
            }
            console.log(searchData);
            this.previousType = type;
            this.previousSearch = search;
            if (localStorage.getItem('searchData') && (localStorage.getItem('searchData') != "")) {
                let val = JSON.parse(localStorage.getItem('searchData'));
                val.push(searchData);
                localStorage.setItem('searchData', JSON.stringify(val));
            }
            else {
                let val = [searchData];
                localStorage.setItem('searchData', JSON.stringify(val));
            }
        }
    }
    checkForEnter(e) {
        if (e && e.keyCode && e.keyCode == 13) {
            this.search();
        }
    }
    substractPage() {
        this.page--;
        this.getResults(this.searchVal.value, this.typeVal.value, this.page);
        document.scrollingElement.scrollTop = 0;
    }
    addPage() {
        this.page++;
        this.getResults(this.searchVal.value, this.typeVal.value, this.page);
        document.scrollingElement.scrollTop = 0;
    }
    getPageInfo(data) {
        if (data.totalResults) {
            this.maxPage = parseInt(data.totalResults) / this.pageSize;
            this.maxPage = Math.ceil(this.maxPage);
        }
        else {
            this.maxPage = 0;
            this.page = 0;
        }
    }
    render() {
        return (h("div", null, h("div", { class: 'app-search' }, h("div", { class: "directions" }, "Welcome to the Open Movie Database search engine. Find information about any movie, TV series, or specific episode by searching by name and type of content below."), h("div", null, h("div", { class: "searchTitles" }, "Enter title to search:"), h("input", { onKeyDown: (e) => this.checkForEnter(e), required: true, value: this.initSearchVal, placeholder: "Enter title", class: "searchInput", ref: (el) => this.searchVal = el }), h("div", { class: "requiredText", style: { opacity: (this.showRequiredText) ? '1' : "0" } }, "This field is required.")), h("div", null, h("div", { class: "searchTitles" }, "Select a type of content to search:"), h("div", { class: "selectGrid" }, h("select", { class: "typeSelect", ref: (el) => this.typeVal = el }, h("option", { selected: this.initTypeVal == "", value: "" }, "Any"), h("option", { selected: this.initTypeVal == "movie", value: "movie" }, "Movies"), h("option", { selected: this.initTypeVal == "series", value: "series" }, "Series"), h("option", { selected: this.initTypeVal == "episode", value: "episode" }, "Episodes")), h("div", { class: "expandArrow" }, h("i", { class: "arrow down" })))), h("div", { class: "button", onClick: () => this.search() }, "Search")), h("div", { class: "recordCount" }, this.results && this.results.totalResults ? ("Showing records " + (this.page * this.pageSize - this.pageSize + 1).toString() + "-" + ((this.page * this.pageSize < this.results.totalResults) ? (this.page * this.pageSize).toString() : this.results.totalResults) + " of " + (this.results.totalResults) + " records.") : ""), h("app-results", { page: this.page, "page-size": this.pageSize, ref: (el) => this.resultsEl = el, loading: this.loading }), h("div", { class: "pageControl", style: { display: (this.results && this.results.totalResults && this.results.totalResults != 0) ? '' : 'none' } }, h("div", { style: { gridArea: '1/ 2/ span 1/ span 1', margin: 'auto' }, onClick: (this.page > this.minPage) ? (() => this.substractPage()) : null }, h("i", { style: { opacity: ((this.page > this.minPage) ? "1" : '.3') }, class: "arrow left" })), h("div", { style: { gridArea: '1/ 3/ span 1/ span 1' }, class: "pageInfo" }, this.page + " of " + this.maxPage), h("div", { style: { gridArea: '1/ 4/ span 1/ span 1', margin: 'auto' }, onClick: (this.page < this.maxPage) ? (() => this.addPage()) : null }, h("i", { style: { opacity: ((this.page < this.maxPage) ? "1" : '.3') }, class: "arrow right" })))));
    }
};
AppHome.style = appSearchCss;

export { AppHome as app_search };
