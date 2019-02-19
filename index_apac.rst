.. title:: APAC Tech Summit 2019

.. toctree::
  :maxdepth: 2
  :caption: Required Labs
  :name: _req_labs
  :hidden:

  era/era
  flow/flow

.. toctree::
  :maxdepth: 2
  :caption: Introductory Labs
  :name: _introductory_labs
  :hidden:

  nutanix101/nutanix101
  buckets/buckets
  calm_linux/calm_linux
  dr_runbooks/dr_runbooks
  files/files
  karbon/karbon
  xplay/xplay
  xtract_aws/xtract_aws
  epoch/epoch
  frame/frame
  xiiot/xiiot


.. toctree::
  :maxdepth: 2
  :caption: Advanced Labs
  :name: _advanced_labs
  :hidden:

  apis/apis
  calm_day2/calm_day2
  calm_escript/calm_escript
  calm_win/calm_win
  cloud_native_lab/cloud_native_lab

.. toctree::
  :maxdepth: 2
  :caption: Sponsor Labs
  :name: _sponsor_labs
  :hidden:

  hycu/hycu
  peer/peer
  veeam/veeam

.. toctree::
  :maxdepth: 2
  :caption: Appendix
  :name: _appendix
  :hidden:

  tools_vms/windows_tools_vm
  tools_vms/linux_tools_vm
  taskman/taskman
  wordpress/wordpress


.. _welcome:

--------------------------
Nutanix Global Tech Summit
--------------------------

Welcome to Nutanix Global Tech Summit 2019!

Following the General Session on Tuesday morning, you will be able to access the **Hands on Learning** lab content.

Labs are designed to be completed by each individual, not in groups. Each Nutanix employee **Hands on Learning** participant must complete the listed **Required Labs** as well as a minimum of 1 **Sponsored Lab**. You should be able to complete 2-4 additional **Optional Labs** by the end of the day Wednesday.

For each lab you complete & validate, you'll be entered into a raffle to win a `complete Raspberry Pi 3 kit <https://www.aboxtek.com/products/abox-raspberry-pi-3b-16gb>`_! See :ref:`validation` below for additional details.

**Stuck? Have questions?** See :ref:`validation` for instruction on getting help.

.. raw:: html

  <strong><font color="red">Please review each section below prior to beginning any labs.</font></strong>

Announcements
+++++++++++++

.. raw:: html

  <strong><font color="red">Pay attention to this space for key event updates!</font></strong>

.. _clusterassignments:

Cluster Assignments
+++++++++++++++++++

Refer to **YOUR NAME** in the table below for all critical environmental information, including IP addresses that you will use to complete the self-paced labs. **Please ensure you are using only the cluster details you have been assigned in order to not create issues for other participants.**

.. raw:: html

  <iframe src=https://docs.google.com/a/nutanix.com/spreadsheets/d/e/2PACX-1vR3mA1Rs5VRHlxJhzsm0moXzmfUJqbu3fikaYsXu_X8yF8jXUnCG6mojoxoiFzJrbnubcSxaBf6euJQ/pubhtml?gid=0&amp;single=false&amp;widget=false&amp;chrome=false&amp;headers=false&amp;range=a1:l41 style="position: relative; height: 300px; width: 98%; border: none"></iframe>

`Click here <https://docs.google.com/a/nutanix.com/spreadsheets/d/e/2PACX-1vR3mA1Rs5VRHlxJhzsm0moXzmfUJqbu3fikaYsXu_X8yF8jXUnCG6mojoxoiFzJrbnubcSxaBf6euJQ/pubhtml>`_ to open the assignments spreadsheet in a new tab.

.. _clusteraccess:

Cluster Access
++++++++++++++

Clusters used for both the **Hands on Learning** and **Field Focussed Hackathon** tracks run within the Hosted POC environment, hosted in the Nutanix PHX1 datacenter.

In order to access these resources you must be connected to one of the (2) VPN options listed below. Connection to a virtual desktop environment **is not necessary**.

.. note::

  Certain labs leverage a Windows VM with pre-installed tools to provide a controlled environment. It is **highly recommended** that you connect to these Windows VMs using the Microsoft Remote Desktop client rather than the VM console launched via Prism. An RDP connection will allow you to copy and paste between your device and the VMs.

Nutanix Employees
.................

Log in to https://gp.nutanix.com using your OKTA credentials.

Download and install the appropriate GlobalProtect agent for your operating system.

Launch GlobalProtect and configure **gp.nutanix.com** as the **Portal** address.

Connect using your Okta credentials.

.. note::

  Connect to a Split Tunnel (ST) gateway to ensure only network traffic targeting the Hosted POC environment is sent over the VPN.

Partners
........

Refer to :ref:`clusterassignments` for your Lab VPN username and password.

