import React, { Component } from 'react';
import { Link } from 'gatsby';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import './Footer.scss';
import config from '../../../data/SiteConfig';

class Footer extends Component {
  render() {
    const { copyright } = this.props.config;

    return (
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4 footer__main">
              <Link to="/">
                <img srcSet={config.siteLogo} alt="" />
              </Link>
              <p className="description">ioFog is free, open source and always will be.</p>
              <p className="footer__copyright">{copyright}</p>
            </div>
            <div className="col-md-3 footer__links">
              <div><Link to="/">Security</Link></div>
              <div><Link to="/">Legal</Link></div>
              <div><Link to="/">Community guidelines</Link></div>
              <div><Link to="/">Contribute this page</Link></div>
            </div>
            <div className="col-md-3 footer__by">
              <div className="item">
                <h4>Sponsored by</h4>

                <Link to="/"><img srcSet="/images/logo/logo-edgeworx.svg" alt="" /></Link>
              </div>
              <div className="item">
                <h4>Trusted by</h4>
                <Link to="/"><img srcSet="/images/logo/logo-eclipse-footer.png" alt="" /></Link>
              </div>
            </div>
            <div className="col-md-2 footer__follow">
              <h4>Follow us</h4>
              <a href={config.userLinks.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>
              <a href={config.userLinks.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
