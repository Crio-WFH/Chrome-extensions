var init=function(){


var w=chrome.extension.getBackgroundPage();
    
var total=Number(w.localStorage["total"]);
    
var innerHtmlString="<a id='link' href='' download='data.txt'><img class='download' width=30 src='Images/download.png'></><a><img class ='delete' width=32 src='Images/delete.png'></><div class='empty'></div><div class='txt'>";
for (var i=0;i<total;i++) {
    if (w.localStorage[total-1-i] !="")
    innerHtmlString +=w.localStorage[total-1-i]+"<br><img class='trash' width=24 src='Images/trash.png' id="+String(total-1-i)+" ></><div class='empty'></div>";}
    
 
var onclickImage=function(){
    
    var i=Number(this.id)
    w.localStorage[i]='';
    //alert(this.id);
    init();


}
var onClearClick=function(){
    w.localStorage.clear();
    init();
}

var onDownloadClick=function(){
    var txt=''
    for (var i=0;i<total;i++) {
        if (w.localStorage[i] !="") txt +=w.localStorage[i]+"\n\n------------------------------------------------------------------------\n";}
    var dnl_file = new Date().toDateString()+"_data.doc";

    document.getElementById('link').setAttribute("download",dnl_file);
    document.getElementById('link').onclick=function(code){
  
    this.href='data:text/plain;charset=utf-8,'+ encodeURIComponent(txt);  
    }

}

x=document.getElementById("store");
x.innerHTML=innerHtmlString;  
var classnames=document.getElementsByClassName("download");
for (var i=0;i<classnames.length;i++) classnames[i].addEventListener('click',onDownloadClick,false);


var classnames=document.getElementsByClassName("delete");
for (var i=0;i<classnames.length;i++) classnames[i].addEventListener('click',onClearClick,false);

var classnames=document.getElementsByClassName("trash");
for (var i=0;i<classnames.length;i++) classnames[i].addEventListener('click',onclickImage,false);
}


window.onload=init;

