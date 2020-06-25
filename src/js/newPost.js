function newPostForm() {

    const div = document.getElementById('newForm')

    content = `
    <div class="form">
        <input type="text" placeholder="Cover Image: URL" id="img">
        <input type="text" placeholder="title" id="title">
        <textarea placeholder="simple description" id="brief" rows="4"></textarea>
        <div id="content"></div> 
        <input type="text" id="refs" placeholder="content type">  
        <button id="submitForm" class="edit" onclick="submit()">submit</button>
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
        img: _img,
        type: _type
    }
    navigate('posts')
    newPost(data)
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
