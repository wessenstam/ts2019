.. _buckets:

---------------
Nutanix Buckets
---------------

Overview
++++++++

**Estimated time to complete: 60 MINUTES**

Buckets is a scalable S3-compatible object storage solution that allows users to store petabytes of unstructured data on the Nutanix platform, with S3 support for features such as WORM and object versioning that are required for regulatory compliance, and easy integration with 3rd party backup software (HYCU and Commvault are confirmed for GA, with other vendors on the roadmap), and S3-compatible applications.

Use cases targeted at GA include:

- DevOps
    - Single global namespace for multi-geography collaboration for Engg teams spread around the world
    - S3 support
    - Time-to-first-byte of 10ms or less
-  Long Term Data Retention
    - WORM compliance
    - Object versioning
    - Lifecycle policies
-  Backup Target
    - Support for HYCU and Commvault at GA, with other vendors on the roadmap.
    - Ability to support multiple backup clients simultaneously.
    - Ability to handle really small and really large backup files simultaneously with a key-value store based metadata structure and multi-part upload capabilities.

In this lab, you will walk through an object store deployment and learn how to create and manage buckets using a popular file transfer application (Cyberduck) as well as via other S3-compatible applications.

You will also set up the object store as a backup target in HYCU, and create scripts in Python to access the object store.

Lab Setup
+++++++++

For this lab you will need the Windows-ToolsVM and the Linux-ToolsVM.

If you have not deployed those yet, please do the 2 labs below before continuing.

:ref:`windows_tools_vm`

:ref:`linux_tools_vm`

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

- **Object Store Name** - *initials*-oss
- **Domain**  - ntnxlab.local
- **IP Address**  - 1.1.1.1

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

Close the **Create Object Store** wizard. **Do NOT click Deploy**.

.. figure:: images/buckets_04.png

Walk through Bucket Creation and Policies
.........................................

Select the object store you were assigned.

Click **Create Bucket**, and fill out the following fields:

- **Name**  - *initials*-my-bucket
- **Enable Versioning** - Checked

Click **Create**.

.. figure:: images/buckets_05.png

If versioning is enabled, new versions can be uploaded of the same object for required changes, without losing the original data.

Lifecycle policies define how long to keep data in the system.

.. note::

  Note that if WORM is enabled on the bucket, this will supersede any lifecycle policy.

Once the bucket is created, it can be enabled with WORM (write once read many) for regulatory compliance.

Select the bucket you just created *initials*-**my-bucket**, and click **Configure WORM**.

.. note::

  In the EA version, the WORM UI is not yet fully functional, so you won’t be able to apply the WORM policy to your bucket.

User Management
+++++++++++++++

In this lab you will create two users using the command line tool, **iam_util**.

.. note::

  User creation and access policy configuration will be in the UI in Buckets GA. In the early access software, we will use the following Linux command line tools:

  - iam_util - for user creation
  - mc - for policy configuration

Login to the *initials*-**Linux-ToolsVM** via ssh or Console session.

- **Username** - root
- **password** - nutanix/4u

Run the following command to create a user named Bob:

.. code-block:: bash

  ./iam_util -url http://<object-store-ip>:5556 -username bob@nutanix.com

The output will contain the access and secret keys for the user.

.. code-block:: bash

  2019/01/10 20:31:29 Creating Access and Secret key for user bob
  2019/01/10 20:31:29 Access Key Ke2hEtehmOZoXYCrQnzUn_2EDD9Eqf0L
  Secret Key p6sxh_FhxEyIteslQJKfDlezKrtJro9C

Run the command one more time for a second user named Joe.

.. code-block:: bash

  ./iam_util -url http://<object-store-ip>:5556 -username joe@nutanix.com

Copy and paste the output lines (Access & Secret Keys) for both users into a text file for later use.

Be sure to note whose credentials are whose. We will be using the users you have created in a later lab.

Creating and Accessing Buckets
++++++++++++++++++++++++++++++

In this lab you will use Cyberduck to create and use buckets in the object store.

You will also briefly use the built-in object store browser, which is an easy way to test that your object store is functional and can be used to quickly to demo IAM access controls.

Download the Sample Images
..........................

Login to *initials*-**Windows-ToolsVM**.

- **Username** - administrator
- **password** - nutanix/4u

Download and unzip the following on your Windows-ToolsVM:

:download:`sample-pictures <https://s3.amazonaws.com/get-ahv-images/sample-pictures.zip>`

Use Cyberduck to Create A Bucket
................................

Launch Cyberduck, and click on **Open Connection**.

.. figure:: images/buckets_06.png

