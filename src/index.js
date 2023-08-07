// write your code here
let currentRamen = 1

document.addEventListener('DOMContentLoaded', () => initialize())

function initialize() {
    renderRamens()
    showRamen(1)
    document.getElementById('new-ramen').addEventListener('submit', (e) => addRamen(e))
    document.getElementById('delete-ramen').addEventListener('click', (e) => deleteRamen(e))
    document.getElementById('update-ramen').addEventListener('click', (e) => updateRamen(e))

}

function updateRamen(e) {
    e.preventDefault()
    const toUpdate = document.querySelector('#ramen-detail img').value
    ramenObject = {}
        const objName = document.getElementById('new-name').value
        const objRestaurant = document.getElementById('new-restaurant').value
        const objImage = document.getElementById('new-image').value
        const objRating = document.getElementById('new-rating').value
        const objComment = document.getElementById('new-comment').value
    

    if(objName !== '') {
        ramenObject.name = objName
    }
    if(objRestaurant !== '') {
        ramenObject.restaurant = objRestaurant
    }
    if(objImage !== '') {
        ramenObject.image = objImage
    }
    if(objRating !== '') {
        ramenObject.rating = objRating
    }
    if(objComment !== '') {
        ramenObject.comment = objComment
    }

    document.getElementById('new-ramen').reset()

    fetch(`http://localhost:3000/ramens/${toUpdate}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(ramenObject)
    })
    .then(res => res.json())
    .then(data => renderRamens())
    .then(data => showRamen(toUpdate))

}


function deleteRamen(e) {
    e.preventDefault()
    const toDelete = document.querySelector('#ramen-detail img').value
   
    fetch(`http://localhost:3000/ramens/${toDelete}`, {
        method: "DELETE"})
        .then(res => res.json())
        .then(fetch('http://localhost:3000/ramens')
            .then(res => res.json())
            .then(data => {
                showRamen(data[0].id)
                renderRamens()
            }))
    
}

function addRamen(e) {
    e.preventDefault()
    ramenObject = {
        name: document.getElementById('new-name').value,
        restaurant: document.getElementById('new-restaurant').value,
        image: document.getElementById('new-image').value,
        rating: document.getElementById('new-rating').value,
        comment: document.getElementById('new-comment').value

    }
    document.getElementById('new-ramen').reset()
    fetch('http://localhost:3000/ramens', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(ramenObject)
    })
    .then(res => res.json())
    .then(data => renderRamens())
     
}

function renderRamens() {
    document.getElementById('ramen-menu').innerHTML = ''
    fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(data => data.forEach((ramen) => {
        const element = document.createElement('img')
        element.src = ramen.image
        
        element.addEventListener('click', () => showRamen(ramen.id))
        document.getElementById('ramen-menu').append(element)
    }))
}

function showRamen(id) {
    currentRamen = id
    fetch(`http://localhost:3000/ramens/${id}`)
    .then(res => res.json())
    .then(data => {
        document.querySelector('#ramen-detail img').src = data.image
        document.querySelector('#ramen-detail img').value = data.id
        document.querySelector('#ramen-detail h2').innerText = data.name
        document.querySelector('#ramen-detail h3').innerText = data.restaurant
        document.querySelector('#rating-display').innerText = data.rating
        document.querySelector('#comment-display').innerText = data.comment
    })
}