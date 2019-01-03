.. _era:

-----------
Nutanix Era
-----------

Overview
++++++++

.. note::

  Estimated time to complete: **90 MINUTES**

Nutanix Era is a software suite that automates and simplifies database administration – bringing one-click simplicity and invisible operations to database provisioning and lifecycle management (LCM).
With one-click database provisioning and Copy Data Management (CDM) as its first services, Nutanix Era enables DBAs to provision, clone, refresh, and backup their databases to any point in time.
The rich and straightforward UI and CLI enable DBAs to clone their environments to the latest application-consistent transaction.
The API-first Nutanix Era architecture can easily integrate with your preferred self-service tools.
Every operation has a unique ID and is fully visible for auditing.

Getting Engaged with the Product Team
.....................................

+---------------------------------------------------------------------------------+
|  Era Product Contacts                                                           |
+================================+================================================+
|  Slack Channel                 |  #era                                          |
+--------------------------------+------------------------------------------------+
|  Product Manager               |  Jeremy Launier, jeremy.launier@nutanix.com    |
+--------------------------------+------------------------------------------------+
|  Product Marketing Manager     |  Maryam Sanglaji, maryam.sanglaji@nutanix.com  |
+--------------------------------+------------------------------------------------+
|  Technical Marketing Engineer  |  Mike McGhee, michael.mcghee@nutanix.com       |
+--------------------------------+------------------------------------------------+

Pre-requirements
++++++++++++++++

To be able to run the lab you need to have the following available or installed

A public ssh key of your machine by using :ref:'sshkey_creation'

