.. _xplay:

-------------------
Nutanix Prism XPlay
-------------------

Overview
++++++++

**Estimated time to complete: 30 MINUTES**

Lab Setup
+++++++++
In this section we will deploy a Linux VM, install Stress, and run a stress test.

Deploy Linux VM
...............

In **Prism Central** > select :fa:`bars` **> Virtual Infrastructure > VMs**, and click **Create VM**.

Fill out the following fields:

- **Name** - Tomcat-*initials*
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

Install Stress and Run Stress Test
..................................

Lets install **Stress** so we can use it to generate load.

Login to the VM vis ssh or Console session, and sun the following command:

- **Username** - root
- **password** - nutanix/4u

.. code-block:: bash

  yum install -y stress

Now lets add some load by initiating a stress test.

.. code-block:: bash

  stress -m 4 --vm-bytes 500M -t 40m &

Review Memory of <*VM-A*> (Pre-Seeded for this lab).

In **Prism Central** > select :fa:`bars` **> Virtual Infrastructure > VMs**, and click **VM-A**

<Add more content from harry Yang here around Best Practices>

Automatically Add Memory to a VM When A Constraint is Detected
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

How often have you been on-call, and got that alert or service ticket for a VM that was having High memory or CPU?
Chances are a lot, and generally during dinner, while you are out with family, or sleeping.

What if you could use XPlay in Prism Pro to automatically take care of this for you when Prism Pro detected the constraint?
Good news, you can. Let's walk through how to set that up.

Create Alert Policy
...................

In **Prism Central** > select :fa:`bars` **> Virtual Infrastructure > VMs**, and click **Tomcat**-*initials*.

Next select **Metrics > Memory Usage**.

.. figure:: images/xplay_01.png

Click **Alert Settings**

.. figure:: images/xplay_02.png

You will see the  **Create Alert Policy** window, fill out the following fields:

- **Entity Type** - VM
- **Entity (Line 1)** - One VM
- **Entity (Line 2)** - Tomcat-*initials*
- **Metric** - Memory Usage
- **Impact Type** - Performance
- **Policy Name** - VM Memory Constrained - *initials*
- **Description** - Optional
- **Auto Resolve Alerts** - Checked
- **Enable Policy** - **Unchecked**
- **Trigger alert if conditions persist for** - 0 Minutes

- **Behavioral Anomaly**
    - **Every time there is an anomaly, alert** - Checked / Warning

- **Static Threshold**
    - **Alert Critical if** - Checked / 60

.. figure:: images/xplay_03.png

Click **Save**.

.. note::

  Customers can choose out-of-the-box alert policies (shown below) to detect the memory and cpu constraint by X-FIT.

  .. figure:: images/xplay_04.png

Create Playbook
...............

In **Prism Central** > select :fa:`bars` **> Operations > Playbooks**.

.. figure:: images/xplay_05.png

Click **Create Playbook**.

Select :fa:`bell` **Alert** as Trigger, and click **Select**.

.. figure:: images/xplay_06.png

.. note::

  When XPlay is GA in 5.11, we will also support a new trigger type “Manual” which allows you associate a playbook to VMs, Hosts, and Clusters and trigger it manually.

  .. figure:: images/xplay_07.png

Search “VM Memory Constrained” in **Alert Policy**, and select **VM Memory Constrained -**\ *initials*.

.. figure:: images/xplay_08.png

Click **Add Action**, and select the :fa:`camera` **VM Snapshot** action.

.. figure:: images/xplay_09.png

Select **Source Entity** from the parameters.

.. figure:: images/xplay_10.png

.. note::

  Source entity means the entity triggers the alert.

- **Target VM** - {{trigger[0].source_entity_info}}
- **Time To Live**  - 1 day(s)

.. figure:: images/xplay_11.png

Click **Add Action**, and select the :fa:`memory` **VM Hot Add Memory** action.

Select **Source Entity** from the parameters.

- **Target VM** - {{trigger[0].source_entity_info}}
- **Add Absolute Memory** - 1 GiB
- **Absolute Maximum** -  20 GiB

.. figure:: images/xplay_12.png

Click **Add Action**, and select the :fa:`envelope` **Email** action.

.. note::

  Please look at the example Subject below with parameters.

  Please try creating your own Subjects using parameters.

- **Recipient** - YourEmail@nutanix.com
- **Subject** - Playbook {{playbook.playbook_name}} addressed alert {{trigger[0].alert_entity_info.name}}
- **Message** - Prism Pro X-FIT detected  {{trigger[0].alert_entity_info.name}} in {{trigger[0].source_entity_info.name}}.  Prism Pro X-Play has run the playbook of "{{playbook.playbook_name}}". As a result, Prism Pro increased 1GB memory in {{trigger[0].source_entity_info.name}}.

