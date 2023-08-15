let obj = [
    {
    name: 'Sara',
    age:24
    },
    {
    name: 'John', age:24
    },
    {
    name: 'Jack', age:25
    }
]
obj.sort((a,b)=>{
    let first = a.name.toLowerCase()
    let second = b.name.toLowerCase()
    if(first == second){
        if(a.age>b.age) return 1;
        else if(a.age<b.age) return -1;
        return 0;
    }
    else if(first>second)
        return 1;
    return -1;
})
obj.forEach((element)=>{
    console.log(element)
})