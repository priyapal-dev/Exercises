let arr=[{
    name: "Harshil",
    userId: 1,
    adresses: [{
    addressId:1,
    city: "Rajkot",
    state: "Gujrat" },
    {
    addressId:2,
    city: "Bhopal",
    state: "MP" }]
    },
    {
    name: "Rakesh",
    userId: 2,
    adresses: [{
    addressId:3,
    city: "Patna",
    state: "Bihar" },
    {
    addressId:4,
    city: "Bangalore",
    state: "KA" }]
    },
    {
    name: "Kunal",
    userId: 3,
    adresses: [{
    addressId:5,
    city: "New Delhi",
    state: "Delhi" },
    {
    addressId:6,
    city: "Indore",
    state: "MP"
    }]
    }]
let ans=new Array;
    arr.forEach((element)=>{
        // console.log(element)
        let address=element.adresses
        address.forEach((add)=>{
            let temp=new Object;
            temp.addressId=add.addressId
            temp.city=add.city
            temp.state=add.state
            temp.name=element.name
            temp.userId=element.userId
            ans.push(temp)
        })
    })
ans.forEach((element)=>{
    console.log(element) 
})
    