.. note::

  There is a bug right now that when you click a parameter in the **paramete** popup, the parameter string will be appended at the end of the text string, not at the place of the cursor.

  You have to cut and paste it into the write place if that is the case.

.. figure:: images/xplay_13.png

Click **Add Action**, and select the **Acknowledge Alert** action.

Select **Alert** from the parameters.

.. figure:: images/xplay_14.png

- **Target Alert**  - {{trigger[0].alert_entity_info}}

Click **Save & Close**, and fill out the following fields:

- **Name**  - Auto Remove Memory Constraint - *initials*
- **Description** - Optional
- **Status**  - Enabled

.. figure:: images/xplay_15.png

Click **Save**.

Cause Memory Constraint
.......................

In **Prism Central** > select :fa:`bars` **> Virtual Infrastructure > VMs**, and click **Tomcat**-*initials*.

Take note of your **Tomcat-**\ *initials* VM's memory capacity (should be 2 GiB).

Click **Alerts**, Select **Alert Policy** from **Configure** Dropdown.

.. figure:: images/xplay_16.png

Select **VM Memory Constrained** - *initials*, and **Enable** the policy.

.. figure:: images/xplay_17.png

Open a console session or SSH into Prism Central, and run the **paintrigger.py** script.

.. code-block:: bash

  ./paintrigger.py

.. note::

  This will resolve all the alerts, force NCC check to run immediately and trigger the alert.

After 1-2 minutes you should receive an email from Prism.

Check the email to see that its subject and email body have filled the real value for the parameters you set up earlier.

Check the memory capacity on your **Tomcat-**\ *initials* VM now, you should see that it has increased.

Review the Playbook Play
........................

In **Prism Central** > select :fa:`bars` **> Operations > Playbooks**.

Select your **Auto Remove Memory Constraint -**\ *initials*, and **disable** it.

Click **Plays**.

You should see that a Play has just completed.

Click the Play, and examine the details.

.. figure:: images/xplay_18.png

Reduce CPU Capacity For A VM During A Maintenance Windows
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Xfit in Prism Pro utilizes Machine Learning to continually analyze the environment.

This is helpful to detect resource constraints, such as our memory constraint in the last lab, as well as inefficiencies.

Inefficiencies could be Virtual Machines with over provisioned vCPU or Memory.

In this exercise we will create a playbook to take care of over-provisioned CPU.

Create Alert Policy
...................

In **Prism Central** > select :fa:`bars` **> Activity > Alerts**, and Select **Alert Policy** from **Configure** Dropdown.

Click **+ New Alert Policy**

.. figure:: images/xplay_19.png

You will see the  **Create Alert Policy** window, fill out the following fields:

- **Entity Type** - VM
- **Entity (Line 1)** - One VM
- **Entity (Line 2)** - Tomcat-*initials*
- **Metric** - CPU Usage
- **Impact Type** - Performance
- **Policy Name** - -VM CPU Overprovisioned - *initials*
- **Description** - Optional
- **Auto Resolve Alerts** - Checked
- **Enable Policy** - **Unchecked**
- **Trigger alert if conditions persist for** - 0 Minutes

- **Static Threshold**
    - **Alert Critical if** - Checked / 30

.. figure:: images/xplay_20.png

Click **Save**.

.. note::

  Customers can choose out-of-the-box alert policies (shown below) to detect the overprovisioned memory and cpu by X-FIT.

Create Playbook
...............

In **Prism Central** > select :fa:`bars` **> Operations > Playbooks**.

Click **Create Playbook**.

Select :fa:`bell` **Alert** as Trigger, and click **Select**.

Search “VM CPU Overprovisioned” in **Alert Policy**, and select **VM CPU Overprovisioned -**\ *initials*.

Click **Add Action**, and select the :fa:`power-off` **Power Off VM** action.

Select **Source Entity** from the parameters.

- **Target VM** - {{trigger[0].source_entity_info}}
- **Type of Power Off Action**  - Guest Shutdown

.. note::

  If VM does not have NGT installed, select **Power Off** instead.

Click **Add Action**, and select the **VM Reduce CPU** action.

Select **Source Entity** from the parameters.

- **Target VM** - {{trigger[0].source_entity_info}}
- **Cores per vCPU to Remove**  - 1
- **Minimum Number of Cores per vCPU**  - 1

.. note::

  There is a bug in 5.10 that missed the two fields allowing you change the vCPU counts. This is fixed in 5.11.

  .. figure:: images/xplay_21.png

Click **Add Action**, and select the :fa:`power-off` **Power On VM** action.

Select **Source Entity** from the parameters.

- **Target VM** - {{trigger[0].source_entity_info}}

