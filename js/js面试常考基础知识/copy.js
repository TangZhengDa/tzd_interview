// 什么是浅拷贝？如何实现一个浅拷贝？什么是深拷贝？如何实现一个深拷贝？

let a = {
    age: 1
}
let b = JSON.parse(JSON.stringify(a)) //深拷贝
a.age = 2
console.log(b.age)


let c = {
    age: 1,
    jobs: {
        first: 'coding'
    }
}
let d = { ...c }//实现了深拷贝的效果，但是是浅拷贝的方法
c.jobs.first = 'waiter'
console.log(d.age) 