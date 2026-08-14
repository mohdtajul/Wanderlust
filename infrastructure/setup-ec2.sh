#!/bin/bash

set -e

echo "=========================================="
echo "   EC2 DEVOPS ENVIRONMENT SETUP"
echo "=========================================="

# ------------------------------------------
# 1. Update system
# ------------------------------------------

echo "[1/9] Updating Ubuntu..."

sudo apt update
sudo apt upgrade -y


# ------------------------------------------
# 2. Install required packages
# ------------------------------------------

echo "[2/9] Installing required packages..."

sudo apt install -y \
    git \
    curl \
    wget \
    unzip \
    ca-certificates \
    gnupg \
    apt-transport-https \
    openjdk-21-jre


# ------------------------------------------
# 3. Install Docker
# ------------------------------------------

echo "[3/9] Installing Docker..."

sudo apt remove -y docker.io docker-doc docker-compose docker-compose-v2 \
    podman-docker containerd runc 2>/dev/null || true

sudo install -m 0755 -d /etc/apt/keyrings

curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
    | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update

sudo apt install -y \
    docker-ce \
    docker-ce-cli \
    containerd.io \
    docker-buildx-plugin \
    docker-compose-plugin

sudo systemctl enable docker
sudo systemctl start docker


# ------------------------------------------
# 4. Allow Jenkins/Ubuntu to use Docker
# ------------------------------------------

echo "[4/9] Configuring Docker permissions..."

sudo usermod -aG docker ubuntu

sudo systemctl restart docker


# ------------------------------------------
# 5. Install Jenkins
# ------------------------------------------

echo "[5/9] Installing Jenkins..."

sudo wget -O /etc/apt/keyrings/jenkins-keyring.asc \
    https://pkg.jenkins.io/debian-stable/jenkins.io-2026.key

echo "deb [signed-by=/etc/apt/keyrings/jenkins-keyring.asc] \
https://pkg.jenkins.io/debian-stable binary/" \
| sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null

sudo apt update

sudo apt install -y jenkins


# ------------------------------------------
# 6. Give Jenkins access to Docker
# ------------------------------------------

echo "[6/9] Configuring Jenkins Docker access..."

sudo usermod -aG docker jenkins

sudo systemctl enable jenkins
sudo systemctl restart jenkins

sleep 10


# ------------------------------------------
# 7. Create Jenkins directories
# ------------------------------------------

echo "[7/9] Creating Jenkins directories..."

sudo mkdir -p /var/lib/jenkins/workspace

sudo chown -R jenkins:jenkins /var/lib/jenkins/workspace


# ------------------------------------------
# 8. Create environment file
# ------------------------------------------

echo "[8/9] Creating environment file..."

sudo touch /var/lib/jenkins/.env

sudo chmod 600 /var/lib/jenkins/.env

sudo chown jenkins:jenkins /var/lib/jenkins/.env


# ------------------------------------------
# 9. Verify installation
# ------------------------------------------

echo "[9/9] Verifying installation..."

echo ""
echo "Docker version:"
docker --version || true

echo ""
echo "Jenkins version:"
jenkins --version || true

echo ""
echo "Git version:"
git --version

echo ""
echo "Java version:"
java -version

echo ""
echo "Jenkins service:"
sudo systemctl --no-pager status jenkins | head -15

echo ""
echo "Docker service:"
sudo systemctl --no-pager status docker | head -15


echo ""
echo "=========================================="
echo "       SETUP COMPLETED"
echo "=========================================="

echo ""
echo "Jenkins should be available at:"
echo "http://YOUR_EC2_PUBLIC_IP:8080"

echo ""
echo "IMPORTANT:"
echo "1. Logout/login once so Docker group permissions apply."
echo "2. Configure Jenkins credentials."
echo "3. Configure your Wanderlust Pipeline Job."
echo "4. Configure GitHub Webhook."
echo "5. Put your actual secrets in /var/lib/jenkins/.env"
echo ""
echo "Infrastructure setup completed successfully."