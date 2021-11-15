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
    stars: {
        type: Number,
        required: true
    },
    bias: {
        type: Number,
        required: true
    },
    importance: {
        type: Number,
        required: true
    },
    opportunities: {
        type: Number,
        required: true
    },
    miss: {
        type: Number,
        required: true
    },
    advance: {
        type: Number,
        required: true
    },
    priority: {
        type: Number,
        required: true
    },
    empowerment: {
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