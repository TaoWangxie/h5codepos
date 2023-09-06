// https://vuex.vuejs.org/en/modules.html
// @ts-ignore
const files:any = import.meta.globEager('./*/*.ts')
const modules: any = {}
console.log('files',files);

Object.keys(files).forEach((key:any) => {
  if (key === './index.ts') return
  const path = key.replace(/(\.\/|\.ts)/g, '')
  const [namespace, imported] = path.split('/')
  
  if (!modules[namespace]) {
    modules[namespace] = {
      namespaced: true
    }
  }
  modules[namespace][imported] = files[key].default
})

export default modules