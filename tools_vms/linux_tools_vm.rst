.. _linux_tools_vm:

---------------
Linux Tools VM
---------------

Overview
+++++++++

This CentOS VM image will be staged with packages used to support multiple lab exercises.

Deploy this VM on your assigned cluster if directed to do so as part of **Lab Setup**. Only deploy the VM once.

Deploying CentOS
++++++++++++++++

In **Prism Central** > select :fa:`bars` **> Virtual Infrastructure > VMs**, and click **Create VM**.

Fill out the following fields:

- **Name** - *Initials*-Linux-ToolsVM
- **Description** - (Optional) Description for your VM.
- **vCPU(s)** - 2
- **Number of Cores per vCPU** - 2
- **Memory** - 2 GiB

- Select **+ Add New Disk**
    - **Type** - DISK
    - **Operation** - Clone from Image Service
    - **Image** - CentOS7.qcow2
    - Select **Add**

- Select **Add New NIC**
    - **VLAN Name** - Secondary
    - Select **Add**

Click **Save** to create the VM.

Power On the VM.

Installing Tools
++++++++++++++++

Login to the VM via ssh or Console session, using the following credentials:

- **Username** - root
- **password** - nutanix/4u

Install the software needed by running the following commands:

.. code-block:: bash

  yum update -y
  yum install -y ntp ntpdate unzip stress nodejs python-pip s3cmd awscli
  npm install -g request
  npm install -g express
  pip install -U pip
  pip install boto3
  curl http://10.4.64.11:8080/Users/nutanix_buckets/ea/builds/18112018/tools/mc -o mc
  chmod +x iam_util mc

Configuring NTP
...............

Enable and configure NTP by running the following commands:

.. code-block:: bash

  systemctl start ntpd
  systemctl enable ntpd
  ntpdate -u -s 0.pool.ntp.org 1.pool.ntp.org 2.pool.ntp.org 3.pool.ntp.org
  systemctl restart ntpd

Disabling Firewall and SELinux
..............................

Disable the firewall and SELinux by running the following commands:

.. code-block:: bash

  systemctl disable firewalld
  systemctl stop firewalld
  setenforce 0
  sed -i 's/enforcing/disabled/g' /etc/selinux/config /etc/selinux/config

Installing Python
.................

If completing the :ref:`apis` lab using the Linux Tools VM, install Python by running the following commands:

.. code-block:: bash

  yum -y install python36
  python3.6 -m ensurepip
  yum -y install python36-setuptools
