.. _buckets:

---------------
Nutanix Buckets
---------------

*The estimated time to complete this lab is 60 minutes.*

.. raw:: html

  <iframe src="https://drive.google.com/file/d/1sU4_1GPVTNGJwNDoy0kB04r-vz4-9Thq/preview" width="720" height="480" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

Overview
++++++++

Data is growing faster than ever before, and much of the new data generated every second is unstructured. Video, backups, images, and e-mail archives are all examples of unstructured data that can cause issues at scale using traditional file and block storage solutions.

Unlike file or block storage, object storage is a data storage architecture designed for unstructured data at the petabyte scale. Object storage manages data as objects, where each object contains the data itself, a variable amount of metadata, and a globally unique identifier. There is no filesystem overhead as there is in block and file storage, so it can be easily scaled out at a global level.

Nutanix Buckets is an S3-compatible object storage solution that leverages the underlying Nutanix storage fabric which allows it to benefit from features such as encryption, compression, and erasure coding (EC-X).

Buckets allows users to store petabytes of unstructured data on the Nutanix platform, with support for features such as WORM (write once, read many) and object versioning that are required for regulatory compliance, and easy integration with 3rd party backup software and S3-compatible applications.

**What are the use cases for Nutanix Buckets?**

- DevOps
    - Single global namespace for multi-geography collaboration for teams spread around the world
    - S3 support
    - Time-to-first-byte of 10ms or less
- Long Term Data Retention
    - WORM compliance
    - Object versioning
    - Lifecycle policies
- Backup Target
    - Support for HYCU and Commvault at GA, with other vendors on the roadmap.
    - Ability to support multiple backup clients simultaneously.
    - Ability to handle really small and really large backup files simultaneously with a key-value store based metadata structure and multi-part upload capabilities.

**In this lab, you will walk through a Buckets object store deployment and learn how to create, access, and manage buckets using a popular file transfer application and programmatically via Python.**

Lab Setup
+++++++++

This lab requires BOTH the Windows-ToolsVM and the Linux-ToolsVM.

If you have not yet deployed these VMs, see the steps linked below before proceeding with the lab.

:ref:`windows_tools_vm`

:ref:`linux_tools_vm`


Getting Familiar with Object Storage
++++++++++++++++++++++++++++++++++++

An object store is a repository for storing objects. Objects are stored in a flat hierarchy and made up of only 3 attributes - an unique key or identifier, the data itself, and an expandable amount of metadata.  An object store is a single global namespace on which buckets can be created. A bucket can be thought of as similar to a folder in a file storage environment. However, object storage and file storage are very different. Here are some ways object storage and file storage differ.

.. figure:: images/buckets_00.png

Getting Familiar with the Nutanix Buckets Environment
+++++++++++++++++++++++++++++++++++++++++++++++++++++

This exercise will familiarize you with the Nutanix Buckets environment. You will learn:

- What constitutes the Microservices Platform (MSP) and the services that make up Nutanix Buckets.
- How to deploy an object store

.. warning::

  At the time of development, Buckets is still pre-GA and has been deployed to a dedicated Nutanix cluster running non-GA AOS/Prism Central. This environment will be shared by all attendees completing this lab. Please be respectful.

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
|  k8s-worker-0  |  Kubernetes Worker            |  6 / 1        |  13.02 GiB  |
+----------------+-------------------------------+---------------+-------------+
|  k8s-worker-1  |  Kubernetes Worker            |  6 / 1        |  13.02  GiB |
+----------------+-------------------------------+---------------+-------------+
|  k8s-worker-2  |  Kubernetes Worker            |  6 / 1        |  13.02  GiB |
+----------------+-------------------------------+---------------+-------------+
|  envoy-1       |  Load Balancer / Endpoint     |  2 / 2        |  4 GiB      |
+----------------+-------------------------------+---------------+-------------+
|  etcd-0        |  Kubernetes Metadata          |  2 / 1        |  4 GiB      |
+----------------+-------------------------------+---------------+-------------+
|  etcd-1        |  Kubernetes Metadata          |  2 / 1        |  4 GiB      |
+----------------+-------------------------------+---------------+-------------+
|  etcd-2        |  Kubernetes Metadata          |  2 / 1        |  4 GiB      |
+----------------+-------------------------------+---------------+-------------+

