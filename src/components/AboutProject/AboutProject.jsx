import React, { Component } from 'react';
import { Link } from 'gatsby';

import './AboutProject.scss';

class AboutProject extends Component {
  render() {
    return (
      <section className="bg-grey about">
        <section className="container">
          <section className="row">
            <section className="col-md-12">
              <div className="sections__header">
                <h4>About the project</h4>
                <p>This is a short paragraph that tells the story of ioFog and in which ways it is related to Edgeworx. Two or three sentences are recommended followed by a link to go learn more about Edgeworx as a company.</p>
                <Link to="/">About our Enterprise Solution</Link>
              </div>
            </section>
          </section>
        </section>
      </section>
    );
  }
}

export default AboutProject;
