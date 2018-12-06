import React, { Component } from 'react';
import searchIcon from '../../../static/images/icos/ico-search.svg';

export default class SearchInput extends Component {
  async componentDidMount() {
    // Must be imported async because of SSR incompatibility
    const { default: docsearch } = await import('docsearch.js');

    docsearch({
      apiKey: 'a256bdc2b7b80d0424058db638556958',
      indexName: 'iofog',
      inputSelector: '#search-input'
    });
  }

  render() {
    return (
      <div className="search__wrapper">
        <img src={searchIcon} />
        <input id="search-input" type="text" placeholder="Search" />
      </div>
    );
  }
}
