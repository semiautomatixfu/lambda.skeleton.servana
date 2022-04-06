pipeline {
    agent any
    environment {
        STAGE_NAME = "${env.BRANCH_NAME.toLowerCase().replaceAll('-','').replaceAll('/','')}"
    }
    tools {nodejs "Node 14.x"}    
    stages {
        
        stage('Git') {
            steps {
                checkout scm
            }
        }
        
        stage('Install') {
            steps {
                sh 'HUSKY_SKIP_INSTALL=1 npm ci'
            }
        }    
                
        stage('Lint and Test') {
            steps {
                parallel Lint: {
                    sh "npm run lint:check -- -f checkstyle -o checkstyle-result.xml"
                }, UnitTests: {
                    sh 'JEST_JUNIT_OUTPUT=./jest-test-results.xml CI=true npm test -- --ci --reporters=default --reporters=jest-junit --coverage'
                }
            }
        }

        stage('Build') {
            steps {       
                echo 'Stage name: ${STAGE_NAME}'         
                buildPackage(ENV_NAME)
            }
        }        
    }
}

def buildPackage(def stageName) {
    sh """
        . /usr/local/bin/assume_dev.sh
        npm run sls:package -- -v -s ${stageName} --env dev
    """
}