async function editForm(postId) {

    console.log(postId)

    await fetch(`http://localhost:3333/api/users/${userId}/${postId}`, {method: 'GET'})
        .then(response => response.json()
            .then(data => {
                post = data
            })
        )

    const div = document.getElementById('form')
    const content = `
        <div class="form">
            <input type="text" placeholder="Cover Image: URL" id="imgEdited" value="${post.img}">
            <input type="text" placeholder="title" id="titleEdited" value="${post.title}"> 
            <textarea placeholder="simple description" id="briefEdited" rows="4">${post.brief}</textarea>
            <div id="contentEdit"></div> 
            <input type="text" id="refsEdited" placeholder="Content type" value="${post.type}"> 
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
    navigate('posts')
    editSinglePost(data, id)
    
}

async function editSinglePost(data, id) {

    // console.log(id)

    await fetch(`http://localhost:3333/api/users/${userId}/${id}`, 
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