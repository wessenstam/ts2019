.. _linux_tools_vm:

---------------
Linux Tools VM
---------------

Overview
+++++++++
In this section we will deploy a Linux VM, and install tools that are need in various labs.

Deploy Linux VM
...............

In **Prism Central** > select :fa:`bars` **> Virtual Infrastructure > VMs**, and click **Create VM**.

Fill out the following fields:

- **Name** - *initials*-Linux-ToolsVM
- **Description** - (Optional) Description for your VM.
- **vCPU(s)** - 1
- **Number of Cores per vCPU** - 2
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

Setup NTP
.........

Install and Enable NTP

.. code-block:: bash

  yum install -y ntp ntpdate

  systemctl start ntpd

  systemctl enable ntpd

  systemctl status ntpd

Set NTP Servers to use (These match what is set by the HPOC Configure Script)

.. code-block:: bash

  ntpdate -u -s 0.pool.ntp.org 1.pool.ntp.org 2.pool.ntp.org 3.pool.ntp.org

  systemctl restart ntpd

Now your time is all set.

Install Tools Software
......................

Login to the VM via ssh or Console session, and run the following commands:

- **Username** - root
- **password** - nutanix/4u

Install the software needed by running the following commands:

.. code-block:: bash

  yum install -y stress

  yum install -y nodejs

  npm install -g request

  npm install -g express

  yum install -y python-pip

  pip install -U pip

  pip install boto3

  yum install -y s3cmd

  yum install -y awscli

  curl http://10.4.64.11:8080/Users/nutanix_buckets/ea/builds/18112018/tools/iam_util -o iam_util

  curl http://10.4.64.11:8080/Users/nutanix_buckets/ea/builds/18112018/tools/mc -o mc

Open the firewall port needed by running the following commands:

.. code-block:: bash

  firewall-cmd --permanent --add-port=3000/tcp

  firewall-cmd --reload


Now we are ready to move onto the labs.
