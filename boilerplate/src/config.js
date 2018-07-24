require('dotenv').config();

module.exports = {
  fastify: {
    port: process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000,
    env: process.env.ENV || 'local',
    logger: {
      level: process.env.LOG || 'info',
    },
  },
  s3: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY || '',
    documentsBucketName: process.env.AWS_S3_BUCKET_NAME_DOCUMENTS || '',
  },
};
