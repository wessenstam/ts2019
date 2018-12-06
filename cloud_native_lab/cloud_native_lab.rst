.. _cloud_native_lab:

---------------------------------
Lab - Nutanix Cloud Native Lab
---------------------------------

Overview
++++++++

.. note::

  Estimated time to complete: **1 HOUR**

  **Due to limited resources, this lab should be completed as a group.**

Traditional Enterprise Applications face a variety of deployment challenges for IT and developers; provisioning a database for a new application may need to pass through a DBA, your storage, network, and virtualization teams. There’s unnecessary complexity as a developer shouldn’t care on which server the application runs, or which LUN the data is stored on. In addition, increasing the capacity of an application is a manual and time intensive process; developer workstations likely have different code, packages, and libraries from production servers. These challenges reduce productivity, extend release cycles, and increase software defects.

The goal of this lab is to experience first-hand how Nutanix Cloud Native products solve these challenges via a series of exercises that walk through the deployment of a fully functional cloud native application, which leverages a Karbon based Kubernetes cluster, an Era DB, and Nutanix Buckets object storage, all of which you will get a chance to deploy, provision, and create respectively.

Getting Engaged with the Product Team
.....................................

.. list-table::
  :widths: 50 50
  * - **Karbon Slack**
    - #karbon
  * - **Karbon Product Manager**
    - Denis Guyadeen, dguyadeen@nutanix.com
  * - **Karbon Product Marketing Manager**
    - Maryam Sanglaji, maryam.sanglaji@nutanix.com
  * - **Karbon Technical Marketing Engineer**
    - Dwayne Lessner, dwayne@nutanix.com

.. list-table::
  :widths: 50 50
  * - **Era Slack**
    - #era
  * - **Era Product Manager**
    - Jeremy Launier, jeremy.launier@nutanix.com
  * - **Era Product Marketing Manager**
    - Maryam Sanglaji, maryam.sanglaji@nutanix.com
  * - **Era Technical Marketing Engineer**
    - Mike McGhee, michael.mcghee@nutanix.com

.. list-table::
  :widths: 50 50
  * - **Buckets Slack**
    - #nutanix-buckets
  * - **Buckets Product Manager**
    - Priyadarshi Prasad, priyadarshi@nutanix.com
  * - **Buckets Product Marketing Manager**
    - Krishnan Badrinarayanan, krishnan.badrinaraya@nutanix.com
  * - **Buckets Technical Marketing Engineer**
    - Sharon Santana, sharon.santana@nutanix.com

- **Cloud Native Technical Marketing Engineer** - Michael Haigh, michael.haigh@nutanix.com

Create a Karbon Kubernetes Cluster
++++++++++++++++++++++++++++++++++

In this exercise you will create a production ready Kubernetes cluster with Nutanix Karbon. This Karbon Kubernetes cluster will run our ephemeral web application containers.

Navigate to **Prism Central > Explore > Karbon** and ensure you see a ‘Karbon is successfully enabled’ notification.

 Click the link to open the Karbon Console, then click **+ Create Cluster**.

Fill in the following:

**Name and Environment**

- **Name** - karbon-*initialsLowerCase*
- **Cluster** - Leave Default selected
- **Kubernetes Version** - 1.10.3
- **Host OS Image** - centos

#.. figure:: images/karbon-create-1.png

Click **Next**

**Worker Configuration**

.. note::

  This defines the number of worker nodes that will run the Kubernetes pods.

Leave all defaults and click **Next**.

**Master Configuration**

.. note::

  This defines the number of master nodes that controls the Kubernetes cluster, and the number of etcd VMs, which manages the cluster state.

Leave all defaults and click **Next**.

**Network**

- **Network Provider** - Flannel
- **VM Network** - Primary
- **Service CIDR** - Leave the default of 172.19.0.0/16
- **Pod CIDR** - Leave the default of 172.20.0.0/16

#.. figure:: images/karbon-create-4.png

Click **Next**

**Storage Class**

- **Storage Class Name** - default-storageclass-*initialsLowerCase*
- **Prism Element Cluster** - Leave default selected
- **Cluster Username** - admin
- **Cluster Password** - *HPOC Password*
- **Storage Container Name** - default-container-XXXXXXX
- **File System** - ext4

