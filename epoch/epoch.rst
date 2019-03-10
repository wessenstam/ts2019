.. _epoch:

--------
Xi Epoch
--------

*The estimated time to complete this lab is 60 minutes.*

.. raw:: html

  <iframe width="640" height="360" src="https://www.youtube.com/embed/ua-n5y4LgWs?rel=0&amp;showinfo=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Overview
++++++++

Application architectures are going through a paradigm shift. Monolithic architectures are giving way to loosely-coupled, API driven microservices based architectures. Applications are increasingly becoming distributed and relying on external services like open-source components, external SaaS providers, and solutions provided by different public cloud vendors, where code-instrumentation is not possible. This creates critical blind spots in monitoring the health and performance of modern distributed applications.

Using network as the vantage point, Epoch can continue to observe and monitor applications as they go through architectural transitions. This makes our approach ‘future proof’ compared with the code-based monitoring approaches.

Xi Epoch generates live application maps to provide instantaneous visibility into application health without the need for any code instrumentation. Epoch provides key health metrics and monitors various infrastructure and application components, without the dependency on specific language or framework. As a result, SRE and DevOps teams can quickly identify root causes and substantively improve application performance and uptime.

**In this lab you will deploy Xi Epoch agent software to a multi-tier application, explore Maps, create a custom Dashboard to monitor key app metrics, and define Alerts that can be used in troubleshooting application health.**

Lab Setup
+++++++++

This lab depends on the availability of a multi-tier **Task Manger** web application.

Refer to the :ref:`taskman` lab for instructions on importing and launching the completed **Task Manager** blueprint.

Once you have initiated the **Task Manager** deployment, you can proceed with the lab below. **You do not need to wait for the blueprint deployment to complete to begin this lab.**

Accessing Xi Epoch
+++++++++++++++++++

#. Open https://epoch.nutanix.com/ in your browser to access to Xi Epoch SaaS control plane, called the **Application Operations Center (AOC)**.

#. Log in using your **my.nutanix.com** credentials.

   .. note::

     These are the same credentials used to access the Nutanix Support Portal.

   You will be prompted to provide a subdomain for accessing Epoch. This is the URL that you will use to access the AOC and where your application data will be sent. Examples include your name or organization name.

#. Provide a URL and click **Sign Up**.

   .. figure:: images/0.png

   It should take ~1 minute to create your Epoch instance, at which time you will be redirected to the AOC.

Installing Epoch Collector
++++++++++++++++++++++++++

The Epoch Collector is a lightweight agent that captures TCP packet and performs real-time deep packet inspection. In this exercise you will install the collector on each VM within your Task Manager application.

.. note::

  You will need to wait until Calm has completed provisioning the Task Manager application to proceed with collector installation.

By default, Epoch will display instructions for installing the collector for multiple different platforms.

Epoch offers support for Windows and common Linux distributions, as well as support for Kubernetes and Docker. For container environments, Epoch only requires installation of the collector on the container host, and not within individual containers.

#. Select **CentOS**.

   .. figure:: images/2.png

#. Under **Quickstart Installation**, copy and paste the entire provided command to a scratch file.

   .. figure:: images/3.png

   The installation command includes the script to perform installation of the collector, but also includes customized variables that define YOUR Epoch instance, packet analysis depth (e.g. Layer 4 vs. Layer 7), and sampling rate.

   `Tags <https://docs.epoch.nutanix.com/v1.12.11/integrations/tagging-infrastructure/#configuration>`_ can also be added at the time of installation using the EPOCH_TAGS environment variable: ``EPOCH_TAGS="tag1,tag_key2:tag_value2"``. Tags help group VM instances and containers, allowing you another means of easily filtering different applications, regions, etc. Proper tagging can speed up incidence response and help define meaningful alerts.

#. Close the documentation pop-up window.

   .. note::

     The installation instructions can be accessed at any time under the *User name* drop down menu in the upper right of the toolbar.

#. Return to **Calm > Applications >** *Initials*\ **-TaskManager > Services** and select a WebServer VM to determine its IP address.

   .. figure:: images/4.png

   .. note::

     Click the **<>** icon to expand the WebServer service to select the individual service VMs in the array.

     You can also determine the IP addresses of each VM through Prism.

#. Connect to your first VM via SSH using the following credentials:

     - **Username** - centos
     - **Password** - Nutanix/4u

#. Run the following commands to elevate the permissions of the session and install ``wget``:

   .. code-block:: bash

     sudo bash
     yum -y install wget

#. Once ``wget`` has been installed, paste the collector quickstart installation command into the SSH session.

   Running the command will download the proper package, install, configure, and then start the ``epoch-collectors`` service.

