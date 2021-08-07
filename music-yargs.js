const yargs = require('yargs');
const argv = yargs
    .command('read', 'Tells whether an year is leap year or not')
    .command('filter', 'Tells whether an yasdfadear is leap year or not', {
        all: {
            description: 'the year to casdfheck for',
            alias: 'all',
            type: 'string',
        }
    })
    .option('time', {
        alias: 't',
        description: 'Tell the present Time',
        type: 'boolean',
    })
    .help()
    .alias('help', 'h')
    .argv;

if (argv.time) {
    console.log('The current time is: ', new Date().toLocaleTimeString());
}

if (argv._.includes('read')) {
        console.log(`Reading`);
}
if (argv._.includes('filter')) {
        console.log(`${argv.all}`);
}
console.log(argv)
