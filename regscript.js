const regName = document.getElementById('regName')
const regPass1 = document.getElementById('regPass1')
const regPass2 = document.getElementById('regPass2')
const regButton = document.getElementById('confirmRegistration')

regButton.addEventListener('click', registerUser)

function registerUser(){
    let newUser = {
        name: regName.value,
        passwordOne: regPass1.value,
        passwordTwo: regPass2.value
    }
    fetch('http://167.99.138.67:1111/createaccount', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    }).then(response => response.json())
        .then(data => localStorage.setItem('name', regName.value),
        localStorage.setItem('password', regPass1.value),
        window.location.href = 'login.html')
}

