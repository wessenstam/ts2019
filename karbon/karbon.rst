.. _karbon:

--------------
Nutanix Karbon
--------------

*The estimated time to complete this lab is 60 minutes.*

.. raw:: html

  <iframe src="https://drive.google.com/file/d/1sU4_1GPVTNGJwNDoy0kB04r-vz4-9Thq/preview" width="720" height="480" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

Overview
++++++++

Nutanix Karbon is an on-prem turnkey curated enterprise-grade Kubernetes service offering that simplifies the provisioning, operations and lifecycle management of Kubernetes.

Karbon provides a consumer-grade experience for delivering Kubernetes on-prem providing huge savings on OpEx of dedicated DevOps or SRE teams to keep Kubernetes online, up to date or integrated with 3rd party components and tooling.

*<What is Kubernetes/containers? Why do people care about deploying applications using Kubernetes? What are the advantages? What problems does Karbon solve versus a DIY Kubernetes deployment? What about advantages of virtualized Kubernetes over baremetal? What does market adoption of Kubernetes look like? What are people using it for?>* (this could also be covered in the intro video)

**In this lab you will deploy a Kubernetes cluster using Karbon and then deploy multiple containers, referred to as Kubernetes pods, to run a sample application.**

Create a Karbon Kubernetes Cluster
++++++++++++++++++++++++++++++++++

In this exercise you will create a production ready Kubernetes cluster with Nutanix Karbon.

In **Prism Central**, select :fa:`bars` **> Services > Karbon**.

.. figure:: images/karbon_create_cluster_0.png

.. note::

  If Karbon has not already been enabled on your cluster, click the **Enable Karbon** button when prompted. Once clicked, the process should take approximately 2 minutes to complete. During this time the cluster is... *<What is it doing?>*

  .. figure:: images/2.png

Click the provided link to launch the **Karbon Console**.

.. note::

  If at any point your Karbon session times out, you can log in again using your Prism Central **admin** credentials.

To begin provisioning a Karbon cluster, click **+ Create Cluster**.

On the **Name and Environment** tab, fill out the following fields:

- **Name** - wordpress-*Initials*
- **Cluster** - Select *Your Nutanix cluster*
- **Kubernetes Version** - 1.10.3
- **Host OS Image** - centos

.. figure:: images/3.png

.. note::

  Your cluster has be pre-staged with a compatible CentOS image for use with Karbon.

  Karbon currently supports CentOS 7.5.1804 and Ubuntu 16.04 and requires that these images be downloaded directly from Nutanix.

  To stage another cluster with the supported CentOS image, add http://download.nutanix.com/karbon/0.8/acs-centos7.qcow2 as "acs-centos".

  To stage another cluster with the supported CentOS image, add http://download.nutanix.com/karbon/0.8/acs-ubuntu1604.qcow2 as "acs-ubuntu".

Click **Next**.

Next you will define the number of container host VMs and compute requirements. For the purposes of this exercise you will reduce the amount of memory consumed by default by each worker VM.

On the **Worker Configuration** tab, fill out the following fields:

- **Number of Workers** - 3 (Default)
- **Memory** - 4 GiB
- **Size** - 120 GiB (Default)
- **VCPU** - 4 (Default)

.. figure:: images/4.png

Click **Next**.

Next you will define the compute requirements for the master node which controls the Kubernetes cluster, as well as the number and compute requirements of the etcd nodes, which manage cluster state.

On the **Master Configuration** tab, fill out the following fields:

- **Master Resources > Memory** - 4 GiB (Default)
- **Master Resources > Size** - 120 GiB (Default)
- **Master Resources > VCPU** - 2 (Default)
- **etcd Resources > Number of VMs** - 3 (Default)
- **etcd Resources > Memory** - 4 GiB
- **etcd Resources > Size** - 40GiB (Default)
- **etcd Resources > VCPU** - 2 (Default)

.. figure:: images/5.png

Click **Next**.

Next you will configure the networking for both the host VMs and pods. Karbon utilizes `Flannel <https://github.com/coreos/flannel#flannel>`_ to provide layer 3 IPv4 network between multiple nodes within the Karbon cluster.

Platforms like Kubernetes assume that each pod (container) has a unique, routable IP inside the cluster. The advantage of this model is that it removes the port mapping complexities that come from sharing a single host IP.

The **Service CIDR** defines the network range on which services (like etcd) are exposed. The **Pod CIDR** defines the network range used to IP pods. The default configuration allows for a maximum of 256 nodes with up to 256 pods per node.

On the **Network** tab, fill out the following fields:

- **Network Provider** - Flannel (Default)
- **VM Network** - Primary (Default)
- **Service CIDR** - 172.19.0.0/16 (Default)
- **Pod CIDR** - 172.20.0.0/16 (Default)

.. figure:: images/6.png

Click **Next**.

On the **Storage Class** tab, fill out the following fields:

