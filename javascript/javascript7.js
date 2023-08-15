function username(name, greet){
    greet(name)
}
function greet(name){
    console.log('Hello', name)
}
username('John',greet)