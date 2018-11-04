import React, { createRef, Component } from "react";
import searchIcon from '../../../static/images/icos/ico-search.svg';

export default class SearchInput extends Component {
  inputRef = createRef();

  async componentDidMount() {
    // Must be imported async because of SSR incompatibility
    const { default: docsearch } = await import('docsearch.js');

    docsearch({
      apiKey: 'a256bdc2b7b80d0424058db638556958',
      indexName: 'iofog',
      inputSelector: this.inputRef.current
    });
  }

  render() {
    return (
      <div className="search__wrapper">
        <img src={searchIcon} />
        <input ref={this.inputRef} type="text" placeholder="Search" />
      </div>
    );
  }
}