Select **S3 (HTTP)** from the dropdown list.

.. figure:: images/buckets_07.png

Enter the following fields for user Bob created earlier, and click **Connect**:

- **Server**  - *<object-store-ip>*
- **Port**  - 7200
- **Access Key ID**  - *Generated When User Created*
- **Password (Secret Key)** - *Generated When User Created*

.. figure:: images/buckets_08.png

Click **Continue** to proceed with the unsecured connection.

Once connected, rightclick anywhere inside the pane, and click **New Folder**.

Enter the following name for your bucket, and click **Create**:

- **Bucket Name** - *initials*-bob-bucket

.. figure:: images/buckets_09.png

Double-click into the bucket, and right click and select **Upload**.


Navigate to the Desktop and find the Sample Pictures folder. Upload one or more pictures to your bucket.

Click **Continue** to proceed with the unsecured connection.

Browse Bucket and Objects in Object Browser
...........................................

.. note::

  Object browser is not the recommended way to use the object store, but is an easy way to test that your object store is functional and can be used to quickly demo IAM access controls.

From a web browser, navigate to http://*<object-store-ip>*:7200.

Login with the access and secret keys for Bob you created earlier.

- **Access Key ID**  - *Generated When User Created*
- **Password (Secret Key)** - *Generated When User Created*

.. figure:: images/buckets_10.png

You should see your bucket and the images you uploaded.

.. figure:: images/buckets_11.png

Work with Object Versioning
+++++++++++++++++++++++++++

Object versioning allows the upload of new versions of the same object for required changes, without losing the original data.

This is useful in many use cases, including long term data retention scenarios.

Object Versioning
.................

On your Windows VM, open Cyberduck and connect to the object store using Bob’s access credentials (If not already connected).

Select Bob’s bucket and click Get Info.

.. figure:: images/buckets_12.png

Click S3 and then check Bucket Versioning, then close the dialog box by clicking the **X**.

.. figure:: images/buckets_13.png

Leaving the Cyberduck window open, launch Notepad.

Type “version 1.0” in Notepad, then click File > Save and save the file as *initials*-**textfile.txt**

In Cyberduck upload the text file to your bucket.

Make changes to the text file and save it with the same name, then upload it again. Overwrite the existing file when prompted.

You can do this multiple times if desired.

Click View > Show Hidden Files.

.. figure:: images/buckets_14.png

Notice that all versions are shown with their individual timestamps.
The previous versions are shown in a lighter color. You can also see the version number if you toggle View > Column > Version

.. figure:: images/buckets_15.png

User Access Control
+++++++++++++++++++

In this lab we will demonstrate user access controls and how to apply permissions so that other users can access your bucket.

Verify Current Access
.....................

From Cyberduck, click Open Connection and this time, use Joe’s access and secret keys.

Notice when you connect with Joe’s access and secret keys, you don’t see Bob’s bucket.

Click **Go > Go To Folder…**

.. figure:: images/buckets_16.png

Type in the name of Bob’s bucket and click **Go**.

- **Enter the Pathname to List:** - *initials*-Bob-Bucket

.. figure:: images/buckets_17.png

You should receive an Access Denied error.

Leave Cyberduck open for the following labs.

Grant Access to Another Bucket
..............................

From the *initials*-**Linux-ToolsVM**, run the following command to add the object store instance as a host in the mc (minio client) configuration:

.. code-block:: bash

  ./mc config host add NutanixBuckets http://<object-store-ip>:7200 <bobs-access-key> <bobs-secret-key>

Run the following command to grant Joe full access to Bob’s bucket.

.. code-block:: bash

  ./mc policy --user=joe@nutanix.com grant public NutanixBuckets/<initials>-bob-bucket

Example output:

.. code-block:: bash

  ./mc policy --user=joe@nutanix.com grant public NutanixBuckets/xyz-bob-bucket
  Running grant command for bucket NutanixBuckets/xyz-bob-bucket Permission public User joe@nutanix.com Policy public
  Setting policy readwrite public

.. note::

  Note that you can set the following bucket policies. Please refer to the Buckets `Administration Guide <https://docs.google.com/document/d/1l0fekqhDH-q3snlBmogfEAOg2MVoGMveiNa6fw6VOeM/edit#>`_ for more details.

  - download (read-only) - Grants read only access to all the users. The users can get objects from this bucket.
  - upload (write-only) - Grants write only access to all the users.
  - public (read-write) - Grants read/write access to all the users.
  - worm - Makes a bucket WORM. This supersedes all other policies.
  - none - None of the users can perform reads and writes.

View Bucket with Different Users Credentials
............................................

