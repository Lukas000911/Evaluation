const logName = document.getElementById('logName')
const logPass = document.getElementById('logPass')
const logInButton = document.getElementById('logInButton')

logInButton.addEventListener('click', logInPage)


function logInPage(){
 
    let logUser = {
        name: logName.value,
        password: logPass.value
        // name: localStorage.getItem('name'),
        // password: localStorage. getItem('password')
    }
    fetch('http://167.99.138.67:1111/login',{
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(logUser)
    }).then(response => response.json())
        .then(data =>{
            if(data.success){
                localStorage.setItem('secretKey', data.secretKey),
                localStorage.setItem('name', logName.value),
                localStorage.setItem('password', logPass.value),
                window.location.href = 'index.html'
            } else{
                alert(`${data.message}`)
            }
        }) 
    
}