- **Storage Class Name** - default-storageclass-*xyz*
- **Prism Element Cluster** - *Your Nutanix cluster*
- **Nutanix Cluster Username** - admin
- **Nutanix Cluster Password** - techX2019!
- **Storage Container Name** - Default
- **File System** - ext4 (Default)

.. figure:: images/7.png

Click **Create**.

Deployment of the cluster should take approximately X minutes. During this time, Karbon is... *<What is it doing?>*

Filtering VMs for **wordpress-**\ *Initials* in **Prism Central** will display the master, etcd, and worker VMs provisioned by Karbon.

.. figure:: images/8.png

In **Prism Element > Storage > Volume Group**, Karbon has created the **pvc-...** Volume Group, used as persistent storage for logging. Karbon leverages the Nutanix Kubernetes Volume Plug-In to present Nutanix Volumes to Kubernetes pods via iSCSI. This allows containers to take advantage of native Nutanix storage capabilities such as thin provisioning, zero suppression, compression, and more.

.. figure:: images/9.png

The Karbon cluster has finished provisioning when the **Status** of the cluster is **Running**.

.. figure:: images/10.png

Click on your cluster name (**wordpress-**\ *Initials*) to access the Summary Page for your cluster.

.. figure:: images/11.png

Explore this view and note the ability to create and add additional storage classes and persistent storage volumes to the cluster. Additional persistent storage volumes could be leveraged for use cases such as containerized databases.

Under **Add-on**, note that Kibana has been automatically deployed and configured as part of the Karbon cluster to provide logging services.

In approximately 10 minutes, you have deployed a production-ready Kubernetes cluster with *<X, Y, and Z>* services.

Getting Started with Kubectl
++++++++++++++++++++++++++++

`Kubectl <https://kubernetes.io/docs/reference/kubectl/overview/>`_ is the  command line interface for running commands against Kubernetes clusters. `Kubeconfig <https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/>`_ files contain information about clusters, users, namespaces, and authentication. The ``kubectl`` tool uses **kubeconfig** files to find and communicate with a Kubernetes cluster.

In this exercise you will use ``kubectl`` to perform basic operations against your newly provisioned Karbon cluster.

Using your **Tools VM**, browse to **Prism Central** and open **Karbon**.

Select your **wordpress-**\ *Initials* cluster and click **Download kubeconfig**.

.. figure:: images/12.png

Using your **Tools VM**, open **PowerShell**.

.. note::

  If installed, you can also use a local instance of ``kubectl``. The Tools VM is provided to ensure a consistent experience.

  Instructions for setting up ``kubectl`` in Windows and macOS can be found `here <https://kubernetes.io/docs/tasks/tools/install-kubectl/>`_.

From PowerShell, run the following commands to configure ``kubectl``:

.. code-block:: PowerShell

  cd ~
  mkdir .kube
  cd .kube
  mv ~\Downloads\kubectl* ~\.kube\config
  kubectl get nodes

.. note::

  By default, ``kubectl`` looks like a file named ``config`` in the ``~/.kube`` directory. Other locations can be specified using environment variables or by setting the ``--kubeconfig`` flag.

Verify that the output of the last command shows 1 master node and 3 worker nodes as **Ready**.

Next you will check the versions of the Kubernetes client and server by running the following command:

.. code-block:: PowerShell

	kubectl version

Deploying an Application
++++++++++++++++++++++++

Now that you have successfully run commands against your Kubernetes cluster using ``kubectl``, you are now ready to deploy an application. In this exercise you will be deploying the popular open-source content management system used for websites and blogs, Wordpress.

Using your **Tools VM**, open **PowerShell** and create a **wordpress** directory using the following command:

.. code-block:: PowerShell

	mkdir ~\wordpress
	cd ~\wordpress

Kubernetes depends on YAML files to provision applications and define dependencies. YAML files are a human-readable text-based format for specifying configuration information. This application requires two YAML files to be stored in the **wordpress** directory.

.. note::

  To learn more about Kubernetes application deployment and YAML files, click `here <https://www.mirantis.com/blog/introduction-to-yaml-creating-a-kubernetes-deployment/>`_.

Using your **Tools VM** browser, download the following YAML files for Wordpress and the MySQL deployment used by Wordpress:

- https://kubernetes.io/examples/application/wordpress/mysql-deployment.yaml
- https://kubernetes.io/examples/application/wordpress/wordpress-deployment.yaml

Move both files to the **wordpress** directory using the following command:

.. code-block:: PowerShell

	mv ~\Downloads\*.yaml
	cd ~\wordpress\

Open the **wordpress-deployment.yaml** file with your preferred text editor.

.. note::

  **Sublime Text** has been pre-installed on the **Tools VM**.

.. figure:: images/13.png

Under **spec: > type:**, change the value from **LoadBalancer** to **NodePort** and save the file. This change is required as Karbon does not yet support LoadBalancer.

