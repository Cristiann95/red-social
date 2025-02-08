const urlPosts = 'https://dummyjson.com/posts';
const urlUsers = 'https://dummyjson.com/users';
const urlProducts = 'https://dummyjson.com/carts';

const userName = localStorage.getItem('name');
const userEmail = localStorage.getItem('email');

/******** POSTS **********/

let posts = [];
const form = document.getElementById('postForm');

function getData() {
    fetch(urlPosts)
        .then((res) => res.json())
        .then((data) => {
            posts = data.posts;
            renderPostList();
            getUser();
            showWelcome(userName);
        }).catch((error) => console.log('Error al llamar a la API: ', error))
};

getData();


function renderPostList() {
    const postList = document.getElementById('postList');
    postList.innerHTML = '';

    posts.forEach(post => {
        const listItem = document.createElement('li');
        listItem.classList.add('postItem');
        listItem.innerHTML =
            `
        <strong>${post.title}</strong>
        <p>${post.body}</p>
        <div class="likes"><i class="ri-thumb-up-line likes" onclick="reactions(${post.id}, ${post.reactions.likes}, 'likes')"></i><span>${post.reactions.likes}<span></div>
        <div class="dislikes"><i class="ri-thumb-down-line dislikes" onclick="reactions(${post.id}, ${post.reactions.dislikes}, 'dislikes')"></i><span>${post.reactions.dislikes}<span></div>
        <button onclick="editPost(${post.id})">Editar</button>
        <button onclick="deletePost(${post.id})">Borrar</button>

        <div id="editForm-${post.id}" class="editForm" style="display:none">
            <label for="editTitle-${post.id}">Título: </label>
            <input type="text" id="editTitle-${post.id}" class="editTitle" value="${post.title}" required>
            <label for="editBody-${post.id}">Comentario: </label>
            <textarea id="editBody-${post.id}" class="editBody" required>${post.body}</textarea>
            <button onclick="updatePost(${post.id}, ${post.reactions.likes}, ${post.reactions.dislikes})">Actualizar</button>        
        </div>
        `

        postList.appendChild(listItem);
    })
};


let newLike = 0;

