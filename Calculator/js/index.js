
let output = document.querySelector('.output');
function insert(num) 
{
    output.value +=  num;
}

function equal(){
try{
    output.value = eval(output.value);
}
catch(err)
{
    alert('please provide valid problems');
    output.value = "";
}
}

function clr(){
    output.value = "";
}
function del(){
    output.value = output.value.slice(0,-1);
}
