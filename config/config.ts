// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';
const { REACT_APP_ENV } = process.env;

const CONFIG = {
  local: {
    domain: '/dev/api',
    loginPath: '/user/login',
    base: '/',
    publicPath: '/',
  },
  dev: {
    domain: 'https://test79.ubtrobot.com',
    loginPath: 'https://test79.ubtrobot.com/webproject/operation-web/index.html',
    base: '/webproject/operation-web/modules/tadpoleMS/dist/',
    publicPath: '/webproject/operation-web/modules/tadpoleMS/dist/',
  },
  pre: {
    domain: 'https://prerelease.ubtrobot.com',
    loginPath: 'https://prerelease.ubtrobot.com/operation-web/index.html#/login',
    base: '/operation-web/modules/tadpoleMS/dist/',
    publicPath: '/operation-web/modules/tadpoleMS/dist/',
  },
  prod: {
    domain: 'https://internal.ubtrobot.com',
    loginPath: 'https://operation.ubtrobot.com/operationSystem-web/#/login',
    base: '/operationSystem-web/modules/tadpoleMS/dist/',
    publicPath: '/operationSystem-web/modules/tadpoleMS/dist/',
  },
};

const CURCONFIG = CONFIG[REACT_APP_ENV || 'local'];

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  define: {
    API_DOMAIN: CURCONFIG.domain,
    LOGIN_PATH: CURCONFIG.loginPath,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
    'root-entry-name': 'default',
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      // 或者使用在线的版本
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from 'umi'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  nodeModulesTransform: {
    type: 'none',
  },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
  base: CURCONFIG.base,
  publicPath: CURCONFIG.publicPath,
});
