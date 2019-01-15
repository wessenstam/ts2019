.. _buckets:

---------------
Nutanix Buckets
---------------

Overview
++++++++

**Estimated time to complete: 30 MINUTES**

Buckets is a scalable S3-compatible object storage solution that allows users to store petabytes of unstructured data on the Nutanix platform.

It has support for features such as WORM and object versioning that are required for regulatory compliance.

Another feature is easy integration with 3rd party backup software and S3 compatible applications.

Lab Setup
+++++++++
In this section we will deploy a Linux VM, install iam_util, mc, s3cmd, and awscli.

Deploy Linux VM
...............

In **Prism Central** > select :fa:`bars` **> Virtual Infrastructure > VMs**, and click **Create VM**.

Fill out the following fields:

- **Name** - Buckets-Tools-*initials*
- **Description** - (Optional) Description for your VM.
- **vCPU(s)** - 1
- **Number of Cores per vCPU** - 1
- **Memory** - 2 GiB

- Select **+ Add New Disk**
    - **Type** - DISK
    - **Operation** - Clone from Image Service
    - **Image** - CentOS7.qcow2
    - Select **Add**

- Select **Add New NIC**
    - **VLAN Name** - Primary
    - Select **Add**

Click **Save** to create the VM.

Power On the VM.

Install Tools Software
......................

Lets install **iam_util** and **mc** so we can manage users and access policies.

Login to the VM vis ssh or Console session, and run the following commands:

- **Username** - root
- **password** - nutanix/4u

.. code-block:: bash

  curl http://10.4.64.11:8080/Users/nutanix_buckets/ea/builds/18112018/tools/iam_util -o iam_util

  curl http://10.4.64.11:8080/Users/nutanix_buckets/ea/builds/18112018/tools/mc -o mc

  yum install -y s3cmd

  yum install -y awscli

Now we are ready to move onto the labs.

Getting Familiar with the Nutanix Buckets Environment
+++++++++++++++++++++++++++++++++++++++++++++++++++++

This lab will familiarize you with the Nutanix Buckets environment. You will learn:

- What constitutes the Microservices Platform (MSP) and the services that make up Nutanix Buckets.
- How to deploy an object store

View the Object Storage Services
................................

Login into Prism Central hosting Buckets - \https://*Buckets-PC-IP:8443*/

Click **Explore > Nutanix Buckets**.

View the existing object store you are assigned and take a note of the name and IP.

Click **Explore > VMs**.

For a small deployment, you will see 8 VMs, each preceded with the name of the object store.

For example, if the name of the object store is **object-store-demo**, there will be a VM with the name **object-store-demo-envoy-1**.

We are using a small deployment, the deployed VMs are listed in the following table. Take note of the vCPU and Memory assigned to each.

+----------------+-------------------------------+---------------+-------------+
|  VM            |  Purpose                      |  vCPU / Cores |  Memory     |
+================+===============================+===============+=============+
|  k8s-master    |  Kubernetes Master            |  2 / 2        |  8 GiB      |
+----------------+-------------------------------+---------------+-------------+
|  k8s-worker-0  |  Object Controller            |  6 / 1        |  13.02 GiB  |
+----------------+-------------------------------+---------------+-------------+
|  k8s-worker-1  |  Object Controller            |  6 / 1        |  13.02  GiB |
+----------------+-------------------------------+---------------+-------------+
|  k8s-worker-2  |  Object Controller            |  6 / 1        |  13.02  GiB |
+----------------+-------------------------------+---------------+-------------+
|  envoy-1       |  Load Balancer                |  2 / 2        |  4 GiB      |
+----------------+-------------------------------+---------------+-------------+
|  etcd-0        |  Distributed metadata server  |  2 / 1        |  4 GiB      |
+----------------+-------------------------------+---------------+-------------+
|  etcd-1        |  Distributed metadata server  |  2 / 1        |  4 GiB      |
+----------------+-------------------------------+---------------+-------------+
|  etcd-2        |  Distributed metadata server  |  2 / 1        |  4 GiB      |
+----------------+-------------------------------+---------------+-------------+

Walk Through the Object Store Deployment
........................................

In this lab you will walk through the steps of creating an object store.

.. note::

  In the Tech Summit Buckets environment, you will **not** be able to actually deploy the object store, but you will be able to see the workflow and how simple it is for users to deploy an object store.

In *Buckets - Prism Central* > **Explore > Nutanix Buckets**.

Click **Create Object Store**.

.. figure:: images/buckets_01.png

Fill out the following fields:

- **Object Store Name** - oss-*initials*
- **Domain**  - ntnxlab.local
- **IP Address**  - Need designated IP?

.. figure:: images/buckets_02.png

.. note::

  In a live environment, the IP address you assign to the object store will be the IP that is used as your object store endpoint, for applications to connect to.

Click **Next**.

Next you will be able to configure the capacity of your object store.

The chosen option determines how many object controllers will be deployed and the size of each.

.. note::

  Note that although a storage capacity is defined here, it is not a hard limit, and the customer is limited only by their license and the storage capacity of the cluster.

Select the different options (Small, Medium, Large) and notice how the Resource numbers change.

Custom values are also allowed.

Select Small (10TiB), and click **Next**.

.. figure:: images/buckets_03.png

On the final screen, you will see the clusters managed by Prism Central and their corresponding networks.

.. note::

  Note that a user can easily see which of the clusters are licensed for encryption and the CPU, Memory, and Storage runways for each of the clusters.


Select the *TechSummit-Buckets* Cluster, and the *TechSummit-Buckets* Network.

Click **Deploy**

.. figure:: images/buckets_04.png

Walk through Bucket Creation and Policies
.........................................

Select the **oss**-*initials* object store you just created.

Click **Create Bucket**, and fill out the following fields: and give the bucket a name. You can optionally define versioning or lifecycle policies.

- **Name**  - my-bucket-*initials*
- **Enable Versioning** - Checked

Click **Create**.

.. figure:: images/buckets_05.png

If versioning is enabled, new versions can be uploaded of the same object for required changes, without losing the original data.

Lifecycle policies define how long to keep data in the system.

.. note::

  Note that if WORM is enabled on the bucket, this will supersede any lifecycle policy.

Once the bucket is created, it can be enabled with WORM (write once read many) for regulatory compliance.

Select the bucket you just created **my-bucket**-*initials*, and click **Configure WORM**.

.. note::

  In the EA version, the WORM UI is not yet fully functional, so you won’t be able to apply the WORM policy to your bucket.












Getting Engaged with the Product Team
+++++++++++++++++++++++++++++++++++++

+---------------------------------------------------------------------------------------------+
|  Buckets Product Contacts                                                                   |
+================================+============================================================+
|  Slack Channel                 |  #nutanix-buckets                                          |
+--------------------------------+------------------------------------------------------------+
|  Product Manager               |  Priyadarshi Prasad, priyadarshi@nutanix.com               |
+--------------------------------+------------------------------------------------------------+
|  Product Marketing Manager     |  Krishnan Badrinarayanan, krishnan.badrinaraya@nutanix.com |
+--------------------------------+------------------------------------------------------------+
|  Technical Marketing Engineer  |  Sharon Santana, sharon.santana@nutanix.com                |
+--------------------------------+------------------------------------------------------------+

Takeaways
+++++++++
