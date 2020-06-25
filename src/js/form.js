var quill = null
let userId = ""
let post
let array = []

function navigate(to) {
    switch(to){
        case 'home': 
            document.getElementById('welcome').classList.remove('d-none')
            document.getElementById('allPosts').classList.add('d-none')
            document.getElementById('editPost').classList.add('d-none')
            document.getElementById('newPostDiv').classList.add('d-none')
            document.getElementById('configurations').classList.add('d-none')
        break;
        case 'posts': 
            document.getElementById('welcome').classList.add('d-none')
            document.getElementById('allPosts').classList.remove('d-none')
            document.getElementById('editPost').classList.add('d-none')
            document.getElementById('newPostDiv').classList.add('d-none')
            document.getElementById('configurations').classList.add('d-none')
        break;
        case 'new': 
            document.getElementById('welcome').classList.add('d-none')
            document.getElementById('allPosts').classList.add('d-none')
            document.getElementById('editPost').classList.add('d-none')
            document.getElementById('newPostDiv').classList.remove('d-none')
            document.getElementById('configurations').classList.add('d-none')
            newPostForm()
        break;
        case 'edit': 
            document.getElementById('welcome').classList.add('d-none')
            document.getElementById('allPosts').classList.add('d-none')
            document.getElementById('editPost').classList.remove('d-none')
            document.getElementById('newPostDiv').classList.add('d-none')
            document.getElementById('configurations').classList.add('d-none')
        break;
        case 'config': 
            document.getElementById('welcome').classList.add('d-none')
            document.getElementById('allPosts').classList.add('d-none')
            document.getElementById('editPost').classList.add('d-none')
            document.getElementById('newPostDiv').classList.add('d-none')
            document.getElementById('configurations').classList.remove('d-none')
        break;
    }
}

async function login() {
    id = document.getElementById('userId').value
    error = document.getElementById('error')
    error.style.display = "block"

    if(id != "") {
        await fetch(`http://localhost:3333/api/users/${id}`, {method: 'GET'})
        .then(response => {
            if(response.ok) {
                response.json().then(data => {
                    error.innerHTML = "Bem vindo, " + data.username
                })
                
                setTimeout(()=>{
                    window.location.href = `dashboard.html?id=${id}`
                },2000)
            }
            else {
                error.innerHTML = "ID incorreto"
            }
        })
    }
    else {
        error.innerHTML = "Campo Vazio"
    }
}

async function loggedUser() {
    const urlParams = new URLSearchParams(window.location.search);
    userId = urlParams.get('id');
    // console.log(id)

    await fetch(`http://localhost:3333/api/users/${userId}`, {method: 'GET'})
        .then(response => response.json()
            .then(data => {
                // console.log(data)
            })
        )
}

function addRef() {
    array.push(document.getElementById('refs').value)
    console.log(array)
    const div = document.getElementById('refDisplay')
    div.innerHTML=""
    for (let index = 0; index < array.length; index++) {
        div.innerHTML += `<span>${array[index]}</span> `
    }
}

async function fetchData() {
    // console.log(userId)
    await fetch(`http://localhost:3333/api/users/${userId}`, {method: 'GET'})
        .then(response => response.json()
            .then(data => {
                // console.log(data)
                addPost(data.posts.items)
            })
        )
}

function addPost(post) {
    const div = document.getElementById('postsHere')

    // console.log(post)

    post.map(item => {
        // date = new Date(item.createdAt)
        // value = date.getDate() + "/" + date.getMonth()

        contentt = `
            <div class="card" id="${item.id}">
                <img src="${item.img}" alt="post img" width="100%">
                <h3>${item.title}</h3>
                <div>
                    <button class="edit" onclick="navigate('edit'); editForm('${item.id}')"><i class="far fa-edit"></i> Editar</button>
                    <button class="delete" onclick="excluirConfirmation('${item.id}')"><i class="far fa-trash-alt"></i> Deletar</button>
                </div>

            </div>
        `
        div.innerHTML += contentt
    })

}

async function excluir(postId) {
    await fetch(`http://localhost:3333/api/users/${userId}/${postId}`, {method: 'DELETE'})
    document.getElementById('postsHere').innerHTML = ""
    fetchData()

}