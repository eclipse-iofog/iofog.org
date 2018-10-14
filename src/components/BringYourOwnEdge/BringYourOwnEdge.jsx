import React, { Component } from 'react';
import { Link } from 'gatsby';
import { MdArrowForward } from 'react-icons/md';
import './BringYourOwnEdge.scss';

class BringYourOwnEdge extends Component {
  render() {
    return (
      <section className="edge">
        <img className="bg-lb" srcSet="/images/blue-item.png" alt=""/>
        <section className="container">
          <section className="row">
            <section className="col-md-6 own">
              <h1 className="title">Bring your own edge.</h1>
              <p className="description">Start building your first ioFog application today. <br /> ioFog is free and it always will be.</p>
            </section>
            <section className="col-md-6 code__container">
              <div className="float-right">
                <div className="code__content">
                  <p>$ a line of code goes here</p>
                  <p>$ a second line of code goes here</p>
                </div>

                <Link to="/"><span>View the Quick Start Guide</span> <MdArrowForward/></Link>
              </div>
            </section>
          </section>
        </section>
        <div className="bg-r">&nbsp;</div>
      </section>
    );
  }
}

export default BringYourOwnEdge;