#. Run ``systemctl status epoch-collectors`` to verify the service is **Active (Running)**.

   .. figure:: images/5.png

#. Repeat Steps 4-8 to install the collector on the remaining WebServer VM, MySQL VM, and HAProxy VM. The WinClient VM will not be used in this exercise.

   Epoch's collectors are designed to minimize overhead while performing packet capture, stream processing, and infrastructure metrics collection. However, it is important to understand the CPU, memory, and network overheads associated with different collector configurations.

   A default installation, which only performs Layer 4 protocol analysis, has a typical overhead of 1-2% CPU time and ~200MB of RAM.

   As seen in the quickstart installation command, you have configured your collectors to perform Layer 7 protocol analysis. While actual overhead depends on the throughput of network transactions, typical workloads have an overhead of 5-10% CPU time and 300-700MB of RAM.

   Outgoing network bandwidth per collector is ~5-20KBps, depending on workload.

   For complete details on collector overhead, and how to balance or offload overhead, see the `Collector Documentation <https://docs.epoch.nutanix.com/v1.12.11/setup-guide/collectors/overheads/>`_.

#. Return to **Xi Epoch** and select **Settings > Collector Health**. What is the status of the collectors you have installed?

   .. figure:: images/6.png

Using Application Maps
++++++++++++++++++++++

The Epoch Application Maps can be thought of as “Google Maps for Cloud Apps,” providing interactive visualization of interactions between services on the network. From the application maps, users can drill down and quickly diagnose a range of complex issues such as service configuration (e.g. Kubernetes DNS errors), service reachability issues (e.g. HTTP errors) and service creation problems (e.g. pod scheduling errors).

#. Open \http://*HAPROXY-VM-IP*/ in your browser to access the Task Manager application. Add several sample tasks and then delete a few tasks.

   This action will create calls from the client to HAProxy, from HAProxy to your Web Servers, and from the Web Servers to the MySQL database, all of which will be captured by Epoch.

   .. figure:: images/7.png

#. Return to the **AOC** and select **Maps > Hosts**.

#. The timeline slider at the top of the map allows you to define the period of time during which you want to analyze data. Pause the **Live** display and select an interval of time that included your accessing the Task Manager application described above. Epoch retains captured metrics for up to 1 year.

   .. figure:: images/8.png

#. Remove the default **Filters** and **Groups** options by clicking the **x** on each. This should display a **Merged Node** containing the consolidated statistics of all collectors.

#. Select the **Merged Node** and explore to available metrics. What is the host count of the node?

   The **Merged Node** view is helpful in containerized environments to quickly understand the status of container hosts, number of containers, etc.

#. Unselect the **Merged Node** (e.g. click the grey area outside the node) and click **Discard Changes > Discard Changes** to restore the Filter and GroupBy settings.

   Groups and Filters allow for multi-dimensional analysis of data. **GroupBy** will create a grouping of data points based of specified attributes, such as hostname, port, or resource type. **Filters** alow for the selection and/or elimination of data points based on defined criteria, such as hostnames that match a specific regular expression (RegEx).

#. Click the **Map Settings** :fa:`cog` icon and select **Link metrics**. What additional information does this add to the map?

   .. figure:: images/9.png

#. Filter for and select your *Initials*\ **-MYSQL...** VM node.

   .. figure:: images/10.png

   Selecting a node or a link in the application map allows you to deep-dive into the health metrics, arranged by inbound and outbound traffic, of that node. The health metrics are further grouped by technology, such as: System (infrastructure health), Network (layer 4 health), HTTP (layer 7 health), Docker, Kubernetes, MySQL, etc.

   The technology options will be displayed based on the selected node and the collector configuration, for example:

   - **HTTP, HTTP/2** - This provides interactive graphs and trends for golden signals grouped by most impacted endpoints.
   - **System** - This provides interactive graphs and trends for infrastructure KPIs such as CPU, Memory, I/O wait, and traffic.
   - **Docker** - This provides interactive graphs and trends for golden signals grouped by docker image and containers.
   - **Kubernetes** - This provides interactive graphs and trends for CPU, Memory, Deployments, ReplicaSet, DaemonSet, Network In/Out by pods and hosts.
   - **MySQL/PostgreSQL** - This provides interactive graphs and trends for golden signals grouped by queries and response size etc.
   - **Network Flow** - This provides interactive graphs and trends for request and response byte, request and response packets, and session rate.
   - **DNS** - This provides interactive graphs and trends for golden signals grouped by DNS domains and lookup status etc.
   - **Memcached** - This provides interactive graphs and trends for Memcached commands, read/writes, hits/misses, filling, connections, gets/sets, domains, and lookup etc.

