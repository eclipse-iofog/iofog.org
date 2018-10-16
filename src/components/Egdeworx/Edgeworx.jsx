import React, { Component } from 'react';
import { Link } from 'gatsby';
import './Edgeworx.scss';

class Edgeworx extends Component {
  render() {
    return (
      <section className="edgeworx">
        <section className="container">
          <section className="row align-items-center">
            <section className="col-md-8">
              <h5>Looking for an enterprise solution?</h5>
              <h3>Run software at the edge with Edgeworx.</h3>
              <Link className="button" to="/">Learn More</Link>
            </section>

            <section className="col-md-4">
              <img src="/images/img-gallery-02.png" alt="" />
            </section>
          </section>
        </section>
      </section>
    );
  }
}

export default Edgeworx;
