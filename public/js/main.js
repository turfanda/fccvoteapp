var char=64;

$(function(){
$("#addOption").on("click",function(event ){
event.preventDefault();
var y =$("<li>")
var x = $("<input type='text'>").attr("id",String.fromCharCode(char+1)).attr("name",String.fromCharCode(char+1))
var z =y.append(x);
$("#options").append(z);  
});
})