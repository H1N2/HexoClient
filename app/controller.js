import { reg } from './service'
import path from 'path'
import fs from 'fs'
import { dialog } from 'electron'
import nanoid from 'nanoid'
import { exec } from 'child_process'

// 选择根目录
reg('setdir', () => {
    let path = dialog.showOpenDialog({
        defaultPath: __dirname,
        properties: ['openDirectory']
    })
    if (path && Array.isArray(path)) {
        return path[0]
    } else {
        return ''
    }
})

// 获取指定文件内容
reg('getFileDetail', filename => {
    let file = fs.readFileSync(filename, 'utf-8')
    return file
})

// 获取指定文件夹下的文件列表
reg('getFileList', dirname => {
    let files = fs.readdirSync(dirname)
    return files
        .map(item => {
            return {
                filename: item.replace(/\.\S+$/, ''),
                key: nanoid()
            }
        })
        .filter(item => item.filename)
})

// 写文件
reg('setFileContent', ({ filename, content }) => {
    if (!fs.existsSync(filename)) {
        return {
            code: -1,
            msg: '文件不存在'
        }
    }
    fs.writeFileSync(filename, content)
    return {
        code: 0,
        msg: '保存成功'
    }
})

// 删除文件
reg('deleteFile', filename => {
    fs.unlinkSync(filename)
    return {
        code: 0,
        msg: '删除成功'
    }
})

// 新建文件
reg('createFile', ({ filename, dir, type }) => {
    let path = `${dir}/source/_${type}s/${filename}.md`
    if (fs.existsSync(path)) {
        return {
            code: -1,
            msg: '文件已存在'
        }
    }
    let command = `hexo new ${type} ${filename}`
    let res = execCmd(command, dir)
    return res
})

// 发布草稿
reg('publishDraft', ({ title, dir }) => {
    let command = `hexo publish ${title}`
    let res = execCmd(command, dir)
    return res
})

// 部署
reg('deploy', dir => {
    let command = `hexo g -d`
    let res = execCmd(command, dir)
    return res
})

// 使用child_process来执行相关命令
function execCmd(command, cwd) {
    return new Promise((resolve, reject) => {
        exec(command, { cwd }, (error, stdout, stderr) => {
            if (error) {
                resolve({
                    code: -1,
                    msg: error
                })
                return
            }
            resolve({
                code: 0,
                msg: stdout
            })
        })
    })
}
