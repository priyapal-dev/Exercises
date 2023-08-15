let my_string=1234
try{
    let revStr = my_string.split('').reduce((acc, ch)=> ch + acc)
    console.log("Reversed string is: "+revStr)
    
}
catch(error){
    console.log('Error: '+error);
}
console.log("Type of my_string is: "+typeof(my_string))