// Config App for 3 environment: production, development, test you
require('dotenv').config()

const appConfig = {
  development: {
    CDNPrivate: 'http://localhost:3000/lsdkfjdlfkj/',
    salt: "ffdfvdfdfdg_P:)P_:L(OLIKUJ",
    serviceName: 'CONTENT',
    port: process.env.DEV_PORT,
    oauth: {
      SERVICE_NAME: 'OAUTH',
      BASE_URL: process.env.DEV_OAUTH_BASE_URL,
      TOKEN_VERIFICATION: '/api/auth/',
      GET_USER: '/api/list',
      GET_WORKSPACE: '/api/workspace/',
      GET_ACCESS_LICENSE: '/internal-api/v1/authentication/access-license/',
    },
    login: {
      SERVICE_NAME: 'LOGIN',
      BASE_URL: process.env.DEV_LOGIN_BASE_URL,
      AUTHORIZE: '/api/v1/authentication/authorize',
      GET_DEFAULT_SERVICES_CONFIG: '/internal-api/v1/authentication/default-config/',
      SET_TOKEN_CACHE: '/internal-api/v1/authentication/token/cache/',
      SET_ACCESS_TOKEN_CACHE: '/internal-api/v1/authentication/access-token/cache/'
    },
    voucher: {
      SERVICE_NAME: 'VOUCHER',
      BASE_URL: process.env.DEV_VOUCHER_BASE_URL,
      REDEEM: '/internal-api/v1/voucher/redeem',
    },
    urlShortener: {
      SERVICE_NAME: 'URL_SHORTENER',
      BASE_URL: process.env.DEV_URL_SHORTNER_BASE_URL,
      MAKE_SHORT_URL: '/api/v1/url',
      EXTERNAL_MAKE_SHORT_URL: '/external-api/v1/url'
    },
    redis: {
      host: process.env.DEV_REDIS_HOST,
      port: process.env.DEV_REDIS_PORT,
    },
    rsmq: {
      messageQueue: 'message-queue',
    },
    timeoutRetry: 15000,
    kafka: {
      host: process.env.DEV_KAFKA_HOST,
      topic_prefix: process.env.DEV_KAFKA_TOPIC_PREFIX,
    },
    dbConnection: process.env.DEV_DB_CONNECTION,
    mysql: {
      host: process.env.DEV_MYSQL_HOST,
      port: process.env.DEV_MYSQL_PORT,
      credentials: {
        username: process.env.DEV_MYSQL_USERNAME,
        password: process.env.DEV_MYSQL_PASSWORD,
        dialect: process.env.DEV_MYSQL_DIALECT
      }
    },
    postgres: {
      host: process.env.DEV_POSTGRESQL_HOST,
      port: process.env.DEV_POSTGRESQL_PORT,
      credentials: {
        username: process.env.DEV_POSTGRESQL_USERNAME,
        password: process.env.DEV_POSTGRESQL_PASSWORD,
        dialect: process.env.DEV_POSTGRESQL_DIALECT,
        certificate: process.env.DEV_POSTGRESQL_DEFAULT_CERTIFICATE
      }
    },
    zipkin: {
      endpoint: process.env.DEV_ZIPKIN_ENDPOINT
    },
    jwt: {
      secret: 'secret',
      expire: '1m'
    },
    salt: 'Segment!n0'
  },
  staging: {
    serviceName: 'CONTENT',
    port: process.env.STAGE_PORT,
    oauth: {
      SERVICE_NAME: 'OAUTH',
      BASE_URL: process.env.STAGE_OAUTH_BASE_URL,
      TOKEN_VERIFICATION: '/api/auth/',
      GET_USER: '/api/list',
      GET_WORKSPACE: '/api/workspace/',
      GET_DEFAULT_SERVICES_CONFIG: '/api/v1/authentication/default-config',
    },
    login: {
      SERVICE_NAME: 'LOGIN',
      BASE_URL: process.env.STAGE_LOGIN_BASE_URL,
      AUTHORIZE: '/api/v1/authentication/authorize',
      GET_DEFAULT_SERVICES_CONFIG: '/internal-api/v1/authentication/default-config/',
      SET_TOKEN_CACHE: '/internal-api/v1/authentication/token/cache/'
    },
    voucher: {
      SERVICE_NAME: 'VOUCHER',
      BASE_URL: process.env.DEV_VOUCHER_BASE_URL,
      REDEEM: '/internal-api/v1/voucher/redeem',
    },
    urlShortener: {
      SERVICE_NAME: 'URL_SHORTENER',
      BASE_URL: process.env.STAGE_URL_SHORTNER_BASE_URL,
      MAKE_SHORT_URL: '/api/v1/url',
      EXTERNAL_MAKE_SHORT_URL: '/external-api/v1/url'
    },
    redis: {
      connections: [
        {
          host: process.env.STAGE_REDIS_HOST_1,
          port: process.env.STAGE_REDIS_PORT_1,
          // password: process.env.REDIS_PASSWORD_1
        },
        {
          host: process.env.STAGE_REDIS_HOST_2,
          port: process.env.STAGE_REDIS_PORT_2,
          // password: process.env.REDIS_PASSWORD_2
        },
        {
          host: process.env.STAGE_REDIS_HOST_3,
          port: process.env.STAGE_REDIS_PORT_3,
          // password: process.env.REDIS_PASSWORD_3
        },
        {
          host: process.env.STAGE_REDIS_HOST_4,
          port: process.env.STAGE_REDIS_PORT_4,
          // password: process.env.REDIS_PASSWORD_4
        },
        {
          host: process.env.STAGE_REDIS_HOST_5,
          port: process.env.STAGE_REDIS_PORT_5,
          // password: process.env.REDIS_PASSWORD_5
        },
        {
          host: process.env.STAGE_REDIS_HOST_6,
          port: process.env.STAGE_REDIS_PORT_6,
          // password: process.env.REDIS_PASSWORD_6
        }
      ],
      password: process.env.STAGE_REDIS_PASSWORD
    },
    rsmq: {
      messageQueue: 'message-queue',
    },
    timeoutRetry: 15000,
    kafka: {
      host: process.env.STAGE_KAFKA_HOST,
      topic_prefix: process.env.STAGE_KAFKA_TOPIC_PREFIX,
    },
    dbConnection: process.env.STAGE_DB_CONNECTION,
    mysql: {
      host: process.env.STAGE_MYSQL_HOST,
      port: process.env.STAGE_MYSQL_PORT,
      credentials: {
        username: process.env.STAGE_MYSQL_USERNAME,
        password: process.env.STAGE_MYSQL_PASSWORD,
        dialect: process.env.STAGE_MYSQL_DIALECT
      }
    },
    postgres: {
      host: process.env.STAGE_POSTGRESQL_HOST,
      port: process.env.STAGE_POSTGRESQL_PORT,
      credentials: {
        username: process.env.STAGE_POSTGRESQL_USERNAME,
        password: process.env.STAGE_POSTGRESQL_PASSWORD,
        dialect: process.env.STAGE_POSTGRESQL_DIALECT,
        certificate: process.env.STAGE_POSTGRESQL_DEFAULT_CERTIFICATE
      }
    },
    zipkin: {
      endpoint: process.env.STAGE_ZIPKIN_ENDPOINT
    },
    jwt: {
      secret: 'secret',
      expire: '1m'
    },
    salt: 'Segment!n0'
  },
  production: {
    serviceName: 'CONTENT',
    port: process.env.PORT,
    oauth: {
      SERVICE_NAME: 'OAUTH',
      BASE_URL: process.env.OAUTH_BASE_URL,
      TOKEN_VERIFICATION: '/api/auth/',
      GET_USER: '/api/list',
      GET_WORKSPACE: '/api/workspace/',
      GET_DEFAULT_SERVICES_CONFIG: '/api/v1/authentication/default-config',
    },
    login: {
      SERVICE_NAME: 'LOGIN',
      BASE_URL: process.env.LOGIN_BASE_URL,
      AUTHORIZE: '/api/v1/authentication/authorize',
      GET_DEFAULT_SERVICES_CONFIG: '/internal-api/v1/authentication/default-config/',
      SET_TOKEN_CACHE: '/internal-api/v1/authentication/token/cache/'
    },
    voucher: {
      SERVICE_NAME: 'VOUCHER',
      BASE_URL: process.env.DEV_VOUCHER_BASE_URL,
      REDEEM: '/internal-api/v1/voucher/redeem',
    },
    urlShortener: {
      SERVICE_NAME: 'URL_SHORTENER',
      BASE_URL: process.env.URL_SHORTNER_BASE_URL,
      MAKE_SHORT_URL: '/api/v1/url',
      EXTERNAL_MAKE_SHORT_URL: '/external-api/v1/url'
    },
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD
    },
    rsmq: {
      messageQueue: 'message-queue',
    },
    timeoutRetry: 15000,
    kafka: {
      host: process.env.KAFKA_HOST,
      topic_prefix: process.env.KAFKA_TOPIC_PREFIX,
    },
    dbConnection: process.env.DB_CONNECTION,
    mysql: {
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      credentials: {
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        dialect: process.env.MYSQL_DIALECT
      }
    },
    postgres: {
      host: process.env.POSTGRESQL_HOST,
      port: process.env.POSTGRESQL_PORT,
      credentials: {
        username: process.env.POSTGRESQL_USERNAME,
        password: process.env.POSTGRESQL_PASSWORD,
        dialect: process.env.POSTGRESQL_DIALECT,
        certificate: process.env.POSTGRESQL_DEFAULT_CERTIFICATE
      }
    },
    zipkin: {
      endpoint: process.env.ZIPKIN_ENDPOINT
    },
    jwt: {
      secret: 'secret',
      expire: '1m'
    },
    salt: 'Segment!n0'
  }
};

module.exports = appConfig[process.env.NODE_ENV || 'production'];