Log in to https://lab-vpn.nutanix.com using the provided credentials.

Under **Client Application Sessions**, click **Start** to the right of **Pulse Secure** to download the client.

Install and open **Pulse Secure**.

Add a connection:

- **Type** - Policy Secure (UAC) or Connection Server
- **Name** - HPOC VPN
- **Server URL** - lab-vpn.nutanix.com

Connect using the provided credentials.

.. _stagingdetails:

Cluster Staging Details
+++++++++++++++++++++++

Each attendee will have access to a a **SHARED** AOS 5.10.1 (AHV 20170830.185) cluster, staged as follows:

.. note::

  Refer to :ref:`clusterassignments` for the *XX* and *YY* octets for your cluster and replace where appropriate.

  For example, if your **Cluster/Prism Element Virtual IP** is 10.42.10.37, substitute *42* for *XX* and *10* for *YY* below.

Virtual Machines
................

The following VMs have already been provisioned to each cluster:

.. list-table::
   :widths: 25 25 50
   :header-rows: 1

   * - VM Name
     - IP Address
     - Description
   * - **Prism Central**
     - 10.XX.YY.39
     - Nutanix Prism Central 5.10.1
   * - **AutoDC2**
     - 10.XX.YY.40
     - ntnxlab.local Domain Controller

Images
......

All disk images required to complete the labs have been uploaded to the Image Service for each cluster:

.. list-table::
   :widths: 50 50
   :header-rows: 1

   * - Image Name
     - Description
   * - **Windows2012R2.qcow2**
     - Pre-built Windows Server 2012 R2 Standard Disk Image (Sysprep)
   * - **Windows10-1709.qcow2**
     - Pre-built Windows 10 Disk Image (Sysprep)
   * - **CentOS7.qcow2**
     - Pre-built CentOS 7 Disk Image
   * - **ToolsVM.qcow2**
     - Pre-built Windows Server 2012 R2 + Tools (pgAdmin, CyberDuck, text editors, etc.) Disk Image
   * - **acs-centos7.qcow2**
     - CentOS Kubernetes Host for Karbon Disk Image
   * - **ERA-Server-build-1.0.1.qcow2**
     - Era 1.0.1 Disk Image
   * - **xtract-vm-2.0.3.qcow2**
     - Xtract for VMs 2.0.3 Disk Image
   * - **hycu-3.5.0-6138.qcow2**
     - HYCU 3.5.0 Appliance Disk Image
   * - **VeeamAvailabilityforNutanixAHV_1.0.457.vmdk**
     - Veeam Backup Proxy for AHV 1.0 Disk Image
   * - **VeeamBackup&Replication_9.5.4.2615.Update4.iso**
     - Veeam Backup & Replication 9.5 Update 4 ISO Image

Credentials
...........

The lab guides will explicitly share any unique credentials, the table

.. list-table::
  :widths: 33 33 33
  :header-rows: 1

  * - Name
    - Username
    - Password
  * - **Prism Element**
    - admin
    - TBD
  * - **Prism Central**
    - admin
    - TBD
  * - **Controller VMs**
    - admin
    - TBD
  * - **Prism Central VM**
    - admin
    - TBD
  * - **NTNXLAB Domain**
    - NTNXLAB\\Administrator
    - nutanix/4u

Networks
........

The following virtual networks have been pre-configured for each cluster:

.. list-table::
   :widths: 33 33 33
   :header-rows: 1

   * -
     - **Primary** Network
     - **Secondary** Network
   * - **IPAM**
     - Enabled
     - Enabled
   * - **DHCP Pool**
     - 10.XX.YY.50 - 124
     - 10.XX.YY.132 - 229
   * - **Default Gateway**
     - 10.XX.YY.1
     - 10.XX.YY.129
   * - **Netmask**
     - 255.255.255.128
     - 255.255.255.128
   * - **DNS**
     - 10.XX.YY.40 (DC VM)
     - 10.XX.YY.40 (DC VM)

.. raw:: html

  <strong><font color="red">With 5-6 participants sharing each physical cluster, there are only ~30 IP addresses available per participant. This means you may need to clean up VMs from previous labs prior to completing additional labs.</font></strong>

Running on BigSwitch Networking
...............................

With the recent migration to Nutanix's new PHX1 datacenter, all Hosted POC resources used for GTS leverage the Nutanix corporate IT management network.

<Details on PHX1/BigSwitch>

.. _validation:

Get Help & Win Prizes!
++++++++++++++++++++++

<Require some basic instruction/screencaps for hand raising widget>

Hackathon Voting
++++++++++++++++

Following Hackathon presentations on Thursday morning, all Global Tech Summit attendees will vote to determine the grand prize winners. In order to vote, you will need to create an account `here <https://nutanixgts19.hackerearth.com>`_.

*Voting instructions forthcoming.*
