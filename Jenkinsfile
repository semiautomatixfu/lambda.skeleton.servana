pipeline {
  agent any
    
  tools {nodejs "node"}
    
  stages {
        
    stage('Git') {
      steps {
        checkout scm
      }
    }
     
    stage('Install') {
        sh 'HUSKY_SKIP_INSTALL=1 npm ci'
    }    
            
    stage('Test') {
      steps {
        sh 'node test'
      }
    }
  }
}