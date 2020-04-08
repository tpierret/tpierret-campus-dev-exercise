import { Component, h } from '@stencil/core';


@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true
})
export class AppRoot {

  redirect(path) {
    if (window.location.pathname != path) {
      window.location.href = path
    }
  }

  render() {
    return (
      <div>
        <header>
          <h1>Movie Search</h1>
          <div class="pageOption" style={{textDecoration:(window.location.pathname =="/" ? 'underline' : ''), fontWeight:(window.location.pathname =="/" ? 'bold' : '')}} onClick={() => this.redirect('/')}>Search</div>
          <div class="pageOption" style={{textDecoration:(window.location.pathname =="/history" ? 'underline' : ''), fontWeight:(window.location.pathname =="/history" ? 'bold' : '')}} onClick={() => this.redirect('/history')}>History</div>
        </header>

        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url={['/']} component='app-search' exact={true} />
              <stencil-route url='/history' component='app-history' />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}
