const { exec } = require('child_process')
exec(
    'hexo new draft adfa',
    { cwd: '/Users/yuantang/codes/tangge1119' },
    (error, stdout, stderr) => {
        console.log(error, stdout, stderr)
    }
)
