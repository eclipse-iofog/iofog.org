import React, { Component } from 'react';
import { Link } from 'gatsby';
import { MdSearch } from 'react-icons/md';
import config from '../../../data/SiteConfig';

import './Header.scss';

class Header extends Component {
  render() {
    const isHideBorder = this.props.location === '/';

    let headerClasses = 'header ';

    if (isHideBorder) {
      headerClasses += 'hideBorder'
    }

    return (
      <header className={headerClasses}>
        <div className="container">
          <div className="row">
            <div className="col-md-3 logo">
              <Link to="/">
                <img srcSet={config.siteLogo} alt="" />
              </Link>
            </div>

            <nav className="col-md-6 menu">
              <Link activeClassName="active" to="/documentation">Documentation</Link>
              <Link activeClassName="active" to="/releases">Releases</Link>
              <Link activeClassName="active" to="/community">Community</Link>
              <Link activeClassName="active" to="/enterprise">Enterprise</Link>
            </nav>

            <div className="col-md-3 search">
              <div className="search__wrapper">
                <MdSearch /> Search
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
