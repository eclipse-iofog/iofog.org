import React, { Component } from 'react';
import { Link } from 'gatsby';
import { MdArrowForward } from 'react-icons/md';
import './index.scss';

class HomeTitle extends Component {
  render() {
    return (
      <section className="edge">
        <section className="container">
          <section className="row">
            <section className="col-12 col-md-6 promo">
              <h1 className="title">
                Manage your edge like it's in the cloud.
              </h1>
              <p>
                The free, open source way to deploy containerized apps across
                any edge, and manage everything from the cloud.
              </p>
            </section>
            <section className="col-12 col-md-6 code__container">
              <div className="holder">
                <div className="code__content">
                  <p className="code__comment code__noselect">
                    # Deploy an entire Edge Compute Network with ease
                  </p>
                  <p>
                    <span className="code__noselect">$ </span>
                    iofogctl deploy -f platform.yaml
                  </p>
                  <p>
                    <span className="code__noselect">$ </span>
                    iofogctl deploy -f microservices.yaml
                  </p>
                </div>
                <Link to="/docs/getting-started/quick-start-local.html">
                  <span>View the Quick Start Guide</span>
                  <MdArrowForward />
                </Link>
              </div>
            </section>
          </section>
        </section>
      </section>
    );
  }
}

export default HomeTitle;
