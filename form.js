var quill = null
let userId = ""

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
                console.log(data)
            })
        )
}

async function newPost(data) {
    await fetch(`http://localhost:3333/api/users/${userId}/post`, 
    {
        method:"POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        }).then(data => {return data.json()})
            .then(res=> {
                console.log(res)
        })
        .catch(error => console.log(error))
        document.getElementById('posts').innerHTML = ""
        fetchData()
    
}

function submit() {
    _title = document.getElementById('title').value
    _brief = document.getElementById('brief').value
    _content = quill.root.innerHTML
    _img = document.getElementById('img').value
    _refs = document.getElementById('refs').value

    data = {
        title: _title,
        brief: _brief,
        content: _content,
        img: _img,
        refs: array
    }
    newPost(data)
    clearForm()
}

let array = []

function addRef() {
    array.push(document.getElementById('refs').value)
    console.log(array)
    const div = document.getElementById('refDisplay')
    div.innerHTML=""
    for (let index = 0; index < array.length; index++) {
        div.innerHTML += `<span>${array[index]}</span> `
    }
}

function clearForm() {
    const div = document.getElementById('form')

    content = `
        <input type="text" placeholder="title" id="title"> <br>
        <textarea placeholder="simple description" id="brief"></textarea>
        <div id="content"></div> <br>
        <input type="text" placeholder="img url" id="img"><br>
        <input type="text" id="refs"> <button onclick="addRef()">add</button><br>
        <div id="refDisplay">
            
        </div>
        <button id="submitForm" onclick="submit()">submit</button>
    `

    div.innerHTML = content

    quill = new Quill('#content', {
        modules: {
            toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block']
            ]
        },
        placeholder: 'Compose an epic...',
        theme: 'snow'  // or 'bubble'
    });
}