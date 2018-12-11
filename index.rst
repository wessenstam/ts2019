.. title:: Tech Summit 2019

.. toctree::
  :maxdepth: 2
  :caption: Required Labs
  :name: _req_labs
  :hidden:

  era/era

.. toctree::
  :maxdepth: 2
  :caption: Optional 101 Labs
  :name: _opt_101_labs
  :hidden:


.. toctree::
  :maxdepth: 2
  :caption: Optional 201 Labs
  :name: _opt_201_labs
  :hidden:

  cloud_native_lab/cloud_native_lab

.. toctree::
  :maxdepth: 2
  :caption: Optional Labs
  :name: _optional_labs
  :hidden:

  sshkey_creation/sshkey_creation

.. raw:: html

    <div class="row">
        <div class="col-md-6">
            <h2>Need Support?</h2>
            <p>Join us in #techsummit2019 on Slack for questions, comments, and important announcements.</p>
            #<p><a class="btn btn-secondary" href="slack://channel?id=C7ELNM1KL&amp;team=T0252CLM8" role="button">Join Channel &raquo;</a></p>
        </div>
        <div class="col-md-6">
            <h2>Awards and Prizes</h2>
            <p>In addition to bragging rights and special recognition at SKO, the winning team will receive a Nutanix Tech Summit branded fleece vest from The North Face.</p>
        </div>
    </div>
    <hr>

.. _getting_started:

Getting Started
===============

.. raw:: html

  <strong><font color="red">Do not start any labs before being told to do so by your Team Coach.</font></strong>

Following presentations on Tuesday, you will have the remainder of the day to complete the **Required Labs** and begin **Optional Labs**.

Beginning on Wednesday you will be provided with a customer challenge. Your goal is to build and propose a solution using Nutanix and optional 3rd party technologies. The **Optional Labs** provide step by step guides for additional technologies you may find useful for your proposed solution. Bonus points can be earned by incorporating additional technologies (Chef, Puppet, Jenkins, Nagios, etc.) not covered in **Optional Labs**.

Due to resource limitations, many labs are designed to be completed as a group. The Overview section of each lab will indicate whether the lab should be completed once per group/cluster or if it can be performed individually. Teams should **NOT** simply divide and conquer to get through the lab exercises as fast as possible. The challenge exercise will give you ample opportunity to showcase your skillset, but approach the labs as an opportunity to expose yourselves to new tools and features that you may not have had an opportunity to play with yet.

To complete both the labs and the challenge, each team has been provided a four node cluster running AHV and AOS 5.10.x running in the Hosted POC environment.

Team Assignments
++++++++++++++++

Using the spreadsheet below, locate your team assignment and note your **Team Number**.

.. raw:: html

  <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSf9BaV63Un42od-9BiC62QcYCKLSJmz7L0Vsfnwz7Zx1nu_oQiVGiZ7IC_AcT8dXWB_qzksn9c6Dpj/pubhtml?gid=1097423445&amp;single=false&amp;widget=false&amp;chrome=false&amp;headers=false&amp;range=a1:k50" style="position: relative; height: 600px; width: 98%; border: none"></iframe>

.. _cluster_details:

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
- **VeeamBackupProxy** - Veeam Backup Proxy for AHV BETA Disk Image
- **XenDesktop-7.15-ISO** - Citrix XenDesktop 7.15 ISO Image
- **VeeamBR-9.5U3-ISO** - Veeam Backup & Replication 9.5 Update 3 ISO Image
- **MSSQL-2016SP1-ISO** - Microsoft SQL Server 2016 SP1 ISO Image

**Pre-staged Virtual Machines**

- **PC** VM - 10.21.XX.39 - Nutanix Prism Central 5.5.0.6
- **DC** VM - 10.21.XX.40 - ntnxlab.local Domain Controller
- **Era** -
- **Buckets** -
- **XD** VM - 10.21.XX.41 - Citrix XenDesktop 7.15 Delivery Controller/StoreFront/License Server
- **HYCU** VM - 10.21.XX.44 - Comtrade HYCU 2.0.0
- **X-Ray** VM - 10.21.XX.45 - Nutanix X-Ray 2.3

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

Citrix XenDesktop
.................

https://citrixready.nutanix.com - *Accessible via the Citrix Receiver client or HTML5*

**Nutanix Employees** - Use your NUTANIXDC credentials

**Partners** - **Username:** POCxxx-User01 (up to POCxxx-User20), **Password:** techX2018!

VMware Horizon View
...................

https://hostedpoc.nutanix.com - *Accessible via the Horizon View client or HTML5*

**Nutanix Employees** - Use your NUTANIXDC credentials

**Partners** - **Username:** POCxxx-User01 (up to POCxxx-User20), **Password:** techX2018!

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

Tech Summit Challenge
+++++++++++++++++++++

`Click here to view the Tech Summit AMER Challenge. <https://nutanixinc.sharepoint.com/:b:/s/Sales-Enablement/Technical-Enablement/Ed1qBZbxaJRMt7t9dfPnhecBQwNsPp3O8qUbrNHNnBm9og?e=mfSdvV>`_
