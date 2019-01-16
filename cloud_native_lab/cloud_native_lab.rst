.. _cloud_native_lab:

------------------------
Nutanix Cloud Native Lab
------------------------

Overview
++++++++

.. note::

  Estimated time to complete: **1 HOUR**

  **Due to limited resources, this lab should be completed as a group.**

Traditional Enterprise Applications face a variety of deployment challenges for IT and developers; provisioning a database for a new application may need to pass through a DBA, your storage, network, and virtualization teams. There’s unnecessary complexity as a developer shouldn’t care on which server the application runs, or which LUN the data is stored on. In addition, increasing the capacity of an application is a manual and time intensive process; developer workstations likely have different code, packages, and libraries from production servers. These challenges reduce productivity, extend release cycles, and increase software defects.

The goal of this lab is to experience first-hand how Nutanix Cloud Native products solve these challenges via a series of exercises that walk through the deployment of a fully functional cloud native application, which leverages a Karbon based Kubernetes cluster, an Era DB, and Nutanix Buckets object storage, all of which you will get a chance to deploy, provision, and create respectively.

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

Click **Next**

**Storage Class**

- **Storage Class Name** - default-storageclass-*initialsLowerCase*
- **Prism Element Cluster** - Leave default selected
- **Cluster Username** - admin
- **Cluster Password** - *HPOC Password*
- **Storage Container Name** - default-container-XXXXXXX
- **File System** - ext4

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
    - **SSH Key** -

.. code-block:: bash

  ssh-rsa
  AAAAB3NzaC1yc2EAAAADAQABAAABAQDDoJlPj+ACPyHGm0f+FyTQPRt+m1H6JstyLtvFJUntDyF2/dqpcQ9QfKKw1QcjzGdSS8B6HrdOOjKZz42j01/YLWFy2YrDLQOHcNJi6XowCQ059C7bHehP5lqNN6bRIzdQnqGZGYi8iKYzUChMVusfsPd5ZZo0rHCAiCAP1yFqrcSmq83QNN1X8FZ1COoMB66vKyD2rEoeKz4lilEeWKyP4RLmkOc1eMYQNdyMOCNFFbKmC1nPJ+Mpxo1HfNR84R7WNl5oEaNQOORN+NaOzu5Bxim2hhJvU37J+504azZ1PCUiHiC0+zBw4JfeOKMvtInmkEZQEd3y4RrIHLXKB4Yb centos@nutanix.com

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

Click **Next**

**Time Machine**

- **Name** - Leave as the default.
- **SLA** - Leave as default of GOLD
- **Description** - Any description of your choice.
- **Schedule** - Leave defaults.

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

.. figure:: images/object-create-ovm.png

In the pop-up that appears, fill in the following and hit **Enter**:

- **Name** - oscarstatic-*initialsLowerCase*

.. note::

  Be sure to write down your entry here, as it will be used later in the lab for the django-jet/django-configmap.yaml file.

.. figure:: images/object-create-ovm-2.png

Ensure you see your newly created bucket in the list on the left column.

Set up Kubeconfig
+++++++++++++++++

In this task you will download your Karbon Kubernetes cluster’s kubeconfig file and apply that file to **kubectl** to enable you to control your Kubernetes cluster.

Navigate back to the Karbon UI.  If your session has timed out, log back in with your Prism Central credentials.

Select the cluster that you deployed, and click **Download kubeconfig**.

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

Configure your Kubernetes YAML files
++++++++++++++++++++++++++++++++++++

In this task you will download Kubernetes YAML files that define the application we’re about to deploy.

You will take a look at each of the individual YAML files, and make some minor modifications.

First download the YAML files zip, and extract the contents.

:download:`NutanixCloudNativeLab.zip <NutanixCloudNativeLab.zip>`

Once the download has completed, extract that contents.

You should see a new NutanixCloudNativeLab-master directory.

.. note::

  Use **WordPad** on Windows for opening and editing **YAML** files.

  On Mac use **TextEdit** for opening and editing **YAML** files.

Review buckets-secret.yaml File
...............................

Open and review the contents of the buckets-secrets.yaml file within the **buckets** directory.

The key part is the bottom section, where the base64 encoded access and secret access keys are located.
This allows our application read and write access to our bucket.

**No modifications are necessary**

Once you are done reviewing, close the file.

Review era-secret.yaml File
...........................

Open and review the contents of the era-secrets.yaml file within the **era** directory.

You should notice this looks very similar to the buckets-secrets.yaml.

