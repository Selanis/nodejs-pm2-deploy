require('dotenv').config({ path: '.env.deploy' });

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
      "ssh_options": "StrictHostKeyChecking=no",
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
