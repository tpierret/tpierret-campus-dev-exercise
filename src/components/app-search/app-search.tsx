import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'app-search',
  styleUrl: 'app-search.css',
  shadow: true
})
export class AppHome {

  searchVal: HTMLInputElement;
  typeVal: HTMLSelectElement;
  urlParams;

  @State() initSearchVal: string = ''
  @State() initTypeVal: string =''

  @State() showRequiredText: boolean = false;


  componentWillLoad() {
    this.showRequiredText = false;
    this.urlParams =  new URLSearchParams(window.location.search);
    if (this.urlParams.has('s')) {
      this.initSearchVal = this.urlParams.get('s')
    }
    if (this.urlParams.has('type')) {
      this.initTypeVal = this.urlParams.get('type')
    }
  }


  search() {

    if (this.searchVal.value && this.searchVal.value != "") {
      window.location.href = '/results?s=' + this.searchVal.value + "&type=" + this.typeVal.value
    }
    else {
      this.searchVal.style.borderColor = "red";
      this.showRequiredText = true;
    }
  }

  checkForEnter(e) {
    if (e && e.keyCode && e.keyCode ==13) {
      this.search()
    }
  }

  render() {
    return (
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
    );
  }
}
