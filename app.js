const { command, parse, argv } = require("yargs");
const yargs = require("yargs");
const yargsParser = require("yargs-parser");
const func = require ("./func")

yargs.command({
    command:'add',
    describe:'add new contact',
    builder:{

        name:{
            describe:'Contact Name',
            demandOption: true,
            type:'string',
        },

        email:{
            describe:'contact email',
            demandOption: false,
            type:'string',
        },

        mobile:{
            describe:'contact mobile phone number',
            demandOption: true,
            type:'string',
        },
    },

    handler(argv){
        const contact = {
            name:argv.name,
            email:argv.email,
            mobile:argv.mobile,
        };
        console.log(contact)
        func.saveContact(argv.name,argv.email,argv.mobile)
    },

});

//Membuat command baru untuk show list//
yargs.command({
    command: 'lists',
    describe: 'show data from contacts.json',
    handler(){
        func.lists(argv.name,argv.email,argv.mobile);
    }
})

//Membuat command baru untuk delete data//
yargs.command({
    command: 'deleted',
    describe: 'show data from contacts.json',

    //Membuat argumen//
    builder:{

        name:{
            describe:'Contact Name',
            demandOption: true,
            type:'string',
        },},

    handler(argv){
        func.deleted(argv.name);
    }
})

yargs.parse();