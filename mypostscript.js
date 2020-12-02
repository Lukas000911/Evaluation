// get particular user posts
// http://167.99.138.67:1111/getuserposts/:name
// put user name instead of ":name"

const myPostContainer = document.getElementById('myPostContainer')
const editModal = document.getElementById('editModal')
const editedUrl = document.getElementById('editedUrl')
const editedTitle = document.getElementById('editedTitle')
const editedDescription = document.getElementById('editedDescription')
const confirmEdit = document.getElementById('confirmEdit')
const deleteModal = document.getElementById('deleteModal')
const yesButton = document.getElementById('yesButton')
const noButton = document.getElementById('noButton')


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
        editButton.setAttribute('id', item.id)

        let deleteButton = document.createElement('button')
        deleteButton.innerText = 'DELETE POST'
        deleteButton.setAttribute('class', 'buttonStyle')
        deleteButton.setAttribute('id', item.id)


        editButton.addEventListener('click', editPost)
        deleteButton.addEventListener('click', deletePost)

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


function editPost(event){

    editModal.style.display = 'flex'

    confirmEdit.addEventListener('click', updateCard)

    function updateCard(){
        let updates = {
            secretKey: localStorage.getItem('secretKey'),
            title: editedTitle.value,
            image: editedUrl.value,
            description: editedDescription.value,
            id: event.target.id
        }
    
        fetch('http://167.99.138.67:1111/updatepost',{
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updates)
        }).then(response => response.json())
            .then(data => window.location.href = 'myposts.html')
    }
}


// delete existing post (have to have secret key)
// http://167.99.138.67:1111/deletepost
// send JSON object with these keys:
// secretKey, id (id stands for post id)

function deletePost(event){

    deleteModal.style.display = 'flex'

    yesButton.addEventListener('click', sendDelete)

    function sendDelete(){
        let confirmDelete = {
            secretKey: localStorage.getItem('secretKey'),
            id: event.target.id
        }

        fetch('http://167.99.138.67:1111/deletepost',{
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(confirmDelete)
        }).then(response => response.json())
            .then(data => window.location.href = 'myposts.html')
    }

    noButton.addEventListener('click', closeModal)

    function closeModal(){
        deleteModal.style.display = 'none'
    }
}