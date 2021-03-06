// CREATE BLOG WEBSITE

// Website should have these pages:
// REGISTER USER PAGE - page when user has to register
// USER LOGIN PAGE - page where user logs in and gets secret key (for further operations)
// ALL BLOG POSTS PAGE - page where all blog posts are visible (could be main page - index page)
// SINGLE POST PAGE - page which opens when single post is selected
// PARTICULAR USER POSTS PAGE - page which opens when you choose to see particular user posts
// PAGE FOR POST EDITING - page which opens when i click edit button on post i own

// Website should have these validations:
// when registering new user inputs should be validated in front-end (try sending random stuff to test api)
// when logging in there should also be validations depending on errors received from back-end
// when creating new post
// when updating post

// website should have these additional functions:
// some kind of modal pops up and asks for confirmation when user tries to delete own post
// modal pops up and asks for confirmation when user edits existing post
// there should be possibility to filter posts by date
// index page should look like - https://coney.qodeinteractive.com/pinterest-home/
// whole website styles should also be as close to example as possible
// please notice - only index page is required to look exact as example
// other pages has to have similar style but structure is up to you creative minds
// semantic tags should be used in html
// code shoulde be pushed to github and exported as static web page


// API DOCUMENTATION

// GET - REQUESTS

// get all posts
// http://167.99.138.67:1111/getallposts

// get particular user posts
// http://167.99.138.67:1111/getuserposts/:name
// put user name instead of ":name"

// get particular post
// http://167.99.138.67:1111/getsinglepost/:name/:id'
// put user name instead of ":name" and post id instead of ":id"


// POST - REQUESTS

// create new user
// http://167.99.138.67:1111/createaccount
// send JSON object with these keys:
// name, passwordOne, passwordTwo

// login to get your secret key
// http://167.99.138.67:1111/login
// send JSON object with these keys:
// name, password

// create new post (have to have secret key)
// http://167.99.138.67:1111/createpost
// send object JSON object with these keys:
// secretKey, title, image, description

// update existing post (have to have secret key)
// http://167.99.138.67:1111/updatepost
// send JSON object with these keys:
// secretKey, title, image, description, id (id stands for post id)

// delete existing post (have to have secret key)
// http://167.99.138.67:1111/deletepost
// send JSON object with these keys:
// secretKey, id (id stands for post id)


let arr = []

fetch('http://167.99.138.67:1111/getallposts')
    .then(resp => resp.json())
    .then(data => {
        data.data.map(item =>{
            arr.push(item)
        })
       console.log(arr)
       showAllPosts()
    })
    

const expandSearch = document.getElementById('expandSearch')
const navSearchInput = document.getElementById('navSearchInput')
const allPosts = document.getElementById('allPosts')
const sortButtonUp = document.getElementById('sortButtonUp')
const sortButtonDown = document.getElementById('sortButtonDown')

let trigger = true

expandSearch.addEventListener('mouseenter', showSearch)
sortButtonUp.addEventListener('click', sortByTimeUp)


function showSearch(){
    navSearchInput.style.display = 'flex'
}

function compare(a, b){
    const timeA = a.timestamp;
    const timeB = b.timestamp;

    let comparison = 0
    if(timeA > timeB){
        comparison = 1;
    } else if(timeA < timeB){
        comparison = -1;
    }
    if(trigger){
        return comparison;
    } else {
        return comparison * -1;
    }
}

function showAllPosts(){
    allPosts.innerHTML = ''
    arr.sort(compare)
    arr.map(item => {
        let card = document.createElement('div')
        card.style.width = '360px'
        card.style.margin = '10px'
        card.setAttribute('id', item.id)
        card.style.display = 'inline-block'
        
        
        let image = document.createElement('img')
        image.src = item.image
        image.style.width = '100%'
        image.style.cursor = 'pointer'


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
        name.style.cursor ='pointer'


        let timestamp = document.createElement('div')
        timestamp.innerText =new Date(item.timestamp).toDateString() 
        timestamp.style.marginTop = '10px'
        timestamp.style.marginLeft = '5px'

        
        image.addEventListener('click', openSinglePost)
        name.addEventListener('click', showUserPosts)

        card.appendChild(image)
        card.appendChild(timestamp)
        card.appendChild(title)
        card.appendChild(description)
        card.appendChild(name)
        
        allPosts.appendChild(card)
    })
    

    
}

showAllPosts()

function openSinglePost(event){
    let nameToSave = event.path[1].children[4].innerText
    let idToSave = event.path[1].id
    localStorage.setItem('id', idToSave)
    localStorage.setItem('savedName', nameToSave)
    window.location.href = 'singlepage.html'
}

function showUserPosts(event){
    let singleUser = event.target.innerText
    localStorage.setItem('singleUser', singleUser)
    window.location.href = 'singleUserPost.html'
}

function sortByTimeUp(){
    trigger = !trigger
    showAllPosts()
}