const HistDummyData = [
    {
        type: "Food/Drink",
        entity: "McDonalds",
        description: "One cheese burger with fries and coke",
        items: [{item: "Cheease burger with meal (fries and coke)", qty: 1}],
        amount: 120,
        date: new Date(2015, 3, 15, 11, 30, 10),
        currency: "Thai Bhat",
        uid: "12345",
        cashFlow: "out"
    },
    {
        type: "Grocery",
        entity: "7 11 Store",
        description: "Buying fruits",
        items: [{item: "Apple", qty: 2}, {item: "Orange", qty: 1}, {item: "Banana", qty: 12}],
        amount: 200,
        date: new Date(2015, 6, 20, 20, 10, 39),
        currency: "Thai Bhat",
        uid: "65432",
        cashFlow: "out"
    },
    {
        type: "Institution",
        entity: "AIT Thailand",
        description: "Fee payment",
        amount: 29000,
        date: new Date(2021, 8, 3, 18, 4, 3),
        currency: "Thai Bhat",
        uid: "0987676",
        cashFlow: "out"
    }
]

export default HistDummyData;