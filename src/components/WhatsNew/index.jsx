import React from 'react';
import { Link } from 'gatsby';
import './index.scss';

const highlights = [
  {
    tag: 'Messaging',
    label: 'NATs-Native Edge Messaging',
    description:
      'Built-in pub/sub, request-reply, KV, and JetStream with account/user rules and automatic credential provisioning.',
    href: '/docs/3.7/security/nats-jwt-authentication.html'
  },
  {
    tag: 'Security',
    label: 'Zero-Trust Access Control',
    description:
      'Fine-grained RBAC for Controller APIs plus NATs authorization controls for secure multi-tenant edge operations.',
    href: '/docs/3.7/security/introduction.html'
  },
  {
    tag: 'Networking',
    label: 'Secure Service Interconnection',
    description:
      'Service resources enable resilient TCP bridge connectivity across Agents, Kubernetes services, and external endpoints.',
    href: '/docs/3.7/yaml-references/reference-service.html'
  },
  {
    tag: 'Operations',
    label: 'Exec Sessions and Remote Debugging',
    description:
      'Role-aware interactive shells for Agents and workloads from both iofogctl and ECN Viewer, without key distribution.',
    href: '/docs/3.7/getting-started/whats-new.html#debugging-and-exec-sessions'
  },
  {
    tag: 'Experience',
    label: 'ECN Viewer Operational Parity',
    description:
      'Day-2 lifecycle workflows in the browser: deployments, YAML edits, resource management, exec, and auditing.',
    href: '/docs/3.7/ECN-Viewer/ecn-viewer.html'
  },
  {
    tag: 'Platform',
    label: 'Airgap and External KMS Support',
    description:
      'Deploy reliably in disconnected environments while integrating enterprise key management for Secrets and ConfigMaps.',
    href: '/docs/3.7/platform-deployment/airgap-deployment.html'
  }
];

function WhatsNew() {
  return (
    <section className="whats-new">
      <section className="container">
        <section className="row">
          <section className="col-12">
            <div className="sections__header">
              <h4>What&apos;s New in ioFog 3.7</h4>
            </div>

            <div className="links__container">
              {highlights.map((item) => (
                <Link to={item.href} key={item.label} className="link">
                  <div className="link__card">
                    <div className="link__tag">{item.tag}</div>
                    <div className="link__title">{item.label}</div>
                    <div className="link__description">{item.description}</div>
                    <div className="link__cta">Explore feature</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </section>
      </section>
    </section>
  );
}

export default WhatsNew;
