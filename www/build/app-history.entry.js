import { r as registerInstance, h } from './index-68f6b1dd.js';

const appHistoryCss = ".app-history{padding:15px}.title{color:#000;font-size:24px;font-weight:bold}.noHistory{margin-top:20px;color:#000;font-size:16px}.history{margin-top:5px}.recordCount{margin-bottom:20px;font-size:14px}.historyHeaderGrid{display:grid;grid-template-columns:repeat(5, 1fr);text-align:center;border:2px black solid;font-size:16px;line-height:24px}@media (max-width: 400px){.historyHeaderGrid{font-size:14px}}.historyHeader{border-left:2px solid black}.dataGrid{border-left:1px solid #f0f0f0}.historyGrid{display:grid;grid-template-columns:repeat(5, 1fr);text-align:center;font-size:12px;border-bottom:1px solid #f0f0f0;border-right:1px solid #f0f0f0;border-left:1px solid #f0f0f0;padding:3px 0}i{border:solid black;border-width:0 3px 3px 0;display:inline-block;padding:3px;text-align:center;cursor:pointer}.right{transform:rotate(-45deg);-webkit-transform:rotate(-45deg)}.left{transform:rotate(135deg);-webkit-transform:rotate(135deg)}.pageControl{width:100%;display:grid;grid-template-columns:1fr 30px 150px 30px 1fr;padding:20px 0;grid-template-rows:50px}.pageInfo{font-weight:bold;text-align:center;line-height:50px}";

const AppHistory = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.page = 1;
        this.maxPage = 1;
        this.pageSize = 20;
        this.minPage = 1;
        this.displayedRecords = [];
    }
    componentWillLoad() {
        if (localStorage.getItem('searchData')) {
            this.history = JSON.parse(localStorage.getItem('searchData'));
            for (let item of this.history) {
                let splitDate = item.searchDate.split(" ");
                let date = splitDate[4].split(":");
                let hour, minute, post;
                minute = date[1];
                if (parseInt(date[0]) > 12) {
                    post = "PM";
                    hour = parseInt(date[0]) - 12;
                }
                else if (parseInt(date[0]) == 0) {
                    hour = "12";
                    post = 'AM';
                }
                else {
                    post = "AM";
                }
                let dateString = splitDate[2] + " " + splitDate[1] + ", " + splitDate[3] + ", " + hour + ":" + minute + post;
                item['displayDate'] = dateString;
            }
            this.maxPage = this.history.length / this.pageSize;
            this.maxPage = Math.ceil(this.maxPage);
            console.log(this.maxPage);
        }
    }
    addPage() {
        this.page++;
    }
    substractPage() {
        this.page--;
    }
    render() {
        return (h("div", { class: "app-history" }, h("div", { class: "title" }, "History"), this.history
            ? h("div", { class: "history" }, h("div", { class: "recordCount" }, "Showing records " + (this.page * this.pageSize - this.pageSize + 1).toString() + "-" + ((this.page * this.pageSize < this.history.length) ? (this.page * this.pageSize).toString() : this.history.length) + " of " + this.history.length + ' records'), h("div", { class: "historyHeaderGrid" }, h("div", { class: "historyHeader", style: { borderLeft: 'none' } }, "Search"), h("div", { class: "historyHeader" }, "Type"), h("div", { class: "historyHeader" }, "Result"), h("div", { class: "historyHeader" }, "Time"), h("div", { class: "historyHeader" }, "Error")), h("div", null, this.history.slice(this.page * this.pageSize - this.pageSize, this.page * this.pageSize).map((item) => h("div", { class: "historyGrid" }, h("div", { class: "dataGrid", style: { borderLeft: 'none' } }, item.search), h("div", { class: "dataGrid" }, item.type == '' ? "any" : item.type), h("div", { class: "dataGrid" }, item.success ? 'Success' : 'Failure'), h("div", { class: "dataGrid" }, item.displayDate), h("div", { class: "dataGrid" }, item.errorMessage)))), h("div", { class: "pageControl" }, h("div", { style: { gridArea: '1/ 2/ span 1/ span 1', margin: 'auto' }, onClick: (this.page > this.minPage) ? (() => this.substractPage()) : null }, h("i", { style: { opacity: ((this.page > this.minPage) ? "1" : '.3') }, class: "arrow left" })), h("div", { style: { gridArea: '1/ 3/ span 1/ span 1' }, class: "pageInfo" }, this.page + " of " + this.maxPage), h("div", { style: { gridArea: '1/ 4/ span 1/ span 1', margin: 'auto' }, onClick: (this.page < this.maxPage) ? (() => this.addPage()) : null }, h("i", { style: { opacity: ((this.page < this.maxPage) ? "1" : '.3') }, class: "arrow right" }))))
            : h("div", { class: "noHistory" }, "No history data is available. Make searches to populate history data.")));
    }
};
AppHistory.style = appHistoryCss;

export { AppHistory as app_history };
