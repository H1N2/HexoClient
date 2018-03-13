const { ipcRenderer, ipcMain } = require('electron')
import nanoid from 'nanoid'

exports.reg = function(channel, cb) {
    ipcMain.on(channel, async (event, arg) => {
        if (!cb) return
        const { data, id } = arg
        let res = cb(data)
        if (typeof res.then === 'function') {
            res = await res
        }
        event.sender.send(`${channel}__success__${id}`, res)
    })
}

exports.use = function(channel, data) {
    return new Promise((resolve, reject) => {
        if (typeof data === 'function') {
            cb = data
            data = null
        }
        const id = nanoid()
        ipcRenderer.send(channel, { data, id })
        ipcRenderer.once(`${channel}__success__${id}`, function(event, arg) {
            resolve(arg)
        })
    })
}
