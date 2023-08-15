let data = [{
    addressId: 1, 
    city: 'Rajkot', 
    state: 'Gujrat', 
    name: 'Harshil', 
    userId: 1},
    {addressId: 2, city: 'Bhopal', state: 'MP', name: 'Harshil', userId: 1},
    {addressId: 3, city: 'Patna', state: 'Bihar', name: 'Rakesh', userId: 2},
    {addressId: 4, city: 'Bangalore', state: 'KA', name: 'Rakesh', userId: 2},
    {addressId: 5, city: 'New Delhi', state: 'Delhi', name: 'Kunal', userId: 3},
    {addressId: 6, city: 'Indore', state: 'MP', name: 'Kunal', userId: 3}
    ]
let ans=new Array;
data.forEach((element)=>{
    let obj=new Object
    obj.name=element.name
    obj.userId=element.userId
    obj.adresses=new Array
    let address=new Object
    address.addressId=element.addressId
    address.city=element.city
    address.state=element.state

    const found=ans.find((x)=>x.userId==obj.userId)
    if(found){
        found.adresses.push(address)
    }
    else{
        obj.adresses.push(address)
        ans.push(obj)
    }
})
ans.forEach(element=>{
    console.log(element)
    // element.adresses.forEach(x=> console.log(x))
})
