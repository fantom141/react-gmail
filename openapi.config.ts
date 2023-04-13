import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: 'http://localhost:3001/swagger-ui-json',
  apiFile: './src/store/api/base-api.ts',
  apiImport: 'baseApi',
  hooks: {
    queries: true,
    lazyQueries: true,
    mutations: true,
  },
  outputFiles: {
    './src/store/api/message-api.ts': {
      filterEndpoints: /message/i,
    },
    './src/store/api/draft-api.ts': {
      filterEndpoints: /draft/i,
    },
  },
};

export default config;
