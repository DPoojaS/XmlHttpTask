let cl = console.log;

//properties 

//DELETE >> Use when want to delete any entity or object
//POST >> Use to add New data on database
//GET >> useto get data from database
//PATCH >>It is used to update partialy
//PUT >> It is used to update total object

//success >> It tell that ApI is successed or failed

let info = document.getElementById("info");
let Update = document.getElementById("Update");
let submit = document.getElementById("submit");
let studentForm = document.getElementById("studentForm");
let information = document.getElementById("information");
let title = document.getElementById("title");

let apiUrl = "https://jsonplaceholder.typicode.com/posts";


let postArray = [];
function fetchData(methodName, baseUrl, tempFun, data){
    
//1. create a object by using XMLHTTPRequest.
let xhr = new XMLHttpRequest();

//2 call open method on object
xhr.open(methodName, baseUrl)

//3 use onload method
xhr.onload = function(){
    // cl(xhr.status); 
    if((xhr.status === 200 || xhr.status === 201 ) && xhr.readyState === 4){
    //  data = JSON.parse(xhr.response);
    // cl(data);
    // tempFun(data);
    if(methodName == 'GET')  {
    postArray = JSON.parse(xhr.response);
    tempFun (postArray);
    }
    }
   if(xhr.status === 400){
    alert('page not found')
   };
}

//4 send method
xhr.send(data)
}

const onEditHandler = (ele) => {
    // cl(ele.closest('.card').dataset.id);
    let getId = +ele.closest('.card').dataset.id;
    localStorage.setItem('setId', getId);   
     let getObj = postArray.find(o => o.id === getId )   
     title.value = getObj.title;
     information.value = getObj.body;
      Update.classList.remove("d-none");
      submit.classList.add("d-none");

}

const onDeleteHandler = (e) => {
   // cl(e)
    let getId = +e.closest('.card').dataset.id;
    let deleteUrl = `${apiUrl}/${getId}`;
    fetchData("DELETE", deleteUrl);
        postArray = postArray.filter(ele =>{
        return ele.id !== getId
    })
    templating(postArray)
}
fetchData("GET", apiUrl, templating);

function templating(arr){
    let result = "";
     arr.forEach(ele =>{
        result +=
        `<div class="card mb-3" data-id="${ele.id}">
        <div class="card-body">
            <h3>${ele.title}</h3>
            <p>${ele.body}</p>
            <p class="text-right">
            <button class="btn btn-primary" onclick="onEditHandler(this)">Edit</button>
            <button class="btn btn-danger" onclick="onDeleteHandler(this)">Delete</button>
            </p>
        </div>
        </div>`
     });
     info.innerHTML = result;
}

const onStudentSubmit = (e) => {
        e.preventDefault();
        let obj = {
            title :title.value,
            body: information.value
        };
        // postArray.push(obj);
        postArray.unshift(obj);
        studentForm.reset();
        templating(postArray);
        fetchData('POST', apiUrl, JSON.stringify(obj) )
        
}
const onUpdateHandler = (eve) =>{
    let getId = localStorage.getItem('setId');
    let updatUrl = `${apiUrl}/${getId}`;
    let updatedObj = {
        title : title.value,
        body:information.value
    }
    postArray.forEach(o =>{
        if(o.id == getId){
           o.title = title.value,
            o.body = information.value
        }
    })
     templating(postArray);
     studentForm.reset();
     Update.classList.add("d-none");
     submit.classList.remove("d-none");
    fetchData('PATCH', updatUrl,JSON.stringify(updatedObj) )
    
}


studentForm.addEventListener("submit", onStudentSubmit);
Update.addEventListener("click", onUpdateHandler)

















//xhr.status
//if the value of xhr.status is < 201 || 200. It means api get successful 200>success
//404 > succes >> Page/url is not found
//403 >> forbidden >> Api is private only few persons have access to open the api
//4XX >> client side error occured for 4XX or 404 , 403
//5XX >> server side Error / Back End 


//xhr.readyState >>
//0 >> request is not initialise
//1 >> server connection established
//2 >> request received by server
//3 >> processing request
//4 >> response is ready