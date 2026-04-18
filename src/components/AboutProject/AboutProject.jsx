import React, { useMemo, useState } from 'react';
import {
  CloudCog,
  Cpu,
  WifiOff,
  LayoutDashboard,
  Box,
  Settings2,
  Terminal,
  Library,
  Network,
  Route,
  MessageSquare,
  Key,
  Zap,
  Users,
  FileBadge,
  Siren,
  Activity,
  Server,
  ShieldCheck
} from 'lucide-react';

import './AboutProject.scss';
const featuresData = {
  deployment: {
    title: 'Flexible Deployment',
    description:
      'Run the control plane in public cloud, private cloud, on premises, or air-gapped environments, based on your compliance needs. Manage diverse hardware from one place.',
    items: [
      {
        icon: CloudCog,
        title: 'Control Plane Flexibility',
        description:
          'Deploy backends on any public/private cloud, K8s, or bare metal. Native support for SQLite, Postgres, and MySQL. External KMS support for Secrets and ConfigMaps.'
      },
      {
        icon: Cpu,
        title: 'Hardware Agnostic',
        description:
          'Seamlessly manage x86, ARM64, GPUs, VMs, and lightweight industrial IoT devices.'
      },
      {
        icon: WifiOff,
        title: 'Air-Gap Deployments',
        description:
          'Securely onboard hardware and distribute workload images entirely offline.'
      },
      {
        icon: LayoutDashboard,
        title: 'Centralized Management',
        description:
          'Unified operations via the graphical console and the potctl CLI.'
      }
    ]
  },
  orchestration: {
    title: 'Workload Orchestration',
    description:
      'Automate the full application lifecycle on the far edge with registries, configuration, and remote operations built in.',
    items: [
      {
        icon: Box,
        title: 'Agnostic Workloads',
        description:
          'Native execution environment supporting Linux and WASM containers.'
      },
      {
        icon: Settings2,
        title: 'Automated Lifecycle',
        description:
          'Built-in Registry, ConfigMap, TLS Secrets, Volume Mounts, and intelligent pruning managers.'
      },
      {
        icon: Terminal,
        title: 'Zero-Touch Debugging',
        description:
          'Instant, secure remote shell access and real-time remote log monitoring without site visits.'
      },
      {
        icon: Library,
        title: 'Templates & Catalogs',
        description:
          'Standardize global deployments with predefined application templates and microservice catalogs.'
      }
    ]
  },
  networking: {
    title: 'Resilient Networking',
    description:
      'Default-secure connectivity: Layer 7 mesh, distributed messaging, and dynamic authorization for edge services.',
    items: [
      {
        icon: Route,
        title: 'Secure Service Mesh',
        description:
          'Default mTLS routing securing Edge-to-Edge, Edge-to-External, and External-to-Edge service interconnections.'
      },
      {
        icon: MessageSquare,
        title: 'Distributed Messaging',
        description:
          'Embedded NATs infrastructure with persistent message stores and multi-tenant isolation.'
      },
      {
        icon: Key,
        title: 'Dynamic Authorization',
        description:
          'Decentralized JWT authentication driving dynamic RBAC for the secure message bus.'
      },
      {
        icon: Zap,
        title: 'Local Agent API',
        description:
          'Empower localized systems with dynamic, real-time workload reconfiguration capabilities.'
      }
    ]
  },
  security: {
    title: 'Zero-Trust Security',
    description:
      'Identity, PKI, certificates, and runtime protection aligned with zero-trust principles at the edge.',
    items: [
      {
        icon: Users,
        title: 'Unified IAM & PKI',
        description:
          'Enterprise OIDC/RBAC for user access, paired with secure Ed25519 PKI identity for edge devices.'
      },
      {
        icon: FileBadge,
        title: 'Automated Certificates',
        description:
          'Built-in, zero-touch X.509 certificate manager ensuring continuous cluster-wide cryptographic trust.'
      },
      {
        icon: Siren,
        title: 'EdgeGuard & Watchdog',
        description:
          'Proactive unauthorized physical access detection and automatic termination of unverified workloads.'
      },
      {
        icon: Activity,
        title: 'Continuous Monitoring',
        description:
          'Comprehensive event auditing, health tracking, and deep resource utilization monitoring.'
      }
    ]
  }
};

function AboutProject() {
  const [activeTab, setActiveTab] = useState('deployment');
  const activeFeature = useMemo(() => featuresData[activeTab], [activeTab]);
  const tabConfig = {
    deployment: { icon: Server, label: 'Flexible Deployment' },
    orchestration: { icon: Box, label: 'Workload Orchestration' },
    networking: { icon: Network, label: 'Resilient Networking' },
    security: { icon: ShieldCheck, label: 'Zero-Trust Security' }
  };

  return (
    <section className="about">
      <section className="container">
        <section className="row">
          <section className="col-md-12">
            <div className="sections__header">
              <h4>Why ioFog?</h4>
            </div>
            <div className="why-tabs">
              {Object.entries(tabConfig).map(([key, tab]) => {
                const TabIcon = tab.icon;
                const isActive = key === activeTab;

                return (
                  <button
                    type="button"
                    className={`why-tabs__button${isActive ? ' active' : ''}`}
                    onClick={() => setActiveTab(key)}
                    key={key}
                  >
                    <TabIcon />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="why-panel">
              <div className="why-panel__header">
                <h5>{activeFeature.title}</h5>
                <p>{activeFeature.description}</p>
              </div>
              <div className="why-panel__grid">
                {activeFeature.items.map((item) => (
                  <div className="why-panel__item" key={item.title}>
                    <div className="why-panel__item-icon">
                      <item.icon size={20} />
                    </div>
                    <div className="why-panel__title">{item.title}</div>
                    <div className="why-panel__description">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </section>
      </section>
    </section>
  );
}

export default AboutProject;
