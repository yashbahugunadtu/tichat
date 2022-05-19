let username = "{{username}}";
let usernumber = "{{userno}}";
let receivername = "{{receivername}}";
let receivernumber = "{{receiverno}}";
let url = "http://127.0.0.1:5000";

function back() {
  location.href = `${url}/user/${username}/${usernumber}`;
  console.log()
}
document.getElementById('chats').innerHTML = "{{chatts}}";
//check chat for any updates every second
const interval = setInterval(check, 1000);

function check() {
  console.log(location.href);
    fetch(location.href, {
        method: "POST",
        "content-type":"application/json",
        body: JSON.stringify({id:"0"}),
    }).then((res)=> res.json()).then((res)=> {
          //console.log(res);
          mess = "";
          for (let key in res) {
            //list[0] -> time
            //list[1] -> user
            //list[2] -> message
                if (res[key][1] === 1) {
                    mess += "<text style='color:blue'>"
                }    
                else {
                    mess += "<text style='color:red'>"
                }
                    
                mess += res[key][2];
                mess += "</text><br>"
          }
          document.getElementById('chats').innerHTML = mess;
        })
}

function send() {
    let inp = document.getElementById('message').value;
  
    fetch(location.href, {
        method: "POST",
        "content-type":"application/json",
        body: JSON.stringify({input:inp, id:"1"}),
    }).then((res)=> res.json()).then((res)=> {
            document.getElementById('chats').innerHTML += res.message;
        })      
}