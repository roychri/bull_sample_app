const express = require('express');
const app = express();
const port = 3000;
const queue = require( './queue' );

app.get('/', async (req, res) => {
    try {
        // This will add a task to the queue to be
        // processed by the running processor.
        await queue.add({ fu: 'bar' }, {
            delay: 2000
        });
        res.send('Hello World!');
    } catch ( err ) {
        console.log( err.stack );
    }
});


const Arena = require('bull-arena');
const arena = Arena({
    Bull: require( 'bull' ),

    queues: [
        {
            type: 'bull',
            name: "test",
            hostId: "MyAwesomeQueues",
            redis: {
                host: "redis",
            }
        },
    ],
}, {
    basePath: '/',
    disableListen: true,
});
app.use( '/arena', arena );

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
