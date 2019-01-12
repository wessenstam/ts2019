.. _flow:

------------
Nutanix Flow
------------

*The estimated time to complete this lab is 60 minutes.*

.. raw:: html

  <iframe src="https://drive.google.com/file/d/1sU4_1GPVTNGJwNDoy0kB04r-vz4-9Thq/preview" width="720" height="480" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

Overview
++++++++

<Blah blah blah>

Staging the Lab
+++++++++++++++

In this exercise you will blah.

Right-click on :download:`this link <TaskManager.json>` and **Save Link As...** to download the blueprint for the example application used in this exercise.

In **Prism Central**, select :fa:`bars` **> Services > Calm**.

.. figure:: images/0.png

Click |blueprints| **Blueprints** in the left hand toolbar to view available Calm blueprints.

.. note::

  Mousing over an icon will display its title.

Click **Upload Blueprint** and select the **TaskManager.json** file previously downloaded.

Fill out the following fields:

- **Blueprint Name** - *Initials*-TaskManager
- **Project** - Calm

.. figure:: images/3.png

Click **Upload**.

Before you can launch the blueprint, you must first provide credentials, as this information is not stored in exported Calm blueprints.

In the **Application Profile** pane on the right, fill out the following field:

- **Mysql_password** - nutanix/4u

.. figure:: images/4.png

Click **Save**.

.. figure:: images/5.png

Click **Credentials**.

.. figure:: images/6.png

Expand the **CENTOS** credential by clicking its name. Copy and paste the following key into the **SSH Private Key** field:

::

  -----BEGIN RSA PRIVATE KEY-----
  MIIEowIBAAKCAQEAii7qFDhVadLx5lULAG/ooCUTA/ATSmXbArs+GdHxbUWd/bNG
  ZCXnaQ2L1mSVVGDxfTbSaTJ3En3tVlMtD2RjZPdhqWESCaoj2kXLYSiNDS9qz3SK
  6h822je/f9O9CzCTrw2XGhnDVwmNraUvO5wmQObCDthTXc72PcBOd6oa4ENsnuY9
  HtiETg29TZXgCYPFXipLBHSZYkBmGgccAeY9dq5ywiywBJLuoSovXkkRJk3cd7Gy
  hCRIwYzqfdgSmiAMYgJLrz/UuLxatPqXts2D8v1xqR9EPNZNzgd4QHK4of1lqsNR
  uz2SxkwqLcXSw0mGcAL8mIwVpzhPzwmENC5OrwIBJQKCAQB++q2WCkCmbtByyrAp
  6ktiukjTL6MGGGhjX/PgYA5IvINX1SvtU0NZnb7FAntiSz7GFrODQyFPQ0jL3bq0
  MrwzRDA6x+cPzMb/7RvBEIGdadfFjbAVaMqfAsul5SpBokKFLxU6lDb2CMdhS67c
  1K2Hv0qKLpHL0vAdEZQ2nFAMWETvVMzl0o1dQmyGzA0GTY8VYdCRsUbwNgvFMvBj
  8T/svzjpASDifa7IXlGaLrXfCH584zt7y+qjJ05O1G0NFslQ9n2wi7F93N8rHxgl
  JDE4OhfyaDyLL1UdBlBpjYPSUbX7D5NExLggWEVFEwx4JRaK6+aDdFDKbSBIidHf
  h45NAoGBANjANRKLBtcxmW4foK5ILTuFkOaowqj+2AIgT1ezCVpErHDFg0bkuvDk
  QVdsAJRX5//luSO30dI0OWWGjgmIUXD7iej0sjAPJjRAv8ai+MYyaLfkdqv1Oj5c
  oDC3KjmSdXTuWSYNvarsW+Uf2v7zlZlWesTnpV6gkZH3tX86iuiZAoGBAKM0mKX0
  EjFkJH65Ym7gIED2CUyuFqq4WsCUD2RakpYZyIBKZGr8MRni3I4z6Hqm+rxVW6Dj
  uFGQe5GhgPvO23UG1Y6nm0VkYgZq81TraZc/oMzignSC95w7OsLaLn6qp32Fje1M
  Ez2Yn0T3dDcu1twY8OoDuvWx5LFMJ3NoRJaHAoGBAJ4rZP+xj17DVElxBo0EPK7k
  7TKygDYhwDjnJSRSN0HfFg0agmQqXucjGuzEbyAkeN1Um9vLU+xrTHqEyIN/Jqxk
  hztKxzfTtBhK7M84p7M5iq+0jfMau8ykdOVHZAB/odHeXLrnbrr/gVQsAKw1NdDC
  kPCNXP/c9JrzB+c4juEVAoGBAJGPxmp/vTL4c5OebIxnCAKWP6VBUnyWliFhdYME
  rECvNkjoZ2ZWjKhijVw8Il+OAjlFNgwJXzP9Z0qJIAMuHa2QeUfhmFKlo4ku9LOF
  2rdUbNJpKD5m+IRsLX1az4W6zLwPVRHp56WjzFJEfGiRjzMBfOxkMSBSjbLjDm3Z
  iUf7AoGBALjvtjapDwlEa5/CFvzOVGFq4L/OJTBEBGx/SA4HUc3TFTtlY2hvTDPZ
  dQr/JBzLBUjCOBVuUuH3uW7hGhW+DnlzrfbfJATaRR8Ht6VU651T+Gbrr8EqNpCP
  gmznERCNf9Kaxl/hlyV5dZBe/2LIK+/jLGNu9EJLoraaCBFshJKF
  -----END RSA PRIVATE KEY-----

