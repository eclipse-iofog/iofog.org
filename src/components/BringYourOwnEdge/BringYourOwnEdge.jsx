import React, { Component } from 'react';
import { Link } from 'gatsby';
import { MdArrowForward } from 'react-icons/md';
import './BringYourOwnEdge.scss';

class BringYourOwnEdge extends Component {
  render() {
    return (
      <section className="edge">
        <section className="container">
          <section className="row">
            <section className="col-12 col-md-6 promo">
              <h1 className="title">Bring your own edge.</h1>
              <p>Start building your first ioFog application today. ioFog is free, <b>open source</b>, and it always
                will be.</p>
            </section>
            <section className="col-12 col-md-6 code__container">
              <div className="holder">
                <div className="code__content">
                  <p><span className="code__noselect">$</span> curl -sSf https://iofog.org/quick-start/linux.sh | sh</p>
                  <p><span className="code__noselect">$</span> docker-compose up</p>
                </div>

                <Link to="/documentation/1.0.0/quick-start">
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

export default BringYourOwnEdge;