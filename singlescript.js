// get particular post
// http://167.99.138.67:1111/getsinglepost/:name/:id'
// put user name instead of ":name" and post id instead of ":id"


const singlePostDiv = document.getElementById('singlePostDiv')

let savedId = localStorage.getItem('id')

let savedName = localStorage.getItem('savedName')

let arr1

fetch(`http://167.99.138.67:1111/getsinglepost/${savedName}/${savedId}`)
    .then(response => response.json())
    .then(data => {
        arr1 = data.data
        console.log(arr1);
        showSelectedPost()
    })



function showSelectedPost(){

    let card = document.createElement('div')
    card.setAttribute('class', 'singlePostCard')

    let image = document.createElement('img')
    image.src = arr1.image
    image.style.width = '100%'
    

    let date = document.createElement('div')
    date.innerText =new Date(arr1.timestamp).toDateString()
    date.style.fontSize = '20px'
    date.style.marginTop = '10px'
    

    let title = document.createElement('div')
    title.innerText = arr1.title
    title.style.fontSize = '25px'
    title.style.fontWeight = 'bold'
    title.style.marginTop = '10px'
    title.style.wordWrap = 'break-word'

    let description = document.createElement('div')
    description.innerText = arr1.description
    description.style.color = '#666666'
    description.style.fontSize = '35px'
    description.style.wordWrap = 'break-word'
    description.style.fontStyle = 'italic'
    description.style.marginTop = '20px'

    let userName = document.createElement('div')
    userName.innerText = arr1.username
    userName.style.marginTop = '20px'
    userName.style.fontWeight = 'bold'
    userName.style.fontSize = '20px'
    userName.style.marginBottom = '20px'


    card.appendChild(image)
    card.appendChild(date)
    card.appendChild(title)
    card.appendChild(description)
    card.appendChild(userName)

    singlePostDiv.appendChild(card)
}