**No modifications are necessary**

Once you are done reviewing, close the file.

Review era-service.yaml File
............................

In the Era UI, find and click on the DB you created earlier.

In the summary section, find and take note of the database host IP.

Open and review the contents of the era-service.yaml file within the **era** directory.

This file creates a Kubernetes Service of type **ExternalName**, which indicates that it is external from Kubernetes.

Change the value of the **ExternalName** key to match the IP we just copied.

Save and close the file.

Review django-configmap.yaml File
.................................

Open and review the contents of the django-configmap.yaml file within the **django-jet** directory.

This file sets various environment variables in our web application.

We need to change two values:

- **STATIC_BUCKET** -  oscarstatic-*initialsLowerCase*
- **DATABASE_NAME** - oscar_django_*initialsLowerCase*
- **S3_ENPOINT_URL** - https://Buckets-IP:7200/

Save and close the file.

Review django-deployment.yaml File
..................................

Open and review the contents of the django-deployment.yaml file within the **django-jet** directory.

**No modifications are necessary**

Please review the following:

- The **kind** is a Deployment, which is a Kubernetes Controller that defines a set of Pods.
- The **replicas** key indicates how many pods (which generally, but not always, contain a single container) to spin up.
- The **containers name, image**, and **ports** keys specify what we should name our pods once deployed, the image source of the container (stored on Docker Hub), and the port that the containers communicate on.
- The env section contains many entries that should look familiar:
    - Our Era database user and password, which is sourced from our **era-secrets.yaml** file (named postgres-credentials).
    - Our Era database host, which is sourced from our **era-service.yaml** file (named postgres-service).
    - Our Nutanix Buckets Object Storage access and secret access keys, which is sourced from our **buckets-secrets.yaml** file (named object-credentials).
-   The **envFrom** entry ties in the **django-configmap.yaml** from the previous step to set the necessary environment variables in our application to our runtime values.

Once you are done reviewing, close the file.

Review django-migration.yaml File
.................................

Open and review the contents of the django-migration.yaml file within the **django-jet** directory.

**No modifications are necessary**

This file should look very similar to the last.

The key difference being it is of kind Job.

Jobs create one or more pods to complete a task, and once that task is completed, the pods are cleaned up.

In our app, this task is to seed the Postgres database and Object storage with our sandbox data.

Without that, we would have an empty and boring application.

Once you are done reviewing, close the file.

Review django-service.yaml File
...............................

Open and review the contents of the django-service.yaml file within the **django-jet** directory.

**No modifications are necessary**

This creates a Kubernetes **Service**, of type **NodePort**, which means it exposes a port (8000) externally from the Kubernetes cluster.

Once we have a running application, this will be what allows us to access the app from a web browser.

Once you are done reviewing, close the file.

Running the Application
+++++++++++++++++++++++

In this section, we’ll deploy the application using **kubectl** commands, and then access the application via our web browser.

Deploy the Application
......................

In your Terminal or PowerShell window run the following commands from within the **NutanixCloudNativeLab-master** directory:

.. code-block:: bash

  kubectl apply -f era\

  kubectl apply -f buckets\

  kubectl apply -f django-jet\

Next run the following command to verify your pods are up and running:

.. code-block:: bash

  kubectl get pods

.. note::

  After a couple of minutes, assuming everything is working properly, you should see the **oscar-django-migrations-xxxxx** pod change status from **Running** to **Completed**

If this does not happen, you can troubleshoot the issue by running the following command (substituting in your unique 5 digit key instead of xxxxx):

.. code-block:: bash

  kubectl logs oscar-django-migrations-xxxxx

Accessing the Application
..........................

In your Terminal or PowerShell window run the following command two commands to get Node and Service information:

.. code-block:: bash

  kubectl describe nodes | Select-String -Pattern "InternalIP"

  kubectl get svc

Using this information, we can access our application by combining one of the Internal IPs and the 30000 port number of the **oscar-django-service**.

Run the following command:

.. code-block:: bash

  Start "http://<InternalIP>:3XXXX"

You should now be able to open a new browser tab and see the online store we created.

Getting Engaged with the Product Team
+++++++++++++++++++++++++++++++++++++

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

+---------------------------------------------------------------------------------------------+
|  Cloud Native Contacts                                                                      |
+================================+============================================================+
|  Technical Marketing Engineer  |  Michael Haigh, michael.haigh@nutanix.com                  |
+--------------------------------+------------------------------------------------------------+

Takeaways
+++++++++
