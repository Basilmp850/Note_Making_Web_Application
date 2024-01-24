

let text = "";
//let temp = "";
// console.log(localStorage.getItem("topic"));
window.addEventListener("mouseup", () => { 
     text="";
    
    if (window.getSelection) {
       // if(window.getSelection().toString()!="")
        text = window.getSelection().toString();
        //temp=text;
       
    } else if (document.selection) {
        // if(document.selection.createRange().text!="")
        text = document.selection.createRange().text;
    }
    else
     text = '';
   // else 
     //text=temp;
    
    // console.log(text);
    // chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    //     tabUrl = tabs[0].url;
    //  });
    //  if(tabUrl=='http://127.0.0.1:5500/index.html')
    //  {
    //      topic = localStorage.getItem("topic");
    //  }
chrome.runtime.sendMessage({
    "text": text
});

 });


 chrome.runtime.onMessage.addListener(
     function status_received(response,sender,sendresponse) {
         let status = response.status;
         console.log('[content-script]',status);
         alert(status);
     }
 );
//  module.exports = {'text': text};





