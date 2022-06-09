const Bagel = require("../src/bagel.js");
const deals = require("../src/deals.js");

class Basket {
    constructor(number = 3) {
        this.contents = []
        this.IDcounter = 0
        this.capacity = number
        this.counts = {}
    }

    addBagel(SKU, numOfBagels = 1) {      
        for (let i = 0; i < numOfBagels; i++) {
            if (!this.basketIsFull()) {
            this.IDcounter++
            const id = this.IDcounter
            let bagelItem = new Bagel(SKU, id)
            this.contents.push(bagelItem)
            }
        }
        return this.contents

    }
    removeBagel(id) {
        for (let i = 0; i < this.contents.length; i++) {
            if (this.contents[i].id === id) {
                this.contents.splice([i], 1)
                return this.contents
            }
        } return "Bagel isn't in basket"
    }

    basketIsFull() {
        if (this.contents.length >= this.capacity) {
           return 'basket is full'
        }
        return false
    }

    getPriceOfBagel(SKU) {
        const output = new Bagel(SKU);
        return output.price
    }
/*
    getTotal() {
        let total = 0
        this.checkDeals()
        console.log(this.countBagelsinBasket())
      for (let i = 0; i < this.contents.length; i++) {
         total += this.contents[i].price * 100
      }
     return total/100
    }
*/
    countBagelsInBasket(){
        this.counts = {}
        for (let i = 0; i < this.contents.length; i++){
            const SKU = this.contents[i]['SKU']
            if (!this.counts.hasOwnProperty(SKU)) {
                this.counts[`${SKU}`] = 1
            } else {
                this.counts[`${SKU}`]++;
            }
        }
         return this.counts;
    }

    static getSubtotal(counts,SKU){
        let total = 0
        const count = counts[SKU]
        const dealQuantity = deals[SKU][0]
        const dealPrice = deals[SKU][1]
        const bagelPrice = Bagel.getPriceOfBagel(SKU)
        const dealSum = Math.floor(count / dealQuantity) * (dealPrice)
        const nonDealSum = (count % dealQuantity) * (bagelPrice)
        total += (dealSum + nonDealSum).toFixed(2)
        if (dealQuantity === 1){
            const BOGOFSKU = `${deals[SKU][2]}`
            const numOfDiscounts = counts[BOGOFSKU] % deals[BOGOFSKU][0]
            const saving = Bagel.getPriceOfBagel(BOGOFSKU) - deals[SKU][3]
            const discount = numOfDiscounts * saving
            console.log(`discount for ${SKU} = ${discount}`)
            total -= discount
        }
        return Number(total)
    }

    getTotal(){
        const counts = this.counts
        let total = 0
        for (let SKU in counts){
            const count = counts[`${SKU}`]
            const dealQuantity = deals[SKU][0]
            const dealPrice = deals[SKU][1]
            const bagelPrice = Bagel.getPriceOfBagel(SKU)
            if (deals.hasOwnProperty(SKU)){
                const dealSum = Math.floor(count / dealQuantity) * (dealPrice)
                const nonDealSum = (count % dealQuantity) * (bagelPrice)
                const subtotal = dealSum + nonDealSum
                console.log(`subtotal for ${SKU} = ${subtotal}`)
                total += subtotal
            }
            if (dealQuantity === 1){                                                 // adhoc application of coffee deal saving
                const BOGOFSKU = `${deals[SKU][2]}`
                const numOfDiscounts = counts[BOGOFSKU] % deals[BOGOFSKU][0]
                const saving = Bagel.getPriceOfBagel(BOGOFSKU) - deals[SKU][3]
                const discount = numOfDiscounts * saving
                console.log(`discount for ${SKU} = ${discount}`)
                total -= discount
            }
            console.log(`total = ${total}`)
        }
        return Number(total.toFixed(2))
    }
        
        
        
        /*this.contents.filter()
        for(let i = 0; i < this.contents.length; i++){
            for (let j = 0; j < )
        }
    }
    */

}


module.exports = Basket