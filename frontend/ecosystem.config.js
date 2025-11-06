require('dotenv').config({ path: '.env.deploy' });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, REPOSITORY_PATH, DEPLOY_REF,
} = process.env;

module.exports = {
  apps : [{
    name   : "mesto-api",
    script : "./src/app.ts"
  }],

  // Настройка деплоя
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: REPOSITORY_PATH,
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp ./.env* ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'cd frontend && pwd && npm i && react-scripts --openssl-legacy-provider build',
    },
  },
}