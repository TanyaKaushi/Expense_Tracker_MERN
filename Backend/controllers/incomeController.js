const IncomeSchema = require("../models/incomeModel")

exports.addIncome = async (req,res) => {
    //console.log(req.body); //display the adding data in console
    const{title,amount,category,description,date} = req.body

    const income = IncomeSchema({
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
        await income.save()
        res.status(200).json({message: 'Income added'})
    } catch (error) {
        res.status(500).json({message: 'Error adding'})
    }

    console.log(income)
}

exports.getIncome = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Error GET'})
    }
}

exports.deleteIncome = async (req, res) => {
    //send a request(req) to body to get the id
    const {id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
    .then((income) => {
        res.status(200).json({message: 'Income deleted'})
    })
    .catch((err) => {
        res.status(500).json({message: 'Error deleted'})
    })
}