All of these VMs are deployed by the Microservices Platform which is built on Kubernetes technology. The service that controls the MSP runs on Prism Central. Note that the VM layout will change in GA - some services (such as etcd) which are currently running as VMs will become containerized and be built into the worker VMs themselves.

The envoy VM is the load balancer and endpoint. The IP address of this VM is the IP used by clients to access the object store. It is the first point of entry for an object request (for example, an S3 GET or PUT). It then forwards this request to one of the worker VMs (specifically, the S3 adapter service running as part of the object-controller pod).

The master VM is the Kubernetes master, which provides the control plane for the Kubernetes cluster. In GA the architecture is moving to a multi-master format, and will be distributed across the worker nodes.

The worker VMs run the object store components. This includes:

- S3 adapter (minio-based) - this translates the S3 language into our internal language.
- Object controller - this handles all the I/O. Think of it as like Stargate in AOS.
- Metadata service - this handles the metadata for the object storage cluster. Think of it as like Medusa/Cassandra in AOS.
- Atlas service - this handles garbage collection. Think of it as like Curator in AOS.
- UI gateway - this is the endpoint for all UI requests, handles bucket management, stats display, user management interface, etc.
- Zookeeper - this manages the configuration for the object storage cluster.
- IAM service - handles user authentication for accessing buckets.

The etcd VMs are a Kubernetes-level distributed key-value store. This stores and replicates the Kubernetes cluster level metadata, including networks, pod names & ID numbers, storage volumes, etc. As mentioned before, these services will be containerized in GA and will be running within the worker VMs.

.. note::

  In GA, the VM layout will be drastically different, consisting of simply 3 or more Service VMs (which will encompass everything currently in the worker VMs, plus etcd and the Kubernetes master) and 1 or more load balancer (envoy) VMs.

Walk Through the Object Store Deployment
........................................

In this exercise you will walk through the steps of creating an Object Store.

.. note::

  In many use cases only a single object store is required. If global namespace isolation is required, for example a Service Provider is providing object storage to multiple customers from the same infrastructure, then multiple object stores can be created.

.. note::

  In the Tech Summit Buckets environment, you will **not** be able to actually deploy the object store, but you will be able to see the workflow and how simple it is for users to deploy an object store.

In **Prism Central > Explore > Nutanix Buckets**, click **Create Object Store**.

.. figure:: images/buckets_01.png

Fill out the following fields:

- **Object Store Name** - *initials*-oss
- **Domain**  - ntnxlab.local
- **IP Address**  - 1.1.1.1

.. figure:: images/buckets_02.png

.. note::

  In a live environment, the IP address you assign to the Object Store will be the endpoint IP to which applications will connect.

Click **Next**.

Next you will be able to configure the capacity of your object store.

The chosen option determines how many object controllers will be deployed and the size of each.

.. note::

  Note that although a storage capacity is defined here, it is not a hard limit, and the customer is limited only by their license and the storage capacity of the cluster.

Select the different options (Small, Medium, Large) and notice how the Resource numbers change. These are the resources that will be applied across the K8s worker VMs. For example, specifying 20vCPU and 40GB of RAM across 3 workers, comes to 6 vCPU and 13 GB of RAM per worker.

Custom values are also allowed.

Select Small (10TiB), and click **Next**.

.. figure:: images/buckets_03.png

On the final screen, you will see the clusters managed by Prism Central and their corresponding networks.

.. note::

  Note that a user can easily see which of the clusters are licensed for encryption and the CPU, Memory, and Storage runways for each of the clusters.

Close the **Create Object Store** wizard.

**Do NOT click Deploy**.

.. figure:: images/buckets_04.png

Walk through Bucket Creation and Policies
.........................................

A bucket is a sub-repository within an object store which can have policies applied to it, such as versioning, WORM, etc. By default a newly created bucket is a private resource to the creator. The creator of the bucket by default has read/write permissions, and can grant permissions to other users.

Click the **Name** of the existing Object Store to manage it.

