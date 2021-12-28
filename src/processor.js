const queue = require( './queue' );

queue.on( 'waiting', function( jobId ) {
    console.log( "WAITING:", jobId );
});

queue.on( 'error', function( err ) {
    console.log( err.stack );
});

// Executes the actual task.
queue.process( async job => {
    await new Promise( resolve => setTimeout( resolve, 1250 ) );
    console.log( "processing:", job.id );
});
