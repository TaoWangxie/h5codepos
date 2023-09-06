import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join, resolve } from 'path'
import { writeFileSync } from 'fs'
/* element-plus 按需自动导入 */
import { ConfigEnv, loadEnv, UserConfigExport } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default  ({ command, mode }: ConfigEnv): UserConfigExport => {

  const isBuild = command === 'build'
  return defineConfig({
    plugins: [
      vue(),
      ElementPlus(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      (function () {
        let basePath = ''
        return {
          name: "vite:micro-app",
          apply: 'build',
          configResolved(config) {
            basePath = `${config.base}${config.build.assetsDir}/`
          },
          writeBundle(options, bundle) {
            for (const chunkName in bundle) {
              if (Object.prototype.hasOwnProperty.call(bundle, chunkName)) {
                const chunk:any = bundle[chunkName]
                if (chunk.fileName && chunk.fileName.endsWith('.js')) {
                  chunk.code = chunk.code.replace(/(from|import\()(\s*['"])(\.\.?\/)/g, (all, $1, $2, $3) => {
                    return all.replace($3, new URL($3, basePath))
                  })
                  const fullPath = join(options.dir, chunk.fileName)
                  writeFileSync(fullPath, chunk.code)
                }
              }
            }
          },
        }
      })(),
    ],
    server: {
      open: true,
      port: 3002,
    },
    base: `${process.env.NODE_ENV === 'production' ? 'http://nuwa.kq.ziroom.com' : ''}/nuwa/`,
    // base: `/nuwa/`,
    build: {
      outDir: 'build/nuwa',
      target: 'es2015'
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, 'src'),
      }
    },
  })

}
