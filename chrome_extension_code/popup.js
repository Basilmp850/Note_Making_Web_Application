//"http://extensionserver.herokuapp.com
const SERVER_URL = "https://extensionserver.herokuapp.com";
let received_text="";
let topic="";
let previous_text = "";
chrome.runtime.onMessage.addListener(
    function popup_send_message(response,sender,sendresponse) {
    received_text = response.text;
    console.log('[listener onmessage received]',received_text);
    chrome.storage.local.set({'selected_text': received_text}, function() {
      console.log('Value is set to ' + received_text);
  });
    var div = document.getElementById('selected-content');
    div.innerHTML="";
    var content = document.createTextNode(received_text);
    div.appendChild(content);
  

});

function send_message() {
   
    console.log('[receivedtext]',received_text);
    
    let tabUrl="";
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
     tabUrl = tabs[0].url;
  });

  //  topic_created = localStorage.getItem("topic");
    chrome.storage.local.get('selected_text', function(result) {
        console.log('[selectedtext]',result.selected_text);

        postData(`${SERVER_URL}/api/save-data/`, {
            url: tabUrl,
            data: result.selected_text,
            date: get_date()
        })

        // fetch('${SERVER_URL}/api/save-data/').then((response) => {
        //   return response.json()
        //   .then( data => {
        //      alert(data.status);
        //   })
        // }).catch((err) => {
        //   console.error(err);
        // });

        fetch('${SERVER_URL}/api/save-data/').then((response) => {
           alert(response.status);
           
        }).catch((err) => {
          console.error(err);
        });
        chrome.storage.local.set({'selected_text': ""}, function() {
          console.log('[after sending]Value is set to ' + received_text);
      });
        
        
    });


   
}


document.getElementById("sendbtn").addEventListener("click", send_message);


// function get_message(){
 
//   const myRequest = new Request('${SERVER_URL}/api/get-data/', {
//     method: 'GET',
//     headers: myHeaders,
//     mode: 'cors',
//     cache: 'default',
//   });
  
//   fetch(myRequest)
//     .then(response => response.blob())
//     .then(myBlob => {
//       myImage.src = URL.createObjectURL(myBlob);
//     });


// }

// Example POST method implementation:
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then((data) => {
      console.log('popup', data);
       alert("Data sent!!");
    }).catch((err) => {
      console.log('Error occured popup!!');
    });
    console.log(response.json());

    return response.json(); // parses JSON response into native JavaScript objects
  }

  


  function get_date() {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime;
  }
