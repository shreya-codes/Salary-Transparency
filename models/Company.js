const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    companyname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    noofdepartment: {
        type: Number,
        required: true
    },
    noofemployees: {
        type: Number,
        required: true
    },
    dateofestablishment: {
        type: Date,
        required: true
    },
    introduction: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;