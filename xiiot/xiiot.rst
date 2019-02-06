.. _xi_iot:

------
Xi IoT
------

*The estimated time to complete this lab is 60 minutes.*

.. raw:: html

  <iframe src="https://drive.google.com/file/d/1sU4_1GPVTNGJwNDoy0kB04r-vz4-9Thq/preview" width="720" height="480" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

Overview
++++++++

The Nutanix Xi IoT platform delivers local compute and AI for IoT edge devices, converging the edge and cloud into one seamless data processing platform. The Xi IoT platform eliminates complexity, accelerates deployments, and elevates developers to focus on the business logic powering IoT applications and services. Now developers can use a low-code development platform to create application software via APIs instead of arduous programming methods.

**In this lab you’ll deploy an application called “Facefeed” using the Xi IoT SaaS control plane. The application and its data pipelines are deployed to a virtual Xi Edge device running as a virtual machine on your local cluster. This application ingests an RTSP video stream and uses machine learning to detect known faces.**

Accessing Xi IoT
++++++++++++++++

Open https://iot.nutanix.com/ in your browser to access to Xi IoT SaaS control plane.

Click **Log in with My Nutanix** and provide your **my.nutanix.com** credentials.

.. note::

  These are the same credentials used to access the Nutanix Support Portal.

At this point you should have a dashboard with a default user (you), project, and category.

.. figure:: images/1.png

Lab Setup
+++++++++

In this exercise you will deploy the Xi IoT Edge OS appliance. <Any worthwhile background on Edge OS? Virtual only or baremetal too?>

In **Prism Central**, select :fa:`bars` **> Virtual Infrastructure > VMs**.

.. figure:: images/2.png

Click **Create VM**.

Fill out the following fields:

- **Name** - *Initials*\ -Edge
- **Description** - (Optional) Description for your VM.
- **vCPU(s)** - 8
- **Number of Cores per vCPU** - 1
- **Memory** - 20 GiB

- Select **+ Add New Disk**
    - **Type** - DISK
    - **Operation** - Clone from Image Service
    - **Image** - XiIoTEdge.qcow2
    - Select **Add**

- Select **Add New NIC**
    - **VLAN Name** - Secondary
    - Select **Add**

Click **Save** to create the VM.

Select your Edge VM and click **Power On**.

Once the VM has booted, open \https://*EDGE-VM-IP:8080*/v1/sn in a new browser tab to determine the serial number of the appliance. Record this value as it will be required to onboard the appliance.

Return to the **Xi IoT** management portal and select :fa:`bars` **> Infrastructure > Edges > + Add Edge**.

Fill out the following fields and click **Add** to begin onboarding:

- **Name** - *initials*-edge
- **Serial Number** - *Copy/paste from previous step, must be in ALL CAPS*
- **IP Address** - *Edge VM IP Address*
- **Subnet Mask** - 255.255.255.128
- **Gateway** - 10.XX.YY.129
- **Category** - Leave blank for now

.. figure:: images/3.png

The dot next to the Xi Edge's **Name** indicates status. A grey dot indicated the Edge is either powered off or not connected. A green dot indicates the Edge is powered on and connected.

.. note::

  The dashboard can take a few minutes to update once the Edge is added. Wait approximately 3 minutes then refresh the page. You should expect the status of the Edge to appear green.

.. figure:: images/4.png

Defining Categories
+++++++++++++++++++

<Why do we define categories>

From the **Xi IoT** management portal, select :fa:`bars` **> Infrastructure > Categories**.

Click on the default **Data Type** to explore the default values. Data Type can be used to categorize and sort that forms of data processed by an Edge.

Return to **Categories** and click **+ Create** to add your own, custom category.

Fill out the following fields and click **Create**:

- **Name** - Camera Type
- **Purpose** - Identifies the intended use of the camera
- Select **+ Add Value**
- **Value** - Facial Recognition

.. figure:: images/5.png

Creating a Project
++++++++++++++++++

<In Xi IoT, projects are used for...>

From the **Xi IoT** management portal, select :fa:`bars` **> Projects > + Create**.

FIll out the following fields and click **Next**:

- **Name** - Facefeed
- **Description** - Optional
- Select **+ Add Users**
- Select your user name and click **Done**

.. figure:: images/6.png

Click **+ Add Edges** and select your Edge.

<Cloud Profiles are...> This can be left blank.

<Container Registry Selection is...> This can be left blank.

.. figure:: images/7.png

Click **Create**.

Staging Source Data
+++++++++++++++++++

The lab depends on the availability of of a video stream from which to identify faces. Xi IoT supports direct ingest of RTSP and GigE Vision video streaming protocols (as well as `MQTT <http://mqtt.org/>`_ messaging protocol commonly used by IoT sensor devices).

Outside of a lab environment, these video streams would likely run external to the Edge device. However, for the purposes of the lab, we can leverage Xi IoT's **Application** construct to deploy a pre-configured `RTSP video stream <https://hub.docker.com/r/xiiot/facefeed-rtsp-sample>`_ running directly on your Edge VM.