Click **Create Bucket**, and fill out the following fields:

- **Name**  - *your-name*-my-bucket
- **Enable Versioning** - Checked

.. figure:: images/buckets_05.png

Click **Create**.

If versioning is enabled, new versions can be uploaded of the same object for required changes, without losing the original data.

Lifecycle policies define how long to keep data in the system.

Once the bucket is created, it can be configured with WORM.

WORM (Write Once, Read Many) storage prevents the editing, overwriting, renaming, or deleting data and is crucial in heavily regulated industries (finance, healthcare, public agencies, etc.) where sensitive data is collected and stored. Examples include e-mails, account information, voice mails, and more.

.. note::

  Note that if WORM is enabled on the bucket, this will supersede any lifecycle policy.

Select your *your-name*-**my-bucket** bucket, and click **Configure WORM**. Note you have the ability to define a WORM data retention period on a per bucket basis.

.. note::

  In the EA version, the WORM UI is not yet fully functional, so you won’t be able to apply the WORM policy to your bucket.

User Management
+++++++++++++++

User creation will be in the UI in Buckets GA. In the early access software, we will use the following Linux command line ``iam_util`` tool to create users.

In this exercise you will create two users that will be used throughout the lab.

Login to the *Initials*-**Linux-ToolsVM** via SSH using the following credentials:

- **Username** - root
- **password** - nutanix/4u

Run the following command to create your first user account, replacing **YOUR-NAME** with your name (e.g. John-Smith):

.. code-block:: bash

  ./iam_util -url http://<OBJECT-STORE-IP>:5556 -username YOUR-NAME

The output will contain the access and secret keys for the user.

.. code-block:: bash

  2019/01/10 20:31:29 Creating Access and Secret key for user John-Smith
  2019/01/10 20:31:29 Access Key Ke2hEtehmOZoXYCrQnzUn_2EDD9Eqf0L
  Secret Key p6sxh_FhxEyIteslQJKfDlezKrtJro9C

Run the command again to create a second user account, replacing **YOUR-NAME-2** with your name (e.g. John-Smith-2):

.. code-block:: bash

  ./iam_util -url http://<object-store-ip>:5556 -username John-Smith-2

Copy and paste the output lines for each user into a text file for later use.

.. warning::

  It is critical that you save both the Access and Secret keys for each user account created, as you will not be able to retrieve the Secret key later.

Accessing & Creating Buckets
++++++++++++++++++++++++++++

In this exercise you will use `Cyberduck <https://cyberduck.io/>`_ to create and use buckets in the object store. Cyberduck is a multi-platform GUI application that supports multiple protocols including FTP, SFTP, WebDAV, and S3.

You will also use the built-in Buckets Object Browser, which is an easy way to test that your object store is functional and can be used to quickly to demo IAM access controls.

Download the Sample Images
..........................

Login to *Initials*-**Windows-ToolsVM** via RDP using the following credentials:

- **Username** - NTNXLAB\\Administrator
- **password** - nutanix/4u

`Click here <https://s3.amazonaws.com/get-ahv-images/sample-pictures.zip>`_ to download the sample images to your Windows-ToolsVM. Once the download is complete, extract the contents of the .zip file.

Use Cyberduck to Create A Bucket
................................

`Click here <https://svn.cyberduck.io/trunk/profiles/S3%20(HTTP).cyberduckprofile>`_ to download the S3/HTTP profile for Cyberduck.

Once the download is complete, open the file to launch **Cyberduck** and add the profile.

.. note::

  Buckets does not currently support HTTPS connections, but this will be supported at GA.

Close the **s3.amazonaws.com** default profile, and click on **Open Connection**.

.. figure:: images/buckets_06.png

Select **S3 (HTTP)** from the dropdown list.

.. figure:: images/buckets_07.png

Enter the following fields for user Bob created earlier, and click **Connect**:

- **Server**  - *Object Store IP*
- **Port**  - 7200
- **Access Key ID**  - *Generated When First User Created*
- **Password (Secret Key)** - *Generated When First User Created*

.. figure:: images/buckets_08.png

Click **Continue** to proceed with the unsecured connection.

Once connected, right-click anywhere inside the pane and select **New Folder**.

