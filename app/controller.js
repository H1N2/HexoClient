import { reg } from './service'
import path from 'path'
import fs from 'fs'
import { dialog } from 'electron'
import nanoid from 'nanoid'

// 选择根目录
reg('setdir', () => {
    let path = dialog.showOpenDialog({
        defaultPath: __dirname,
        properties: ['openDirectory']
    })
    return path[0]
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
reg('setFileContent', (filename, content) => {})
