function randomItem(arr){
    return new Promise((resolve)=>{
        const timer = setInterval(()=>{
            console.log(arr[(Math.floor(Math.random()*arr.length))])
        },2000)
        setTimeout(()=>{
            clearInterval(timer);         
            resolve();
        },2000*(arr.length+1)) 
    })
}
let arr= [1, 'hello', 5, 8, 'world', 4, 9, true, 6.56]
randomItem(arr)
    .then((val)=>console.log());