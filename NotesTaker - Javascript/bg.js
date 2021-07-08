var storage=window.localStorage;

var total=Number(storage.getItem('total') )|| 0;


var storeData = function(dataString){
    //total=Number(storage.getItem('total') )|| 0;
    if (String(dataString) !='' && String(dataString) !="undefined")
    {
        storage.setItem(total,dataString);
    total+=1;
    
    storage.setItem("total",total);}
    
}
var updatePopupHtmlFile=function(){
    var innerHtmlString='<div class="txt">';
    for (var i=0;i<total;i++) innerHtmlString+=storage[total-1-i]+"<br><br></div><div class='empty'></div>";
}

chrome.runtime.onMessage.addListener(
    function(request,sender,sendResponse){
       // alert('hi');
	var x=request.inComingData || "";
        if (x != "" && typeof(x)=='string' && x !='undefined'){
            var dataString=request.inComingData;
            storeData(dataString);
}
  else{  
    alert('data not stored');
    }
}

);

