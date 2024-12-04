/**
 * 
 *  Design an interface for txns, rewards, and user feeds
 *  where transactions 1 - 1 with rewards, and a feed shows txns and rewards for that user
 *  rewards have different calculation types 
 *  5% back for specific merchants
 *  3% back for travel
 *  1% back for everything else
 */

// Attempt 11/5, day of the interview. 
// I like my class structures here, but am annoted I can't simulate an async process with JS. I should know how to do this!!

// Eventually you could support a seed value based on user, but in general a UUID or UULD would be fine
const uuid = () => {
    const max = 10000
    return Math.floor(Math.random() * max)
}

// Transaction Service 
class TransactionService {
    constructor(rewardService) {
        this.txnData = new Map()
        this.rewardService = rewardService
    }

    printData() {
        console.log('Transaction Data DB:', this.txnData)
        this.rewardService.printData()
    }

    getTransactions(userId) {
        const userTxns = this.txnData.get(userId)
        return userTxns === undefined ? [] : userTxns
    }

    async createTransaction(data) {
        // run validations on data
        const { userId } = data
        if (!this.txnData.has(userId)) {
            this.txnData.set(userId, [])
        }

        const txnId = uuid()

        // This would be the official data model in the database
        const transactionObject = {
            ...data,
            id: txnId,
        }
        // Would read the status from the DB, and return success or failure depending
        this.txnData.get(userId).push(transactionObject)

        await this.rewardService.createReward(transactionObject)
        return true
    }
}

// Reward Service 
class RewardService {
    constructor() {
        this.rewardData = {}
    }

    printData() {
        console.log('Reward DB: ', this.rewardData)
    }

    getRewardType(merchant) {
        if (merchant === 'Cool Store') {
            return 'merchant'
        } else {
            return 'basic'
        }
    }

    getRewardAmount(txnAmount, type) {
        const bonusPercentage = {
            'merchant': 0.05,
            'basic': 0.01
        }
        if (!bonusPercentage[type]) { return false } // or throw error
        return txnAmount * bonusPercentage
    }

    async createReward(data) {
        const { txnId, merchant, amount } = data
        if (!txnId) { return false } // or throw error, etc.

        if (!this.rewardData.has(txnId)) {
            this.rewardData.set(txnId, [])
        }
        const rewardType = this.getRewardType(merchant)
        const rewardAmount = this.getRewardAmount(amount, rewardType)

        const reward = {
            amount: rewardAmount,
            type: rewardType
        }
        this.rewardData.get(txnId).push(reward)
    }
}

// Tests 
(async () => {
    const rewardService = new RewardService()
    const txnSer = new TransactionService(rewardService)
    const testTxn = {
        userId: 'user1',
        amount: 10,
        merchant: 'Cool Merchant'
    }
    await txnSer.createTransaction(testTxn)
    console.log('Should create and get txn:', txnSer.getTransactions('user1'))
})()