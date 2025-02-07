//import environment from './src/environments'
const fs = require('fs') 
const path = './src/devextreme-license.ts'; 
const key = process.env.DEVEXTREME_KEY ?? ''; 
 console.log(process.env)
if (key || !fs.existsSync(path)) { 
    fs.writeFileSync(path, `export const licenseKey = '${key}';`); 
}