#. Unselect the *Initials*\ **-MYSQL...** node and click **Show 1-hop** in the toolbar.

   This view provides a topological breakdown of incoming and outgoing connections 1 network "hop" from the selected host.

   .. figure:: images/11.png

#. Finally, you can save your customized map view by clicking the **Clone And Save Map** button.

   This allows you to easily return to pre-filtered views of specific apps, regions, etc.

Configuring Dashboards & Integrations
+++++++++++++++++++++++++++++++++++++

While the Map view provides an interactive means of viewing Live or historical metrics, Epoch Dashboards provide both out-of-the-box and customizable views that can help identify point-in-time values and meaningful attributes of the data source (e.g. DNS domain types or HTTP status codes).

Integrations are what power advanced data collection within the AOC with support for specific applications and protocols. Epoch currently supports over 75 different applications and services, including vSphere, SQL Server, MySQL, ssh, Nginx, AWS and more.

#. In the **AOC**, select **Integrations**.

#. Search for and select the **MySQL** integration.

   The integration is enabled by default and provides several metrics, including information about throughput, latency, and actual query statements made on the MySQL server. These metrics require no changes to your existing application or infrastructure, but do require that the collector be configured to capture Layer 7 data.

   Under **Configuration**, you will see the additional stats reported by MySQL that Epoch can capture with some additional configuration of the MySQL environment, but critically still requires no changes to the application itself.

#. Explore some of the other available integrations and note the data provided by the integration, as well as any infrastructure changes required to enable the integration.

   Selecting **Show Integration Dashboards** will enable the integration, but individual integrations may require additional configuration in order for data to be collected.

#. In the **AOC**, select **Dashboards**.

   This page offers many pre-configured dashboards based on native data capture like **System - Disk I/O** and **Network Flows**, as well as dashboards based on integrations like **MySQL** and **HTTP**.

#. Select the **MySQL** dashboard and ensure your selected timeline includes the time period you created and deleted tasks in your Task Manager web application.

   Dashboards allow you to consolidate and evaluated metrics over a significantly longer time span than Maps, allowing an interval of up to 90 days.

   You should see multiple charts detailing key application specific metrics populated, similar to below:

   .. figure:: images/12.png

#. As shown, you can use the **Table View** button to toggle the view of charts to provide a table with the associated data, which may be more helpful for understanding a metric such as the **Throughput of Top 5 Most Requested Queries**.

   You can also use dashboards to drill down into additional attributes of the data sources.

#. Select the query with the highest **Average Latency of Slowest Queries (Top 5)** and click **Drill into > mysql.db** to learn what database is experiencing the slowest average query.

   This **mysql.** attributes are provided by the MySQL integration.

   .. figure:: images/13.png

#. Using the same capability, can you determine which hosts are experiencing your highest latency query?

#. Use the **+ Add Filters** bar to filter the data specific to a **mysql.query**.

   Filtering based on client, query, etc. can allow an administrator to quickly transform data and evaluate the health of very specific aspects of the environment.

#. At the top of the dashboard, select **... > Clone Dashboard** and provide a **Name** (e.g. *Initials*\ - **TaskManager**.)

   Built-in dashboards can easily be cloned to persistent customized views, such as a custom dashboard to track key metrics related to your Task Manager application.

   Once cloned, note that you can now click the **...** icon on each chart and clone or delete it individually. You can remove any unwanted charts.

   At the bottom of the dashboard you now have an option to add **Charts** and **Widgets**.

   Widgets import **HTML iframes** from other sources, such as a Google Sheet or 3rd party monitoring output, allowing Epoch to remain a single pane of glass.

   Charts use the built-in query builder to visualize source data as either a multiline, stacked area, stacked bar, bar, or pie chart, as well as tables or individual values.

#. Click **+ Add Chart**.

   For your Task Manager application it would be helpful to have a display of how many HTTP requests are being made against the load balancer during a given period of time.

#. Fill out the following fields:

   - **Name** HAProxy HTTP Requests
   - **Type** - Value (This is the 123 icon under **Main Query**)
   - **Metric** - http.request.count
   - **Filters** - client.host_name: *Initials*\ -HAProxy...

   .. figure:: images/14.png

#. Click **Create new chart** to add to your custom dashboard.

   .. figure:: images/15.png

   While this is a simple example, the Query Builder can be used to model many types of helpful metrics related to applications, such as the frequency of specific HTTP error codes, changes in latency over time, DNS timeouts between services, and more.

Configuring Alerts
++++++++++++++++++

