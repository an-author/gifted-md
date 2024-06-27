const {
   spawn
} = require('child_process')
const giftke = require('path')

function startGifted() {
   let giftek = [giftke.join(__dirname, 'gifted/gifted'), ...process.argv.slice(2)]
   console.log([process.argv[0], ...giftek].join('\n'))
   let gift = spawn(process.argv[0], giftek, {
         stdio: ['inherit', 'inherit', 'inherit', 'ipc']
      })
      .on('message', data => {
         if (data == 'reset') {
            console.log('Restarting Gifted...')
            gift.kill()
            startGifted()
            delete gift
         }
      })
      .on('exit', code => {
         console.error('Process Exited with code:', code)
         if (code == '.' || code == 1 || code == 0) startGifted()
      })
}
startGifted()
