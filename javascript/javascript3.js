function factorial(num){
    if(num==0) return 1;
    return num*factorial(num-1);
}
let num='10'
num=parseInt(num)
console.log(factorial(num))