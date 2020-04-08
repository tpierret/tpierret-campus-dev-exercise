import { r as registerInstance, h } from './index-68f6b1dd.js';

const appSearchCss = ".app-search{padding:15px;display:grid;grid-template-columns:1fr;grid-row-gap:20px;max-width:500px;margin:auto;font-family:sans-serif}.directions{text-align:center;color:#000;font-size:20px}.searchTitles{color:#000;font-size:18px;font-weight:bold;margin-bottom:10px}.searchInput{width:calc(100% - 20px);font-size:14px;border:#000080 2px solid;padding:8px;border-radius:0px}.typeSelect{width:100%;font-size:14px;border:#000080 2px solid;-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:8px;border-radius:0px;grid-area:1/ 1/ span 1/ span 2;background:none}.expandArrow{grid-area:1/ 2/ span 1/ span 1;margin:auto}i{border:solid black;border-width:0 3px 3px 0;display:inline-block;padding:3px;margin-bottom:2px}.down{transform:rotate(45deg);-webkit-transform:rotate(45deg)}.selectGrid{width:100%;display:grid;grid-template-columns:1fr 40px}.button{background:#000080;color:white;margin:auto;border:none;font-size:13px;font-weight:700;text-transform:uppercase;padding:16px 40px;border-radius:2px;box-shadow:0 8px 16px rgba(0,0,0,.1), 0 3px 6px rgba(0,0,0,.08);outline:0;letter-spacing:.04em;transition:all .15s ease;cursor:pointer;text-align:center}.button:hover{box-shadow:0 3px 6px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.1);transform:translateY(1px)}.requiredText{color:red;font-size:12px;margin-top:5px}";

const AppHome = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.initSearchVal = '';
        this.initTypeVal = '';
        this.showRequiredText = false;
    }
    componentWillLoad() {
        this.showRequiredText = false;
        this.urlParams = new URLSearchParams(window.location.search);
        if (this.urlParams.has('s')) {
            this.initSearchVal = this.urlParams.get('s');
        }
        if (this.urlParams.has('type')) {
            this.initTypeVal = this.urlParams.get('type');
        }
    }
    search() {
        if (this.searchVal.value && this.searchVal.value != "") {
            window.location.href = '/results?s=' + this.searchVal.value + "&type=" + this.typeVal.value;
        }
        else {
            this.searchVal.style.borderColor = "red";
            this.showRequiredText = true;
        }
    }
    checkForEnter(e) {
        if (e && e.keyCode && e.keyCode == 13) {
            this.search();
        }
    }
    render() {
        return (h("div", { class: 'app-search' }, h("div", { class: "directions" }, "Welcome to the Open Movie Database search engine. Find information about any movie, TV series, or specific episode by searching by name and type of content below."), h("div", null, h("div", { class: "searchTitles" }, "Enter title to search:"), h("input", { onKeyDown: (e) => this.checkForEnter(e), required: true, value: this.initSearchVal, placeholder: "Enter title", class: "searchInput", ref: (el) => this.searchVal = el }), h("div", { class: "requiredText", style: { opacity: (this.showRequiredText) ? '1' : "0" } }, "This field is required.")), h("div", null, h("div", { class: "searchTitles" }, "Select a type of content to search:"), h("div", { class: "selectGrid" }, h("select", { class: "typeSelect", ref: (el) => this.typeVal = el }, h("option", { selected: this.initTypeVal == "", value: "" }, "Any"), h("option", { selected: this.initTypeVal == "movie", value: "movie" }, "Movies"), h("option", { selected: this.initTypeVal == "series", value: "series" }, "Series"), h("option", { selected: this.initTypeVal == "episode", value: "episode" }, "Episodes")), h("div", { class: "expandArrow" }, h("i", { class: "arrow down" })))), h("div", { class: "button", onClick: () => this.search() }, "Search")));
    }
};
AppHome.style = appSearchCss;

export { AppHome as app_search };
