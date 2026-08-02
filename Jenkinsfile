pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                echo 'Repository cloned successfully'
            }
        }

        // stage('Build Docker Image') {
        //     steps {
        //         sh 'docker build -t wanderlust .'
        //     }
        // }

        // stage('DockerHub Login') {
        //     steps {
        //         withCredentials([usernamePassword(
        //             credentialsId: 'dockerhub',
        //             usernameVariable: 'DOCKER_USERNAME',
        //             passwordVariable: 'DOCKER_PASSWORD'
        //         )]) {
        //             sh '''
        //                 echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
        //             '''
        //         }
        //     }
        // }

        // stage('Push Docker Image') {
        //     steps {
        //         withCredentials([usernamePassword(
        //             credentialsId: 'dockerhub',
        //             usernameVariable: 'DOCKER_USERNAME',
        //             passwordVariable: 'DOCKER_PASSWORD'
        //         )]) {
        //             sh '''
        //                 docker tag wanderlust "$DOCKER_USERNAME"/wanderlust:latest
        //                 docker push "$DOCKER_USERNAME"/wanderlust:latest
        //             '''
        //         }
        //     }
        // }

        // stage('Deploy to EC2') {
        //     steps {
        //         withCredentials([usernamePassword(
        //     credentialsId: 'dockerhub',
        //     usernameVariable: 'DOCKER_USERNAME',
        //     passwordVariable: 'DOCKER_PASSWORD'
        // )]) {
        //             sh '''
        //         echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

        //         docker stop wanderlust || true
        //         docker rm wanderlust || true

        //         docker pull "$DOCKER_USERNAME"/wanderlust:latest

        //         docker run -d \
        //             --name wanderlust \
        //             --env-file /var/lib/jenkins/.env \
        //             -p 3000:8080 \
        //             "$DOCKER_USERNAME"/wanderlust:latest
        //     '''
        // }
        //     }
        // }
    }
}
