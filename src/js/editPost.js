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
            <input type="text" placeholder="title" id="titleEdited"> 
            <textarea placeholder="simple description" id="briefEdited" rows="4"></textarea>
            <div id="contentEdit"></div> 
            <input type="text" placeholder="img url" id="imgEdited">
            <div style="display: flex; align-items: center;">
                <input style="flex: 1; border-top-right-radius: 0; border-bottom-right-radius: 0" type="text" id="refsEdited"> 
                <button class="edit" style="width: auto; height: 38px;border-top-left-radius: 0; border-bottom-left-radius: 0" onclick="addRef()">add</button>
            </div>
            <div id="refDisplayEdited"></div>
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

    document.getElementById('titleEdited').value = post.title
    document.getElementById('briefEdited').value = post.brief
    quill.root.innerHTML = post.content
    document.getElementById('imgEdited').value = post.img
    document.getElementById('refDisplayEdited').innerHTML = post.refs
}
async function submitEdited(id) {
    _title = document.getElementById('titleEdited').value
    _brief = document.getElementById('briefEdited').value
    _content = quill.root.innerHTML
    _img = document.getElementById('imgEdited').value
    _refs = document.getElementById('refsEdited').value

    console.log(id)

    data = {
        id: post.id,
        createdAt: post.createdAt,
        title: _title,
        brief: _brief,
        content: _content,
        img: _img,
        refs: array
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