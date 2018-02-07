import { reg } from './service'
import path from 'path'
import fs from 'fs'
import { dialog } from 'electron'

// 选择根目录
reg('setdir', () => {
    let path = dialog.showOpenDialog({
        defaultPath: __dirname,
        properties: ['openDirectory']
    })
    return path[0]
})
// 获取指定文件内容
reg('getFileDetail', ({ filename }) => {})

// 获取指定文件夹下的文件列表
reg('getFileList', ({ dirname }) => {})
