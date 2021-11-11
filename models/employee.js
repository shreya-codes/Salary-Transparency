const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: True
    },
    gender: {
        type: String,
        required: True
    },
    company: {
        type: String,
        required: True
    },
    department: {
        type: String,
        required: True
    },
    position: {
        type: String,
        required: True
    },
    salary: {
        type: String,
        required: True
    },
    experience: {
        type: String,
        required: True
    },
    joineddate: {
        type: Date,
        required: True
    },
    stars: {
        type: Number,
        required: True
    },
    happiness: {
        type: Number,
        required: True
    },
    bias: {
        type: Number,
        required: True
    },
    importance: {
        type: Number,
        required: True
    },
    opportunities: {
        type: Number,
        required: True
    },
    miss: {
        type: Number,
        required: True
    },
    advance: {
        type: Number,
        required: True
    },
    priority: {
        type: Number,
        required: True
    },
    workplace: {
        type: Number,
        required: True
    },
    date: {
        type: Date,
        default: Date.now
    }
})




const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;