const Metalsmith = require('metalsmith')
const mustache = require('mustache');
const rm = require('rimraf').sync
const ora = require('ora');

const spinner = ora();

module.exports = function (metadata = {}, src, dest) {
  if (!src) {
    return Promise.reject(new Error(`无效的source：${src}`))
  }
  // console.log(metadata, 'meta', src, dest)
  return new Promise((resolve, reject) => {
    Metalsmith(process.cwd())
      .metadata(metadata)
      .clean(false)
      .source(src)
      .destination(dest)
      .use((files, metalsmith, done) => {
        // 自定义插件
        const meta = metalsmith.metadata()
        Object.keys(files).forEach(fileName => {
          if (fileName === 'package.json') {
            const t = files[fileName].contents.toString()
            files[fileName].contents = Buffer.from(mustache.render(t, meta))
          }
        })
        done()
      }).build(err => {
      if (err) {
        spinner.fail(`模板创建失败:${err.message.trim()}`)
        reject(err)
      } else {
        spinner.succeed('模板创建成功!');
        resolve();
      }
    })
  })
}
