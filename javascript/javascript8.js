let arr1=[1,2,3]
let arr2=[2,3,5]

let ans=arr1.concat(arr2)

let res= ans.filter((element, index)=>{
    return index === ans.indexOf(element)
})
console.log(res)