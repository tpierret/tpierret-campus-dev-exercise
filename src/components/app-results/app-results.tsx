import { Component, h, State } from '@stencil/core';


@Component({
  tag: 'app-results',
  styleUrl: 'app-results.css',
  shadow: true
})
export class AppResults {

  @State() results;
  urlParams;
  @State() typeName = "";
  @State() search = ""

  componentWillLoad() {
    this.urlParams =  new URLSearchParams(window.location.search);
    this.search = this.urlParams.get('s')
    let type = this.urlParams.get('type')

    this.getResults(this.search,type)

    if (type == "movie") {
      this.typeName = "Movies"
    }
    else if (type == "series") {
      this.typeName = "Series"
    }
    else if (type == 'episode') {
      this.typeName = "Episodes"
    }
    else {
      this.typeName = "Any"
    }

  }

  getResults(search, type) {
    return fetch('http://www.omdbapi.com/?apikey=c2ff56a4&s=' + search + '&type' + type)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return this.results = data;
    });
  }

  render() {
    return (
      <div class='app-results'>
        <div class="title">Results</div>
        <div class="subTitle">{'Search: ' + this.search}</div>
        <div style={{marginBottom:'10px'}} class="subTitle">{'Type: ' + this.typeName}</div>

        {this.results && this.results.totalResults && this.results.totalResults != 0
          ? <div>
              <div class="container">
                {this.results.Search.map((item) =>
                  <div class="resultGrid">
                    <div>
                      <div style={{marginBottom:'3px', fontSize: '20px', fontWeight:'bold'}}>{item.Title}</div>
                      <div style={{marginBottom:'3px'}}>{item.Year}</div>
                      <a href={"https://imdb.com/title/" + item.imdbID}>IMDB profile</a>
                    </div>
                    <div>
                      <img class="poster" src={item.Poster}></img>
                    </div>
                  </div>
                )}
              </div>
              {this.results.totalResults > 10
                ? <div>{"Showing 10 of " + this.results.totalResults + " results. Narrow search parameters for more results."}</div>
                : null
              }
            </div>
          : <div>No results found. Try to edit your search.</div>
        }
      </div>
    );
  }
}
