import { Component, h } from '@stencil/core';


@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true
})
export class AppRoot {

  render() {
    return (
      <div>
        <header>
          <h1>Movie Search</h1>
        </header>

        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url={['/', '/search']} component='app-search' exact={true} />
              <stencil-route url='/results' component='app-results' />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}