pgAdmin 4 (This can be downloaded and installed for your OS from https://www.pgadmin.org/download/).

.. note::

  The screenshots in this Workshop are created using a Windows 7 machine. For the Mac OS/X it may be different. An example is the way to create a ssh key pair. Differences will be in writing and may contain a screenshot for clarification where possible.

Deploy ERA VM
+++++++++++++

Deploy Era VM from Prism Central.

In **Prism Central > VMs > List**, click **Create VM**.

Fill out the following fields and click **Save**:

- **Name** - Era-*Initials*
- **Description** - (Optional) Description for your VM.
- **vCPU(s)** - 4
- **Number of Cores per vCPU** - 1
- **Memory** - 16 GiB

- Select **+ Add New Disk**
    - **Type** - DISK
    - **Operation** - Clone from Image Service
    - **Image** - **“Era-Server-build…”**.qcow2
    - Select **Add**

- Select **Add New NIC**
    - **VLAN Name** - Primary
    - Select **Add**

Click **Save** to create the VM.

Select the Nutanix Era VM you created and click **Power On**.

.. figure:: images/2.png

Register Cluster with Nutanix ERA
+++++++++++++++++++++++++++++++++

In **Prism Central > VMs > List**, indentify the IP Address assigned to the Era VM you just deployed (“IP Addresses” column).

.. note::

  If the IP address does not populate, log into the console of the VM and Run “ifconfig” to see the assigned IP address.
  - **Username** - Era
  - **Password** - Nutanix.1

In a new browser tab, log on to Era https://ERA-IP:8443/ using these credentials:

.. note::

  It may take a **couple minutes** for the Era interface to initialize after booting the VM.

  Check off “I have read and agree to terms and conditions.” And select **Continue**

- **Username** - admin
- **Password** - Set new admin password **techX2019!**

.. figure:: images/3.png

At the "Welcome to Era" screen, fill in the following information and click **Next**:

- **Name** - HPOC Cluster Name
- **Description** - (Optional) Description
- **IP address of Prism Element** - *HPOC Cluster IP*
- **Prism Element Administrator** - admin
- **Password** - techX2019!

Click **Next**

Select the container named **“default…”** and click **Next**.

For the Network Profile choose **Primary** and leave Manage IP Address Pool in Era unchecked.

Click **Next**.

Setup of Era will proceed automatically and takes a couple minutes.

Once complete select **Get Started**.

Deploy PostgreSQL
+++++++++++++++++

On the **Getting Started** page click on PostgreSQL.

.. figure:: images/4.png

In the Provision a PostgreSQL database, select **Provision a Database**.

**Provision a Database**

- **Database Engine** - PostgreSQL

**Database Server**

- **Database Server** - Create New Server
- **Database Server Name** - DBServer-*Initials*
- **Description** - (Optional) Description
- **Software Profile** - Take Default
- **Compute Profile** - Take Default
- **Network Profile** - Take Default

Create a new SSH Key following the Instructions in the SSH Key Creation Lab :ref:'sshkey_creation'

Copy and paste the public key into the SSH public key “text” option for the database server

.. figure:: images/7.png

Click **Next**

**Database**

- **Database Name** - LabDB-*Initials*
- **Description** - (Optional) Description
- **Password** - techX2019!
- **Database Parameter Profile** - Take Default
- **Listener Port** - Take Default
- **Size (GiB)** - Take Default

.. figure:: images/8.png

Click **Next**

**Time Machine**

- **Name** - LabDB-*Initials*-TM
- **Description** - (Optional) Description
- **SLA** - Gold
- **Schedule** - Take Defaults

.. figure:: images/9.png

Click **Provision**

Monitor the Provision Database task from under the Operations menu, should take around 5 minutes.

While you wait, you can explore other areas of the Era GUI, such as viewing the Dashboard or Administration pages.

.. figure:: images/10.png

Viewing and Connecting to PostgreSQL
++++++++++++++++++++++++++++++++++++

Lets connect to our Database.

In **Era > Databases**, and select your PostgreSQL Source DB.

.. figure:: images/11.png

On the Summary page take note of your Database Server IP address

.. figure:: images/12.png

Start **pgAdmin**.

Right click Servers in the Browser menu and select **Create**, then **Server**

**General**

- **Name** - Era-Lab-*Intials*

**Connection Information**

- **Hostname/IP Address** - IP for DBServer-*Initials*
- **Port** - 5432
- **Maintenance Database** - postgres
- **Username** - postgres
- **Password** - techX2019!

.. figure:: images/14.png

Click **Save**

You should now be able to browse your database instance.

.. figure:: images/15.png

Cloning Your PostgreSQL Source
++++++++++++++++++++++++++++++

So we have created and connected to our database, now lets make a clone.

In **Era > Time Machines**, and select the Time Machine instance for your Source DB.

.. figure:: images/16.png

Click **Snapshot**, and name it **First_Snapshot**

.. figure:: images/17.png

Click **Create**

Monitor the Create Snapshot job from under the **Operations menu**.

.. figure:: images/18.png

After the snapshot creation completes, from the Time Machine select **Clone**

**Time**

- **Snapshot** - First_Snapshot

.. figure:: images/19.png

Click **Next**

**Server**

- **Database Server** - Create New Server
- **VM Name** - DBServer-*Initials*-Clone
- **Compute Profile** - Take Default
- **Network Profile** - Take Default

Create a new SSH Key following the Instructions in the SSH Key Creation Lab :ref:'sshkey_creation'

Copy and paste the public key into the SSH public key “text” option for the database server

.. figure:: images/20.png

Click **Next**

**Database**

- **Name** - LabDB-*Initials*-Clone
- **Description** - (Optional) Description
- **Password** - techX2019!
- **Database Parameter Profile** - Take Default

.. figure:: images/21.png

Click **Clone**

The clone process will take roughly the same amount of time as provisioning your original source.

You can monitor this process through the **Operations menu**.

While waiting for the clone to compete you can explore other areas of the Era GUI.

For example, view the settings that represent the Software, Compute, Network and DB Parameters from under the Profiles menu.

.. figure:: images/22.png

Following the completion of the clone operation, you can connect to the clone instance as described in the previous section, **Viewing and Connecting to PostgreSQL**.

.. figure:: images/23.png

Refreshing Your Clone Copy
++++++++++++++++++++++++++

In **Era > Databases**, and select your Cloned DB instance.

Select the radio button next to your instance and click **Refresh**

.. figure:: images/24.png

Choose the previous snapshot you created and click **Refresh**

Follow the job to completion under **Operations**

Modify source database and refresh your clone (10 min)
++++++++++++++++++++++++++++++++++++++++++++++++++++++

Lets modify the source database and refresh the clone.

Start pgAdmin, select your source database instance, go to the Tools menu and select Query Tool

.. figure:: images/25.png

From the **Query Tool**, paste the following SQL command into the editor:

.. code-block:: bash
  :name: inline-code

  CREATE TABLE products (
  product_no integer,
  name text,
  price numeric
  );

Choose Execute/Refresh

.. figure:: images/26.png

View the newly created table from under the Schemas tree view

.. figure:: images/27.png

From **Era > Time Machines**, and select the Time Machine instance for your Source DB.

Create a **Snapshot**, and name it **Second_Snapshot**

.. note::

  Follow the same process as the **Cloning Your PostgreSQL Source** section for creating the snapshot.

Refresh your clone copy using this new snapshot as outlined in the previous section **Refreshing your clone copy**.

Once the clone refresh operation is complete, refresh your view for the clone copy in pgAdmin to see the table from the source

.. figure:: images/28.png

View the environment using the REST API Explorer (5 min)
++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Now view the environment using the REST API Explorer

From the top right drop down menu choose **REST API Explorer**.

.. figure:: images/29.png

Expand the various categories to view the possible operations.

To execute a given operation, like GET /databases for example, select the operation and choose **“try it out”**

.. figure:: images/30.png

After selecting **“try it out”** choose **Execute**

.. figure:: images/31.png

You should see a response like the following

.. figure:: images/32.png

Takeaways
++++++++++

- Eliminate the complexity of deploying and managing databases in your environment

- Era provides elegant and efficient one-click database operations and is announcing General Availability with Oracle and Postgres - providing provisioning, cloning and refresh services.

- Era automates complex database operations – slashing both DBA time and the cost of managing databases with traditional technologies and saving immensely on enterprise OpEx

- Era enables database admins to standardize their database deployments across database engines, incorporating best practices.