Enter the following name for your bucket, and click **Create**:

- **Bucket Name** - *your-name*-bucket

.. note::

  Bucket names must be lower case and only contain letters, numbers, periods and hyphens.

  Additionally, all bucket names must be unique within a given Object Store. Note that if you try to create a folder with an existing bucket name (e.g. *your-name*-my-bucket), creation of the folder will not succeed.

Creating a bucket in this fashion allows for self-service for entitled users, and is no different than a bucket created via the Prism Buckets UI.

Double-click into the bucket, and right click and select **Upload**.

Navigate to your downloads directory and find the Sample Pictures folder. Upload one or more pictures to your bucket.

Click **Continue** to proceed with the unsecured connection.

Browse Bucket and Objects in Object Browser
...........................................

.. note::

  Object browser is not the recommended way to use the object store, but is an easy way to test that your object store is functional and can be used to quickly demo IAM access controls.

From a web browser, navigate to http://\ *OBJECT-STORE-IP*\ :7200.

Login with the Access and Secret keys for the first user account you created.

.. figure:: images/buckets_10.png

Verify the previously uploaded files are available.

.. figure:: images/buckets_11.png

Working with Object Versioning
++++++++++++++++++++++++++++++

Object versioning allows the upload of new versions of the same object for required changes, without losing the original data. Versioning can be used to preserve, retrieve and restore every version of every object stored within a bucket, allowing for easy recovery from unintended user action and application failures.

Object Versioning
.................

Return to Cyberduck and re-connect using your first user's access and secret keys.

Select your bucket and and click **Get Info**.

.. figure:: images/buckets_12.png

Under ther **S3** tab, select **Bucket Versioning** and then close the window. This is equivalent to enabling versioning through Prism.

.. figure:: images/buckets_13.png

Leave the Cyberduck connection open, and open Notepad in your Tools VM.

Type “version 1.0” in Notepad, then save the file.

In Cyberduck, upload the text file to your bucket.

Make changes to the text file in Notepad and save it with the same name, overwriting the original file.

Upload the modified file to your bucket. Click **Continue** when prompted to overwrite the existing file.

If desired, you can update and upload the file multiple times.

In Cyberduck, click **View > Show Hidden Files**.

.. figure:: images/buckets_14.png

Notice that all versions are shown with their individual timestamps. Toggle **View > Column > Version** to view the version number associated with each object.

.. figure:: images/buckets_15.png

User Access Control
+++++++++++++++++++

In this exercise we will demonstrate user access controls and how to apply permissions so that other users or applications can access your bucket. For programmatic access to object storage, it is common for each application or service accessing the bucket to have its own access/secret key pair, so that access can be controlled granularly.

Verify Current Access
.....................

In Cyberduck, click **Open Connection** and provide the Access and Secret Keys created for your second user account.

Note that you do not see the bucket created using your first user's credentials.

Click **Go > Go To Folder…**

.. figure:: images/buckets_16.png

Type in the name of User 1's bucket and click **Go**.

.. figure:: images/buckets_17.png

You should receive an Access Denied error.

Leave your Cyberduck connection open for the following exercises.

Grant Access to Another Bucket
..............................

Access policy configuration will be in the UI in Buckets GA. In the early access software, we will use the following Linux command line ``mc`` tool to modify access to buckets.

From the *initials*-**Linux-ToolsVM**, run the following command to authenticate **MC** and allow the tool to configure the Object Store instance:

.. code-block:: bash

  ./mc config host add NutanixBuckets http://<OBJECT-STORE-IP>:7200 USER-1-ACCESS-KEY USER-1-SECRET-KEY

Replacing **YOUR-NAME**, run the following command to grant User 2 full access to User 1’s bucket.

.. code-block:: bash

  ./mc policy --user=YOUR-NAME-2 grant public NutanixBuckets/YOUR-NAME-bucket

Example output:

.. code-block:: bash

  ./mc policy --user=John-Smith-2 grant public NutanixBuckets/john-smith-bucket
  Running grant command for bucket NutanixBuckets/john-smith-bucket Permission public User John-Smith-2 Policy public
  Setting policy readwrite public