Epoch provides a flexible alerting engine that allows the user to set up alerts and receive notifications for application and infrastructure events.

#. In the **AOC**, select **Alerts > Manage Alerts**.

   As with Dashboards, Epoch provides multiple out-of-the-box alert policies that can be cloned and edited.

#. Select the **Hosts diskUsed > 75%** alert and click **Clone Alert** when prompted.

   .. figure:: images/16.png

   The in use storage for all of your VMs should be displayed as a multiline graph, similar to the image below:

   .. figure:: images/17.png

   You can expand the **Query Builder** to understand how Epoch is measuring disk utilization.

#. Under **Alert Conditions**, modify the threshold values such that some of your VMs will alert as critical.

   In the example, HAProxy is at ~10% disk capacity utilization, MySQL at ~13%, and Web Servers at ~14%, so the critical threshold is defined as 13.5 and warning threshold at 12.

   .. figure:: images/18.png#.

#. Under **Alert Notifications**, set notifications to **unmuted** and add your e-mail in the notification recipients field.

   .. figure:: images/19.png

#. Update the alert name to reflect your updated threshold and click **Save Alert**.

#. In the **AOC**, select **Alerts > Triggered Alerts**.

#. Toggle the **Live** button to on (blue) and validate that the expected alerts have been triggered.

   You should have also received e-mails from Epoch AOC with the defined alert message.

   .. figure:: images/20.png

#. Return to **Maps > Hosts** and note that the nodes with triggered alerts are highlighted the appropriate color.

#. Select a node and click the **Status** tab to drill down into the specific details of the alert.

   The combination of maps and alerts makes pin pointing issues within complex environments fast and simple.

(Optional) Enabling HAProxy Integration
+++++++++++++++++++++++++++++++++++++++

Using the instructions built into the AOC for the HAProxy integration, can you enable HAProxy stats collection for your Task Manager application and add an HAProxy specific chart to your Task Manager dashboard?

(Optional) Monitoring Karbon
++++++++++++++++++++++++++++

This exercise requires completion of the :ref:`karbon` lab.

Using the instructions built into the AOC for Kubernetes collector installation, can you build a simple dashboard for monitoring your Wordpress application?

Takeaways
+++++++++

What are the key things you should know about **Nutanix Xi Epoch**?

- Xi Epoch gives you the ability to see inside any application or solution stack, at scale, on any cloud.

- Epoch does **not** require any code change to generate maps and metrics. It monitors the service interactions and conducts a real-time analysis of packets to obtain deep application insights.

- Common use cases for Epoch include application monitoring, incident response, and capacity planning. It also gives you the intelligence to better manage deployments, scaling events and application or infrastructure migrations.

- Epoch can be used with any public or private cloud, including Nutanix Enterprise Cloud, AWS, Azure, and Google Cloud Platform, and supports almost all popular containerized and non-containerized application environments including Kubernetes, Docker, Mesos, Debian, Ubuntu, and CentOS.

- Epoch is currently delivered as a public SaaS offering with self-hosted and on-premises options available soon.

- Prospects can sign up for a free trial of Xi Epoch `here <https://www.nutanix.com/products/epoch/signup/>`_.

- Additional internal resources for Epoch are available `here <https://nutanixinc.sharepoint.com/sites/EpochHome36>`_.

Cleanup
+++++++

.. raw:: html

  <strong><font color="red">Once your lab completion has been validated, PLEASE do your part to remove any unneeded VMs to ensure resources are available for all users on your shared cluster.</font></strong>

If you do **NOT** intend to complete the :ref:`flow` lab, delete your application deployment in Calm, otherwise the same deployment can be used.

Getting Connected
+++++++++++++++++

Have a question about **Nutanix Xi Epoch**? Please reach out to the resources below:

+------------------------------------------------------------------------------------+
|  Xi Epoch Product Contacts                                                         |
+================================+===================================================+
|  Slack Channel                 |  #epoch                                           |
+--------------------------------+---------------------------------------------------+
|  Product Manager               |  Adhiraj Singh, adhiraj.singh@nutanix.com         |
+--------------------------------+---------------------------------------------------+
|  Product Manager               |  Rohan Shah, rohan.shah@nutanix.com               |
+--------------------------------+---------------------------------------------------+
|  Product Marketing Manager     |  Chris Brown, cb@nutanix.com                      |
+--------------------------------+---------------------------------------------------+
|  Head of Sales                 |  Jai Desai, jai.desai@nutanix.com                 |
+--------------------------------+---------------------------------------------------+
|  SME                           |  Harkirat Randhawa, harkirat.randhawa@nutanix.com |
+--------------------------------+---------------------------------------------------+
