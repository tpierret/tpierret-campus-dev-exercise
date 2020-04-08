import { Component, h, Prop } from '@stencil/core';


@Component({
  tag: 'app-results',
  styleUrl: 'app-results.css',
  shadow: true
})
export class AppResults {


  @Prop() results;
  @Prop() loading = false;

  @Prop() page: number;
  @Prop() pageSize: number;




  goToPoster(link) {
    window.location.href = link
  }

  render() {


    if (this.results) {
      return (
        <div class='app-results'>

          {this.loading
            ? null
            : <div>

                {this.results.Response && this.results.Response == "False"
                  ? <div class="noResults" style={{display: (this.loading ? 'none' : '')}}>No results found. Try to edit your search.</div>
                  : <div>
                      <div class="container">
                        {this.results.map((item) =>
                          <div class="resultGrid" style={{gridTemplateColumns: (item.Poster == "N/A" ? '1fr' : '1fr 100px')}}>
                            <div>
                              <div style={{marginBottom:'3px', fontSize: '20px', fontWeight:'bold'}}>{item.Title}</div>
                              <div style={{marginBottom:'3px'}}>{item.Year}</div>
                              <a href={"https://imdb.com/title/" + item.imdbID}>IMDB profile</a>
                            </div>
                            <div style={{display: (item.Poster == "N/A" ? 'none' : '')}}>
                              <img onClick={() => this.goToPoster(item.Poster)} class="poster" src={item.Poster}></img>
                            </div>
                          </div>
                        )}
                      </div>


                    </div>
                }
              </div>
            }
        </div>
      );
    }
    else {
      <div></div>
    }
  }
}
