function newPostForm() {

    const div = document.getElementById('newForm')

    content = `
        <div class="form">
            <div style="width: 100%; margin-bottom: 10px">
                <input type="text" placeholder="Cover Image: URL" id="img">
                <div class="caption" id="newImgCaption"></div>
            </div>
            <div style="width: 100%; margin-bottom: 10px">
                <input type="text" placeholder="title" id="title">
                <div class="caption" id="newTitleCaption"></div>
            </div>
            <div style="width: 100%; margin-bottom: 10px">
                <textarea placeholder="simple description" id="brief" rows="4"></textarea>
                <div class="caption" id="newBriefCaption"></div>
            </div>
            <div style="width: 100%; margin-bottom: 10px">
                <div id="content"></div> 
                <div class="caption" id="newPostCaption"></div>
            </div>
            <div style="width: 100%; margin-bottom: 10px">
                <input type="text" id="refs" placeholder="content type">
                <div class="caption" id="newTypeCaption"></div>
            </div>  
            <button id="submitNewForm" class="edit" onclick="submit()">submit</button>
            <div style="text-align:center; margin-top: 10px"><button class="delete" onclick="navigate('posts')">Cancelar</button></div>
        </div>
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
        theme: 'snow' 
    });
}

function submit() {
    _title = document.getElementById('title').value
    _brief = document.getElementById('brief').value
    _content = quill.root.innerHTML
    _img = document.getElementById('img').value
    _type = document.getElementById('refs').value

    data = {
        title: _title,
        brief: _brief,
        content: _content,
        img: _img === "" ? "https://i.pinimg.com/originals/8c/3c/c1/8c3cc1d5271a13a40c65c76b145473d7.png" : _img,
        type: _type === "" ? "Geral" : _type
    }

    if(document.getElementById('submitNewForm').innerHTML === "Salvar assim mesmo" && _title != "") {
        navigate('posts')
        newPost(data)
    }

    if( _img == '' ){
        document.getElementById('newImgCaption').innerHTML = "*Imagem do Post vazio, se o campo estiver será usada uma imagem padrão"
        document.getElementById('submitNewForm').innerHTML = "Salvar assim mesmo"
    }
    else {
        document.getElementById('newImgCaption').innerHTML = ""
    }
    if( _title == '' ){
        document.getElementById('newTitleCaption').innerHTML = "*Obrigatório. Título do Post vazio"
        document.getElementById('submitNewForm').innerHTML = "Salvar assim mesmo"
    }
    else {
        document.getElementById('newTitleCaption').innerHTML = ""
    }
    if( _brief == '' ){
        document.getElementById('newBriefCaption').innerHTML = "*Resumo do post vazio"
        document.getElementById('submitNewForm').innerHTML = "Salvar assim mesmo"
    }
    else {
        document.getElementById('newBriefCaption').innerHTML = ""
    }
    if( quill.root.innerHTML == '<p><br></p>' ){
        document.getElementById('newPostCaption').innerHTML = "*Conteúdo do Post vazio"
        document.getElementById('submitNewForm').innerHTML = "Salvar assim mesmo"
    }
    else {
        document.getElementById('newPostCaption').innerHTML = ""
    }
    if( _type == '' ){
        document.getElementById('newTypeCaption').innerHTML = "*Post será salvo como categoria 'Geral'"
        document.getElementById('submitNewForm').innerHTML = "Salvar assim mesmo"
    }
    else {
        document.getElementById('newTypeCaption').innerHTML = ""
    }

    
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
        document.getElementById('postsHere').innerHTML = ""
        fetchData()
    
}
