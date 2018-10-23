import React, { Component } from 'react';
import { Link } from 'gatsby';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import './Footer.scss';
import config from '../../../data/SiteConfig';

import logoEdgeworx from '../../../static/images/logos/logo-edgeworx.svg';
import logoEclipse from '../../../static/images/logos/logo-eclipse-footer.png';
import siteLogo from "../../../static/logos/logo.svg";

class Footer extends Component {
  render() {
    const { copyright } = this.props.config;

    return (
      <footer className="footer">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="row">
                <div className="col-12 col-md-4 footer__main">
                  <Link to="/">
                    <img srcSet={siteLogo} alt="" />
                  </Link>
                  <p className="description">ioFog is free, open source, and always will be.</p>
                  <p className="footer__copyright d-none d-md-block">{copyright}</p>
                </div>
                <div className="col-12 col-md-3 footer__links">
                  <div><Link to="/">Security</Link></div>
                  <div><Link to="/">Legal</Link></div>
                  <div><Link to="/">Community guidelines</Link></div>
                  <div><Link to="/">Contribute this page</Link></div>
                </div>
                <div className="col-12 col-md-3 footer__by">
                  <div className="item">
                    <h4>Sponsored by</h4>

                    <Link to="/"><img srcSet={logoEdgeworx} alt="" /></Link>
                  </div>
                  <div className="item">
                    <h4>Trusted by</h4>
                    <Link to="/"><img srcSet={logoEclipse} alt="" /></Link>
                  </div>
                </div>
                <div className="col-md-2 footer__follow">
                  <h4>Follow us</h4>
                  <a href={config.userLinks.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                  <a href={config.userLinks.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                </div>
                <div className="col-12 d-md-none">
                  <p className="footer__copyright">{copyright}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
