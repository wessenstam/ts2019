.. title:: Tech Summit 2019

.. toctree::
  :maxdepth: 2
  :caption: Required Labs
  :name: _req_labs
  :hidden:

  flow/flow
  era/era
  karbon/karbon
  buckets/buckets

.. toctree::
  :maxdepth: 2
  :caption: Optional 101 Labs
  :name: _opt_101_labs
  :hidden:

  xplay/xplay
  calm_3tier_webapp_blueprint/calm_3tier_webapp_blueprint
  calm_win_tiered_app/calm_win_tiered_app


.. toctree::
  :maxdepth: 2
  :caption: Optional 201 Labs
  :name: _opt_201_labs
  :hidden:

  calm_3twa_day2_blueprint/calm_3twa_day2_blueprint
  cloud_native_lab/cloud_native_lab

.. toctree::
  :maxdepth: 2
  :caption: Optional Labs
  :name: _optional_labs
  :hidden:

  sshkey_creation/sshkey_creation

.. toctree::
  :maxdepth: 2
  :caption: Tools VMs
  :name: _tools_vms
  :hidden:

  tools_vms/windows_tools_vm
  tools_vms/linux_tools_vm

.. toctree::
  :maxdepth: 2
  :caption: Appendix
  :name: _appendix
  :hidden:

  appendix/glossary
  appendix/basics

.. raw:: html

    <div class="row">
        <div class="col-md-6">
            <h2>Need Support?</h2>
            <p>Join us in #techsummit2019 on Slack for questions, comments, and important announcements.</p>
            <p><a class="btn btn-secondary" href="slack://channel?id=CE2LNUG5Q&amp;team=T0252CLM8" role="button">Join Channel &raquo;</a></p>
        </div>
        <div class="col-md-6">
            <h2>Awards and Prizes</h2>
            <p>In addition to bragging rights, the winning Hackathon team will receive <B>** Insert Prize Here **</B>.</p>
            <p>Lab Track prizes will be <B>** Insert Prize Here **</B>.</p>
        </div>
    </div>
    <hr>

.. _getting_started:

Getting Started
===============

.. raw:: html

  <strong><font color="red">Do not start any labs before being told to do so by your Team Coach.</font></strong>

Following presentations on Tuesday, you will have the remainder of the day to complete the **Required Labs** and begin **Optional Labs**.

Beginning on Wednesday you will split into your Hackathon teams, or continue doing labs if you are on that track..

The Overview section of each lab will indicate whether another lab should be completed prior to completing that lab.

Cluster Details
+++++++++++++++

Using the spreadsheet below, locate your **Team Number** and corresponding details for your assigned cluster.

.. raw:: html

  <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSf9BaV63Un42od-9BiC62QcYCKLSJmz7L0Vsfnwz7Zx1nu_oQiVGiZ7IC_AcT8dXWB_qzksn9c6Dpj/pubhtml?gid=427935111&amp;single=false&amp;widget=false&amp;chrome=false&amp;headers=false&amp;range=a1:g50" style="position: relative; height: 600px; width: 98%; border: none"></iframe>

Each cluster has been pre-staged with the following:

**Pre-staged Images**

- **Windows2016** - Windows Server 2016 Standard Disk Image
- **Windows2012** - Windows Server 2012 R2 Standard Disk Image
- **Windows10** - Windows 10 Disk Image
- **CentOS** - CentOS 7 Disk Image
- **Era** - Era v1.0 Disk Image
- **Xtract** - Nutanix Xtract for VMs 1.1.3 Disk Image
- **MSSQL-2014SP3-ISO** - Microsoft SQL Server 2014 SP3 ISO Image
- **XenDesktop-7.18-ISO** - Citrix XenDesktop 7.18 ISO Image

**Pre-staged Virtual Machines**

- **PC** VM - 10.21.XX.39 - Nutanix Prism Central 5.5.0.6
- **DC** VM - 10.21.XX.40 - ntnxlab.local Domain Controller
- **Buckets** -

**Networks**

- **Primary** Network - 10.21.XX.1/25 - IPAM DHCP Pool 10.21.XX.50-10.21.XX.124
- **Secondary** Network - 10.21.XX.129/25 - IPAM DHCP Pool 10.21.XX.132-10.21.XX.253
- **Link-Local** Network - **DO NOT ENABLE IPAM**

**Credentials**

- **Prism Username:** admin **Password:** techX2019!
- **Prism Central Username:** admin **Password:** techX2019!
- **CVM Username:** nutanix **Password:** techX2019!
- **PC VM Username:** nutanix **Password:** nutanix/4u
- **Domain Username** NTNXLAB\\Administrator **Password:** nutanix/4u

Cluster Access Options
++++++++++++++++++++++

The Nutanix Hosted POC environment can be accessed a number of different ways:

Employee Global Protect VPN
...........................

- **Portals** - gp.nutanix.com

Employee Pulse Secure VPN
..........................

https://sslvpn.nutanix.com - Use your CORP credentials

Partner Pulse Secure VPN
........................

https://lab-vpn.nutanix.com - **Username:** POCxxx-User01 (up to POCxxx-User20), **Password:** techX2018!

Under **Client Application Sessions**, click **Start** to the right of **Pulse Secure** to download the client.

Install and open **Pulse Secure**.

Add a connection:

- **Type** - Policy Secure (UAC) or Connection Server
- **Name** - HPOC VPN
- **Server URL** - lab-vpn.nutanix.com
