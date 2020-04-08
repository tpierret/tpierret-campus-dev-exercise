import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-search',
  styleUrl: 'app-search.css',
  shadow: true
})
export class AppHome {

  searchVal: HTMLInputElement;
  typeVal: HTMLSelectElement;


  search() {
    console.log(this.searchVal.value)
    window.location.href = '/results?s=' + this.searchVal.value + "&type=" + this.typeVal.value
  }


  render() {
    return (
      <div class='app-search'>
        <input ref={(el: HTMLInputElement) => this.searchVal = el}></input>

        <select ref={(el: HTMLSelectElement) => this.typeVal = el}>
          <option value="">Any</option>
          <option value="movie">Movies</option>
          <option value="series">Series</option>
          <option value="episode">Episodes</option>
        </select>

        <div onClick={() => this.search()}>Search</div>
      </div>
    );
  }
}