.. figure:: images/14.png

.. note::

  You can learn more about Kubernetes publishing service types `here <https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types>`_.

Next you will need to define a **secret** to be used as the MySQL password. Run the following command to create the secret:

.. code-block:: bash

	kubectl create secret generic mysql-pass --from-literal=password=Nutanix/4u!

Verify the command returns ``secret/mysql-pass created``.

You can also verify the secret has been created by running the following command:

.. code-block:: bash

	kubectl get secrets

Verify **mysql-pass** appears in the **NAME** column.

You will now provision the MySQL database by running the following command:

.. code-block:: bash

	kubectl create -f mysql-deployment.yaml

.. figure:: images/15.png

In addition to the MySQL service, the **mysql-deployment.yaml** also specifies that a persistent volume be created as part of the deployment. You can get additional details about the volume by running:

.. code-block:: bash

	kubectl get pvc

You will note that the **STORAGECLASS** matches the **default-storageclass**\ *Initials* provisioned by Karbon.

The volume also appears in **Karbon** under **wordpress-**\ *Initials* **> Volume**.

.. figure:: images/16.png

To view all running pods on the cluster, which should currently only be your Wordpress MySQL database, run the following command:

.. code-block:: bash

	kubectl get pods

To complete the application, deploy Wordpress by running the following command:

.. code-block:: bash

	kubectl create -f wordpress-deployment.yaml

Verify both pods are displayed as **Running** using ``kubectl get pods``.

Accessing Wordpress
+++++++++++++++++++

You have confirmed the Wordpress application and its MySQL database are running. Configuration of Wordpress is done via web interface, but to access the web interface you must first determine the IP addresses of our worker VMs and the port on which the pod is running.

The IP addresses of all cluster VMs is returned by the ``kubectl describe nodes`` command. You can run this and search for the **InternalIP** of any of your **worker** VMs, or run the following command to return only the hostnames and IP addresses:

.. code-block:: PowerShell

	kubectl describe nodes | Select-String -Pattern "Hostname:","InternalIP"

.. figure:: images/17.png

To determine the port number of the Wordpress application, run the following command and note the TCP port mapped to port 80:

.. code-block:: bash

	kubectl get services wordpress

.. figure:: images/18.png

Open \http://*WORKER-VM-IP:WORDPRESS SERVICE PORT*/ in a new browser tab to access to Wordpress installation.

.. note::

  In the example shown, you would browse to http://10.21.78.72:23160. You environment will have a different IP and port.

.. figure:: images/19.png

Click **Continue** and fill out the following fields:

- **Site Title** - Karbon Blog
- **Username** - admin
- **Password** - nutanix/4u
- **Your Email** - noreply@nutanix.com

Click **Install Wordpress**.

After setup completes (a few seconds), click **Log In** and provide the credentials just configured.

Congratulations! Your Wordpress application and MySQL database setup is complete.

.. figure:: images/20.png

Exploring Logging & Visualization
+++++++++++++++++++++++++++++++++

*<Description of Karbon plug-in architecture>*

Out of the box, Karbon deploys `Elasticsearch <https://github.com/elastic/elasticsearch>`_ and `Kibana <https://github.com/elastic/kibana>`_ to store, search, and visualize logging data for your Kubernetes environment.

*<What's a simple example we can do to illustrate the usefulness of including Kibana?>*

Coming Soon!
++++++++++++

<What are other things people can look forward to in the Karbon GA? Scaling out worker VMs? Anything else? How do these expand use cases or increase value/solve problems?>

Takeaways
+++++++++

What are the key things you should know about **Nutanix Karbon**?

- Karbon is included in all AOS software editions.

- Leveraging Karbon, developers can enjoy the native Kubernetes experience that is delivered fast while all complexities of infrastructure are abstracted with no additional costs.

- Karbon enables enterprises to provide a private-cloud Kubernetes solution with the simplicity and performance of public clouds.

- Karbon is part of a complete Cloud Native solution from Nutanix including storage (Volumes/Buckets/Files), database automation (Era), and enhanced monitoring (Epoch).

Getting Connected
+++++++++++++++++

Have a question about **Nutanix Karbon**? Please reach out to the resources below:

+---------------------------------------------------------------------------------+
|  Karbon Product Contacts                                                        |
+================================+================================================+
|  Slack Channel                 |  #karbon                                       |
+--------------------------------+------------------------------------------------+
|  Product Manager               |  Denis Guyadeen, dguyadeen@nutanix.com         |
+--------------------------------+------------------------------------------------+
|  Product Marketing Manager     |  Maryam Sanglaji, maryam.sanglaji@nutanix.com  |
+--------------------------------+------------------------------------------------+
|  Technical Marketing Engineer  |  Dwayne Lessner, dwayne@nutanix.com            |
+--------------------------------+------------------------------------------------+
