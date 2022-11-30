//Require file system//
const fs = require('fs')

//Require readline//
const rl = require('readline');

//Require atau import npm validator *jangan sampe lupa//
const validator = require('validator');

//Ask apakah sudah ada folder data dan file contacts.json atau belum//
const dataPath = './data/contacts.json';

//Membuat file contact.json apabila file belum exist//
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8'); //Menggunakan kurung siku [] karena filenya berformat json//
}

//Membaca file contacts.json//
const file = fs.readFileSync('data/contacts.json', 'utf8');
const contacts = JSON.parse(file);

//Savecontact//
const saveContact = (name, email, mobile) => {

    const contact = { name, email, mobile };

    //Peringatan yang akan muncul apabila nama yang diisi salah//
    if (!validator.isAlpha(name, 'en-US', { ignore: ' ' })) {
        console.log('Nama tidak valid!');
        return (false)
    }

    //Peringatan yang akan muncul apabila email yang diisi salah//
    if (!validator.isEmail(email)) {
        console.log('Email tidak valid!');
        return (false)
    }

    //Peringatan yang akan muncul apabila nomor yang diisi salah//
    if (!validator.isMobilePhone(mobile, 'id-ID')) {
        console.log('Nomor tidak valid!');
        return (false)
    }

    //Fungsi untuk menemukan data yang duplikat//
    const duplicate = contacts.find(function (contact) { //find adalah web API//
        console.log(name);
        return contact.name === name
    });

    //Peringatan yang akan muncul apabila nama yang diisi bersifat double//
    if (duplicate) {
        console.log('Nama sudah terdaftar!');
        return false;
    }

    //Menyimpan data ke json//
    contacts.push(contact);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log('Thank you for coming!');
}

//Membuat fungsi untuk menampilkan list ke terminal//
const lists = () => {
    contacts.forEach(contacts => {
        console.log(`Name : ${contacts.name} \tEmail : ${contacts.email} \tMobile : ${contacts.mobile}`);
    });
}

//Membuat fungsi delete menggunkan API filter//
const deleted = (name) => {
    const fil = contacts.filter(function (contact) {
        return contact.name !== name
})

//Tulisan yang akan muncul apabila data berhasil dihapus//
if(fil) {
    console.log('Data telah terhapus!');
    fs.writeFileSync('./data/contacts.json', JSON.stringify(fil))
}}


//Ekspor function *taronya diakhir ygy//
module.exports = { saveContact, lists, deleted };