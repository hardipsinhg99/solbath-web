import type { Core } from '@strapi/strapi';

const allowedMediaTypes = [
  'image/*',
  'video/*',
  'audio/*',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.*',
  'text/plain',
  'text/csv',
];

const deniedExecutableTypes = [
  'application/vnd.microsoft.portable-executable',
  'application/x-msdownload',
  'application/x-msdos-program',
  'application/x-executable',
  'application/x-dosexec',
  'application/x-sh',
  'text/x-shellscript',
  'application/x-mach-binary',
];

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => {
  // 'local' writes uploads to this server's disk — the default, and what a
  // single-VPS deployment (e.g. Hostinger) should use. Set
  // UPLOAD_PROVIDER=aws-s3 to use S3-compatible object storage instead
  // (AWS S3, or MinIO locally via docker-compose.yml).
  const uploadProvider = env('UPLOAD_PROVIDER', 'local');

  return {
    'users-permissions': {
      config: {
        jwtManagement: 'refresh',
        sessions: {
          httpOnly: true,
        },
      },
    },
    upload: {
      config: {
        ...(uploadProvider === 'aws-s3'
          ? {
              provider: 'aws-s3',
              providerOptions: {
                s3Options: {
                  endpoint: env('MINIO_ENDPOINT'),
                  forcePathStyle: true,
                  credentials: {
                    accessKeyId: env('MINIO_ACCESS_KEY'),
                    secretAccessKey: env('MINIO_SECRET_KEY'),
                  },
                  region: env('MINIO_REGION', 'us-east-1'),
                  params: {
                    Bucket: env('MINIO_BUCKET'),
                  },
                },
                baseUrl: env('MINIO_PUBLIC_URL'),
              },
            }
          : {
              provider: 'local',
            }),
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
        security: {
          allowedTypes: allowedMediaTypes,
          deniedTypes: deniedExecutableTypes,
        },
      },
    },
  };
};

export default config;
