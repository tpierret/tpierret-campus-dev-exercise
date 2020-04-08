import { Component, h, State, Prop } from '@stencil/core';


@Component({
  tag: 'app-results',
  styleUrl: 'app-results.css',
  shadow: true
})
export class AppResults {

  @Prop() apiKey: string = "c2ff56a4";
  @Prop() apiUrl: string = "http://www.omdbapi.com"

  @State() results;
  urlParams;
  @State() typeName = "";
  @State() search = ""
  @State() type = "";

  @State() loading = true;

  @State() page:number = 1;
  @State() maxPage: number = 1;
  minPage: number = 1;

  componentWillLoad() {
    this.loading = true;
    this.urlParams =  new URLSearchParams(window.location.search);
    this.search = this.urlParams.get('s')
    this.type = this.urlParams.get('type')

    this.getResults(this.search, this.type, this.page)

    if (this.type == "movie") {
      this.typeName = "Movies"
    }
    else if (this.type == "series") {
      this.typeName = "Series"
    }
    else if (this.type == 'episode') {
      this.typeName = "Episodes"
    }
    else {
      this.typeName = "Any"
    }


  }

  substractPage() {
    this.page--;
    this.getResults(this.search, this.type, this.page)
    document.scrollingElement.scrollTop = 0
  }

  addPage() {
    this.page++;
    this.getResults(this.search, this.type, this.page)
    document.scrollingElement.scrollTop = 0
  }

  getPageInfo(data) {
    if (data.totalResults) {
      this.maxPage = parseInt(data.totalResults)/10
      this.maxPage = Math.ceil(this.maxPage)
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
      this.getPageInfo(data)
      return this.results = data;
    });
  }

  returnToSearch() {
    window.location.href = '/search?s=' + this.search + '&type=' + this.type
  }

  render() {
    return (
      <div class='app-results'>
        <div class="resultInfoGrid">
          <div>
            <div class="title">Results:</div>
            <div class="subTitle">{'Search: ' + this.search}</div>
            <div class="subTitle">{'Type: ' + this.typeName}</div>
            <div style={{marginBottom:'10px'}} class="subTitle">{'Page: ' + this.page + " of " + this.maxPage}</div>
          </div>
          <div onClick={() => this.returnToSearch()} class="button">Edit Search</div>
        </div>

        {this.loading
          ? null
          : <div>
              {this.results && this.results.totalResults && this.results.totalResults != 0
                ? <div>
                    <div class="container">
                      {this.results.Search.map((item) =>
                        <div class="resultGrid" style={{gridTemplateColumns: (item.Poster == "N/A" ? '1fr' : '1fr 100px')}}>
                          <div>
                            <div style={{marginBottom:'3px', fontSize: '20px', fontWeight:'bold'}}>{item.Title}</div>
                            <div style={{marginBottom:'3px'}}>{item.Year}</div>
                            <a href={"https://imdb.com/title/" + item.imdbID}>IMDB profile</a>
                          </div>
                          <div style={{display: (item.Poster == "N/A" ? 'none' : '')}}>
                            <img class="poster" src={item.Poster}></img>
                          </div>
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
                : <div style={{display: (this.loading ? 'none' : '')}}>No results found. Try to edit your search.</div>
              }
            </div>
          }

      </div>
    );
  }
}
