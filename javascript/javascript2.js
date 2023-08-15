function sum(num){
    num=parseInt(num)
    let ans=0
    while(num>0){
        ans+=(num%10)
        num=Math.floor(num/10);
    }
    return ans;
}
let num='678'
console.log(sum(num));