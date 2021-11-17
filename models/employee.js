const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    joineddate: {
        type: Date,
        required: true
    },
    equalityRating: {
        type: Number,
        required: true
    },
    equalityBias: {
        type: Number,
        required: true
    },
    empowermentImp: {
        type: Number,
        required: true
    },
    empowermentOpportunities: {
        type: Number,
        required: true
    },
    empowermentBenifit: {
        type: Number,
        required: true
    },
    diversity: {
        type: Number,
        required: true
    },
    empowermentActivity: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})




const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;