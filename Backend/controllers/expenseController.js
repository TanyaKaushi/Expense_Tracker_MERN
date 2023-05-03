const ExpenseSchema = require("../models/expenseModel")

exports.addExpense = async (req,res) => {
    //console.log(req.body); //display the adding data in console
    const{title,amount,category,description,date} = req.body

    const expense = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try {
        //validations
        if(!title || !category || !amount || !description || !date){
            return res.this.status(400).json({message: 'All fields are required'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.this.status(400).json({message: 'Amount must be positive'})
        }
        await expense.save()
        res.status(200).json({message: 'Expense added'})
    } catch (error) {
        res.status(500).json({message: 'Error adding'})
    }

    console.log(expense)
}

exports.getExpense = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({message: 'Error GET'})
    }
}

exports.deleteExpense = async (req, res) => {
    //send a request(req) to body to get the id
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
    .then((expense) => {
        res.status(200).json({message: 'Expense deleted'})
    })
    .catch((err) => {
        res.status(500).json({message: 'Error deleted'})
    })
}