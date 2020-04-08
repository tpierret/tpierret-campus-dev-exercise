import './index-68f6b1dd.js';
import { A as ActiveRouter } from './active-router-c489d1d2.js';
import './match-path-760e1797.js';
import './location-utils-fea12957.js';

function injectHistory(Component) {
    ActiveRouter.injectProps(Component, ['history', 'location']);
}