Expand the **WIN_VM_CRED** credential by clicking its name. Enter **nutanix/4u** as the **Password**.

.. figure:: images/7.png

Click **Save**.

Once the blueprint has been saved, click **Back**.

.. figure:: images/8.png

Note that after the credentials have been provided, **Publish**, **Download**, and **Launch** are now available from the toolbar. Click **Launch**.

Fill out the following fields:

- **Name of the Application** - *Initials*-TaskManager1
- **User_initials** - *Initials*

.. figure:: images/9.png

Click **Create**.

You can monitor the status of your application deployment by clicking |applications| **Applications** and clicking your application's name.

Provisioning the complete application will take approximately 15 minutes. Proceed to the next section of the lab while the application is provisioning.

Enabling Flow
+++++++++++++

Flow is built into Prism Central and requires no additional appliances or consoles to manage. Before you can begin securing your environment with Flow, the service must be enabled.

.. note::

  Flow can only be enabled once per Prism Central instance. If **Flow** displays a green check mark next to it, that means Flow has already been enabled for the Prism Central instance being used. Proceed to `Securing An Application`_.

In **Prism Central**, click the **?** drop down menu and select **Flow**.

.. figure:: images/10.png

Note that enabling Flow will require an additional 1GB of memory for each Prism Central VM, but there is no action required by the user as this occurs automatically.

Select **Enable Flow** and click **Enable**.

.. figure:: images/11.png

Securing An Application
+++++++++++++++++++++++

Now that you have... <app description blah blah>

Defining Category Values
........................

Flow provides multiple out of the box categories for... <?>

In **Prism Central**, select :fa:`bars` **> Virtual Infrastructure > Categories**.

Select the checkbox for **AppType** and click **Actions > Update**.

.. figure:: images/12.png

Click the :fa:`plus-circle` icon beside the last value to add an additional Category value.

Specify **TaskMan-**\ *Initials* as the value name.

.. figure:: images/13.png

Click **Save**.

Select the checkbox for **AppTier** and click **Actions > Update**.

Click the :fa:`plus-circle` icon beside the last value to add an additional Category value.

Specify **TMWeb-**\ *Initials* as the value name. This category will be applied to the application's web tier.

Click :fa:`plus-circle` and specify **TMDB-**\ *Initials*. This category will be applied to the application's MySQL database.

Click :fa:`plus-circle` and specify **TMLB-**\ *Initials*. This category will be applied to the application's HAProxy load balancer.

.. figure:: images/14.png

Click **Save**.

Creating a Security Policy
..........................

While you wait for <blah blah blah>.

In **Prism Central**, select :fa:`bars` **> Virtual Infrastructure > Policies > Security Policies**.

Click **Create Security Policy > Secure an Application**.

