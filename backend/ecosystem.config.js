require('dotenv').config({ path: '.env.deploy' });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, REPOSITORY_PATH, DEPLOY_REF = 'origin master',
} = process.env;

module.exports = {
  apps : [{
    name   : "mesto-api",
    script : "./src/app.ts"
  }],

  // Настройка деплоя
  deploy: {
    production: {
      key: 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIK1iPebIJ2xkp8S1SuVYQN2u48jBPkIYv0m504/dVUlf',
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: REPOSITORY_PATH,
      path: DEPLOY_PATH,
      'pre-deploy': `scp ./*.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'npm i',
      'restart': 'pm2 restart app'
    },
  },
}
