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
            
    stage('Test') {
      steps {
        sh 'node test'
      }
    }
  }
}