Fill out the following fields:

- **Name** - AppTaskMan-\ *Initials*
- **Purpose** - Restrict unnecessary access to Task Manager
- **Secure this app** - AppType: TaskMan-\ *Initials*
- Do **NOT** select **Filter the app type by category**.

.. figure:: images/18.png

Click **Next**.

If prompted, click **OK, Got it!** on the tutorial diagram of the **Create App Security Policy** wizard.

To allow for more granular configuration of the security policy, click **Set rules on App Tiers** rather than applying the same rules to all components of the application.

.. figure:: images/19.png

Click **+ Add Tier**.

Select **AppTier: TMLB-**\ *Initials* from the drop down.

Repeat for **AppTier: TMWeb-**\ *Initials* and **AppTier: TMDB-**\ *Initials*.

.. figure:: images/20.png

Next you will define the **Inbound** rules, which control which sources you will allow to communicate with your application. You can allow all inbound traffic, or define whitelisted sources. By default, the security policy is set to deny all incoming traffic.

In this scenario we want to allow inbound TCP traffic on port 80 from all clients on the production network.

Under **Inbound**, click **+ Add Source**.

Specify the **Environment:Production** and click **Add**.

.. note::

  Sources can also be specified by IP or subnet, but Categories allow for greater flexibility as this data can follow a VM regardless of changes to its network location.

To create an inbound rule, select the **+** icon that appears to the left of **AppTier: TMLB-**\ *Initials*.

.. figure:: images/21.png

Fill out the following fields:

- **Protocol** - TCP
- **Ports** - 80

.. figure:: images/22.png

.. note::

  Multiple protocols and ports can be added to a single rule.

Click **Save**.

Calm could also require access to the VMs for workflows including scaling out, scaling in, or upgrades. Calm communicates with these VMs via SSH, using TCP port 22.

Under **Inbound**, click **+ Add Source**.

Fill out the following fields:

- **Add source by:** - Select **Subnet/IP**
- Specify *Your Prism Central IP*\ /32

.. note::

  The **/32** denotes a single IP as opposed to a subnet range.

  This step also could have been achieved by assigning a relevant category to your Prism Central VM. This would also simplify the policy if dealing with multiple Prism Central VMs as you would have 1 rule applied to multiple IPs.

.. figure:: images/23.png

Click **Add**.

Select the **+** icon that appears to the left of **AppTier: TMLB-**\ *Initials*, specify **TCP** port **22** and click **Save**.

Repeat for **AppTier: TMWeb-**\ *Initials* and **AppTier: TMDB-**\ *Initials* to allow Calm to communicate with the web tier and database VMs.

.. figure:: images/24.png

By default, the security policy allows the application to send all outbound traffic to any destination. The only outbound communication required for your application is for the database VM to be able to communicate with your DNS server.

Under **Outbound**, select **Whitelist Only** from the drop down menu, and click **+ Add Destination**.

Fill out the following fields:

- **Add source by:** - Select **Subnet/IP**
- Specify *Your Domain Controller IP*\ /32

.. figure:: images/25.png

Click **Add**.

Select the **+** icon that appears to the right of **AppTier: TMDB-**\ *Initials*, specify **UDP** port **53** and click **Save** to allow DNS traffic.

.. figure:: images/26.png

Each tier of the application communicates with other tiers and the policy must allow this traffic. Some tiers such as the load balancer and web do not require communication within the same tier.

To define intra-app communication, click **Set Rules within App**.

.. figure:: images/27.png

Click **AppTier: TMLB-**\ *Initials* and select **No** to prevent communication between VMs in this tier. There is only a single load balancer VM within the tier.

While **AppTier: TMLB-**\ *Initials* is still selected, click the :fa:`plus-circle` icon to the right of **AppTier: TMWeb-**\ *Initials* to create a tier to tier rule.

Fill out the following fields to allow communication on TCP port 80 between the load balancer and web tiers:

- **Protocol** - TCP
- **Ports** - 80

.. figure:: images/28.png

Click **Save**.

Click **AppTier: TMWeb-**\ *Initials* and select **No** to prevent communication between VMs in this tier. While there are multiple web server VMs, they do not need to communicate with each other.

