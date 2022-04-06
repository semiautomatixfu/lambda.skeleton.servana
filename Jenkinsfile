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
            nodejs(nodeJSInstallationName: 'Node 14.x') {
                sh 'HUSKY_SKIP_INSTALL=1 npm ci'
            }
        }
    }    
            
    stage('Test') {
        steps {
            nodejs(nodeJSInstallationName: 'Node 14.x') {
                sh 'node test'
            }
        }
    }
  }
}