In Cyberduck, notice that Bob’s bucket still does not show up in the directory listing. However, you can now navigate directly to the bucket.

Click **Go > Go To Folder…**

Type in the name of Bob’s bucket and click **Go**.

- **Enter the Pathname to List:** - *initials*-Bob-Bucket

You should now see the contents of Bob’s bucket.

Creating and Using Buckets From CLI Using s3cmd
+++++++++++++++++++++++++++++++++++++++++++++++

Buckets is an object store service that is designed to be accessed and consumed over S3 APIs.

In this lab you will leverage s3cmd to access your buckets using the CLI.

You will need the **Access Key** and **Secret Key** for the user Bob you created earlier in this lab.

Setting up s3cmd (CLI)
......................

Login to the *initials*-**Linux-ToolsVM** via ssh or Console session.

- **Username** - root
- **password** - nutanix/4u

Configure the s3 environment by running **s3cmd --configure** and entering in the following information:

.. note::

  For anything not specified below, just hit enter to leave the defaults. Do **not** set an encryption password and do **not** use HTTPS protocol.

.. code-block:: bash

  s3cmd --configure

- **Access Key**  - *<Bob's Access Key Created Earlier>*
- **Secret Key**  - *<Bob's Secret Key Created Earlier>*
- **Default Region [US]**  - us-east-1
- **S3 Endpoint [s3.amazonaws.com]**  - *<object-store-ip>*:7200
- **DNS-style bucket+hostname:port template for accessing a bucket [%(bucket)s.s3.amazonaws.com]**  - *<object-store-ip>*
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

Create A Bucket And Add Objects To It Using s3cmd (CLI)
.......................................................

Now lets use s3cmd to create a new bucket called *initials*-**cli-bob-bucket**.

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

In this lab you will use **boto3**, the AWS SDK for Python, to manipulate your buckets using Python scripts.

Listing and Creating Buckets with Python
........................................

In this lab, you will modify a sample script to match your environment, which will list all the buckets available to that user.

You will also add to the script to include the creation of a bucket.

If you are not still logged in, log back into your *initials*-**Linux-ToolsVM**.

Modify the following script in vi, or another editor of your choice.

.. code-block:: bash

  #!/usr/bin/python

  import boto3

  endpoint_ip= "<object-store-ip>"
  access_key_id="<access-key>"
  secret_access_key="<secret-key>"
  endpoint_url= "http://"+endpoint_ip+":7200"

  session = boto3.session.Session()
  s3client = session.client(service_name="s3", aws_access_key_id=access_key_id, aws_secret_access_key=secret_access_key, endpoint_url=endpoint_url)

  # list the buckets
  response = s3client.list_buckets()

  for b in response['Buckets']:
    print (b['Name'])

Save the script with the name **list-buckets.py**, and grant execute permissions on it.

.. code-block:: bash

  chmod +x list-buckets.py

Run the script.

The output should look similar to the following:

.. code-block:: bash

  [root@centos ~]# ./list-buckets.py
  xyz-bob-bucket
  xyz-cli-bob-bucket

Using the previous script as a base, and the boto3 documentation, modify the script to create a new bucket named *initials*-**python-bob-bucket**.

Make a copy of the list-buckets.py script before modifying it. Call the new script **create-bucket.py**.

Hint: you only need to add an additional line in your script, before the # list the buckets section. Check your work :download:`here <create-bucket.py>`.

Uploading Multiple Files to Buckets with Python
...............................................

In your Linux VM, from the current working directory, create a new directory called **sample-files** and change to that directory.

.. code-block:: bash

  mkdir sample-files
  cd sample-files


Run the following command to create 100 small files:

.. code-block:: bash

  for i in {1..100}; do dd if=/dev/urandom of=file$i bs=1024 count=1; done

Change back to the previous directory.

.. code-block:: bash

  cd ../

Modify your script to loop through all files in that directory and upload them to the bucket using the put_object method.

Save the script with the name **upload-files.py**, and grant execute permissions on it.

Alternatively, you can download the :download:`sample <upload-files.py>` script and edit the user defined variables section to match your environment.

.. code-block:: bash

  #!/usr/bin/python

  import boto3
  import glob
  import re

  # user defined variables
  endpoint_ip= "<your-endpoint-ip>"
  access_key_id="<access-key>"
  secret_access_key="<secret-key>"
  bucket="<bucket-name-to-upload-to>"
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
  #     print(response)

Now you can list all the files you uploaded by running the following s3cmd:

.. code-block:: bash

  s3cmd la | grep *initials*

Call To Actions
+++++++++++++++



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
