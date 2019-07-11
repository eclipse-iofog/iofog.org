import React, { Component } from 'react';
import './RunSoftwareEdge.scss';

import icoLightning from '../../../static/images/icos/ico-lightning.svg';
import icoSecurity from '../../../static/images/icos/ico-security.svg';
import icoApps from '../../../static/images/icos/ico-apps.svg';

class RunSoftwareEdge extends Component {
  render() {
    return (
      <section className="run-software bg-grey">
        <section className="container">
          <section className="row">
            <section className="col-12">
              <div className="sections__header">
                <h4>Run software at the edge.</h4>
                <p>
                  By installing Eclipse ioFog<sup>TM</sup> to any device (with
                  minimal amount of compute) you create a distributed Edge
                  Compute Network (ECN), enabling you to run any microservice on
                  it dynamically, securely, and remotely.
                </p>
              </div>

              <div className="icons__container row">
                <div className="col-md-4">
                  <div className="icon__container">
                    <img srcSet={icoLightning} alt="" />
                  </div>
                  <h6>Agent</h6>
                  <p>
                    Runs on each of your edge devices, giving you a microservice
                    platform
                  </p>
                </div>
                <div className="col-md-4">
                  <div className="icon__container">
                    <img srcSet={icoSecurity} alt="" />
                  </div>
                  <h6>Controller</h6>
                  <p>Provides you remote control over the microservices</p>
                </div>
                <div className="col-md-4">
                  <div className="icon__container">
                    <img srcSet={icoApps} alt="" />
                  </div>
                  <h6>Connector</h6>
                  <p>
                    Brokers communication between microservices, across complex
                    networks
                  </p>
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