Click **Add Action**, and select the :fa:`envelope` **Email** action.

.. note::

  Please look at the example Subject below with parameters.

  Please try creating your own Subjects using parameters.

- **Recipient** - YourEmail@nutanix.com
- **Subject** - Playbook {{playbook.playbook_name}} downsized  {{trigger[0].source_entity_info.name}}
- **Message** - Prism Pro's X-FIT detected that  {{trigger[0].source_entity_info.name}} is overprovisioned.  Prism Pro's X-Play has run the playbook of "{{playbook.playbook_name}}". As a result, Prism Pro downsized {{trigger[0].source_entity_info.name}}.

Many times, you can’t just power off the VM to do the resizing during the production time.

X-Play provides a way for the user to specify the time window where the actions can be executed.

Click **Restrict**.

.. figure:: images/xplay_22.png

Set up the start time about 5 minutes after your current time.

.. figure:: images/xplay_23.png

Click **Set Restriction**.

The **Restrict** label will change to **Restriction Set**. If you hover the mouse, you will see the schedule you just set.

.. note::

  The step above illustrate the way you can achieve this in 5.10 early access. However we made a major enhancement in 5.11.

  You will see three action types that will replace and enhance the “restrict” in 5.10, **Wait for Some Time** / **Wait for Some Day of Month** / **Wait for Some Day of Week**.

  .. figure:: images/xplay_24.png

  .. figure:: images/xplay_25.png

  .. figure:: images/xplay_26.png

  These action type can be used just any other regular action type in any part of the Playbook.
  It helps unlock not only the maintenance window setting but also allow a human approval process happening for a playbook.

Click **Save & Close**, and fill out the following fields:

- **Name**  - Reduce VM CPU - *initials*
- **Description** - Optional
- **Status**  - Enabled

Click **Save**.

Cause CPU Over-Provision
........................

In **Prism Central** > select :fa:`bars` **> Virtual Infrastructure > VMs**, and click **Tomcat**-*initials*.

Take note of your **Tomcat-**\ *initials* VM's CPU Cores (should be 2).

Click **Alerts**, Select **Alert Policy** from **Configure** Dropdown.

Select **VM CPU Overprovisioned** - *initials*, and **Enable** the policy.

Open a console session or SSH into Prism Central, and run the **paintrigger.py** script.

.. code-block:: bash

  ./paintrigger.py

.. note::

  This will resolve all the alerts, force NCC check to run immediately and trigger the alert.

In **Prism Central** > select :fa:`bars` **> Operations > Playbooks**.

Select your **Reduce VM CPU -**\ *initials*, and Click **Plays**.

You should see that there is a play with your playbook name is in **scheduled** status.

Wait for 1-2 minutes past the start time you set earlier, and you should receive an email from Prism.

Check the email to see that its subject and email body have filled the real value for the parameters you set up earlier.

Check the CPU Cores on your **Tomcat-**\ *initials* VM now, you should now see the **Virtual CPU Count** is “1” (instead of “2”).

This means that the trigger happened and the rest of the play is waiting for the window to execute. You can select this play and abort it (from the action button).

Review the Playbook Play
........................

In **Prism Central** > select :fa:`bars` **> Operations > Playbooks**.

Select your **Reduce VM CPU -**\ *initials*, and **disable** it.

Click **Plays**.

You should see that the Play has just completed.

Click the Play, and examine the details.

Things to do Next
+++++++++++++++++

As you can see, XPlay paired with XFit is very powerful.

You can go to “Action Gallery” page and familiarize yourself with all the out-of-the-box Actions, and see all the possible things you can do. 

Getting Engaged with the Product Team
+++++++++++++++++++++++++++++++++++++

+---------------------------------------------------------------------------------+
|  XPlay Product Contacts                                                         |
+================================+================================================+
|  Slack Channel                 |  #Prism-Pro                                    |
+--------------------------------+------------------------------------------------+
|  Product Manager               |  Harry Yang, harry.yang@nutanix.com            |
+--------------------------------+------------------------------------------------+
|  Product Marketing Manager     |                                                |
+--------------------------------+------------------------------------------------+
|  Technical Marketing Engineer  |  Brian Suhr, brian.suhr@nutanix.com            |
+--------------------------------+------------------------------------------------+


Takeaways
+++++++++

- Prism Pro is our solution to make IT OPS smarter and automated. It covers the IT OPS process ranging from intelligent detection to automated remediation.
- X-FIT is our machine learning engine to support smart IT OPS, including forecast, anomaly detection, and inefficiency detection.
- X-Play, the IFTTT for the enterprise, is our engine to enable the automation of daily operations tasks.
- X-Play enables admins to confidently automate their daily tasks within minutes.