While **AppTier: TMWeb-**\ *Initials* is still selected, click the :fa:`plus-circle` icon to the right of **AppTier: TMDB-**\ *Initials* to create another tier to tier rule.

Fill out the following fields to allow communication on TCP port 3306 to allow the database connection between the web servers and the MySQL database:

- **Protocol** - TCP
- **Ports** - 3306

.. figure:: images/29.png

Click **Save**.

Click **Next** to review the security policy.

Click **Save and Monitor** to save the policy.

Assigning Category Values
.........................

.. note::

  By this time, your application blueprint should have finished provisioning. If it has not completed, please wait until it has finished to proceed.

You will now apply the previously created categories to the VMs provisioned from your Task Manager blueprint. Flow categories can be assigned as part of a Calm blueprint, but the purpose of this exercise is to understand category assignment to existing virtual machines in an environment.

In **Prism Central**, select :fa:`bars` **> Virtual Infrastructure > VMs**.

Click **Filters** and search for *Initials-* to display your virtual machines.

.. figure:: images/15.png

Using the checkboxes, select the 4 VMs associated with the application (HAProxy, MYSQL, WebServer-0, WebServer-1) and select **Actions > Manage Categories**.

.. figure:: images/16.png

.. note::

  You can also use the **Label** functionality to make searching for this group of VMs faster in the future.

  .. figure:: images/16b.png

Specify **AppType:TaskMan-**\ *Initials* in the search bar and click **Save** icon to bulk assign the category to all 4 VMs.

Select ONLY the *Initials*\ **-HAProxy** VM, select **Actions > Manage Categories**, specify the **AppTier:TMLB-**\ *Initials* category and click **Save**.

.. figure:: images/17.png

Repeat this procedure to assign **AppTier:TMWeb-**\ *Initials* to your web tier VMs.

Repeat this procedure to assign **AppTier:TMDB-**\ *Initials* to your MySQL VM.

Finally, repeat this procedure to assign **Environment:Dev** to your Windows client VM.

Monitoring and Applying a Security Policy
+++++++++++++++++++++++++++++++++++++++++

Before applying the Flow policy, you will ensure the Task Manager application is working as expected.

Testing the Application
.......................

From **Prism Central > Virtual Infrastructure > VMs**, note the IP address of your *Initials*\ **-HAPROXY-0...** and *Initials*\ **-MYSQL-0...** VMs.

Launch the console for your *Initials*\ **-WinClient-0** VM.

From the *Initials*\ **-WinClient-0** console open a browser and access \http://*HAPROXY-VM-IP*/.

Verify that the application loads and that tasks can be added and deleted.

.. figure:: images/30.png

Open **Command Prompt** and run ``ping -t MYSQL-VM-IP`` to verify connectivity between the client and database. Leave the ping running.

Open a second **Command Prompt** and run ``ping -t HAPROXY-VM-IP`` to verify connectivity between the client and load balancer. Leave the ping running.

.. figure:: images/31.png

Using Flow Visualization
........................

Return to **Prism Central** and select :fa:`bars` **> Virtual Infrastructure > Policies > Security Policies > AppTaskMan-**\ *Initials*.

Verify that **Environment: Dev** appears as an inbound source. The source and line appear in yellow to indicate that traffic has been detected from your client VM.

.. figure:: images/32.png

Mouse over the line connecting **Environment: Dev** to **AppTier: TMLB-**\ *Initials* to view the protocol and connection information.

Click the yellow flow line to view a graph of connection attempts over the past 24 hours.

.. figure:: images/33.png

Are there any other detected outbound traffic flows? Hover over these connections and determine what ports are in use.

Click **Update** to edit the policy.

.. figure:: images/34.png

Click **Next** and wait for the detected traffic flows to populate.

Mouse over the **Environment: Dev** source that connects to **AppTier: TMLB-**\ *Initials* and click the :fa:`check` icon that appears.

.. figure:: images/35.png

Click **OK** to complete adding the rule. The **Environment: Dev** source should now turn blue, indicating that it is part of the policy. Mouse over the flow line and verify that both ICMP (ping traffic) and TCP port 80 appear.

Click **Next > Save and Monitor** to update the policy.

