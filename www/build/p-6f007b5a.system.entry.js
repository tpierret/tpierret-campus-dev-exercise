System.register(["./p-8ce83298.system.js"],(function(t){"use strict";var e,s;return{setters:[function(t){e=t.r;s=t.h}],execute:function(){var i=".app-results{padding:10px;font-family:sans-serif}.title{font-size:20px;color:#000;font-weight:bold;margin-bottom:5px}.subTitle{color:#000;margin-bottom:3px}@media (max-width:600px){.container{grid-template-columns:repeat( 1, 1fr)}}@media (min-width:600px) and (max-width: 1200px){.container{grid-template-columns:repeat( 2, 1fr)}}@media (min-width:1200px){.container{grid-template-columns:repeat( 3, 1fr)}}.container{grid-gap:20px;display:grid}.resultGrid{display:grid;grid-template-columns:1fr 100px;width:calc(100% - 24px);border:2px #f0f0f0 solid;padding:10px;font-size:16px}.poster{max-height:150px;margin:auto;max-width:100px}";var r=t("app_results",function(){function t(t){e(this,t);this.typeName="";this.search=""}t.prototype.componentWillLoad=function(){this.urlParams=new URLSearchParams(window.location.search);this.search=this.urlParams.get("s");var t=this.urlParams.get("type");this.getResults(this.search,t);if(t=="movie"){this.typeName="Movies"}else if(t=="series"){this.typeName="Series"}else if(t=="episode"){this.typeName="Episodes"}else{this.typeName="Any"}};t.prototype.getResults=function(t,e){var s=this;return fetch("http://www.omdbapi.com/?apikey=c2ff56a4&s="+t+"&type"+e).then((function(t){return t.json()})).then((function(t){console.log(t);return s.results=t}))};t.prototype.render=function(){return s("div",{class:"app-results"},s("div",{class:"title"},"Results"),s("div",{class:"subTitle"},"Search: "+this.search),s("div",{style:{marginBottom:"10px"},class:"subTitle"},"Type: "+this.typeName),this.results&&this.results.totalResults&&this.results.totalResults!=0?s("div",null,s("div",{class:"container"},this.results.Search.map((function(t){return s("div",{class:"resultGrid"},s("div",null,s("div",{style:{marginBottom:"3px",fontSize:"20px",fontWeight:"bold"}},t.Title),s("div",{style:{marginBottom:"3px"}},t.Year),s("a",{href:"https://imdb.com/title/"+t.imdbID},"IMDB profile")),s("div",null,s("img",{class:"poster",src:t.Poster})))}))),this.results.totalResults>10?s("div",null,"Showing 10 of "+this.results.totalResults+" results. Narrow search parameters for more results."):null):s("div",null,"No results found. Try to edit your search."))};return t}());r.style=i}}}));