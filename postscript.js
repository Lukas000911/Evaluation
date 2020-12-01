const imageUrl = document.getElementById('imageUrl')
const postTitle = document.getElementById('postTitle')
const postDescription = document.getElementById('postDescription')
const createPostButton = document.getElementById('createPostButton')

createPostButton.addEventListener('click', createNewPost)


function createNewPost(){

    let newPost = {
        secretKey: localStorage.getItem('secretKey'),
        title: postTitle.value,
        image: imageUrl.value,
        description: postDescription.value
    }
    fetch('http://167.99.138.67:1111/createpost',{
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    }).then(response => response.json())
        .then(data => window.location.href = 'index.html')
    
}