import { Component, h, State, Prop } from '@stencil/core';


@Component({
  tag: 'app-history',
  styleUrl: 'app-history.css',
  shadow: true
})
export class AppHistory{

  @State() history;
  @State() page:number = 1;
  @State() maxPage: number = 1;

  @Prop() pageSize: number = 20;

  minPage: number = 1;

  @State() displayedRecords = []



  componentWillLoad() {
    if (localStorage.getItem('searchData')) {
      this.history = JSON.parse(localStorage.getItem('searchData'))
      for (let item of this.history) {
        let splitDate = item.searchDate.split(" ")

        let date = splitDate[4].split(":")
        let hour, minute, post
        minute = date[1]
        if (parseInt(date[0])>12) {
          post = "PM"
          hour = parseInt(date[0]) -12
        }
        else if (parseInt(date[0])==0) {
          hour = "12"
          post = 'AM'
        }
        else {
          post = "AM"
        }
        let dateString = splitDate[2] + " " + splitDate[1] + ", " + splitDate[3] + ", " + hour + ":" + minute + post
        item['displayDate'] = dateString

      }
      this.maxPage = this.history.length/this.pageSize
      this.maxPage = Math.ceil(this.maxPage)
      console.log(this.maxPage)

    }
  }

  addPage() {
    this.page++;
  }

  substractPage() {
    this.page--;
  }

  render() {
    return (
      <div class="app-history">
        <div class="title">History</div>

        {this.history
          ? <div class="history">
              <div class="recordCount">{"Showing records " + (this.page*this.pageSize-this.pageSize + 1).toString() + "-" + ((this.page*this.pageSize < this.history.length) ? (this.page*this.pageSize).toString() : this.history.length) + " of " + this.history.length + ' records'}</div>
              <div class="historyHeaderGrid">
                <div class="historyHeader" style={{borderLeft:'none'}}>Search</div>
                <div class="historyHeader">Type</div>
                <div class="historyHeader">Result</div>
                <div class="historyHeader">Time</div>
                <div class="historyHeader">Error</div>
              </div>
              <div>
                {this.history.slice(this.page*this.pageSize-this.pageSize, this.page*this.pageSize).map((item) =>
                  <div class = "historyGrid">
                    <div class="dataGrid" style={{borderLeft:'none'}}>{item.search}</div>
                    <div class="dataGrid">{item.type == '' ? "any" : item.type}</div>
                    <div class="dataGrid">{item.success ? 'Success' : 'Failure'}</div>
                    <div class="dataGrid">{item.displayDate}</div>
                    <div class="dataGrid">{item.errorMessage}</div>
                  </div>
                )}
              </div>



              <div class="pageControl">
                <div style={{gridArea: '1/ 2/ span 1/ span 1', margin:'auto'}} onClick={(this.page>this.minPage) ? (() => this.substractPage()) : null}>
                  <i style={{opacity: ((this.page>this.minPage) ? "1" : '.3')}} class="arrow left"></i>
                </div>
                <div style={{gridArea: '1/ 3/ span 1/ span 1'}} class="pageInfo">{this.page + " of " + this.maxPage}</div>
                <div style={{gridArea: '1/ 4/ span 1/ span 1', margin:'auto'}} onClick={(this.page<this.maxPage) ? (() => this.addPage()) : null}>
                  <i style={{opacity: ((this.page<this.maxPage) ? "1" : '.3')}} class="arrow right"></i>
                </div>
              </div>

            </div>
          : <div class="noHistory">No history data is available. Make searches to populate history data.</div>
        }



      </div>
    );
  }
}
