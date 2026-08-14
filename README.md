# 🚀 Wanderlust – End-to-End CI/CD Deployment Pipeline

> A production-style DevOps implementation demonstrating automated Continuous Integration and Continuous Deployment (CI/CD) using Jenkins, Docker, Docker Hub, GitHub Webhooks, and AWS EC2.

---

# 🌍 Deployment Status

The application has been successfully deployed and tested on AWS EC2 using an automated Jenkins CI/CD pipeline.

🔗 **Live Demo:**  
http://3.108.64.76:3000/listings

> **Note:** This application is hosted on an AWS EC2 instance. If the above link is unavailable, the EC2 instance may have been stopped or the AWS Free Tier resources may have expired. However, the complete CI/CD pipeline (GitHub Webhooks → Jenkins → Docker Hub → AWS EC2) has been successfully implemented and verified.

> Hosted on an AWS EC2 instance using Docker and deployed automatically through a Jenkins CI/CD pipeline.

---

## 📌 Overview

This project showcases a complete DevOps workflow by automating the deployment of a Dockerized Node.js application.

Instead of manually deploying every change, the entire deployment lifecycle is automated. Every code push to the GitHub repository triggers a Jenkins pipeline through GitHub Webhooks, builds a Docker image, pushes it to Docker Hub, and deploys the latest version on an AWS EC2 instance.

The project demonstrates industry-standard CI/CD practices using containerized deployments.

---

# 🏗️ CI/CD Architecture

```
Developer
     │
     │ Git Push
     ▼
 GitHub Repository
     │
     │ GitHub Webhook
     ▼
 Jenkins Pipeline
     │
     ├── Clone Repository
     ├── Build Docker Image
     ├── Docker Hub Login
     ├── Push Docker Image
     ├── Stop Old Container
     ├── Remove Old Container
     ├── Pull Latest Image
     └── Deploy New Container
     │
     ▼
 AWS EC2 Instance
     │
     ▼
 Docker Container
     │
     ▼
 Wanderlust Application
```

---

# 🚀 CI/CD Pipeline

The Jenkins pipeline automatically performs the following stages whenever new code is pushed to GitHub.

### ✅ Clone Repository

Fetches the latest source code from GitHub.

---

### ✅ Build Docker Image

Builds a Docker image using the Dockerfile.

---

### ✅ Docker Hub Authentication

Authenticates securely using Jenkins Credentials.

---

### ✅ Push Docker Image

Pushes the latest Docker image to Docker Hub.

---

### ✅ Stop Previous Container

Stops the currently running container before deployment.

---

### ✅ Remove Previous Container

Removes the old container to avoid conflicts.

---

### ✅ Pull Latest Docker Image

Downloads the latest Docker image from Docker Hub.

---

### ✅ Deploy Application

Runs a fresh Docker container on the AWS EC2 instance.

---

# 🛠️ Tech Stack

## DevOps

- Jenkins
- GitHub Webhooks
- Docker
- Docker Hub
- AWS EC2

## Backend

- Node.js
- Express.js

## Database

- MongoDB Atlas

## Version Control

- Git
- GitHub

---

# 📂 Project Structure

```
.
├── Dockerfile
├── Jenkinsfile
├── package.json
├── app.js
├── controllers/
├── models/
├── routes/
├── views/
├── public/
└── utils/
```

---

# 🐳 Docker

### Build Docker Image

```bash
docker build -t wanderlust .
```

### Run Docker Container

```bash
docker run -d -p 3000:8080 wanderlust
```

---

# ☁️ AWS EC2 Deployment

The application is deployed inside a Docker container on an AWS EC2 Ubuntu instance.

Deployment is completely automated through Jenkins.

No manual deployment is required after every code push.

---

# 🔄 GitHub Webhooks

GitHub Webhooks automatically trigger Jenkins whenever a new commit is pushed to the repository.

This enables a fully automated Continuous Integration and Continuous Deployment workflow.

---

# 🔐 Jenkins Credentials

Sensitive credentials such as Docker Hub Username and Password are securely managed using Jenkins Credentials.

No secrets are stored inside the source code.

---

# 📸 Pipeline Demonstration

Successfully implemented and tested:

- ✅ GitHub Webhook Trigger
- ✅ Jenkins Pipeline
- ✅ Docker Image Build
- ✅ Docker Hub Push
- ✅ Automated EC2 Deployment
- ✅ Docker Container Deployment
- ✅ Zero Manual Deployment


---

# ⭐ DevOps Highlights

- End-to-End CI/CD Pipeline
- GitHub Webhook Integration
- Automated Docker Image Build
- Automated Docker Hub Push
- Automated EC2 Deployment
- Dockerized Application
- Jenkins Credentials Management
- Zero Manual Deployment
- Production-style Deployment Workflow

---

# 🚀 Future Improvements

- Nginx Reverse Proxy
- HTTPS using Let's Encrypt
- AWS Load Balancer
- Kubernetes Deployment
- GitHub Actions Pipeline
- Monitoring with Prometheus & Grafana
- Terraform Infrastructure as Code

---

## EC2 Infrastructure Setup

The infrastructure setup script is available at:

infrastructure/setup-ec2.sh

# 👨‍💻 Author

**Mohd Tajul**

- GitHub: https://github.com/mohdtajul

---

## ⭐ If you found this project useful, consider giving it a Star.