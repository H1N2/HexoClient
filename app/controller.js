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
    return files.map(item => {
        return {
            filename: item.replace(/\.\S+$/, ''),
            key: nanoid()
        }
    })
})

// 写文件
reg('setFileContent', (filename, content) => {
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
})

// 新建文件
reg('createFile', (filename, type) => {
    if (fs.existsSync(filename)) {
        return {
            code: -1,
            msg: '文件已存在'
        }
    }
    // TODO child_process.exec(`hexo new ${type}`)  type: post/draft
})

function execCmd() {}
