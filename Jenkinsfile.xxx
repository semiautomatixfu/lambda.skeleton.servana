properties([
    parameters([
        booleanParam(name: 'DEPLOY_DEV', defaultValue: false, description: 'Should this build be deployed to DEV?'),
        booleanParam(name: 'DEPLOY_TEST', defaultValue: false, description: 'Should this build be deployed to TEST?'),
        booleanParam(name: 'DEPLOY_PROD', defaultValue: false, description: 'Should this build be deployed to PROD?')
    ]),
    disableConcurrentBuilds() // This limits build concurrency to 1 per branch
])

node('fu && node') {
    try {
        def stageName = "${env.BRANCH_NAME.toLowerCase().replaceAll('-','').replaceAll('/','')}"

        stage('Checkout') {
            checkout scm
        }

        stage('Install') {
            sh "HUSKY_SKIP_INSTALL=1 npm ci"
        }

        stage('Testing') {
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
            buildPackage(stageName)
        }

        stage('Deploy (Development Environment') {
            if (env.FU_DEPLOY_DEV == 'TRUE' && (env.BRANCH_NAME == 'master' || params.DEPLOY_DEV == true)) {
                deployTo('/usr/local/bin/assume_dev.sh', stageName, 'dev')
            }
        }

        stage('Deploy (Testing Environment') {
            if (env.FU_DEPLOY_TEST == 'TRUE' && (env.BRANCH_NAME == 'master' && params.DEPLOY_TEST == true)) {
                deployTo('/usr/local/bin/assume_test.sh', stageName, 'test')
            }
        }

        //only deploy master branch to production and require manual build trigger
        stage('Deploy (Production Environment') {
            if (env.FU_DEPLOY_PROD == 'TRUE' && (env.BRANCH_NAME == 'master' && params.DEPLOY_PROD == true)) {
                deployTo('/usr/local/bin/assume_prod.sh', stageName, 'prod')
            }
        }

        echo "Success, with result: ${currentBuild.result}"

    } catch(e) {
         currentBuild.result = "FAILURE"
         notifyFailure()
    }
}

def buildPackage(def stageName) {
    sh """
        . /usr/local/bin/assume_dev.sh
        npm run sls:package -- -v -s ${stageName} --env dev
    """
}

def deployTo(assume, def stageName, def env) {
    sh """
        . ${assume}
        npm run sls:deploy -- -v -s ${stageName} --env ${env} --force
    """
}

def notifyFailure() {
    echo "Build failed, with result: ${currentBuild.result}"

    if (env.BRANCH_NAME == 'master') {
        slackSend(
                color: '#FFFF00',
                message: "${currentBuild.result}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' by ${env.CHANGE_AUTHOR_EMAIL} (${env.BUILD_URL})")

    }
}
