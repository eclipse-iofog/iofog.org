const fse = require('fs-extra');

const docsBasePath = './content/docs';
const nextPath = `${docsBasePath}/next`;
const newVersion = process.argv[2];
const newPath = `${docsBasePath}/${newVersion}`;

console.log(`Copying ${nextPath} to ${newPath}`);
fse.copySync(nextPath, newPath);

const newConfigPath = `${newPath}/config.json`;
console.log(`Updating version in ${newConfigPath}`);
const configJson = fse.readFileSync(newConfigPath);
const config = JSON.parse(configJson);
config[0].version = newVersion;
fse.writeFileSync(newConfigPath, JSON.stringify(config, null, 2));
