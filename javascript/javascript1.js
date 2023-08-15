function sum(a,b){
    ans = parseInt(a) + parseInt(b)
    if(a==b) return 3*ans;
    return ans;
}
let num1 = '89'
let num2 = '11'
console.log(sum(num1, num2))