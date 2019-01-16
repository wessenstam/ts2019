.. _windows_tools_vm:

----------------
Windows Tools VM
----------------

Overview
+++++++++

In this section we will deploy the Windows Tools VM.

Deploy Windows VM
.................

In **Prism Central** > select :fa:`bars` **> Virtual Infrastructure > VMs**, and click **Create VM**.

Fill out the following fields:

- **Name** - *initials*-Windows-ToolsVM
- **Description** - (Optional) Description for your VM.
- **vCPU(s)** - 1
- **Number of Cores per vCPU** - 2
- **Memory** - 4 GiB

- Select **+ Add New Disk**
    - **Type** - DISK
    - **Operation** - Clone from Image Service
    - **Image** - ToolsVM.qcow2
    - Select **Add**

- Select **Add New NIC**
    - **VLAN Name** - Primary
    - Select **Add**

Click **Save** to create the VM.

Power On the VM.

Install Tools Software
......................

Make sure CyberDuck is installed.

https://cyberduck.io/download/

You will also need to download the connection profile for S3 over HTTP, as we don’t support HTTPS yet.

https://cyberduck.io/s3/