Buckets supports the following policies, which can be configured on a per user, per bucket basis:

  - **download** - Grants read only access to configured users.
  - **upload** - Grants write only access to configured users.
  - **public** - Grants read/write access to configured users.
  - **worm** - Enables write once, read many access. This supersedes all other policies.
  - **none** - Users have no access.

View Bucket with Different Users Credentials
............................................

In Cyberduck, notice that User 1’s bucket still does not show up in the directory listing. However, you can now navigate directly to the bucket.

Click **Go > Go To Folder…**

Type in the name of User 1's bucket and click **Go**.

Verify you can now read and write to User 1's bucket.

..  +++++++++++++++++++++++++++++++++++++++++++++++

  While tools like Cyberduck and the Object Browser help to visualize how data is access within an object store, Buckets is primarily an object store service that is designed to be accessed and consumed over S3 APIs.

  Amazon's S3 (Simple Storage Service) is the largest public cloud storage service, and has subsequently become the de-facto standard object storage API due to developer and ISV adoption. Buckets provides an S3 compliant interface to allow for maximum portability, as well as support for existing "cloud native" applications.

  In this exercise you will leverage ``s3cmd`` to access your buckets using the CLI.

  You will need the **Access Key** and **Secret Key** for the first user account created earlier in this lab.

  Setting up s3cmd (CLI)
  ......................

  From the *initials*-**Linux-ToolsVM**, run ``s3cmd --configure`` and enter the following to configure access to the Object Store:

  .. note::

    For anything not specified below, just hit enter to leave the defaults. Do **NOT** set an encryption password and do **NOT** use HTTPS protocol.

  .. code-block:: bash

    s3cmd --configure

  - **Access Key**  - *First User's Access Key*
  - **Secret Key**  - *First User's Secret Key*
  - **Default Region [US]**  - us-east-1
  - **S3 Endpoint [s3.amazonaws.com]**  - *OBJECT-STORE-IP*\ :7200
  - **DNS-style bucket+hostname:port template for accessing a bucket [%(bucket)s.s3.amazonaws.com]**  - *OBJECT-STORE-IP*
  - **Encryption password** - Leave Blank
  - **Path to GPG program [/usr/bin/gpg]**  - Leave Blank
  - **Use HTTPS protocol [Yes]**  - No
  - **HTTP Proxy server name**  - Leave Blank
  - **Test access with supplied credentials?**  - Y (Yes)

  The output should look similar to this and match your environment:

  .. code-block:: bash

    New settings:
      Access Key: Ke2hEtehmOZoXYCrQnzUn_2EDD9Eqf0L
      Secret Key: p6sxh_FhxEyIteslQJKfDlezKrtJro9C
      Default Region: us-east-1
      S3 Endpoint: 10.20.95.51:7200
      DNS-style bucket+hostname:port template for accessing a bucket: 10.20.95.51
      Encryption password:
      Path to GPG program: /usr/bin/gpg
      Use HTTPS protocol: False
      HTTP Proxy server name:
      HTTP Proxy server port: 0

    Test access with supplied credentials? [Y/n] y
    Please wait, attempting to list all buckets...
    Success. Your access key and secret key worked fine :-)

    Now verifying that encryption works...
    Not configured. Never mind.

    Save settings? [y/N] y
    Configuration saved to '/root/.s3cfg'

  Type **Y** and press **Return** to save the configuration.

  Create A Bucket And Add Objects To It Using s3cmd (CLI)
  .......................................................

  Now lets use s3cmd to create a new bucket called *your-name*\ **-clibucket**.

  From the same Linux command line, run the following command:

  .. code-block:: bash

    s3cmd mb s3://xyz-cli-bob-bucket

  You should see the following output:

  .. code-block:: bash

    Bucket 's3://xyz-cli-bob-bucket/' created

  List your bucket with the **ls** command:

  .. code-block:: bash

    s3cmd ls

  You will see a list of all the buckets in the object-store.

  To see just your buckets run the following command:

  .. code-block:: bash

    s3cmd ls | grep *initials*

  Now that we have a new bucket, lets upload some data to it.

  If you do not already have the Sample-Pictures.zip, download it and copy to your Linux-ToolsVM.

  :download:`sample-pictures <https://s3.amazonaws.com/get-ahv-images/sample-pictures.zip>`

  .. code-block:: bash

    curl https://s3.amazonaws.com/get-ahv-images/sample-pictures.zip -o sample-pictures

  Run the following command to upload one of the images to your bucket:

  .. code-block:: bash

    s3cmd put --acl-public --guess-mime-type image01.jpg s3://<your-bucket-name>/image01.jpg

  You should see the following output:

  .. code-block:: bash

    s3://xyz-cli-bob-bucket/image01.jpg
    WARNING: Module python-magic is not available. Guessing MIME types based on file extensions.
    upload: 'image01.jpg' -> 's3://xyz-cli-bob-bucket/image01.jpg'  [1 of 1]
    1048576 of 1048576   100% in    7s   142.74 kB/s  done
    Public URL of the object is: http://10.20.95.51:7200/xyz-cli-bob-bucket/image01.jpg

  If desired, repeat with more images.

  Run the **la** command to list all objects in all buckets:

  .. code-block:: bash

    s3cmd la

  To see just objects in your buckets, run the following command:

  .. code-block:: bash

    s3cmd la | grep *initials*

