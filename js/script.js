async function getIdFromInput () {
    
    const data = document.getElementById('search');
    const errorDiv = document.createElement('div')
    errorDiv.setAttribute('id','errorMessage')
    const btn = document.getElementById('btnSearch').addEventListener('click', ()=>{
        if(document.getElementById('containerPost')) {
            document.getElementById('containerPost').remove()
        }
        if(document.getElementById('errorMessage')) {
            document.getElementById('errorMessage').remove()
        }

        if(document.getElementById('containerComment')) {
            document.getElementById('containerComment').remove()
        }
        try { 
            
            if (data.value<=100&& data.value>0) {
                getPost(data.value,data)
                
            } else {
                throw ('You should to enter only <span>NUMBER</span> from <span>1</span> to <span>100</span>') 
            }
        }
        catch (error) {
            errorDiv.innerHTML = error
            document.querySelector('.container').prepend(errorDiv)
        }
        
        
        
});
    
}
async function simplePost (obj,btn){
     
    // 
    const container = document.createElement('div');
    const title = document.createElement('h2');
    const body  =document.createElement('p');
    const id = document.createElement('p');
    const commentsBtn = document.createElement('input');
    // 
    
    container.innerHTML = '';
    container.setAttribute('id','containerPost')
    id.innerHTML = `ID Post: ${obj.id}`;
    title.innerText = obj.title;
    body.innerText = obj.body;
    commentsBtn.type = "button"
    commentsBtn.value = "View comments"
    commentsBtn.addEventListener('click', ()=> {
        if(document.getElementById('containerComment')) {
            document.getElementById('containerComment').remove()
        } else{
        getComments(obj.id)
        }
    })
    // 
    document.querySelector('.container').insertAdjacentElement('afterend', container)
    container.appendChild(id)
    container.append(title)
    container.append(body)
    container.append(commentsBtn)
    //
    btn.value = ''
    // 
} 
function viewComments (arr){
    const container = document.createElement('div')
    container.setAttribute('id','containerComment')
    for (let key of arr) {
        // 
        const containerComment = document.createElement('div')
        const name = document.createElement('h3')
        const email = document.createElement('p')
        const body = document.createElement('p')
        //
        containerComment.classList.add('containerComment')
        email.classList.add('email')
        //  
        name.innerText = key.name
        email.innerHTML =` <b>Email:</b> ${key.email}`
        body.innerText =`Comment: \n${key.body}`
        // 
        container.append(containerComment)
        containerComment.append(name)
        containerComment.append(email)
        containerComment.append(body)
    }
    document.getElementById('containerPost').insertAdjacentElement('afterend', container)

}
async function getComments (id) {
     fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then(response => response.json())
      .then(json => viewComments (json))
      .catch((ex)=> console.log('error'))
      
}
async function getPost (id,btn) {
    try {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(response => response.json())
      .then(json => simplePost(json,btn))
    }
    catch(error) {
        console.log('fail')
    }
}

getIdFromInput()