#.. figure:: images/karbon-create-5.png

Click **Create**

.. note::

  Move on to the next step while the Karbon cluster is being provisioned, but occasionally check back in on the status.

Deploy Era Database and Database Server
+++++++++++++++++++++++++++++++++++++++

In this section, you will provision a database server which contains a PostgreSQL database, and set up **Time Machine** which provides data copy management.  This Postgres DB will store the persistent data for our web application.

In a new browser tab, log on to Era https://ERA-IP:8443/ using these credentials:

- **Username** - admin
- **Password** - techX2019!

Now lets provision a database.

Click on the **Dashboard** dropdown in the upper left, and select **Databases**

On the left column, select **Sources**.

#.. figure:: images/era-db-summary.png

Click the blue **+ Provision** button.

Fill in the following:

- **Database Type** - PostgreSQL

Click **Next**

**Database Server**

- **Create New Server** - selected
- **Software Profile Name** - POSTGRES_10.4_OOB
- **Database Server Name** - PostgreSQL-*initialsLowerCase*
- **Description** - Era Postgres DB
- **Compute Profile** - DEFAULT_OOB_COMPUTE
- **Network Profile** - DEFAULT_OOB_NETWORK
- **SSH Public Key for Node Access**
    - **Text** - selected
    - **SSH Key** - ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDDoJlPj+ACPyHGm0f+FyTQPRt+m1H6JstyLtvFJUntDyF2/dqpcQ9QfKKw1QcjzGdSS8B6HrdOOjKZz42j01/YLWFy2YrDLQOHcNJi6XowCQ059C7bHehP5lqNN6bRIzdQnqGZGYi8iKYzUChMVusfsPd5ZZo0rHCAiCAP1yFqrcSmq83QNN1X8FZ1COoMB66vKyD2rEoeKz4lilEeWKyP4RLmkOc1eMYQNdyMOCNFFbKmC1nPJ+Mpxo1HfNR84R7WNl5oEaNQOORN+NaOzu5Bxim2hhJvU37J+504azZ1PCUiHiC0+zBw4JfeOKMvtInmkEZQEd3y4RrIHLXKB4Yb centos@nutanix.com

.. figure:: images/era-provision-2.png

Click **Next**

**Database**

.. note::

  Be sure to remember, or write down, your entries here, as the will be used later in the lab.

- **Database Name** - oscar_django_*initialsLowerCase*
- **Description** - Any description of your choice.
- **Postgres Password** - Nutanix/4u!
- **Database Parameter Profile** - DEFAULT_POSTGRES_PARAMS

Leave the rest of the fields as their default values.

#.. figure:: images/era-provision-3.png

Click **Next**

**Time Machine**

- **Name** - Leave as the default.
- **SLA** - Leave as default of GOLD
- **Description** - Any description of your choice.
- **Schedule** - Leave defaults.

#.. figure:: images/era-provision-4.png

Click **Provision**

.. note::

  You can click on the blue banner that appears on the top of the page to view the provision status.  Alternatively, click on the menu in the upper left, and select **Operations**.

.. note::

  Move on to the next task while the database is provisioned, but occasionally check back in to view the status.

Create an Object Storage Bucket with Nutanix Buckets
++++++++++++++++++++++++++++++++++++++++++++++++++++

In this task you will create an object storage bucket utilizing Nutanix Buckets. This bucket will be used to store all of our web app’s images.

In a new browser tab, log on to Era https://Buckets-IP:7200/ using these credentials:

- **Username** - Access
- **Password** - Secret

Now lets create a Bucket.

Click on the **Red +** and then select the bottom **Yellow Circle**.

#.. figure:: images/object-create-ovm.png

In the pop-up that appears, fill in the following and hit **Enter**:

- **Name** - oscarstatic-*initialsLowerCase*

.. note::

  Be sure to write down your entry here, as it will be used later in the lab for the django-jet/django-configmap.yaml file.

#.. figure:: images/object-create-ovm-2.provisioning

Ensure you see your newly created bucket in the list on the left column.

Set up Kubeconfig
+++++++++++++++++

In this task you will download your Karbon Kubernetes cluster’s kubeconfig file and apply that file to kubectl to enable you to control your Kubernetes cluster.















Takeaways
+++++++++
