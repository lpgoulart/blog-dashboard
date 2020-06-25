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
    navigate('posts')
    newPost(data)
}

function newPostForm() {

    const div = document.getElementById('newForm')

    content = `
    <div class="form">
        <input type="text" placeholder="title" id="title"> 
        <textarea placeholder="simple description" id="brief" rows="4"></textarea>
        <div id="content"></div> 
        <input type="text" placeholder="img url" id="img">
        <div style="display: flex; align-items: center;">
            <input style="flex: 1; border-top-right-radius: 0; border-bottom-right-radius: 0" type="text" id="refs"> 
            <button class="edit" style="width: auto; height: 38px;border-top-left-radius: 0; border-bottom-left-radius: 0" onclick="addRef()">add</button>
        </div>
        <div id="refDisplay"></div>
        <button id="submitForm" class="edit" onclick="submit()">submit</button>
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
