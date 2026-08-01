pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                echo 'Repository cloned successfully'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t wanderlust .'
            }
        }

        stage('DockerHub Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'DOCKER_USERNAME',
                    passwordVariable: 'DOCKER_PASSWORD'
                )]) {
                    sh '''
                        echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                    '''
                }
            }
        }
    }
}
