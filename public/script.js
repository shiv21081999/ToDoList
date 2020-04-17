let inpNewTask = document.getElementById('inpNewTask')
let btnAdd=document.getElementById('btnAdd')
let taskList = document.getElementById('taskList')
let btnClearDone = document.getElementById('btnClearDone')
let btnSort = document.getElementById('btnSort')
let btnDelete = document.getElementById('btnDelete')

let tasks = []
function addItem(tasktitle){
    tasks.push({title: tasktitle,done:false})
}
function renderList(){
    taskList.innerHTML=''
    for(let i=0;i<tasks.length;i++)
    {
       let item = document.createElement('div')
       let item1 = document.createElement('div')
       let item2 = document.createElement('div')
       let item3 = document.createElement('li')
       let item4 = document.createElement('div')
       item.className = 'row'
       item3.innerText = tasks[i].title
       item3.className = tasks[i].done ? 'list-group-item done m1' : 'list-group-item m-1'
       item1.className= 'col-9 list-group-item'
       item2.className = 'col-3 list-group-item'
       item1.appendChild(item3)
       item4.className = 'row flex-centered'
       item4.style = 'height : 100%; align-items : center;'
       let remove = document.createElement('button')
       let up = document.createElement('button')
       let down = document.createElement('button')
       remove.className = 'btn btn-sm btn-primary m-1'
       up.className = 'btn btn-sm btn-danger m-1'
       down.className = 'btn btn-sm btn-success m-1'
       remove.innerText = 'REMOVE'
       up.innerText = 'UP'
       down.innerText = 'DOWN'
       item4.appendChild(remove)
       item4.appendChild(up)
       item4.appendChild(down)
       item2.appendChild(item4)
       item.appendChild(item1)
       item.appendChild(item2)
       item3.onclick = () => {
           toggleItemDone(i)
           renderList()
       }
       up.onclick = () => {
           if(i!=0)
                swap(i,i-1)
            renderList()
       }
       down.onclick = () =>{
            if(i!=tasks.length-1)
                swap(i,i+1)
            renderList()
       }
       remove.onclick = () =>{
           toggleItemDone(i)
           deleteAllDone()
           renderList()
       }
       let noteList = document.createElement('div') 
       let input = document.createElement('input')
       let notebtn = document.createElement('button')
       let unorderedList = document.createElement('ul')
       unorderedList.className = 'list-group'
       let notes = []
       notebtn.className = 'btn btn-sm btn-warning m-1'
       notebtn.innerText = 'ADD NOTE'
       input.type = 'text'
       input.className = 'form-control m-1'
       input.placeholder = 'Add Note'
       noteList.className = 'list-group'
       noteList.style = 'display : none;transition : 2s;'
       noteList.appendChild(input)
       noteList.appendChild(notebtn)
       
       item1.onmouseover = () =>
       {
           noteList.style = 'display : block;transition:2s;'
       }
       item1.onmouseleave = () =>{
           noteList.style = 'display : none ;transition:2s'
       }
       notebtn.onclick = () => {
           if(input.value)
           {
               notes.push(input.value)
               unorderedList.innerHTML = ''
               input.value=''
               for(let j=0;j<notes.length;j++)
               {
                   let listitem = document.createElement('li')
                   listitem.className = 'list-group-item'
                   listitem.innerText = notes[i]
                   unorderedList.appendChild(listitem)
               }
               
           }

       }
       input.addEventListener('keypress', (event)=>{
           if(event.keyCode == 13)
           {
            if(input.value)
            {
                notes.push(event.target.value)
                unorderedList.innerHTML = ''
                input.value=''
                for(let j=0;j<notes.length;j++)
                {
                    let listitem = document.createElement('li')
                    listitem.className = 'list-group-item'
                    listitem.innerText = notes[j]
                    unorderedList.appendChild(listitem)
                }
                
            }
           }
       })
       noteList.appendChild(unorderedList)
       item1.appendChild(noteList)
       taskList.appendChild(item)
    }
}
function addItemFromInput()
{
    if(inpNewTask.value){
        addItem(inpNewTask.value)
        inpNewTask.value=''
    }
    renderList()
}
function toggleItemDone(i){
    tasks[i].done=!tasks[i].done
}
function deleteAllDone(){
     tasks=tasks.filter((item)=>!item.done)
}
function sorting(){
    for(let i=0;i<tasks.length-1;i++)
    {
        for(let j=0;j<tasks.length-i-1;j++)
        {
            if(tasks[j].title.localeCompare(tasks[j+1].title)>0)
            {
                let temp = tasks[j]
                tasks[j]=tasks[j+1]
                tasks[j+1]=temp
            }
        }
    }
}
function deleteAll()
{
    tasks=[]
    renderList()
}
function swap(a,b)
{
        let temp = tasks[a]
        tasks[a] = tasks[b]
        tasks[b] = temp
}
btnDelete.addEventListener('click',()=>{
    deleteAll()
})
btnAdd.addEventListener('click',()=>{
    addItemFromInput()
})
inpNewTask.addEventListener('keypress',(event)=>{
    if(event.keyCode == 13) addItemFromInput()})
btnClearDone.addEventListener('click',()=>
{
    deleteAllDone()
    renderList()
})
btnSort.addEventListener('click',()=>{
    sorting()
    renderList()
})
renderList()