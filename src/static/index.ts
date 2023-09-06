const statics: Record<string, any> = {};
// @ts-ignore
const files: any = import.meta.globEager("./*.ts");
Object.keys(files).forEach((key: any) => {
  if (key === "./index.ts") return;
  const path = key.replace(/(\.\/|\.ts)/g, "");
  statics[path] = files[key].default;
});
export default statics;