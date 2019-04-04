const { exec } = require('child_process');

exec('cd ./node_modules/serialport/; CPPFLAGS="$CPPFLAGS -fPIC" node-gyp rebuild', function(err, stdout, stderr) {
    if (err) {
        // should have err.code here?
    }
    console.log(stdout);
});