function reactions(id, post, reaction) {
    const icon = document.querySelector(`.${reaction}`)
    icon.classList.toggle('icon_reaction');

    newLike = post + 1;
    fetch(`${urlPosts}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then(res => res.json())
        .then(data => {
            const index = posts.findIndex(post => post.id === data.id)
            if (index != -1) {
                posts[index].reactions[reaction] = newLike;
            } else {
                alert('Hubo un error al actualizar la información del posteo')
            }

            renderPostList();
        })
        .catch(error => console.error('Error al querer actualizar el posteo: ', error))
}


form.addEventListener('submit', function postData(event) {
    event.preventDefault();
    const postTitleInput = document.getElementById('postTitle');
    const postBodyInput = document.getElementById('postBody');
    const postTitle = postTitleInput.value;
    const postBody = postBodyInput.value;

    if (postTitle.trim() == '' || postBody.trim() == '') {
        alert("Los campos son obligatorios")
        return
    }

    fetch(`${urlPosts}/add`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            title: postTitle,
            body: postBody,
            userId: 1,
            reactions: {
                likes: 0,
                dislikes: 0
            }
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            data.id = posts.length + 1;
            posts.unshift(data)
            renderPostList();
            postTitleInput.value = '';
            postBodyInput.value = '';
        })
        .catch(error => console.error('Error al querer crear el posteo: ', error))
});


function editPost(id) {
    const editForm = document.getElementById(`editForm-${id}`);
    editForm.style.display = (editForm.style.display == 'none') ? 'flex' : 'none';
}

function updatePost(id, likes, dislikes) {
    const editTitle = document.getElementById(`editTitle-${id}`).value;
    const editBody = document.getElementById(`editBody-${id}`).value;

    fetch(`${urlPosts}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            title: editTitle,
            body: editBody,
            userId: 1,
            reactions: {
                likes: likes,
                dislikes: dislikes
            }
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then(res => res.json())
        .then(data => {
            const index = posts.findIndex(post => post.id === data.id)
            if (index != -1) {
                posts[index] = data;
            } else {
                alert('Hubo un error al actualizar la información del posteo')
            }
            renderPostList();
        })
        .catch(error => console.error('Error al querer actualizar el posteo: ', error))
};

function deletePost(id) {
    fetch(`${urlPosts}/${id}`, {
        method: 'DELETE',
    })
        .then(res => {
            if (res.ok) {
                posts = posts.filter(post => post.id != id);
                renderPostList();
            } else {
                alert('Hubo un error y no se puedo eliminar el posteo')
            }
        })
        .catch(error => console.error('Hubo un error: ', error))
};



/******** CONTACTS **********/

let contact = [];

function getContacts() {
    fetch(urlUsers)
        .then(res => res.json())
        .then(data => {
            contact = data.users
            renderContacts()
        })
    return contact
}

function renderContacts() {
    const contacList = document.querySelector('#contactsList');
    contacList.innerHTML = '';

    contact.forEach(contact => {
        let li = document.createElement('li');
        li.innerHTML = `
            <div class="div_contacts">
            <p style="padding-bottom:8px">${contact.firstName}  ${contact.lastName}</p> 
            <span class="conect"></span>
            </div>
        `

        contacList.append(li)
    })
}

getContacts()



/******** PUBLICIDAD **********/

let random = Math.round(Math.random() * 29)
let path = []

const sectionImages = document.querySelector('.publicity');

function getProducts() {
    fetch(urlProducts)
        .then(res => res.json())
        .then(data => {
            path = data.carts[random].products;
            renderProducts()
        })
}

function renderProducts() {
    const productList = document.querySelector('#productsList')
    productList.innerHTML = ''

    path.forEach(prod => {
        const li = document.createElement('li')
        li.classList.add('productItem')
        li.innerHTML = `
        <div class="div_publicity">
        <img style="width:100px margin:auto" src=${prod.thumbnail}>
        <p>usd ${prod.price}</p>
        <button>Comprar</button>
        </div>
        `
        productList.appendChild(li)
    })
}

getProducts()


/******** BUSCAR **********/

const inputSearch = document.querySelector('#nav_search');
const results = document.querySelector('.results');
results.style.display = 'none';

inputSearch.addEventListener('keyup', () => {
    const searchValue = inputSearch.value.toLowerCase();
    console.log(searchValue)
    getContacts()
    let contactsList = contact.map(cont => `${cont.firstName} ${cont.lastName}`);
    let filter = contactsList.filter(contact => contact.toLowerCase().includes(searchValue));

    if (searchValue.length !== 0) {
        results.style.display = 'block';
        results.textContent = filter.join(', ');
    } else {
        results.textContent = '';
        results.style.display = 'None';
    }
    if (filter.length === 0) {
        results.style.display = 'block';
        results.textContent = 'No hay resultados';
    }
})




/******** MOSTRAR BIENVENIDA **********/


function showWelcome(user) {
    iziToast.show({
        title: `Hola ${user}`,
        position: 'topCenter',
        timeout: 2000,
        theme: 'dark',
        close: false,
        drag: true,
        pauseOnHover: true,
        progressBar: false,
    });
}

/******** USUARIO **********/

const divUser = document.querySelector('.user');


function getUser() {
    const divSession = document.querySelector('.userSession');
    const dataUser = document.querySelector('.dataUser');
    const closeButton = document.querySelector('.ri-close-large-line');
    const firstLetter = userName[0].toUpperCase();
    closeSession.style.cursor = 'auto';
    divUser.textContent = firstLetter;
    dataUser.innerHTML = `<b>Usuario:</b>  ${userName} <br> <b>Email:</b>  ${userEmail}`

    divUser.addEventListener('click', () => {
        divSession.classList.add('userSessionView');
        closeSession.addEventListener('click', closeMessage);
        closeSession.style.cursor = 'pointer';
    });

    closeButton.addEventListener('click', () => {
        divSession.classList.remove('userSessionView');
        closeSession.removeEventListener('click', closeMessage);
        closeSession.style.cursor = 'auto';
    })
}

/******** CERRAR SESIÓN **********/

const closeSession = document.querySelector('.closeSession');

function closeMessage() {
    Swal.fire({
        title: "¿Seguro que deseas cerrar sesión?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Hasta la próxima!",
                icon: "success"
            });
            localStorage.clear();
            setTimeout(() => {
                window.location.href = '../../index.html';
            }, 1500);
        }
    });
}


