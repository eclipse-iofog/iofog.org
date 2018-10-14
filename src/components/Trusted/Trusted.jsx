import React, { Component } from 'react';
import { Link } from 'gatsby';
import './Trusted.scss';

class Trusted extends Component {
  render() {
    return (
      <section className="container trusted">
        <section className="row">
          <section className="col-md-12">
            <div className="title">Trusted by</div>

            <div className="trusted__container">
              <div className="trusted__item"><Link to="/"><img srcSet="/images/eclipse-logo.png" alt="" /></Link></div>
              <div className="trusted__item"><Link to="/"><img srcSet="/images/iot-logo.png" alt="" /></Link></div>
              <div className="trusted__item"><Link to="/"><img srcSet="/images/eclipse-logo.png" alt="" /></Link></div>
            </div>
          </section>
        </section>
      </section>
    );
  }
}

export default Trusted;
