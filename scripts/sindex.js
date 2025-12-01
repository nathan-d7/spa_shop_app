// /**
//  * Абстрактный класс для создания типового пользователя
//  * @param {string} name
//  * @param {string} login
//  */
// function User(name, login) {
//     this.name = name
//     this.login = login
//     this.id = crypto.randomUUID()
// }

// User.prototype.getId = function () {
//     return this.id
// }

// function BestFriends(name, login, birthDay, phone, testValue) {
//     User.call(this, name, login)
//     this.birthDay = birthDay
//     this.phone = phone
//     // let test = testValue
//     Object.defineProperty(this, 'test', {
//         configurable: false,
//         enumerable: true,
//         get: () => this.birthDay,
//         set: (newValue) => {
//             const regExp = /\d{2}.\d{2}.\d{4}/
//             if (regExp.test(newValue)) {
//                 this.birthDay = newValue
//             } else {
//                 throw new Error("Не является датой")
//             }
//         }
//     })
// }

// BestFriends.prototype = Object.create(User.prototype)
// BestFriends.prototype.setBirthDay = function (newValue) {
//     const regExp = /\d{2}.\d{2}.\d{4}/
//     if (regExp.test(newValue)) {
//         this.birthDay = newValue
//     } else {
//         throw new Error("Не является датой")
//     }
// }
// BestFriends.prototype.getBirthDay = function () {
//     return this.birthDay
// }

// const user = new User("Alex", "alec")

// const friend = new BestFriends("Alex", "alec", "22.01.1900", "+88005553535", "22.11.1900")

// console.log(friend)
// console.log(user)

// const f = (a) => {
//     if (typeof a === 'string') {
//         return a.toUpperCase()
//     } else if (typeof a === 'number') {
//         return a ** 3
//     }
// }

class User {
    #test = 234234
    constructor(name, login) {
        this._name = name
        this.login = login
        this.id = crypto.randomUUID()
    }

    getId() {
        return this.id
    }

    getTest() {
        return this.#test
    }
}

class BestFriends extends User {
    static description = `The MediaStream Image Capture API is an API for capturing images or videos from a photographic device. In addition to capturing data, it also allows you to retrieve information about device capabilities such as image size, red-eye reduction and whether or not there is a flash and what they are currently set to. Conversely, the API allows the capabilities to be configured within the constraints what the device allows.

The process of retrieving an image or video stream happens as described below. The example code is adapted from Chrome's Image Capture examples.

First, get a reference to a device by calling MediaDevices.getUserMedia(). The example below says give me whatever video device is available, though the getUserMedia() method allows more specific capabilities to be requested. This method returns a Promise that resolves with a MediaStream object.`

    constructor(name, login, birthDay, phone) {
        super(name, login)
        this.birthDay = birthDay
        this.phone = phone
    }

    get test() {
        return this.birthDay
    }

    set test(newValue) {
        const regExp = /\d{2}.\d{2}.\d{4}/
        if (regExp.test(newValue)) {
            this.birthDay = newValue
        } else {
            throw new Error("Не является датой")
        }
    }

    static updateDescription(value) {
        this.description = value
    }
}

const user = new User("Alex", "alec")
const friend = new BestFriends("Alex", "alec", "22.01.1900", "+88005553535")
console.log(friend)
