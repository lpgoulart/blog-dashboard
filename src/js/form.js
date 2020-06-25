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

            document.getElementById('lihome').classList.add('selectedPage')
            document.getElementById('liposts').classList.remove('selectedPage')
            document.getElementById('liadd').classList.remove('selectedPage')
            document.getElementById('liconfig').classList.remove('selectedPage')
        break;
        case 'posts': 
            document.getElementById('welcome').classList.add('d-none')
            document.getElementById('allPosts').classList.remove('d-none')
            document.getElementById('editPost').classList.add('d-none')
            document.getElementById('newPostDiv').classList.add('d-none')
            document.getElementById('configurations').classList.add('d-none')

            document.getElementById('lihome').classList.remove('selectedPage')
            document.getElementById('liposts').classList.add('selectedPage')
            document.getElementById('liadd').classList.remove('selectedPage')
            document.getElementById('liconfig').classList.remove('selectedPage')
        break;
        case 'new': 
            document.getElementById('welcome').classList.add('d-none')
            document.getElementById('allPosts').classList.add('d-none')
            document.getElementById('editPost').classList.add('d-none')
            document.getElementById('newPostDiv').classList.remove('d-none')
            document.getElementById('configurations').classList.add('d-none')
            
            newPostForm()

            document.getElementById('lihome').classList.remove('selectedPage')
            document.getElementById('liposts').classList.remove('selectedPage')
            document.getElementById('liadd').classList.add('selectedPage')
            document.getElementById('liconfig').classList.remove('selectedPage')
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

            document.getElementById('lihome').classList.remove('selectedPage')
            document.getElementById('liposts').classList.remove('selectedPage')
            document.getElementById('liadd').classList.remove('selectedPage')
            document.getElementById('liconfig').classList.add('selectedPage')
        break;
        case 'logoff':
            window.location.href = "index.html"
    }
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