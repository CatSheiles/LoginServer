let registerusr = document.getElementById('usr');
let registerpw = document.getElementById('pw');
let registerbtn = document.getElementById('btn');

let returnusr = document.getElementById('usrreturn');
let returnpw = document.getElementById('pwreturn');
let returnbtn = document.getElementById('btnreturn');

let server = "http://192.168.0.125" //wookie server

// when user inputs a name and password + hits register, the server gives the user a random salt value
// users password is hashed on the server database with the random salt generated
// the users password + salt applied is all hashed and stored as a hashed value on the server
// with our mockTestServer everything is happening on frontend for test purpose - of course normally backend handles this

// new user resgister
function makeSalt(length) {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    var charactersLength = characters.length;

    for ( var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
}

registerbtn.addEventListener('click', () => {
    let salt = makeSalt(10);

    let pw = sha256(registerpw.value + salt);

    fetch(server + '/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', //this is from mdn fetch uploading JSON data example
        },
        body: JSON.stringify({usr: registerusr.value, password: pw, salt: salt})
    })
})

// return user function
async function Login()
{
    let res = await fetch(server + "/salt", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json', //this is from mdn fetch uploading JSON data example
        },
        body: JSON.stringify({usr: returnusr.value})
    });
    let salt = await res.json();

    //waiting for server to confirm legit return user 
    let login = await fetch(server + "/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json', //this is from mdn fetch uploading JSON data example
        },
        body: JSON.stringify({usr: returnusr.value, password: sha256(returnpw.value + salt.salt)})
    })
    // if server confirms user send success - if not fail
    let loginSuccess = await login.json();
    console.log(loginSuccess);
} 

// if success login
returnbtn.addEventListener('click', () => {
    Login();
})