<What are Xi IoT applications? Where do they live?...>

Deploying RTSP Sample Feed Application
......................................

From the **Xi IoT** management portal, select :fa:`bars` **> Projects > Facefeed > Apps & Data > Applications > + Create Application**.

Fill out the following fields and click **Next**:

- **Name** - facefeed-rtsp-samples
- **Description** - Optional
- Select **+ Add Edges**
- Select your *initials*\ **-edge** Edge

.. figure:: images/13.png

Click **Choose File** and select ``xi-iot-master\projects\facefeed\applications\facefeed-rtsp-sample.yaml``.

.. figure:: images/14.png

Note the environmental variables and values defined in the YAML file, namely **RTSP_USERNAME** and **RTSP_PASSWORD**.

Click **Create**.

Click **facefeed-rtsp-sample** to see Summary of the application performance, alerts, deployments, etc. Edge Deployments should list "1 of 1 Running" on your Edge device once the application has successfully launched.

.. figure:: images/15.png

.. note::

  Deployment of the application may take a few minutes as the ~200MB container needs to be downloaded from the Internet to the Edge VM.

Adding RTSP Sample Feed as a Data Source
........................................

From the **Xi IoT** management portal, select :fa:`bars` **> Infrastructure > Data Sources > + Add Data Source**.

Fill out the following fields and click **Next**:

- **Type** - Sensor
- **Name** - rtsp-sample-feed
- **Associated Edge** - *initials*-edge
- **Protocol** - RTSP
- **Authentication Type** - Username and Password
- **IP Address** - *Edge VM IP Address*
- **Username** - *Found in facefeed-rtsp-sample.yaml*
- **Password** - *Found in facefeed-rtsp-sample.yaml*

.. figure:: images/16.png

Next you will define what data is extracted from the source, in this case, we require the specific address used to host the stream.

Click **Add New Field** and fill out the following fields:

- **Name** - VideoFeed
- **RTSP URL** - live.sdp

.. note::

  The full RTSP URL is the address where the stream can be accessed, and may vary depending on camera/configuration. You can use a media player such as `VLC <https://www.videolan.org/vlc/>`_ that supports RTSP streams to access the video stream.

  .. figure:: images/19.png

Click :fa:`check` to add the data extraction field.

.. figure:: images/17.png

Click **Next**.

Finally you will assign the category attributes which will be used to identify the sample feed as the data source for the facial recognition engine you will build in later exercises.

From the **Attribute** drop down menu, select **Camera Type : Facial Recognition**.

.. figure:: images/18.png

Click **Add**.

Deploying Functions
+++++++++++++++++++

<Xi IoT Functions are...>

The Facefeed application utilizes five Functions within two Data Pipelines to transform the incoming data (video feed)and draw inference (Face IDs) to identify faces. For convenience, these pre-made functions are available on GitHub:

- **aggregatefeed.py** - <brief explanation of what these do>
- **face_register.py** -
- **facematch.py** -
- **facerecognition.py** -
- **raw_to_jpeg.py** -

Open https://github.com/nutanix/xi-iot in a new browser tab and click **Clone or download > Download ZIP**.

Extract the .zip file to a directory.

From the **Xi IoT** management portal, select :fa:`bars` **> Projects > Facefeed > Apps & Data > Functions > + Add Function**.

Fill out the following fields to create the first function:

- **Name** - aggregatefeed
- **Description** - Optional
- **Project** - Facefeed
- **Language** - Python
- **Runtime Environment** - Tensorflow Python

.. figure:: images/8.png

<Xi Edge OS supports the following languages and runtimes... is there a reference link for this? What's the advantage of supporting multiple languages/environments?>

Click **Next**.

Click **Choose File** and select ``xi-iot-master\projects\facefeed\functions\aggregatefeed.py``.

.. figure:: images/9.png

Click **Create**.

Repeat these steps to add the remaining 4 functions. The **Name** should follow the script name (without .py).

Once completed, your environment should match the image below:

.. figure:: images/10.png

Deploying Data Pipelines
++++++++++++++++++++++++

Data Pipelines in Xi IoT allow you to transform data by injecting your own code. In this exercise, we will use Data Pipelines to transform frames (from the video feed) into Face IDs (by using machine learning).

Data Pipeline 1 - faceregister
..............................

<This Data Pipeline...>

From the **Xi IoT** management portal, select :fa:`bars` **> Projects > Facefeed > Apps & Data > Data Pipelines > + Create Data Pipeline**.

Select the **Facefeed** project and click **Next**.

Fill out the following fields to build the pipeline:

.. note::

  Use the exact **Pipeline** and **Endpoint** Names used in the lab guide, as the Endpoint name is used as the name of the Elasticsearch index on the edge. The application that you will deploy to leverage these pipelines is hardcoded to look for these specific index names within the local Elasticsearch instance.

- **Data Pipeline Name** - faceregister
- Select **+ Add Data Source > Data Source**
- **Category** - Camera Type
- **Value** - Face Registration
- Select **+ Add Function > facerecognition**
- Select :fa:`plus-circle` to add an additional function
- Select **face_register**
- Select **+ Add Destination > Edge**
- **Endpoint Type** - Elasticsearch
- **Endpoint Name** - datastream-faceregister

