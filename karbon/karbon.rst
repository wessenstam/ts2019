.. _karbon:

--------------
Nutanix Karbon
--------------

Overview
++++++++

.. note::

  Estimated time to complete: **90 MINUTES**

Getting Engaged with the Product Team
.....................................

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

Pre-requirements
++++++++++++++++

To be able to run the lab you need to have the following available or installed


Create a Karbon Kubernetes Cluster
++++++++++++++++++++++++++++++++++

In this exercise you will create a production ready Kubernetes cluster with Nutanix Karbon.

Navigate to **Prism Central > Select the Three Dashes > Karbon** and ensure you see a ‘Karbon is successfully enabled’ notification.

Click the link to open the Karbon Console.

.. image:: images/karbon_create_cluster_0.png

Next click **+ Create Cluster**.

.. image:: images/karbon_create_cluster_2.png

Fill in the following:

**Name and Environment**

- **Name** - wordpress-*initialsLowerCase*
- **Cluster** - Leave Default selected
- **Kubernetes Version** - 1.10.3
- **Host OS Image** - centos

.. image:: images/karbon_create_cluster_3.png

Click **Next**

**Worker Configuration**

.. note::

  This defines the number of worker nodes that will run the Kubernetes pods.

Leave all defaults

.. image:: images/karbon_create_cluster_4.png

Click **Next**.

**Master Configuration**

.. note::

  This defines the number of master nodes that controls the Kubernetes cluster, and the number of etcd VMs, which manages the cluster state.

Leave all defaults.

.. image:: images/karbon_create_cluster_5.png

click **Next**.

**Network**

.. note::

  We use flannel as the network provider. More information on Flannel can be found here: https://github.com/coreos/flannel#flannel

- **Network Provider** - Flannel
- **VM Network** - Primary
- **Service CIDR** - Leave the default of 172.19.0.0/16
- **Pod CIDR** - Leave the default of 172.20.0.0/16

.. image:: images/karbon_create_cluster_6.png

Click **Next**

**Storage Class**

- **Storage Class Name** - default-storageclass-*initialsLowerCase*
- **Prism Element Cluster** - Leave default selected
- **Cluster Username** - admin
- **Cluster Password** - *HPOC Password*
- **Storage Container Name** - default-container-XXXXXXX
- **File System** - ext4

.. image:: images/karbon_create_cluster_7.png

Click **Create**

.. note::

  **Wait until the cluster has been created before proceeding**

.. image:: images/karbon_create_cluster_20.png

During the creation of the Kubernetes cluster there will have been created:

- VMs

.. image:: images/karbon_create_cluster_10.png

- Persistent Storage as VolumeGroup

.. image:: images/karbon_create_cluster_18.png

.. image:: images/karbon_create_cluster_19.png


Cluster properties
++++++++++++++++++

In the Karbon UI, click on your cluster "wordpress-*initialsLowerCase*"

.. image:: images/karbon_create_cluster_21.png

This will take you to the Summary page for your cluster.

.. image:: images/karbon_create_cluster_22.png

You can also click into the following to see specific information:

- Storage Classes

.. image:: images/karbon_create_cluster_23.png

- Volume's

.. image:: images/karbon_create_cluster_24.png

- Add-on's

.. image:: images/karbon_create_cluster_25.png

You now have a running Kubernetes Cluster called "wordpress-*initialsLowerCase*".

Set up Kubeconfig
+++++++++++++++++

In this task you will download your Karbon Kubernetes cluster’s kubeconfig file and apply that file to **kubectl** to enable you to control your Kubernetes cluster.

Navigate back to the Karbon UI.  If your session has timed out, log back in with your Prism Central credentials.

Select the cluster that you deployed, and click **Download kubeconfig**.

.. image:: images/karbon_deploy_application_1.png

Configure kubeconfig Using Mac
..............................

From Terminal, run the following commands to setup your **kubeconfig**:

.. code-block:: bash

  cd ~
  mkdir .kube
  cd .kube
  mv ~/Downloads/kubectl* config
  kubectl get nodes


Verify that the output of the last command shows 1 master node, and 3 worker nodes.

Configure kubeconfig Using Windows
..................................

From PowerShell, run the following commands to setup your **kubeconfig**:

.. code-block:: bash

  cd ~
  mkdir .kube
  cd .kube
  mv ~\Downloads\kubectl* config
  kubectl get nodes


Verify that the output of the last command shows 1 master node, and 3 worker nodes.

Use kubectl command
+++++++++++++++++++

Now that you have defined the kubeconfig file, you should be able to connect to the kubernetes cluster.


Cluster and client version
..........................

To see the version of the kubernetes client and server run:

.. code-block:: bash

	kubectl version

.. image:: images/karbon_deploy_application_5.png

Cluster info
............

To see the information of the kubernetes cluster run:.

.. code-block:: bash

	kubectl cluster-info

This will provide information on where the **Kubernetes Master** is running and the **KubeDNS URL**.

.. image:: images/karbon_deploy_application_6.png

Cluster nodes
.............

To see which master and worker nodes are in the kubernetes cluster run:

.. code-block:: bash

	kubectl get nodes

.. image:: images/karbon_deploy_application_7.png

Running pods
............

If you are interested in all the pods that are running after the installation of the kubernetes cluster run:

.. code-block:: bash

	kubectl get pods --all-namespaces

.. image:: images/karbon_deploy_application_8.png

Deploy Wordpress
++++++++++++++++

Now that you have seen the high level information of the kubernetes cluster it is time to deploy our Wordpress application.

Create a directory in the location you are in via the command line named **wordpress**, and change into that directory.

.. code-block:: bash

	mkdir wordpress

	cd wordpress