Applying Flow Policies
......................

In order to enforce the policy you have defined, the policy must be applied.

Select **AppTaskMan-**\ *Initials* and click **Actions > Apply**.

.. figure:: images/36.png

Type **APPLY** in the confirmation dialogue and click **OK** to begin blocking traffic.

Return to the *Initials*\ **-WinClient-0** console.

What happens to the continuous ping traffic from the Windows client to the database server? Is this traffic blocked?

Verify that the Windows Client VM can still access the Task Manager application using the web browser and the load balancer IP address. Can you still enter new tasks that require communication between the web server and database?

Isolating Environments
++++++++++++++++++++++

<When would someone want to isolate environments versus locking down applications?>

In this exercise you will create a new environment category and assign this to the Task Manager application. Then you will create and implement an isolation security policy that uses the newly created category in order to restrict unauthorized access.

Creating and Assigning Categories
.................................

In **Prism Central**, select :fa:`bars` **> Virtual Infrastructure > Categories**.

Select the checkbox for **Environment** and click **Actions > Update**.

Click the :fa:`plus-circle` icon beside the last value to add an additional Category value.

Specify **Prod-**\ *Initials* as the value name.

.. figure:: images/37.png

Click **Save**.

In **Prism Central**, select :fa:`bars` **> Virtual Infrastructure > VMs**.

Click **Filters** and search for *Initials-* to display your virtual machines.

.. note::

  If you previously created a Label for your application VMs you can also search for that label. Alternatively you can search for the **AppType:TaskMan-**\ *Initials* category from the Filters pane.

  .. figure:: images/38.png

Using the checkboxes, select the 4 VMs associated with the application (HAProxy, MYSQL, WebServer-0, WebServer-1) and select **Actions > Manage Categories**.

Specify **Environment:Prod-**\ *Initials* in the search bar and click **Save** icon to bulk assign the category to all 4 VMs.

.. figure:: images/39.png

Creating an Isolation Policy
............................

In **Prism Central**, select :fa:`bars` **> Virtual Infrastructure > Policies > Security Policies**.

Click **Create Security Policy > Isolate Environments**.

Fill out the following fields:

- **Name** - Isolate-dev-prod-\ *Initials*
- **Purpose** - Isolate dev from prod-\ *Initials*
- **Isolate This Category** - Environment:Dev
- **From This Category** - Environment:Prod-\ *Initials*
- Do **NOT** select **Apply this isolation only within a subset of the datacenter**. This option provides additional granularity by only applying to VMs assigned a third, mutual category.

.. figure:: images/40.png

Click **Apply Now** to save the policy and begin enforcement immediately.

Return to the *Initials*\ **-WinClient-0** console.

Is the Task Manager application accessible? Why not?

Using these simple policies it is possible to... <?>

Deleting a Policy
.................

In **Prism Central**, select :fa:`bars` **> Virtual Infrastructure > Policies > Security Policies**.

Select **Isolate-dev-prod-**\ *Initials* and click **Actions > Delete**.

Type **DELETE** in the confirmation dialogue and click **OK** to disable the policy.

.. note::

  To disable the policy you can choose to enter **Monitor** mode, rather than deleting the policy completely.

Return to the *Initials*\ **-WinClient-0** console and verify the Task Manager application is accessible again from the browser.

Quarantining a VM
+++++++++++++++++

In this task we will place a VM into quarantine and observe the behavior of the VM. We will also inspect the configurable options inside the quarantine policy.

Return to the *Initials*\ **-WinClient-0** console.

Open a **Command Prompt** and run ``ping -t HAPROXY-VM-IP`` to verify connectivity between the client and load balancer.

.. note::

  If the ping is unsuccessful you may need to update your Inbound Rule for **Environment:Dev** to **AppTier:TMLB-**\ *Initials* to include **Any** as the **Type** and **Code** for **ICMP** traffic as shown below. Apply the updated **AppTaskMan-**\ *Initials* policy and the ping should resume.

  .. figure:: images/41.png

In **Prism Central > Virtual Infrastructure > VMs**, select your *Initials*\ **-HAPROXY-0...** VM.

Click **Actions > Quarantine VMs**

