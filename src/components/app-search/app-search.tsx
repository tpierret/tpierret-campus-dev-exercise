import { Component, h, State, Prop } from '@stencil/core';

@Component({
  tag: 'app-search',
  styleUrl: 'app-search.css',
  shadow: true
})
export class AppHome {

  @Prop() apiKey: string = "c2ff56a4";
  @Prop() apiUrl: string = "http://www.omdbapi.com"

  @State() page:number = 1;
  @State() maxPage: number = 1;
  minPage: number = 1;

  @Prop() pageSize: number = 10;

  @State() previousSearch = ''
  @State() previousType = ''

  searchVal: HTMLInputElement;
  typeVal: HTMLSelectElement;
  resultsEl: HTMLElement;
  urlParams;

  @State() initSearchVal: string = ''
  @State() initTypeVal: string =''

  @State() showRequiredText: boolean = false;

  @State() results;
  @State() loading = true;
  @State() displayedResults;


  componentWillLoad() {
    this.showRequiredText = false;
  }


  search() {

    if (this.searchVal.value && this.searchVal.value != "") {
      this.getResults(this.searchVal.value, this.typeVal.value, this.page)
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
      this.getPageInfo(data)
      this.results = data;
      console.log(data)
      if (this.results.Search) {
        this.resultsEl['results'] = this.results.Search
        this.storeSearch(search, type, true)

      }
      else {
        console.log(this.results.Error)
        this.resultsEl['results'] = this.results
        this.storeSearch(search, type, false, this.results.Error)
      }
      return
    });
  }

  storeSearch(search, type, success, error = false) {
    console.log(error)
    if (search != this.previousSearch || type != this.previousType) {
      let searchData = {}
      if (error) {
        searchData = {
          "search": search,
          "type": type,
          "success": success,
          "errorMessage": error,
          "searchDate": new Date().toUTCString()
        }
      }
      else {
        searchData = {
          "search": search,
          "type": type,
          "success": success,
          "errorMessage": null,
          "searchDate": new Date().toUTCString()
        }
      }
      console.log(searchData)
      this.previousType = type
      this.previousSearch = search
      if (localStorage.getItem('searchData') && (localStorage.getItem('searchData') != "")) {
        let val = JSON.parse(localStorage.getItem('searchData'))
        val.push(searchData)
        localStorage.setItem('searchData', JSON.stringify(val))
      }
      else {
        let val = [searchData]
        localStorage.setItem('searchData', JSON.stringify(val))
      }

    }
  }

  checkForEnter(e) {
    if (e && e.keyCode && e.keyCode ==13) {
      this.search()
    }
  }

  substractPage() {
    this.page--;
    this.getResults(this.searchVal.value, this.typeVal.value, this.page)
    document.scrollingElement.scrollTop = 0
  }

  addPage() {
    this.page++;
    this.getResults(this.searchVal.value, this.typeVal.value, this.page)
    document.scrollingElement.scrollTop = 0
  }

  getPageInfo(data) {
    if (data.totalResults) {
      this.maxPage = parseInt(data.totalResults)/this.pageSize
      this.maxPage = Math.ceil(this.maxPage)
    }
    else {
      this.maxPage = 0;
      this.page = 0;
    }
  }

  render() {
    return (
      <div>
        <div class='app-search'>
          <div class="directions">Welcome to the Open Movie Database search engine. Find information about any movie, TV series, or specific episode by searching by name and type of content below.</div>

          <div>
            <div class="searchTitles">Enter title to search:</div>
            <input onKeyDown={(e) => this.checkForEnter(e)} required value={this.initSearchVal} placeholder="Enter title" class="searchInput" ref={(el: HTMLInputElement) => this.searchVal = el}></input>
            <div class="requiredText" style={{opacity: (this.showRequiredText) ? '1' : "0"}}>{"This field is required."}</div>
          </div>
          <div>
            <div class="searchTitles">Select a type of content to search:</div>
            <div class="selectGrid">
              <select  class="typeSelect" ref={(el: HTMLSelectElement) => this.typeVal = el}>
                <option selected={this.initTypeVal == ""} value="">Any</option>
                <option selected={this.initTypeVal == "movie"} value="movie">Movies</option>
                <option selected={this.initTypeVal == "series"} value="series">Series</option>
                <option selected={this.initTypeVal == "episode"} value="episode">Episodes</option>
              </select>
              <div class="expandArrow"><i class="arrow down"></i></div>
            </div>
          </div>

          <div class="button" onClick={() => this.search()}>Search</div>

        </div>

        <div class="recordCount">{this.results && this.results.totalResults ? ("Showing records " + (this.page*this.pageSize-this.pageSize + 1).toString() + "-" + ((this.page*this.pageSize < this.results.totalResults) ? (this.page*this.pageSize).toString() : this.results.totalResults) + " of " + (this.results.totalResults) + " records.") : ""}</div>


        <app-results page={this.page} page-size={this.pageSize} ref={(el: HTMLElement) => this.resultsEl = el} loading={this.loading}></app-results>

        <div class="pageControl" style={{display: (this.results && this.results.totalResults && this.results.totalResults !=0) ? '' : 'none'}}>
          <div style={{gridArea: '1/ 2/ span 1/ span 1', margin:'auto'}} onClick={(this.page>this.minPage) ? (() => this.substractPage()) : null}>
            <i style={{opacity: ((this.page>this.minPage) ? "1" : '.3')}} class="arrow left"></i>
          </div>
          <div style={{gridArea: '1/ 3/ span 1/ span 1'}} class="pageInfo">{this.page + " of " + this.maxPage}</div>
          <div style={{gridArea: '1/ 4/ span 1/ span 1', margin:'auto'}} onClick={(this.page<this.maxPage) ? (() => this.addPage()) : null}>
            <i style={{opacity: ((this.page<this.maxPage) ? "1" : '.3')}} class="arrow right"></i>
          </div>

        </div>

      </div>
    );
  }
}
