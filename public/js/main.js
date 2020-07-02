

const weatherForm = document.querySelector('form');

const message_1 = document.getElementById('message-1');
const message_2 = document.getElementById('message-2');

message_1.textContent = '';
message_2.textContent = '';

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    console.log(e.target[0].value);
    message_1.textContent = 'Loading ...';
    message_2.textContent = '';
    fetch('/weather?address=' + e.target[0].value).then((res)=>{
        res.json().then((data)=>{
            if(data.error){
                message_1.textContent = data.error;
            }else{
                message_1.textContent = data.location;
                message_2.textContent = data.weather;
            }
        })

    }).catch((err)=>{
        console.log(err);
    });
});