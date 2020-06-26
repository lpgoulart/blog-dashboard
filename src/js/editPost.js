async function editForm(postId) {

    console.log(postId)

    await fetch(`https://lpgoulart-blog-api.herokuapp.com/api/users/${userId}/${postId}`, {method: 'GET'})
        .then(response => response.json()
            .then(data => {
                post = data
            })
        )

    const div = document.getElementById('form')
    const content = `
        <div class="form">
            <div style="width: 100%; margin-bottom: 10px">
                <input type="text" placeholder="Cover Image: URL" id="imgEdited" value="${post.img}">
                <div class="caption" id="editImgCaption"></div>
            </div>
            <div style="width: 100%; margin-bottom: 10px">
                <input type="text" placeholder="title" id="titleEdited" value="${post.title}"> 
                <div class="caption" id="editTitleCaption"></div>
            </div>
            <div style="width: 100%; margin-bottom: 10px">
                <textarea placeholder="simple description" id="briefEdited" rows="4">${post.brief}</textarea>
                <div class="caption" id="editBriefCaption"></div>
            </div>
            <div style="width: 100%; margin-bottom: 10px">
                <div id="contentEdit"></div> 
                <div class="caption" id="editPostCaption"></div>
            </div>
            <div style="width: 100%; margin-bottom: 10px">
                <input type="text" id="refsEdited" placeholder="Content type" value="${post.type}"> 
                <div class="caption" id="editTypeCaption"></div>
            </div>  
            <button id="submitFormEdited" class="edit" onclick="submitEdited('${postId}')">Salvar Edição</button>
            <div style="text-align:center; margin-top: 10px"><button class="delete" onclick="navigate('posts')">Cancelar</button></div>
        </div>
    `
    div.innerHTML = content
    quill = new Quill('#contentEdit', {
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

    quill.root.innerHTML = post.content
}
async function submitEdited(id) {
    _title = document.getElementById('titleEdited').value
    _brief = document.getElementById('briefEdited').value
    _content = quill.root.innerHTML
    _img = document.getElementById('imgEdited').value
    _type = document.getElementById('refsEdited').value

    console.log(id)

    data = {
        id: post.id,
        createdAt: post.createdAt,
        title: _title,
        brief: _brief,
        content: _content,
        img: _img,
        type: _type
    }

    if(document.getElementById('submitNewForm').innerHTML === "Salvar assim mesmo" && _title != "") {
        navigate('posts')
        editSinglePost(data, id)
    }

    if( _img == '' ){
        document.getElementById('editImgCaption').innerHTML = "*Imagem do Post vazio, se o campo estiver será usada uma imagem padrão"
        document.getElementById('submitNewForm').innerHTML = "Salvar assim mesmo"
    }
    else {
        document.getElementById('editImgCaption').innerHTML = ""
    }
    if( _title == '' ){
        document.getElementById('editTitleCaption').innerHTML = "*Obrigatório. Título do Post vazio"
        document.getElementById('submitNewForm').innerHTML = "Salvar assim mesmo"
    }
    else {
        document.getElementById('editTitleCaption').innerHTML = ""
    }
    if( _brief == '' ){
        document.getElementById('editBriefCaption').innerHTML = "*Resumo do post vazio"
        document.getElementById('submitNewForm').innerHTML = "Salvar assim mesmo"
    }
    else {
        document.getElementById('editBriefCaption').innerHTML = ""
    }
    if( quill.root.innerHTML == '<p><br></p>' ){
        document.getElementById('editPostCaption').innerHTML = "*Conteúdo do Post vazio"
        document.getElementById('submitNewForm').innerHTML = "Salvar assim mesmo"
    }
    else {
        document.getElementById('editPostCaption').innerHTML = ""
    }
    if( _type == '' ){
        document.getElementById('editTypeCaption').innerHTML = "*Post será salvo como categoria 'Geral'"
        document.getElementById('submitNewForm').innerHTML = "Salvar assim mesmo"
    }
    else {
        document.getElementById('editTypeCaption').innerHTML = ""
    }

}

async function editSinglePost(data, id) {

    // console.log(id)

    await fetch(`https://lpgoulart-blog-api.herokuapp.com/api/users/${userId}/${id}`, 
    {
        method:"PUT",
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