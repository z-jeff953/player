import fs from 'fs' // 引入 Node.js 的文件系统模块，用于进行文件和文件夹的操作
import path from 'path' // 引入 Node.js 的路径处理模块，用于处理文件路径
import { promisify } from 'util' // 引入 Node.js 的 util 模块，用于将回调风格的异步函数转换为 Promise 风格的异步函数
import { exec } from 'child_process' // 引入 Node.js 的 child_process 模块，用于执行子进程命令
import chalk from 'chalk' // 引入 chalk 包，用于在命令行中输出带颜色的文本

// 将 fs 模块的一些异步函数转换为 Promise 风格的异步函数
const readdir = promisify(fs.readdir) // readdir: 读取目录中的文件和子目录，并返回一个 Promise 对象
const stat = promisify(fs.stat) // stat: 获取文件或目录的状态信息，并返回一个 Promise 对象
const copyFile = promisify(fs.copyFile) // copyFile: 将文件从源路径复制到目标路径，并返回一个 Promise 对象
const readFile = promisify(fs.readFile) // readFile: 读取文件的内容，并返回一个 Promise 对象
const writeFile = promisify(fs.writeFile) // writeFile: 将内容写入文件，并返回一个 Promise 对象

const templateFolder = './template' // 模板文件夹的路径，需根据实际情况修改
const packagesFolder = './packages' // packages 文件夹的路径，需根据实际情况修改
const packageNamePrefix = '@dash-vdk/' // packages 文件夹中包名的前缀，需根据实际情况修改

async function copyTemplateFiles(packageName, templateName) {
  try {
    // 构建目标文件夹路径
    const targetFolder = path.join(packagesFolder, packageName)
    const sourceFolder = path.join(templateFolder, templateName)

    // 判断目标文件夹是否已存在
    const targetFolderExists = await checkFolderExists(targetFolder)
    if (targetFolderExists) {
      console.error(chalk.red(`目标文件夹 ${targetFolder} 已存在，请选择其他名称！`))
      return
    }

    // 复制模板文件夹的所有文件到目标文件夹
    await copyFolderFiles(sourceFolder, targetFolder)
    console.log(chalk.green(`成功复制模板文件夹到 ${targetFolder}`))

    // 修改 package.json 中的 name 字段
    await modifyPackageJson(packageName)

    // 执行 pnpm install
    await pnpmInstall()
  } catch (err) {
    console.error(chalk.red('操作失败：', err))
  }
}

// 执行 pnpm install 命令的异步函数
async function pnpmInstall() {
  console.log(chalk.yellow('正在执行 pnpm install...'))
  // 执行 pnpm install 命令
  exec('pnpm install', (error, stdout, stderr) => {
    if (error) {
      console.error(chalk.red(`执行 pnpm install 失败: ${error.message}`))
      return
    }
    console.log(chalk.green('pnpm install 命令执行成功'))
  })
}

// 修改 package.json 中的 name 字段的异步函数
async function modifyPackageJson(packageName) {
  try {
    // 拼接目标文件夹路径
    const targetFolder = `${packagesFolder}/${packageName}`
    // 拼接 package.json 文件路径
    const packageJsonPath = path.join(targetFolder, 'package.json')
    // 读取 package.json 文件内容
    const packageJson = await readFile(packageJsonPath, 'utf-8')
    // 解析 package.json 内容为 JSON 对象
    const packageJsonObj = JSON.parse(packageJson)
    // 修改 package.json 中的 name 字段
    packageJsonObj.name = packageNamePrefix + packageName
    // 将修改后的 JSON 对象写入 package.json 文件
    await writeFile(
      packageJsonPath,
      JSON.stringify(packageJsonObj, null, 2)
    )
    // 输出成功修改 name 字段的提示信息
    console.log(
      chalk.green(
        `成功修改 ${packageJsonPath} 中的 name 字段为 ${packageJsonObj.name}`
      )
    )
  } catch (error) {
    // 捕获错误并输出错误信息
    console.error(chalk.red(`修改 package.json 中的 name 字段失败: ${error}`))
  }
}

async function copyFolderFiles(sourceFolder, targetFolder) {
  try {
    // 检查目标文件夹是否存在，不存在则创建
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder)
      console.log(
        chalk.green(`已复制文件夹：${sourceFolder} -> ${targetFolder}`)
      )
    }

    // 获取源文件夹中的所有文件和子文件夹
    const items = await readdir(sourceFolder)

    // 遍历每个文件和子文件夹
    for (const item of items) {
      const sourcePath = path.join(sourceFolder, item)
      const targetPath = path.join(targetFolder, item)

      // 判断是文件还是文件夹
      const itemStat = await stat(sourcePath)
      if (itemStat.isFile()) {
        // 复制文件到目标文件夹
        await copyFile(sourcePath, targetPath)
        console.log(
          chalk.green(`已复制文件：${sourcePath} -> ${targetPath}`)
        )
      } else if (itemStat.isDirectory()) {
        // 如果是文件夹，则递归调用复制文件夹函数
        await copyFolderFiles(sourcePath, targetPath)
      }
    }
  } catch (err) {
    console.error(chalk.red('复制文件夹时出错：', err))
  }
}

// 异步函数：检查文件夹是否存在
async function checkFolderExists(folderPath) {
  try {
    // 获取文件夹的状态信息
    const stats = await stat(folderPath)
    // 判断是否为文件夹
    return stats.isDirectory()
  } catch (err) {
    // 捕获错误并返回 false，表示文件夹不存在
    return false
  }
}

const args = process.argv.slice(2) // 去除前两个参数(node和文件路径)，获取剩余的参数
// 设置默认值
let templateName = 'default'
let packageName = 'new-package'

// 解析命令行参数
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--template' && i < args.length - 1) {
    // 获取模板路径
    templateName = args[i + 1]
    i++
  } else if (args[i] === '--name' && i < args.length - 1) {
    // 获取目标名称
    packageName = args[i + 1]
    i++
  }
}

// 输出默认值和解析后的值
console.log(chalk.yellow(`模板名称：${templateName}`))
console.log(chalk.yellow(`目标名称：${packageName}`))

if (!templateName || !packageName) {
  console.error(
    chalk.red('请提供模板路径和目标名称，格式为 --template XXX --name XXX')
  )
} else {
  // 执行复制模板文件操作
  copyTemplateFiles(packageName, templateName)
}
