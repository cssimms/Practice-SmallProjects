// We have a PubSub class which stands for publish subscribe.
// It’s used in event-driven architectures. 
// - Subscribers are register for specific events, and provide a callback
//   function that is run when that event occurs (eg. send welcome email, 
//   updates analytics)
// - Publishers emit events with relevant data. When an event is published
//   all subscribers for that event are called. There can be multiple
//   subscribers for the same event.

// Your goal is to add get this basic class working.
// next step - unsubscribe
// next step - priority of callbacks



class PubSub {

    // {
    //   func: () => {}, 
    //   id: string
    //   priority: integer
    // }
    constructor() {
        // { eventname: callbackID[]}
        this.events = new Map()

    }


    subscribe(eventName, callbackID, priority, callback) {
        // TODO validate the eventName
        if (!this.events.has(eventName)) {
            this.events.set(eventName, [])
        }

        const callbackObj = {
            id: callbackID,
            func: callback,
            priority
        }

        this.events.get(eventName).push(callbackObj)
    }

    unsubscribe(eventName, idToUnsubscribe) {
        const callbacks = this.events.get(eventName)

        const newCallbacks = callbacks.filter(({ id }) => id !== idToUnsubscribe)
        this.events.set(eventName, newCallbacks)
    }

    publish(eventName, data) {
        if (!this.events.has(eventName)) {
            // TODO 
            return
        }

        const callbacksToCall = this.events.get(eventName)
        // store these sorted ...
        callbacksToCall.sort((cbObj1, cbObj2) => {
            return cbObj1.priority - cbObj2.priority
        }).forEach((callbackObj) => {
            const callback = callbackObj.func
            callback(data)
        })
    }
}

const pubsub = new PubSub()

pubsub.subscribe('user_signed_up', 'callback2', 2, (data) => {
    console.log(`updating analytics`)
})

pubsub.subscribe('user_signed_up', 'callback1', 1, (data) => {
    console.log(`sending welcome email to ${data.to}`)
})


pubsub.publish('user_signed_up', { to: 'joe@example.com' })
pubsub.unsubscribe('user_signed_up', 'callback2')

pubsub.publish('user_signed_up', { to: 'jane@example.com' })

// expected output when run
// sending email welcome email to joe@example.com
// updating analytics


