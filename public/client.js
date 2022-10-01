const socket = io();

var mystyle={};

const submitBtn = document.querySelector('.sendBtn');
const messageInput = document.querySelector('.messageInbox');
const messageContainer = document.getElementsByClassName('chatContainer');
const styling = document.querySelector('.styling');
const bold = document.querySelector('.bold');
const italic = document.querySelector('.italic');
const strikethrough = document.querySelector('.strikethrough');
const hyperlink = document.querySelector('.hyperlink')
const bulleted = document.querySelector('.bulleted');
const numbered = document.querySelector('.numbered');
const blockquoted = document.querySelector('.blockquoted');
const snippet = document.querySelector('.snippet');
const codeblock = document.querySelector('.codeblock');


const name = prompt("Enter your Name to join chat")


const user_append = (message,position)=>{
    div = document.createElement('div');
    div.innerHTML = message;
    div.classList.add(position);
    messageContainer[0].append(div);
}

const append = (val,position)=>{
    let messageElement = document.createElement('div');
    messageElement.innerHTML = val[0];
    console.log(messageElement);
    messageElement.classList.add(position);
    for(i in val[1]){
        messageElement.style[i]=val[1][i];
    }
    messageContainer[0].appendChild(messageElement);
    // val[1]="";
    // mystyle={}

}

submitBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    newElement = document.createElement('div');
    newElement.appendChild(element_to_insert);
    append([newElement.innerHTML,mystyle],'right');
    socket.emit('send',[newElement.innerHTML,mystyle]);
    messageInput.value ="";
    for (let i = 0; i < styling.children.length; i++) {
        // console.log(styling.children[i]);
        if(styling.children[i].hasAttribute("style")){
            styling.children[i].removeAttribute("style");
        }
        // console.log(styling.children[i]);
    }
    mystyle={};
})

socket.emit('new user joined',name);

socket.on('user joined',data=>{
   user_append(`${data} joined the chat`,'right' )
})
socket.on('receive',data=>{
    append(data,'left');
    // mystyle={};
    bulleted_flag=false;
    numbered_flag = false;
    blockquote_flag = false;
    snippet_flag = false;
    codeblock_flag = false;
    hyperlink_flag = false;
 })

bold.addEventListener('click',(e)=>{
    bold.setAttribute("style","background-color:blue;color:white;border:none");
    mystyle["font-weight"]="bold";
})

italic.addEventListener('click',(e)=>{
    mystyle["font-style"]="italic";
    italic.setAttribute("style","background-color:blue;color:white;border:none");
})

strikethrough.addEventListener('click',(e)=>{
    mystyle["text-decoration"]="line-through";
    strikethrough.setAttribute("style","background-color:blue;color:white;border:none");
})

let bulleted_flag=false;
let numbered_flag = false;
let blockquote_flag = false;
let snippet_flag = false;
let codeblock_flag = false;
let hyperlink_flag = false;


bulleted.addEventListener('click',(e)=>{
    numbered_flag = false;
    bulleted_flag=true;
    blockquote_flag = false;
    snippet_flag = false;
    codeblock_flag = false;
    bulleted.setAttribute("style","background-color:blue;color:white;border:none");
    snippet.removeAttribute("style");
    blockquoted.removeAttribute("style");
    numbered.removeAttribute("style");
    codeblock.removeAttribute("style");

})
numbered.addEventListener('click',(e)=>{
    numbered_flag = true;
    bulleted_flag=false;
    blockquote_flag = false;
    snippet_flag = false;
    codeblock_flag= false;
    numbered.setAttribute("style","background-color:blue;color:white;border:none");
    snippet.removeAttribute("style");
    blockquoted.removeAttribute("style");
    codeblock.removeAttribute("style");
    bulleted.removeAttribute("style");
})

blockquoted.addEventListener('click',(e)=>{
    numbered_flag =false;
    bulleted_flag=false;
    blockquote_flag = true;
    snippet_flag = false;
    codeblock_flag= false;
    
    blockquoted.setAttribute("style","background-color:blue;color:white;border:none");
    snippet.removeAttribute("style");
    codeblock.removeAttribute("style");
    numbered.removeAttribute("style");
    bulleted.removeAttribute("style");
})
snippet.addEventListener('click',(e)=>{
    snippet_flag = true;
    codeblock_flag= false;
    numbered_flag =false;
    bulleted_flag=false;
    blockquote_flag = false;
    snippet.setAttribute("style","background-color:blue;color:white;border:none");
    codeblock.removeAttribute("style");
    blockquoted.removeAttribute("style");
    numbered.removeAttribute("style");
    bulleted.removeAttribute("style");

})
codeblock.addEventListener('click',(e)=>{
    codeblock_flag = true;
    snippet_flag = false;
    numbered_flag =false;
    bulleted_flag=false;
    blockquote_flag = false;
    codeblock.setAttribute("style","background-color:blue;color:white;border:none");
    snippet.removeAttribute("style");
    blockquoted.removeAttribute("style");
    numbered.removeAttribute("style");
    bulleted.removeAttribute("style");
})

hyperlink.addEventListener('click',(e)=>{
    codeblock_flag = false;
    hyperlink_flag = true;
    snippet_flag = false;
    numbered_flag =false;
    bulleted_flag=false;
    blockquote_flag = false;
    hyperlink.setAttribute("style","background-color:blue;color:white;border:none");
    snippet.removeAttribute("style");
    codeblock.removeAttribute("style");
    blockquoted.removeAttribute("style");
    numbered.removeAttribute("style");
    bulleted.removeAttribute("style");
})

let  a,blockcode,codesnippet,blockquote,ol,ul;

messageInput.addEventListener('keyup',(e)=>{
    if(bulleted_flag ==false || numbered_flag ==false || hyperlink_flag==false || snippet_flag==false || blockquote_flag==false || codeblock_flag==false){
        p = document.createElement('p');
        p.innerHTML = e.target.value;
        element_to_insert = p;
    }
    
    if(bulleted_flag==true){
        ul= document.createElement('ul');
        let lines = e.target.value.split('\n');
        lines.map((ele)=>{
            li = document.createElement('li');
            li.innerHTML= ele;
            ul.append(li);
        })
        ul.setAttribute("style","padding:10px");
        element_to_insert = ul;
    }
    if(numbered_flag==true){
        ol= document.createElement('ol');
        let lines = e.target.value.split('\n');
        lines.map((ele)=>{
            li = document.createElement('li');
            li.innerHTML= ele;
            ol.append(li);
        })
        ol.setAttribute("style","padding:10px");
        element_to_insert = ol;
    }
    if(blockquote_flag==true){
        blockquote= document.createElement('blockquote');
        blockquote.innerHTML=e.target.value;
        element_to_insert = blockquote;

        
    }
    if(snippet_flag==true){
        codesnippet = document.createElement('code');
        codesnippet.innerHTML = e.target.value;
        element_to_insert = codesnippet;
    }
    if(codeblock_flag==true){
        blockcode = document.createElement('pre');
        let innerblockcode = document.createElement('code');
        innerblockcode.innerHTML = e.target.value;
        blockcode.append(innerblockcode);
        element_to_insert = blockcode;
    }
    if(hyperlink_flag==true){
        a = document.createElement('a');
        a.setAttribute("href",e.target.value);
        a.innerHTML = e.target.value;
        element_to_insert = a;
    }

})


