pipeline {
  agent any

  environment {
    AWS_REGION  = "ap-southeast-1"
    AWS_ACCOUNT = "419453211125"
    ECR_REPO    = "trending-frontend"
    IMAGE_TAG   = "latest"
    IMAGE_URI   = "${AWS_ACCOUNT}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}:${IMAGE_TAG}"
    KUBECONFIG  = "/var/lib/jenkins/.kube/config"
  }

  stages {

    stage('Checkout Source') {
      steps {
        git branch: 'main',
            url: 'https://github.com/venkibadduri2802/Trending-Frontend-App.git'
      }
    }

    stage('Install Dependencies & Build') {
      steps {
        sh '''
          cd trendingappfrontend
          npm install
          npm run build
        '''
      }
    }

    stage('Docker Build') {
      steps {
        sh '''
          docker build -t ${ECR_REPO}:${IMAGE_TAG} .
          docker tag ${ECR_REPO}:${IMAGE_TAG} ${IMAGE_URI}
        '''
      }
    }

    stage('Trivy Image Scan') {
      steps {
        sh '''
          trivy image --severity HIGH,CRITICAL ${IMAGE_URI} || true
        '''
      }
    }

    stage('Login to ECR') {
      steps {
        sh '''
          aws ecr get-login-password --region ${AWS_REGION} \
          | docker login --username AWS --password-stdin ${AWS_ACCOUNT}.dkr.ecr.${AWS_REGION}.amazonaws.com
        '''
      }
    }

    stage('Push Image to ECR') {
      steps {
        sh '''
          docker push ${IMAGE_URI}
        '''
      }
    }

    stage('Deploy Frontend to EKS') {
      steps {
        sh '''
          kubectl get nodes
          kubectl apply -f https://raw.githubusercontent.com/venkibadduri2802/Trending-Infra/main/k8s/frontend/deployment.yaml
          kubectl apply -f https://raw.githubusercontent.com/venkibadduri2802/Trending-Infra/main/k8s/frontend/service.yaml
        '''
      }
    }
  }

  post {
    success {
      echo "✅ Frontend deployed successfully to EKS"
    }
    failure {
      echo "❌ Frontend pipeline failed"
    }
  }
}
