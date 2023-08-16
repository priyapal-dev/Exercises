async function randomItemfunc(arr){
    for(let i=0;i<arr.length;i++){
        console.log(arr[Math.floor(Math.random()*arr.length)])
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}

const array = [1, 'hello', 5, 8, 'world', 4, 9, true, 6.56];

(async()=>{
    await randomItemfunc(array);
})();