.. _calm_3tier_webapp_blueprint:

-----------------------------
Calm: 3-Tier WebApp Blueprint
-----------------------------

Overview
++++++++

In this exercise you will explore the basics of Nutanix Calm by building and deploying a Blueprint that installs and configures MySQL, nginix, and HAProxy on a CentOS image.


Creating A 3-Tier WebApp Blueprint
++++++++++++++++++++++++++++++++++

We'll use a Cloud based CentOS image which does not allow password based authentication, instead it relies on *SSH keys*.  Most Public Clouds authenticate in this manner.

Creating Blueprint
..................

From **Prism Central > Calm** (if you're running 5.8.1 or later), select **Blueprints** from the sidebar and click **+ Create Blueprint > Multi VM/Pod Blueprint**.

Inside the Blueprint Setup window:
Specify **CalmIntro<INITIALS>** in the **Name** field.
Enter a **Description** in the Description field.
Select **Calm** from the **Project** drop down menu.

Click **Proceed** to continue.

Click **Credentials >** :fa:`plus-circle` and fill out the following fields:

- **Credential Name** - CENTOS
- **Username** - centos
- **Secret** - Key
- **Key** - Paste in your private key generated from the previous lesson, or use::

   -----BEGIN RSA PRIVATE KEY-----
   MIIEowIBAAKCAQEAw6CZT4/gAj8hxptH/hck0D0bfptR+ibLci7bxSVJ7Q8hdv3a
   qXEPUHyisNUHI8xnUkvAeh63Tjoymc+No9Nf2C1hctmKwy0Dh3DSYul6MAkNOfQu
   2x3oT+ZajTem0SM3UJ6hmRmIvIimM1AoTFbrH7D3eWWaNKxwgIggD9chaq3EpqvN
   0DTdV/BWdQjqDAeurysg9qxKHis+JYpRHlisj+ES5pDnNXjGEDXcjDgjRRWypgtZ
   zyfjKcaNR3zUfOEe1jZeaBGjUDjkTfjWjs7uQcYptoYSb1N+yfudOGs2dTwlIh4g
   tPswcOCX3jijL7SJ5pBGUBHd8uEayBy1ygeGGwIDAQABAoIBADINZSx2I1pvzLSE
   Bmd8hG7DM8Ww98iJJISSeKh4YfHFbUqEqO2xf7mYKggUeT8vjUABIb4dHclmGoxA
   Dn1cF6m38rbv8hD982kz9KBaHGkt57RsRZDKliXbSk/XbVcVK5H1BGOnpNSYIe3/
   FFBz7LSvEqJ83Hedpys7qPhkkqg4WsgRZrrQNgkA4WOSm8wSnTHrZnI7VHY/MpYI
   606nKx39O1cjN0tiiXKnasgqKZWDfOO7NvhD+YXPnky2XT+mWoPFmDEx8jrbHt7Q
   DTs7xFpC6TYfQPh7lyhsQDcEYjWZn/ZdEKOhCeo24REbez+tz4s2dL3EyGKbQKkz
   FltVMAECgYEA8IGp5e8zJBhwWq/N7bM5NutUZn9SsEQ039KUTzGUmeE4nnt+0iFf
   t4Uor1/Hzj1PrYqgJl9tHhAXQslYH/l6W7X+u49TJAl5SuESfrH3x5+V95lC5nI4
   SEai7PjmTRZ45jc0tCKnxOgQnCcS6qHgyxWxItr3ps7aMCHrmaBTjCsCgYEA0DrO
   YdRxWCFZOrmwP0xfbPKbuv2sjV6MN+SeDFAl4MV+DYMIF0xgESakLWybisaYytwH
   IRANEDAEuXMUblCJic+a35FC14IlzU3ksZVf83zyleKB15iEgDkI7EoyczumlKiD
   sumBoCBALWzwxNd1tiDm9LyHjnpx2+y640VfxdECgYAPleeDrg+bXDYTumbW65Fe
   nLt4dPHP2GuwwX248BaYLj80Df628VC5nNh5HPTeyZxbO6uLMQ3qL9LCEjgywkEK
   pm2ei/gwUqjYkGNZcIEFH7NhOz5ZnrdE/8bZInwSLM2i5Zr1vXUvznYdGG8iY2Ek
   5//1qUj5N1huXBRffUNMxwKBgELQq8p+ZYQ25y/Nx3z4H6KQ0mGU5lpSXUHODNy8
   lvrhxAnH4r+/FRBLyuB8egh0ozBsm6kDQn3QOqPbBlJDa26Z/AMC1GTccQ7IkLpe
   yPQTQq/Ph4RLfzC5nGBdioSpPlFzJRcykBJ2ZsFstHElBbNUKWecWw7fwUslUe59
   IzcRAoGBAJsNwacNC6VeojCKcp4aaQhH8vEd8F5cff2qGTMjplhqSyl1eqr7IJ3n
   AajZbsS2UJa35UxpSXzeMoUaQB6EG5e//BG5Br+6n1aOHlERJV7t9/Z4re9g2lIk
   msuEm+VNsXpZQ4lspARV8kqWcNzrhGSfgq1BEHWIHBKp93mMigL4
   -----END RSA PRIVATE KEY-----


.. figure:: images/510keycredential.png

Click **Save**, and then **Back**.

.. note::
   Credentials are unique to each Blueprint.
   Each Blueprint requires a minimum of 1 Credential.


Click **Save** to save your Blueprint.

Setting Variables
.................

Variables allow extensibility of Blueprints, meaning a single Blueprint can be used for multiple purposes and environments depending on the configuration of its variables.
Variables can either be static values saved as part of the Blueprint or they can be specified at **Runtime** (when the Blueprint is launched). By default, variables are stored in plaintext and visible in the Configuration Pane.
Setting a variable as **Secret** will mask the value and is ideal for variables such as passwords.

Variables can be used in scripts executed against objects using the **@@{variable_name}@@** construct. Calm will expand and replace the variable with the appropriate value before sending to the VM.

In the **Configuration Pane** under **Variable List**, fill out the following fields:

+------------------------+------------------------------------------------------+------------+
| **Variable Name**      | **Value**                                            | **Secret** |
+------------------------+------------------------------------------------------+------------+
| Mysql\_user            | root                                                 |            |
+------------------------+------------------------------------------------------+------------+
| Mysql\_password        | nutanix/4u                                           | X          |
+------------------------+------------------------------------------------------+------------+
| Database\_name         | homestead                                            |            |
+------------------------+------------------------------------------------------+------------+
| INSTANCE\_PUBLIC\_KEY  | Paste in your public key generated from the previous |            |
|                        | lesson, or use the public key below.                 |            |
+------------------------+------------------------------------------------------+------------+

.. code-block:: bash

   ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDDoJlPj+ACPyHGm0f+FyTQPRt+m1H6JstyLtvFJUntDyF2/dqpcQ9QfKKw1QcjzGdSS8B6HrdOOjKZz42j01/YLWFy2YrDLQOHcNJi6XowCQ059C7bHehP5lqNN6bRIzdQnqGZGYi8iKYzUChMVusfsPd5ZZo0rHCAiCAP1yFqrcSmq83QNN1X8FZ1COoMB66vKyD2rEoeKz4lilEeWKyP4RLmkOc1eMYQNdyMOCNFFbKmC1nPJ+Mpxo1HfNR84R7WNl5oEaNQOORN+NaOzu5Bxim2hhJvU37J+504azZ1PCUiHiC0+zBw4JfeOKMvtInmkEZQEd3y4RrIHLXKB4Yb centos@nutanix.com

.. figure:: images/510variables.png

Click **Save**.

Adding a Downloadable Image
...........................

All VMs in AHV are based off of a disk image.  You can select a Downloadable Image via a URI.  During the application deployment, Prism Central will automatically download and create the image specified.  If an image with the same URI already exists on the cluster, it will skip the download and use that instead.

Near the top, click **Configuration > Downloadable Image Configuration** :fa:`plus-circle` and fill out the following fields:

- **Package Name** - CentOS\_7\_Cloud
- **Description** - CentOS 7 Cloud Image
- **Image Name** - CentOS\_7\_Cloud
- **Image Type** - Disk Image
- **Architecture** - X86\_64
- **Source URI** - http://download.nutanix.com/calm/CentOS-7-x86\_64-GenericCloud.qcow2
- **Product Name** - CentOS
- **Product Version** - 7

.. note::
   This Cloud based image is the same that's used for the majority of the Nutanix Pre-Seeded Application Blueprints.

.. figure:: images/510image_config.png

Click **Back** and then **Save**.

Adding DB Service
.................

.. note::
   Application Overview - The pane within the Blueprint Editor used to create and manage Blueprint Layers. Blueprint Layers consist of Services, Application Profiles, and Actions.

In **Application Overview > Services**, click :fa:`plus-circle`.

Note **Service1** appears in the **Workspace** and the **Configuration Pane** reflects the configuration of the selected Service.

Fill out the following fields:

- **Service Name** - MySQL
- **Name** - MySQLAHV

.. note::
   This defines the name of the substrate within Calm. Names can only contain alphanumeric characters, spaces, and underscores.
- **Cloud** - Nutanix
- **OS** - Linux
- **VM Name** - <initials>-MYSQL-@@{calm_array_index}@@-@@{calm_time}@@
- **Image** - CentOS\_7\_Cloud
- **Device Type** - Disk
- **Device Bus** - SCSI
- Select **Bootable**
- **vCPUs** - 2
- **Cores per vCPU** - 1
- **Memory (GiB)** - 4
- **Guest Customization** - Select Guest Customization

    - Leave **Cloud-init** selected and paste in the following script

      .. code-block:: bash

        #cloud-config
        users:
          - name: centos
            ssh-authorized-keys:
              - @@{INSTANCE_PUBLIC_KEY}@@
            sudo: ['ALL=(ALL) NOPASSWD:ALL']

- Select :fa:`plus-circle` under **Network Adapters (NICs)**
- **NIC** - Primary
- **Credential** - CENTOS

Click **Save** and ensure no errors or warnings pop-up.  If they do, resolve the issue, and **Save** again.

With the MySQL service icon selected in the workspace window, scroll to the top of the **Configuration Panel**, click **Package**.
Name the Package as **MYSQL_PACKAGE**, and then click the **Configure install** button.

On the Blueprint Canvas section, a **Package Install** field will pop up next to the MySQL Service tile:

Click on the **+ Task** button, and fill out the following fields on the **Configuration Panel** on the right:

- **Name Task** - Install_sql
- **Type** - Execute
- **Script Type** - Shell
- **Credential** - CENTOS

.. figure:: images/510installpkg.png

Copy and paste the following script into the **Script** field:

.. code-block:: bash

  #!/bin/bash
  set -ex

  sudo yum install -y "http://repo.mysql.com/mysql-community-release-el7-5.noarch.rpm"
  sudo yum update -y
  sudo setenforce 0
  sudo sed -i 's/enforcing/disabled/g' /etc/selinux/config /etc/selinux/config
  sudo systemctl stop firewalld || true
  sudo systemctl disable firewalld || true
  sudo yum install -y mysql-community-server.x86_64

  sudo /bin/systemctl start mysqld
  sudo /bin/systemctl enable mysqld

  #Mysql secure installation
  mysql -u root<<-EOF

  UPDATE mysql.user SET Password=PASSWORD('@@{Mysql_password}@@') WHERE User='@@{Mysql_user}@@';
  DELETE FROM mysql.user WHERE User='@@{Mysql_user}@@' AND Host NOT IN ('localhost', '127.0.0.1', '::1');
  DELETE FROM mysql.user WHERE User='';
  DELETE FROM mysql.db WHERE Db='test' OR Db='test\_%';

  FLUSH PRIVILEGES;
  EOF

  mysql -u @@{Mysql_user}@@ -p@@{Mysql_password}@@ <<-EOF
  CREATE DATABASE @@{Database_name}@@;
  GRANT ALL PRIVILEGES ON homestead.* TO '@@{Database_name}@@'@'%' identified by 'secret';

  FLUSH PRIVILEGES;
  EOF

.. figure:: images/510package_install.png

.. note::
   You can click the **Pop Out** icon on the script field for a larger window to view/edit scripts.
   Looking at the script you can see the package will install MySQL, configure the credentials and create a database based on the variables specified earlier in the exercise.

Select the MySQL service icon in the workspace window again and scroll to the top of the **Configuration Panel**, click **Package**.

- **Click** - Configure Uninstall
- **Click** - + Task
- **Name Task** - Uninstall_sql
- **Type** - Execute
- **Script Type** - Shell
- **Credential** - CENTOS

Copy and paste the following script into the **Script** field:

.. code-block:: bash

  #!/bin/bash
  echo "Goodbye!"

.. figure:: images/510uninstallpkg.png

.. note::
   The uninstall script can be used for removing packages, updating network services like DHCP and DNS, removing entries from Active Directory, etc. It is not being used for this simple example.

Click **Save**. You will be prompted with specific errors if there are validation issues such as missing fields or unacceptable characters.


Creating the Web Server
.......................

From **Prism Central > Calm** (if you're running 5.8.1 or later), select **Blueprints** from the sidebar.

In **Application Overview > Services**, click :fa:`plus-circle`.

Note **Service2** appears in the **Workspace** and the **Configuration Pane** reflects the configuration of the selected Service. You can rearrange the Service icons on the Workspace by clicking and dragging them.

With the WebServer service icon selected in the workspace window, scroll to the top of the **Configuration Panel**, click **VM**.

- **Service Name** - WebServer
- **Name** - WebServer\_AHV
- **Cloud** - Nutanix
- **OS** - Linux
- **VM Name** - WebServer-@@{calm\_array\_index}@@-@@{calm\_time}@@
- **Image** - CentOS\_7\_Cloud
- **Device Type** - Disk
- **Device Bus** - SCSI
- Select **Bootable**
- **vCPUs** - 2
- **Cores per vCPU** - 1
- **Memory (GiB)** - 4
- **Guest Customization** - Select Guest Customization

    - Leave **Cloud-init** selected and paste in the following script

      .. code-block:: bash

        #cloud-config
        users:
          - name: centos
            ssh-authorized-keys:
              - @@{INSTANCE_PUBLIC_KEY}@@
            sudo: ['ALL=(ALL) NOPASSWD:ALL']

- Select :fa:`plus-circle` under **Network Adapters (NICs)**
- **NIC** - Primary
- **Credential** - CENTOS

Click **Save** and ensure no errors or warnings pop-up.  If they do, resolve the issue, and **Save** again.

With the WebServer service icon selected in the workspace window, scroll to the top of the **Configuration Panel**, click **Package**.  Name the Package as **WebServer_PACKAGE**, and then click the **Configure install** button.

On the Blueprint Canvas section, a **Package Install** field will pop up next to the WebServer Service tile.  Click on the **+ Task** button, and fill out the following fields on the **Configuration Panel** on the right:

- **Name Task** - Install_WebServer
- **Type** - Execute
- **Script Type** - Shell
- **Credential** - CENTOS

Copy and paste the following script into the **Script** field:

.. code-block:: bash

  #!/bin/bash
  set -ex

  sudo yum update -y
  sudo yum -y install epel-release
  sudo setenforce 0
  sudo sed -i 's/enforcing/disabled/g' /etc/selinux/config /etc/selinux/config
  sudo systemctl stop firewalld || true
  sudo systemctl disable firewalld || true
  sudo rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm
  sudo yum update -y
  sudo yum install -y nginx php56w-fpm php56w-cli php56w-mcrypt php56w-mysql php56w-mbstring php56w-dom git unzip

  sudo mkdir -p /var/www/laravel
  echo "server {
   listen 80 default_server;
   listen [::]:80 default_server ipv6only=on;
  root /var/www/laravel/public/;
   index index.php index.html index.htm;
  location / {
   try_files \$uri \$uri/ /index.php?\$query_string;
   }
   # pass the PHP scripts to FastCGI server listening on /var/run/php5-fpm.sock
   location ~ \.php$ {
   try_files \$uri /index.php =404;
   fastcgi_split_path_info ^(.+\.php)(/.+)\$;
   fastcgi_pass 127.0.0.1:9000;
   fastcgi_index index.php;
   fastcgi_param SCRIPT_FILENAME \$document_root\$fastcgi_script_name;
   include fastcgi_params;
   }
  }" | sudo tee /etc/nginx/conf.d/laravel.conf
  sudo sed -i 's/80 default_server/80/g' /etc/nginx/nginx.conf
  if `grep "cgi.fix_pathinfo" /etc/php.ini` ; then
   sudo sed -i 's/cgi.fix_pathinfo=1/cgi.fix_pathinfo=0/' /etc/php.ini
  else
   sudo sed -i 's/;cgi.fix_pathinfo=1/cgi.fix_pathinfo=0/' /etc/php.ini
  fi

  sudo systemctl enable php-fpm
  sudo systemctl enable nginx
  sudo systemctl restart php-fpm
  sudo systemctl restart nginx

  if [ ! -e /usr/local/bin/composer ]
  then
   curl -sS https://getcomposer.org/installer | php
   sudo mv composer.phar /usr/local/bin/composer
   sudo chmod +x /usr/local/bin/composer
  fi

  sudo git clone https://github.com/ideadevice/quickstart-basic.git /var/www/laravel
  sudo sed -i 's/DB_HOST=.*/DB_HOST=@@{MySQL.address}@@/' /var/www/laravel/.env

  sudo su - -c "cd /var/www/laravel; composer install"
  if [ "@@{calm_array_index}@@" == "0" ]; then
   sudo su - -c "cd /var/www/laravel; php artisan migrate"
  fi

  sudo chown -R nginx:nginx /var/www/laravel
  sudo chmod -R 777 /var/www/laravel/
  sudo systemctl restart nginx

Select the WebServer service icon in the workspace window again and scroll to the top of the **Configuration Panel**, click **Package**.

Fill out the following fields:

- **Click** - Configure uninstall
- **Click** - + Task
- **Name Task** - Uninstall_WebServer
- **Type** - Execute
- **Script Type** - Shell
- **Credential** - CENTOS

Copy and paste the following script into the **Script** field:

.. code-block:: bash

  #!/bin/bash
  set -ex

  sudo rm -rf /var/www/laravel
  sudo yum erase -y nginx

Click **Save** and ensure no errors or warnings pop-up.  If they do, resolve the issue, and **Save** again.

Adding Dependencies
...................

As our application will require the database to be running before the web server starts, our Blueprint requires a dependency to enforce this ordering.  There are a couple of ways to do this, one of which we've already done without likely realizing it.  If you didn't save after the last step, be sure to do that first.

In the **Application Overview > Application Profile** section, expand the **Default** Application Profile (if you renamed the Application Profile at a previous step, then just select that re-named application profile).  Next, click on the **Create** Profile Action and view the **Workspace**:

.. figure:: images/510dependency1.png

Take note of the **Orange Orchestration Edge** going from the **MySQL Start** task to the **WebServer Package Install** task.  This edge was automatically created by Calm due to the **@@{MySQL.address}@@** macro reference in the **WebServer Package Install** task.  Since the system needs to know the IP Address of the MySQL service prior to being able to proceed with the WebServer Install task, it automatically creates the orchestration edge.  This requires the MySQL service to be started prior to moving on to the WebServer Install task.

Next, back in the **Application Overview > Application Profile** section, select the **Stop** Profile Action.  View the **Workplace** section: notice how there are no orange orchestration edges?  This could cause issues if the MySQL service shutdown slightly before the WebServer accepted a request.  Click on each Profile Action to take note of the current presence (or lack thereof) of the orange orchestration edges.

.. figure:: images/510dependency2.png

To resolve this, we'll manually create a dependency.  In the **Workspace**, select the **WebServer** Service and click the **Create Dependency** icon that appears above the Service icon, and then click on the **MySQL** service.  This represents that the **WebServer** service "depends" upon the **MySQL** service, meaning the **MySQL** service will start before, and stop after, the **WebServer** service.

Click **Save**.  You should see the system draw an **Orange Orchestration Edge** like so:

.. figure:: images/510dependency3.png

Drawing the white dependency arrows will cause Calm to create orange orchestration edges for all **System Defined Profile Actions** (Create, Start, Restart, Stop, Delete, and Soft Delete).  Click on each Profile Action to see the difference compared to before the white dependency arrow was drawn.

Adding Replicas
...............

Calm makes it simple to add multiple copies of a given Service, which is helpful for scale out workloads such as web servers.

In the **Workspace**, select the **WebServer** Service.

In the **Configuration Pane**, select the **Service** tab.

Under **Deployment Config**, change the **Min** number of replicas from 1 to 2, and the **Max** Number of replicas from 1 to 4.

.. figure:: images/510replicas.png

Creating the Load Balancer
..........................

To take advantage of a scale out web tier our application needs to be able to load balance connections across multiple web server VMs. HAProxy is a free, open source TCP/HTTP load balancer used to distribute workloads across multiple servers. It can be used in small, simple deployments and large web-scale environments such as GitHub, Instagram, and Twitter.

In **Application Overview > Services**, click :fa:`plus-circle`.

Select **Service3** and fill out the following fields in the **Configuration Pane**:

- **Service Name** - HAProxy
- **Name** - HAPROXYAHV
- **Cloud** - Nutanix
- **OS** - Linux
- **VM Name** - HAProxy-@@{calm\_array\_index}@@-@@{calm\_time}@@
- **Image** - CentOS\_7\_Cloud
- **Device Type** - Disk
- **Device Bus** - SCSI
- Select **Bootable**
- **vCPUs** - 2
- **Cores per vCPU** - 1
- **Memory (GiB)** - 4
- **Guest Customization** - Select Guest Customization

    - Leave **Cloud-init** selected and paste in the following script

      .. code-block:: bash

        #cloud-config
        users:
          - name: centos
            ssh-authorized-keys:
              - @@{INSTANCE_PUBLIC_KEY}@@
            sudo: ['ALL=(ALL) NOPASSWD:ALL']

- Select :fa:`plus-circle` under **Network Adapters (NICs)**
- **NIC** - Primary
- **Credential** - CENTOS

Scroll to the top of the **Configuration Panel**, click **Package**.

Fill out the following fields:

- **Package Name** - HAPROXY_PACKAGE
- **Click** - Configure install
- **Click** - + Task
- **Name Task** - install_haproxy
- **Type** - Execute
- **Script Type** - Shell
- **Credential** - CENTOS

Copy and paste the following script into the **Script** field:

.. code-block:: bash

  #!/bin/bash
  set -ex

  sudo yum update -y
  sudo yum install -y haproxy
  sudo setenforce 0
  sudo sed -i 's/enforcing/disabled/g' /etc/selinux/config /etc/selinux/config
  sudo systemctl stop firewalld || true
  sudo systemctl disable firewalld || true

  echo "global
   log 127.0.0.1 local0
   log 127.0.0.1 local1 notice
   maxconn 4096
   quiet
   user haproxy
   group haproxy
  defaults
   log global
   mode http
   retries 3
   timeout client 50s
   timeout connect 5s
   timeout server 50s
   option dontlognull
   option httplog
   option redispatch
   balance roundrobin
  # Set up application listeners here.
  listen admin
   bind 127.0.0.1:22002
   mode http
   stats uri /
  frontend http
   maxconn 2000
   bind 0.0.0.0:80
   default_backend servers-http
  backend servers-http" | sudo tee /etc/haproxy/haproxy.cfg

  hosts=$(echo "@@{WebServer.address}@@" | tr "," "\n")
  port=80

  for host in $hosts
    do echo " server host-${host} ${host}:${port} weight 1 maxconn 100 check" | sudo tee -a /etc/haproxy/haproxy.cfg
  done

  sudo systemctl daemon-reload
  sudo systemctl enable haproxy
  sudo systemctl restart haproxy

Select the HAProxy service icon in the workspace window again and scroll to the top of the **Configuration Panel**, click **Package**.

Fill out the following fields:

- **Click** - Configure uninstall
- **Click** - + Task
- **Name Task** - uninstall_haproxy
- **Type** - Execute
- **Script Type** - Shell
- **Credential** - CENTOS

Copy and paste the following script into the **Script** field:

.. code-block:: bash

  #!/bin/bash
  set -ex

  sudo
  yum -y erase haproxy

Click **Save**.

In the **Workspace**, select the **HAProxy** Service and click the **Create Dependency** icon that appears above the Service icon.  Select the **WebServer** Service.

Click **Save** and ensure no errors or warnings pop-up.  If they do, resolve the issue, and **Save** again.

Launching and Managing the Application
......................................

Within the blueprint editor, click **Launch**. Specify a unique **Application Name** (e.g. Calm3TWA-*Initials*) and click **Create**.

Monitor the application as it deploys. Once the application changes into a **RUNNING** state, navigate to the **Services** tab and select the **HAProxy** service.

On the panel that pops open on the right, highlight and copy the **IP Address** field.

In a new browser tab or window, navigate to http://<HAProxy-IP>, and test out your Task Manager Web Application.

.. figure:: images/5103twa2.png

Takeaways
+++++++++

- The Blueprint Editor provides a simple UI for modeling potentially complex applications.
- Blueprints are tied to SSP Projects which can be used to enforce quotas and role based access control.
- Having a Blueprint install and configure binaries means no longer creating specific images for individual applications. Instead the application can be modified through changes to the Blueprint or installation script, both of which can be stored in source code repositories.
- Variables allow another dimension of customizing an application without having to edit the underlying Blueprint.
- There are multiple ways of authenticating to a VM (keys or passwords), which is dependent upon the source image.
- Application status can be monitored in real time.
- Applications typically span across multiple VMs, each responsible for different services. Calm is capable of automated and orchestrating full applications.
- Dependencies between services can be easily modeled in the Blueprint Editor.
- Users can quickly provision entire application stacks for production or testing for repeatable results without time lost to manual configuration.

.. |proj-icon| image:: ../images/projects_icon.png
.. |mktmgr-icon| image:: ../images/marketplacemanager_icon.png
.. |mkt-icon| image:: ../images/marketplace_icon.png
.. |bp-icon| image:: ../images/blueprints_icon.png
