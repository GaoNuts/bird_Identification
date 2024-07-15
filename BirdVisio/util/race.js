
var isPromise = function isPromise(x) {
    //js的test()方法用于检测一个字符串是否匹配某个格式。
    //1.判断x是不是object或function  2.x中是否有then属性，有则执行then是否报错  3.then是一个方法
    if (x !== null && /^(object|function)$/.test(typeof x)) {
        // 这是一个对象
        var then
        try {
            then = x.then
        } catch(err) {
            return false
        }
        if (typeof then === 'function') return true
    }
    return false
}
export function promiseRace(promises) {
    //语法Array.isArray(obj)  如果对象是数组则返回 true，否则返回 false。
    if(!Array.isArray(promises))  throw new TypeError('promises must be an array')
    return new Promise(function (resolve, reject) {
        for (let i = 0; i < promises.length; i++) {
            var promise = promises[i]
            if (!isPromise(promise)) promise = Promise.resolve(promise)
            promise.then(function onfulfilled(value) {
                resolve(value)
            }).catch(function onrejected(reason) {
                //一个失败，整体就失败
                reject(reason)
            })
        }
    })
}