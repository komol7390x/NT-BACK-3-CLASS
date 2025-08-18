const reverseFunc = (str: string): string => {
    return str.split('').reverse().join('')
}

const result1=reverseFunc('Komol')
// -------------------------------------------------------------------
const primeryNumber = (son: number): boolean => {
    if (son <= 1) return false;
    if (son == 2) return true;
    if (son % 2 == 0) return false;
    for (let i = 3; i * i <= son; i += 2) {
        if (son % i === 0) return false;
    }
    return true;
}
const result2=primeryNumber(6)
// -------------------------------------------------------------------
const changeUser=(data:object):object=>{
    for(let [key,value] of Object.entries(data)){
        if(key=='age'){
            data[key]=value+1
        }
    }
    return data
}
const result3=changeUser({name:'Komol',age:27,email:'www.komol@gmail.com'})
// -------------------------------------------------------------------
const findTypePassword=(item:unknown):number | undefined=>{
    if(typeof item=='string'){
        return item.length
    }else if(typeof item=='number'){
        return item.toString().length
    }
}
const result4=findTypePassword(1235)
// -------------------------------------------------------------------
const returnTuple=(name:string,age:number):[string,number]=>{
    return [name,age]
}

const result5=returnTuple('Komol',27)
// -------------------------------------------------------------------
const array=(arr:number[]):number[]=>{
    const res=arr.filter(item=>{
        if(item%2==0){            
            return item
        }
    })
    return res
}

const result6=array([1,2,3,4,5,6,7])
console.log(result6);