.. figure:: images/42.png

Select **Forensic** and click **Quarantine**.

What happens with the continuous ping between your client and the load balancer? Can you access the Task Manager application web page from the client VM?

In **Prism Central**, select :fa:`bars` **> Virtual Infrastructure > Policies > Security Policies > Quarantine** to view all Quarantined VMs.

Click **Update** to edit the Quarantine policy.

To illustrate the capabilities of this special Flow policy, you will add your client VM as a "forensic tool." In other environments, VMs allowed inbound access to quarantined VMs could be used to host forensic tools such as... <?>

Under **Inbound**, click **+ Add Source**.

Fill out the following fields:

- **Add source by:** - Select **Subnet/IP**
- Specify *Your WinClient VM IP*\ /32

To what targets can this source be connected? What is the difference between the Forensic and Strict quarantine mode?

Note that adding a VM to the **Strict** Quarantine policy disables all inbound and outbound communication to a VM. The **Strict** policy would apply to an VMs whose presence on the network poses a threat to the environment.

Click the :fa:`plus-circle` icon to the right of **Quarantine: Forensic** to create an Inbound Rule.

Click **Save** to allow any protocol on any port between the client VM and the **Quarantine: Forensic** category.

.. figure:: images/43.png

Click **Next > Apply Now** to save and apply the updated policy.

What happens to the pings to the load balancer after the source is added? Can you access the Task Manager web application?

You can remove the load balancer VM from the **Quarantine: Forensic** category by selecting the VM in Prism Central and clicking **Actions > Unquarantine VMs**.

(Optional) Using Flow with Calm
+++++++++++++++++++++++++++++++

At the beginning of this lab, Calm was used to provide a multi-tier application as a basis for understanding how Flow policies can be created, applied, and monitored using existing workloads in an environment.

Flow also integrates natively with Calm to define Categories at the Service (VM) level within the Calm blueprint.

.. note::

  Flow policies for Calm provisioned VMs should ensure that port 22 (for Linux VMs) and port 5985 (for Windows VMs) are open. This was done earlier in the lab when initially creating the **AppTaskMan** policy.

As the Calm blueprint used in this exercise requires Internet access to install remote packages, first update the **AppTaskMan-**\ *Initials* security policy from **Whitelist Only** to **Allow All** for **Outbound** connections, as shown below.

.. figure:: images/46.png

In a production environment, VMs from Calm could leverage either a staging category during provisioning or additional Outbound rules to specify only the hosts with which it needed to communicate to complete provisioning.

In **Prism Central**, select :fa:`bars` **> Services > Calm**.

Click |blueprints| **Blueprints > **\ *Initials*\ **-TaskManager** to open your existing blueprint.

Select the **WebServer** service.

.. figure:: images/44.png

On the **VM** tab, scroll to **Categories** and select the **AppType: TaskMan-**\ *Initials* and **AppTier: TMWeb-**\ *Initials* categories.

.. figure:: images/45.png

Select the **HAProxy** service and add the **AppType: TaskMan-**\ *Initials* and **AppTier: TMLB-**\ *Initials* categories.

Select the **MySQL** service and add the **AppType: TaskMan-**\ *Initials* and **AppTier: TMDB-**\ *Initials* categories.

Select the **WinClient** service and add the **Environment: Dev** category.

Click **Save**.

Click **Launch**.

Fill out the following fields:

- **Name of the Application** - *Initials*-TaskManager2
- **User_initials** - *Initials*

Click **Create**.

You can monitor the status of your application deployment by clicking |applications| **Applications** and clicking your application's name.

Once application provisioning has completed, note the additional VMs detected as part of the policy.

Does the application behave as expected? From the new client VM, are you able to ping the load balancer but not the database? Are you able to access the application?

Integrating with Calm offers... <?>

The application of categories can also be performed programmatically via ... <?>

Takeaways
+++++++++

What are the key things you should know about **Nutanix Flow**?

- stuff

- Goes

- here

Getting Connected
+++++++++++++++++

Have a question about **Nutanix Flow**? Please reach out to the resources below:

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

.. |blueprints| image:: images/blueprints.png
.. |applications| image:: images/blueprints.png
