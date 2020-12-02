// get particular user posts
// http://167.99.138.67:1111/getuserposts/:name
// put user name instead of ":name"

const myPostContainer = document.getElementById('myPostContainer')

let savedName = localStorage.getItem('name')

let arr = []

fetch(`http://167.99.138.67:1111/getuserposts/${savedName}`)
    .then(response => response.json())
    .then(data => {
        data.data.map(item =>{
            arr.push(item)
        })
       console.log(arr)
       showMyPosts()
    })

function showMyPosts(){
    arr.map(item =>{
        let card = document.createElement('div')
        card.style.width = '360px'
        card.style.margin = '7px'
        card.setAttribute('id', item.id)
        card.style.cursor = 'pointer'
        
        
        let image = document.createElement('img')
        image.src = item.image
        image.style.width = '100%'


        let title = document.createElement('div')
        title.innerText = item.title
        title.style.fontWeight = '600'
        title.style.marginTop = '10px'
        title.style.fontSize = '18px'
        title.style.marginLeft = '5px'
        title.style.wordWrap = 'break-word'
        


        let description = document.createElement('div')
        description.innerText = item.description
        description.style.width = '90%'
        description.style.color = '#666666'
        description.style.marginTop = '10px'
        description.style.fontSize = '15px'
        description.style.marginLeft = '5px'
        description.style.wordWrap = 'break-word'


        let name = document.createElement('div')
        name.innerText = item.username
        name.style.marginTop = '10px'
        name.style.fontWeight = '600'
        name.style.marginLeft = '5px'


        let timestamp = document.createElement('div')
        timestamp.innerText =new Date(item.timestamp).toDateString() 
        timestamp.style.marginTop = '10px'
        timestamp.style.marginLeft = '5px'

        let editButton = document.createElement('button')
        editButton.innerText = 'EDIT POST'
        editButton.setAttribute('class', 'buttonStyle')

        let deleteButton = document.createElement('button')
        deleteButton.innerText = 'DELETE POST'
        deleteButton.setAttribute('class', 'buttonStyle')

        card.appendChild(image)
        card.appendChild(timestamp)
        card.appendChild(title)
        card.appendChild(description)
        card.appendChild(name)
        card.appendChild(editButton)
        card.appendChild(deleteButton)

        myPostContainer.appendChild(card)
        myPostContainer.style.display = 'flex'
        myPostContainer.style.flexWrap = 'wrap'
    })
}