.. figure:: images/11.png

Click **Create**.

Data Pipeline 2 - facerecognitionlivefeed
..............................

This Data Pipeline will source the frames from a local webcam or uploaded image (using a containerized UI application you’ll deploy), apply a TensorFlow machine learning model to detect faces, calculate a unique Face ID, and persist the data in the local Elasticsearch instance running on your edge.

Click **+ Create** to define your next Data Pipeline.

Select the **Facefeed** project and click **Next**.

Fill out the following fields to build the pipeline:

.. note::

  Use the exact **Pipeline** and **Endpoint** Names used in the lab guide.

- **Data Pipeline Name** - facerecognitionlivefeed
- Select **+ Add Data Source > Data Source**
- **Category** - Camera Type
- **Value** - Facial Recognition
- Select **+ Add Function > raw_to_jpeg**
- Select **Enable Sampling Interval** and keep the default 1s interval
- Select :fa:`plus-circle` to add an additional function
- Select **facerecognition**
- Select :fa:`plus-circle` to add an additional function
- Select **facematch**
- Select :fa:`plus-circle` to add an additional function
- Select **aggregatefeed**
- Select **+ Add Destination > Edge**
- **Endpoint Type** - Elasticsearch
- **Endpoint Name** - datastream-facerecognitionlivefeed

.. figure:: images/12.png

Click **Create**.

<More info on alternate endpoint types and destinations,. what's the cloud tie in? alternate use cases or scenarios?>

<What is happening at this point? The data pipelines are immediately active, but the facial recognition pipeline does not have registered faces for which to search...>

Deploying Facefeed
++++++++++++++++++

So far you have deployed a data source, functions for processing that data, and pipelines to tie the functions together and direct output back to our Edge VM. The final step is to deploy the Facefeed application.

Like the sample RTSP stream, Facefeed is a containerized application described by a YAML file provided in the Git repository. It provides the GUI used to upload images to be analyzed by the **faceregister** pipeline, as well as a log of all recognized and unrecognized faces output by the **facerecognitionlivefeed** pipeline.

From the **Xi IoT** management portal, select :fa:`bars` **> Projects > Facefeed > Apps & Data > Applications > + Create**.

Fill out the following fields and click **Next**:

- **Name** - facefeedui
- **Description** - Optional
- Select **+ Add Edges**
- Select your *initials*\ **-edge** Edge

Click **Choose File** and select ``xi-iot-master\projects\facefeed\applications\facefeed.yaml``.

Note the host port that will be used to access the application.

Click **Create**.

Click **facefeed** and monitor the deployment status until it reaches **1 of 1 Running**.

Open \https://*EDGE-VM-IP:8888*/ in a new browser tab and log into Facefeed using the default credentials:

- **Username** - demo
- **Password** - facefeed

Download the following linked images and add the users to the Registered Faces database:

:download:`Maurice Moss <images/moss.jpg>`:
  - **Designation** - Administrator
  - **Department** - IT
  - **Employee ID** - 1738WUH

:download:`Jen Barber <images/jen.jpg>`:
  - **Designation** - Supervisor
  - **Department** - IT
  - **Employee ID** - 8675309

.. figure:: images/20.png

.. note::

  If the **Add to Database** button spins and stops without adding an entry to the **List of Registered Faces**, validate that the **Endpoint Name** of the **faceregister** data pipeline is accurate.

Once the desired faces have been registered, click **Go to application >** to access the log of known and unknown faces.

.. figure:: images/21.png

Return to the **Dashboard** for the summary view of both projects and infrastructure.

Congratulations! You've successfully deployed a facial recognition application to your edge from Xi IoT. This base application could be modified for use in retail, banking, municipalities and more. Xi IoT would then make it simple to manage the deployment and monitoring of both the edge appliances as well as the applications and data residing on them.

<Can we name some other app ideas that would be use cases for Xi IoT?>

Takeaways
+++++++++

What are the key things you should know about **Nutanix Xi IoT**?

- Stuff

- Goes

- Here

Getting Connected
+++++++++++++++++

Have a question about **Nutanix Xi IoT**? Please reach out to the resources below:

+---------------------------------------------------------------------------------+
|  Xi IoT Product Contacts                                                        |
+================================+================================================+
|  Slack Channel                 |                                                |
+--------------------------------+------------------------------------------------+
|  Product Manager               |                                                |
+--------------------------------+------------------------------------------------+
|  Product Marketing Manager     |                                                |
+--------------------------------+------------------------------------------------+
|  Technical Marketing Engineer  |                                                |
+--------------------------------+------------------------------------------------+
|  Solutions Architect           |  Brennan Conley, brennan.conley@nutanix.com    |
+--------------------------------+------------------------------------------------+
|  SME                           |                                                |
+--------------------------------+------------------------------------------------+
|  SME                           |                                                |
+--------------------------------+------------------------------------------------+