.. note::

	Kubernetes needs yaml files to create applications and their dependencies.
	You are going to download two yaml files and store them in the just created **wordpress** directory.
	Look at https://www.mirantis.com/blog/introduction-to-yaml-creating-a-kubernetes-deployment/ or at https://kubernetes.io/docs/concepts/workloads/controllers/deployment/ to get more information on yaml and kubernetes.

	** MAKE SURE YOU ARE IN THE WORDPRESS DIRECTORY BEFORE PROCEEDING!!!**

To download the needed yaml file for wordpress mysql deployment run the following command:

.. code-block:: bash

	wget https://kubernetes.io/examples/application/wordpress/mysql-deployment.yaml

.. image:: images/karbon_deploy_application_9.png

To download the needed yaml file for wordpress deployment run the following command:

.. code-block:: bash

	wget https://kubernetes.io/examples/application/wordpress/wordpress-deployment.yaml

.. image:: images/karbon_deploy_application_10.png

Now open the wordpress-deployment.yaml file with your preferred text editor.

.. note::

  Use **WordPad** on Windows for opening and editing **YAML** files.

  On Mac use **TextEdit** for opening and editing **YAML** files.

Change the line that shows: **type: LoadBalancer** under **spec:** and change ``LoadBalancer`` into ``NodePort``.

.. note::

	Reason for this change is that Karbon does not (yet) support LoadBalanced.

.. image:: images/karbon_deploy_application_12.png

**Change back** to the **kube** directory, and then run the following command to create the mysql password:

.. code-block:: bash

	kubectl create secret generic mysql-pass --from-literal=password=Nutanix/4u!

This should return:

.. code-block:: bash

	secret/mysql=pass created

.. image:: images/karbon_deploy_application_13.png

To check that the password has been created, run the following command:

.. code-block:: bash

	kubectl get secrets

This should show mysql-pass under NAME.

.. image:: images/karbon_deploy_application_14.png

Creating the MySQL database is done by running the following command:

.. code-block:: bash

	kubectl create -f wordpress\mysql-deployment.yaml

.. image:: images/karbon_deploy_application_15.png

This will also create persistent storage.

.. image:: images/karbon_deploy_application_16.png

This storage will also show up in the Karbon UI under **wordpress -> Volume**.

.. image:: images/karbon_deploy_application_17.png

You can now run the following command:

.. code-block:: bash

	kubectl get pods

It will show the wordpress-mysql pod running.

.. image:: images/karbon_deploy_application_18.png

To create the wordpress application, run the following command:

.. code-block:: bash

	kubectl create -f wordpress\wordpress-deployment.yaml

.. image:: images/karbon_deploy_application_19.png

This will also create persistent storage and a pod.

You can now run the following command:

.. code-block:: bash

	kubectl get pods

It will show both pods running.

Accessing Wordpress
+++++++++++++++++++

Our Wordpress with mysql application is now running.

Now we need to make a connection to the Wordpress UI to configure the application.

To get the IP address where the UI is running, we need to see what the worker nodes are on which the application is running.

Lets show a list of a Master and worker nodes, run the following command:

.. code-block:: bash

	kubectl get nodes

.. image:: images/karbon_deploy_application_23.png

To get the IP address of one of the workers, run the following command:

.. code-block:: bash

	kubectl describe nodes | Select-String -Pattern "InternalIP"

.. image:: images/karbon_deploy_application_24.png

Search in the information that is provided, a line that starts with **Address:** and note the **InternalIP**.

.. image:: images/karbon_deploy_application_25.png

As the application is running on an internal network inside the kubernetes cluster, we also need to have the service port on which the wordpress application is running.

To see which port number is used to for the Wordpress application, run the following command:

.. code-block:: bash

	kubectl get services wordpress

.. image:: images/karbon_deploy_application_26.png

Putting the IP address and the service port together we can open the Wordpress UI. In our example 172.16.0.36:32387.

In a new Browser tab, go to \http://172.16.0.36:32387

.. image:: images/karbon_deploy_application_27.png

In the initial configuration page, provide the parameters that are asked for.

At the end of the settings, click the **Log in** button and login to the Wordpress UI.

.. image:: images/karbon_deploy_application_29.png

Your Wordpress application with MySQL as the database is running and ready....

Deleting an application
+++++++++++++++++++++++

From the command line we will run the **kubectl** command to delete the created password, application, service and the persistent storage that we created earlier.

Run the following commands from the command line:

.. code-block:: bash
  :name: Delete_app

  kubectl delete mysql-pass

  kubectl delete deployment -p app=wordpress

  kubectl delete service -l app=wordpress

  kubectl delete pvc -l app=wordpress

You can check to see if the pods are deleted by running the following command:

.. code-block:: bash

  kubectl get pods

There should be no resources shown.

.. figure:: images/karbon_delete_application_1.png

In the Karbon UI, under the properties of the **wordpress-*initialsLowerCase* -> Volume**, there should only be one **Claim name** called **elasticsearch-xxx**.

The earlier created claims should be gone.

.. figure:: images/karbon_delete_application_2.png

Deleting the Wordpress Cluster
++++++++++++++++++++++++++++++

Deleting the cluster is almost as easy as deleting a Virtual Machine.

.. note::

  The following actions **can not** be undone!!! If running this in a production environment be very careful.

In the Karbon UI, select your "wordpress-*initialsLowerCase*" cluster.

Click on the **Delete Cluster** button.

.. figure:: images/karbon_delete_application_3.png

Accept the Warning message that pops up by clicking **Delete**.

.. figure:: images/karbon_delete_application_4.png

You have now deleted your Karbon Kubernetes cluster.

Takeaways
+++++++++

- Nutanix Karbon makes it very easy to create and manage kubernetes clusters
