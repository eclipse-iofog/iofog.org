import React, { Component } from 'react';
import { Link } from 'gatsby';

import './AboutProject.scss';
import icoSecurity from '../../../static/images/icos/ico-security.svg';

const whys = [
  {
    label: 'Edge Native Abstractions',
    description:
      'Edge Native implementations for agents, agent runtime, volumes, message routes and applications Kinds. All driven by Kubernetes inspired kind specifications.'
  },
  {
    label: 'Edge Projects',
    description:
      'Logically group, secure and manage edge nodes and applications'
  },
  {
    label: 'Container lifecycle management',
    description:
      'Fine grained visibility into the progress and state of microservice images that are deployed to edge nodes. Automatic clean up and pruning of redundant or old containers'
  },
  {
    label: 'Edge Control Plane',
    description:
      'Manage all aspects of your edge deployment from the Cloud (provisioning, deployment, orchestration, resources, monitoring, updates, etc.)'
  },
  {
    label: 'Simplified provisioning',
    description:
      'a single, sharable, per project 1-line install command that handles all the downloading, provisioning, validation and registering for each of your edge projects'
  },
  {
    label: 'Application lifecycle management',
    description:
      'Manage the entire app lifecycle from development to deployment, updating, deleting, scaling'
  },
  {
    label: 'Heterogenous hardware',
    description:
      'Provision to any x86 or ARM based edge node that has a relatively modern Linux kernel that supports containerization.'
  },
  {
    label: 'Simplified provisioning',
    description:
      'a single, sharable, per project 1-line install command that handles all the downloading, provisioning, validation and registering for each of your edge projects'
  },
  {
    label: 'Live deployment updates',
    description:
      'Edit and update application deployment specs in the web UI to reconfigure, scale or change your applications without having to redeploy'
  }
];

class AboutProject extends Component {
  render() {
    return (
      <section className="about">
        <section className="container">
          <section className="row">
            <section className="col-md-12">
              <div className="sections__header">
                <h4>Why ioFog?</h4>
              </div>
              <div className="why__grid">
                {whys.map((why, idx) => (
                  <div className="why__card" key={idx}>
                    <img srcSet={icoSecurity} alt="" className="why__icon" />
                    <div className="why__title">{why.label}</div>
                    <div className="why__description">{why.description}</div>
                  </div>
                ))}
              </div>
            </section>
          </section>
        </section>
      </section>
    );
  }
}

export default AboutProject;
