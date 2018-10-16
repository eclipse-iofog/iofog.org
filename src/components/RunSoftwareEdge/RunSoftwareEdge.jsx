import React, { Component } from 'react';
import './RunSoftwareEdge.scss';

class RunSoftwareEdge extends Component {
  render() {
    return (
      <section className="run-software bg-grey">
        <section className="container">
          <section className="row">
            <section className="col-md-12">
              <div className="sections__header text-center">
                <h4>Run software at the edge.</h4>
                <p>By installing ioFog to any device (with minimal amount of compute) you automatically add a node into your Edge mesh which enables you to run any microservice on it dynamically, securely, and remotely.</p>
              </div>

              <div className="icons__container row">
                <div className="col-md-4">
                  <div className="icon__container">
                    <img srcSet="/images/icos/ico-lightning.svg" alt="" />
                    <h4>Icon Pending</h4>
                  </div>
                  <h6>Agent</h6>
                  <p>This is a short sentence that describes this value prop.</p>
                </div>
                <div className="col-md-4">
                  <div className="icon__container">
                    <img srcSet="/images/icos/ico-security.svg" alt="" />
                    <h4>Icon Pending</h4>
                  </div>
                  <h6>Control</h6>
                  <p>This is a short sentence that describes this value prop.</p>
                </div>
                <div className="col-md-4">
                  <div className="icon__container">
                    <img srcSet="/images/icos/ico-apps.svg" alt="" />
                    <h4>Icon Pending</h4>
                  </div>
                  <h6>Comsat</h6>
                  <p>This is a short sentence that describes this value prop.</p>
                </div>
              </div>
            </section>
          </section>
        </section>
      </section>
    );
  }
}

export default RunSoftwareEdge;
