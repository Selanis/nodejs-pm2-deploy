require('dotenv').config();

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, REPOSITORY_PATH, DEPLOY_REF = 'origin/master',
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
      'pre-deploy': `scp ./*.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'npm i',
      'build': 'npm run build',
      'restart': 'pm2 restart app'
    },
  },
}