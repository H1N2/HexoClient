const { ipcRenderer, ipcMain } = require('electron')

exports.reg = function(type, cb) {
    ipcMain.on(type, async (event, arg) => {
        if (!cb) return
        let res = cb(arg)
        if (typeof res === 'promise') {
            res = await res
        }
        event.sender.send(`${type}__success`, res)
    })
}

exports.use = function(type, data, cb) {
    if (typeof data === 'function') {
        cb = data
        data = null
    }
    ipcRenderer.send(type, data)
    ipcRenderer.once(`${type}__success`, function(event, arg) {
        cb && cb(arg)
    })
}
