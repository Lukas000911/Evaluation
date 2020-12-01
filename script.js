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


expandSearch.addEventListener('mouseenter', showSearch)

function showSearch(){
    navSearchInput.style.display = 'flex'
}



function showAllPosts(){

    arr.map(item => {
        let card = document.createElement('div')
        card.style.width = '360px'
        card.style.margin = '7px'
        
        // card.style.border = '1px solid black'
        

        let image = document.createElement('img')
        image.src = item.image
        image.style.width = '100%'

        let title = document.createElement('div')
        title.innerText = item.title
        title.style.overflow = 'hidden'
        title.style.fontWeight = '600'
        title.style.marginTop = '10px'
        title.style.fontSize = '18px'
        title.style.marginLeft = '5px'

        let description = document.createElement('div')
        description.innerText = item.description
        description.style.width = '90%'
        description.style.overflow = 'hidden'
        description.style.color = '#666666'
        description.style.marginTop = '10px'
        description.style.fontSize = '15px'
        description.style.marginLeft = '5px'

        let name = document.createElement('div')
        name.innerText = item.username
        name.style.marginTop = '10px'
        name.style.fontWeight = '600'
        name.style.marginLeft = '5px'

        let timestamp = document.createElement('div')
        timestamp.innerText =new Date(item.timestamp).toDateString() 
        timestamp.style.marginTop = '10px'
        timestamp.style.marginLeft = '5px'


        
        card.appendChild(image)
        card.appendChild(timestamp)
        card.appendChild(title)
        card.appendChild(description)
        card.appendChild(name)
        

        allPosts.appendChild(card)
    })
}

showAllPosts()