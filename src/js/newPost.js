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

    document.getElementById('allPosts').style.display = 'block'
    document.getElementById('newPostDiv').style.display = 'none'
    newPost(data)
}

function newPostForm() {

    const div = document.getElementById('newForm')

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
