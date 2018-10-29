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
                <p>ioFog is an <a href="https://projects.eclipse.org/projects/iot.iofog">Eclipse Foundation project</a> provided by <a href="http://edgeworx.io/">Edgeworx</a>, born out of real-world experience operating large Edge Compute Networks.</p>
                <Link to="/enterprise">Learn about additional Enterprise Solutions</Link>
              </div>
            </section>
          </section>
        </section>
      </section>
    );
  }
}

export default AboutProject;
