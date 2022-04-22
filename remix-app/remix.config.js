/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  server: './server.js',
  ignoredRouteFiles: ['.*', '**/__tests__/**'],
  devServerBroadcastDelay: 1000,
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  // devServerPort: 8002
}
