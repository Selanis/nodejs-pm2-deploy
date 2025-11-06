require('dotenv').config({ path: '.env.deploy' });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, REPOSITORY_PATH, DEPLOY_REF,
} = process.env;

module.exports = {
  apps : [{
    name   : "mesto-api",
    script : "dist/app.js"
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
      'post-deploy': 'cd backend && pwd && npm ci && npm run build && pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
}
