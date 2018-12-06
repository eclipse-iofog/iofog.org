import React, { Component } from 'react';
import { Link } from 'gatsby';
import './WhoUsing.scss';

class WhoUsing extends Component {
  render() {
    return (
      <section className="container who-using">
        <section className="row">
          <section className="col-md-12">
            <div className="sections__header">
              <h4>Who is using ioFog</h4>
              <p>
                This is a short line that inspires and showcases companies
                currently using ioFog.
              </p>
            </div>

            <div className="row logos__container">
              <div className="col-lg-3 col-md-4">PLACEHOLDER FOR LOGO</div>
              <div className="col-lg-3 col-md-4">PLACEHOLDER FOR LOGO</div>
              <div className="col-lg-3 col-md-4">PLACEHOLDER FOR LOGO</div>
              <div className="col-lg-3 d-lg-block d-md-none">
                PLACEHOLDER FOR LOGO
              </div>
            </div>

            <div className="white-paper__container">
              <div className="white-paper__logo" />
              <div className="white-paper__description">
                <p className="title__sub">New White Paper</p>
                <h3 className="title">This is the whitepaper title</h3>
                <p className="description">
                  This is a paragraph that describes a case study of a comapny
                  using Edgeworx to use Edge computing and IoT.
                </p>
                <Link to="/">Dowload White Paper</Link>
              </div>
            </div>
          </section>
        </section>
      </section>
    );
  }
}

export default WhoUsing;
