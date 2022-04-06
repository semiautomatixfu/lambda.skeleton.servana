properties([
    parameters([
        booleanParam(name: 'DEPLOY_DEV', defaultValue: false, description: 'Should this build be deployed to DEV?'),
        booleanParam(name: 'DEPLOY_PROD', defaultValue: false, description: 'Should this build be deployed to PROD?')
    ]),
    disableConcurrentBuilds() // This limits build concurrency to 1 per branch
])

pipeline {
    agent any
    environment {
        // "${env.BRANCH_NAME.toLowerCase().replaceAll('-','').replaceAll('/','')}"
        STAGE_NAME = "${env.BRANCH_NAME}" 
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
                echo "Branch name: ${env.BRANCH_NAME}"
                sh "npm run sls:package -- -v -s ${env.BRANCH_NAME} --env dev"
            }
        }  

        stage('Deploy (Development Environment') {
            when {
                expression {
                    env.BRANCH_NAME == 'main' || params.DEPLOY_DEV == true
                }
            }            
            steps {
                sh "npm run sls:deploy -- -v -s ${env.BRANCH_NAME} --env dev --force"
            }
        }  

        stage('Deploy (Production Environment') {
            when {
                expression {
                    env.BRANCH_NAME == 'main' || params.DEPLOY_DEV == true
                }
            }            
            steps {
                echo 'Deploying to production'
            }
        }                    
    }
}