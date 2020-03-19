# Getting started with ioFog on Minikube and Vagrant

## Prerequisite

- Working installation of [Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/)
- Working installation of [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- Working installation of [Vagrant](https://www.vagrantup.com/docs/installation/)

## Setting up minikube

- Run `minikube start` (With the optionnal `--vm-driver=` option if needed)
- Minikube will set up your `~/.kube/config` to point to your minikube kubernetes cluster
- In another terminal, run `minikube tunnel` to enable Kubernetes LoadBalancers

## Deplying the ioFog ControlPlane

- Deploy ControlPlane like if it was on any kubernetes cluster, using the following YAML

platform.yaml:

```yaml
---
apiVersion: iofog.org/v2
kind: ControlPlane
metadata:
  name: ecn
spec:
  iofogUser:
    name: Quick
    surname: Start
    email: user@domain.com
    password: q1u45ic9kst563art
  controllers:
    - name: minikube-controller
      kube:
        config: ~/.kube/config
```

- Run `iofogctl deploy -f platform.yaml`

- Resources are visible using `iofogctl get all` or `kubectl get all`

- ioFog resources will be created in the same kubernetes namespace as the one used on iofogctl

## Vagrant set up

- Example of minimal Ubuntu VM Vagrantfile:

```vagrantfile
VAGRANT_BOX = 'ubuntu/bionic64'
VM_NAME = 'iofog-demo'
VM_USER = 'vagrant'
REG_USER='John'

Vagrant.configure("2") do |config|
  config.vm.box = VAGRANT_BOX
  config.vm.hostname = VM_NAME
  config.vm.provider "virtualbox" do |v|
    v.name = VM_NAME
    v.memory=2048
  end
  config.vm.network "private_network", type: "dhcp"
  # Port forwarding for Agent
  config.vm.network "forwarded_port", guest: 54321, host: 54321, autocorrect: true
  # For each microservice port that you will want to access from your localhost, you need to add a port forwarding rule
  # I.E: ioFog tutorial deploys a web UI microservice on port 10102

  # config.vm.network "forwarded_port", guest: 10102, host: 10102, autocorrect: true

end
```

- In the folder containing the `Vagrantfile`, run `vagrant up` to start the VM

- Run `vagrant ssh-config` to find the private key file path

```bash
 %> vagrant ssh-config

Host default
  HostName 127.0.0.1
  User vagrant
  Port 2222
  UserKnownHostsFile /dev/null
  StrictHostKeyChecking no
  PasswordAuthentication no
  IdentityFile /Users/pixcell/Work/Edgeworx/iofogctl/.vagrant/machines/default/virtualbox/private_key
  IdentitiesOnly yes
  LogLevel FATAL
```

- In this case, the private key is located at `/Users/pixcell/Work/Edgeworx/iofogctl/.vagrant/machines/default/virtualbox/private_key`

- Run `vagrant ssh -c ifconfig | grep inet` to find the box public IP

```bash
~/Work/Edgeworx/iofogctl %> vagrant ssh -c ifconfig | grep inet
inet 10.0.2.15  netmask 255.255.255.0  broadcast 10.0.2.255
inet6 fe80::76:54ff:fe76:5875  prefixlen 64  scopeid 0x20<link>
inet 172.28.128.11  netmask 255.255.255.0  broadcast 172.28.128.255
inet6 fe80::a00:27ff:fe77:88e9  prefixlen 64  scopeid 0x20<link>
inet 127.0.0.1  netmask 255.0.0.0
inet6 ::1  prefixlen 128  scopeid 0x10<host>
Connection to 127.0.0.1 closed.
```

- In this case, the public IP address is `172.28.128.11` as the `10.0.2.15` is private (As a general rule, the addresses `10.X.X.X` are private)

- You can verify this by running `ssh vagrant@<IP> -i <private_key_path>`, which in this specific case translates to `ssh vagrant@172.28.128.11 -i /Users/pixcell/Work/Edgeworx/iofogctl/.vagrant/machines/default/virtualbox/private_key`

- Given the above, the ioFog Agent yaml file is as follow:

agent.yaml

```yaml
---
apiVersion: iofog.org/v2
kind: Agent
metadata:
  name: local-agent
spec:
  host: 172.28.128.11
  ssh:
    user: vagrant
    keyFile: /Users/pixcell/Work/Edgeworx/iofogctl/.vagrant/machines/default/virtualbox/private_key
```

- Run `iofogctl deploy -f agent.yaml`

Congratulations, you are all set to deploy applications on your local minikube and vagrant setup ! Keep in mind that there is absolutely no difference, as far as ioFog and iofogctl are concerned, between this local setup and an actual production setup on a cloud based Kubernetes cluster and an Agent running on a remote device !