Creating and Using Buckets From Scripts
+++++++++++++++++++++++++++++++++++++++

While tools like Cyberduck and the Object Browser help to visualize how data is access within an object store, Buckets is primarily an object store service that is designed to be accessed and consumed over S3 APIs.

Amazon Web Services's S3 (Simple Storage Service) is the largest public cloud storage service, and has subsequently become the de-facto standard object storage API due to developer and ISV adoption. Buckets provides an S3 compliant interface to allow for maximum portability, as well as support for existing "cloud native" applications.

In this exercise you will use **Boto 3**, the AWS SDK for Python, to manipulate your buckets using Python scripts.

You will need the **Access Key** and **Secret Key** for the first user account created earlier in this lab.

Listing and Creating Buckets with Python
........................................

In this exercise, you will modify a sample script to match your environment, which will list all the buckets available to that user. You will then modify the script to create a new bucket using the existing S3 connection.

From the *initials*-**Linux-ToolsVM**, run ``vi list-buckets.py`` and paste in the script below. You will need to modify the **endpoint_ip**, **access_key_id**, and **secret_access_key** values before saving the script.

.. note::

  If you are not comfortable with ``vi`` or alternative command line text editors, you can modify the script in a GUI text editor then paste the completed script into ``vi``.

  In ``vi``, type ``i`` and then right-click to paste into the text file.

  Press **Ctrl + C** then type ``:wq`` and press **Return** to save the file.

.. code-block:: python

  #!/usr/bin/python

  import boto3

  endpoint_ip= "OBJECT-STORE-IP" #Replace this value
  access_key_id="ACCESS-KEY" #Replace this value
  secret_access_key="SECRET-KEY" #Replace this value
  endpoint_url= "http://"+endpoint_ip+":7200"

  session = boto3.session.Session()
  s3client = session.client(service_name="s3", aws_access_key_id=access_key_id, aws_secret_access_key=secret_access_key, endpoint_url=endpoint_url)

  # list the buckets
  response = s3client.list_buckets()

  for b in response['Buckets']:
    print (b['Name'])

Execute ``python list-buckets.py`` to run the script. Verify that the output lists any buckets you have created for using your first user account.

Using the previous script as a base, and the `Boto 3 documentation <https://boto3.amazonaws.com/v1/documentation/api/latest/guide/s3-examples.html>`_, can you modify the script to create a **new** bucket and then list all buckets?

.. note::

  Totally stuck? Take a look at the completed script :download:`here <create-bucket.py>`

Uploading Multiple Files to Buckets with Python
...............................................

From the *initials*-**Linux-ToolsVM**, run the following to create 100 1KB files to be used as sample data for uploading:

.. code-block:: bash

  mkdir ~/sample-files
  for i in {1..100}; do dd if=/dev/urandom of=~/sample-files/file$i bs=1024 count=1; done

