.. _clusteraccess:

----------------------
Accessing Your Cluster
----------------------

Clusters used for both the **Hands on Learning** and **Field Focused Hackathon** tracks run within the Hosted POC environment, hosted in the Nutanix PHX and RTP datacenters.

In order to access these resources you must be connected to one of the (2) VPN options listed below. Connection to a virtual desktop environment **is not necessary**.

.. note::

  Certain labs leverage a Windows VM with pre-installed tools to provide a controlled environment. It is **highly recommended** that you connect to these Windows VMs using the Microsoft Remote Desktop client rather than the VM console launched via Prism. An RDP connection will allow you to copy and paste between your device and the VMs.

.. raw:: html

  <strong><font color="red">If you encounter issues connecting to the VPN, Nutanix IT Helpdesk is available near the Sponsor Lounge outside of Floridian Ballroom or in the Church breakout room on the Ground level.</font></strong>

Nutanix Employees
.................

Log in to https://gp.nutanix.com using your OKTA credentials.

Download and install the appropriate GlobalProtect agent for your operating system.

Launch GlobalProtect and configure **gp.nutanix.com** as the **Portal** address.

Connect using your Okta credentials.

.. note::

  Using the **Gateway** dropdown, select a Split Tunnel (ST) gateway to ensure only network traffic targeting the Hosted POC environment is sent over the VPN. Otherwise **Best Available** will default to a full VPN tunnel.

Partners
........

Log in to https://xlv-uswest1.nutanix.com using the following credentials:

- **Username** - Refer to :ref:`clusterassignments` for your **Lab VPN Username**
- **Password** - techX2019!

Under **Client Application Sessions**, click **Start** to the right of **Pulse Secure** to download the client.

Install and open **Pulse Secure**.

Add a connection:

- **Type** - Policy Secure (UAC) or Connection Server
- **Name** - HPOC VPN
- **Server URL** - https://xlv-uswest1.nutanix.com

Connect using the provided credentials.
