pipeline {
    agent any

    environment {
        DISCORD_TOKEN = credentials('DISCORD_TOKEN')
        PROJECT_DIR = "/home/bot"
    }

    tools {nodejs "node"}

    stages {
        stage('Clone Git Repository') {
            steps {
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    // install dependencies
                    sh "cd $PROJECT_DIR && npm install"
                }
            }
        }

        stage('Build Project') {
            steps {
                script {
                    // build
                    sh "cd $PROJECT_DIR && npm run build"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // deploy ssh process
                    echo "Token is: ${DISCORD_TOKEN}"
                    sh 'ssh root@kevin-huet.fr "sh /home/jenkins/deploy.sh ${DISCORD_TOKEN}"'
                }
            }
        }
    }
}