While the sample files contain random data, these could just as easily be log files that need to be rolled over and automatically archived, surveillance video, employee records, and so on.

Modify your existing script or create a new script based on the example below:

.. code-block:: python

  #!/usr/bin/python

  import boto3
  import glob
  import re

  # user defined variables
  endpoint_ip= "OBJECT-STORE-IP" #Replace this value
  access_key_id="ACCESS-KEY" #Replace this value
  secret_access_key="SECRET-KEY" #Replace this value
  bucket="BUCKET-NAME-TO-UPLOAD-TO" #Replace this value
  name_of_dir="sample-files"

  # system variables
  endpoint_url= "http://"+endpoint_ip+":7200"
  filepath = glob.glob("%s/*" % name_of_dir)

  # connect to object store
  session = boto3.session.Session()
  s3client = session.client(service_name="s3", aws_access_key_id=access_key_id, aws_secret_access_key=secret_access_key, endpoint_url=endpoint_url)

  # go through all the files in the directory and upload
  for current in filepath:
      full_file_path=current
      m=re.search('sample-files/(.*)', current)
      if m:
        object_name=m.group(1)
      print("Path to File:",full_file_path)
      print("Object name:",object_name)
      response = s3client.put_object(Bucket=bucket, Body=full_file_path, Key=object_name)

The `put_object <https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=put_object#S3.Bucket.put_object>`_ method is used for the file upload. Optionally this method can be used to define the metadata, content type, permissions, expiration, and other key information associated with the object.

Core S3 APIs resemble RESTful APIs for other web services, with PUT calls allowing for adding objects and associated settings/metadata, GET calls for reading objects or information about objects, and DELETE calls for removing objects.

Execute the script and use Cyberduck or the Object Browser to verify the sample files are available.

.. figure:: images/buckets_18.png

Similar S3 SDKs are available for languages including Java, JavaScript, Ruby, Go, C++, and others, making it very simple to leverage Nutanix Buckets using your language of choice.

Takeaways
+++++++++

What are the key things you should know about **Nutanix Buckets**?

- Nutanix Buckets provides a simple and scalable S3-compatible object storage solution, optimized for DevOps, Long Term Retention and Backup Target use cases.

- The target for Buckets GA is end of March and will require 5.11.

- Buckets will support AHV at GA. ESXi support is on the roadmap.

- A 2TB Buckets license is included with every AOS cluster. After that, it is licensed by used capacity (as opposed to number of nodes).

- Buckets will be enabled and deployed from Prism Central. Upgrades will be done via Lifecycle Manager (LCM).

References
++++++++++

- `Buckets FAQ <https://docs.google.com/document/d/1xEkrB5EOGu5-8yCB7EUYuy95TTgnuBE2s2DWWmVRJw4/edit?usp=sharing>`_
- `Buckets Admin Guide (Draft) <https://docs.google.com/document/d/1l0fekqhDH-q3snlBmogfEAOg2MVoGMveiNa6fw6VOeM/edit?usp=sharing>`_
- `Buckets Tech Note (Draft) <https://docs.google.com/document/d/1jYud1z6JV1TwmJj5gon4Cs-Syq7J4jBn3BhvWfSCBeU/edit?usp=sharing>`_

Getting Connected
+++++++++++++++++

Have a question about **Nutanix Buckets**? Please reach out to the resources below:

+---------------------------------------------------------------------------------------------+
|  Buckets Product Contacts                                                                   |
+================================+============================================================+
|  Slack Channel                 |  #nutanix-buckets                                          |
+--------------------------------+------------------------------------------------------------+
|  Product Manager               |  Priyadarshi Prasad, priyadarshi@nutanix.com               |
+--------------------------------+------------------------------------------------------------+
|  Product Marketing Manager     |  Krishnan Badrinarayanan, krishnan.badrinaraya@nutanix.com |
+--------------------------------+------------------------------------------------------------+
|  Technical Marketing Engineer  |  Laura Jordana, laura@nutanix.com                |
+--------------------------------+------------------------------------------------------------+
|  SME                           |                                                            |
+--------------------------------+------------------------------------------------------------+
|  SME                           |                                                            |
+--------------------------------+------------------------------------------------------------+
