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
              <h1 className="title">EdgeOps at Scale.</h1>
              <p>
                Securely deploy, orchestrate, and operate distributed workloads across your edge environment from a single control plane.
                Eclipse ioFog<sup>TM</sup> is <b>free, open source</b>, and it always
                will be.
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
