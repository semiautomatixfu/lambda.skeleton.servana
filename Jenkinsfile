pipeline {
    agent any

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
            parallel Lint: {
                try {
                    sh "npm run lint:check -- -f checkstyle -o checkstyle-result.xml"
                } finally {
                    step([$class: 'hudson.plugins.checkstyle.CheckStylePublisher',
                        checkstyle: 'checkstyle-result.xml', canRunOnFailed:true])
                }
            }, UnitTests: {
                try {
                    sh 'JEST_JUNIT_OUTPUT=./jest-test-results.xml CI=true npm test -- --ci --reporters=default --reporters=jest-junit --coverage'
                } finally {
                    junit 'jest-test-results.xml'
                    step([$class: 'hudson.plugins.checkstyle.CheckStylePublisher',
                        checkstyle: 'checkstyle-result.xml', canRunOnFailed:true])
                }
            }
        }

        stage('Build') {
            def stageName = "${env.BRANCH_NAME.toLowerCase().replaceAll('-','').replaceAll('/','')}"
            buildPackage(stageName)
        }        
    }
}

def buildPackage(def stageName) {
    sh """
        . /usr/local/bin/assume_dev.sh
        npm run sls:package -- -v -s ${stageName} --env dev
    """
}