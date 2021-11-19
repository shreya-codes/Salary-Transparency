const express=require('express');
const router= express.Router();// creates a new router object to handle requests
const bcrypt=require('bcryptjs');
const passport=require('passport');
//User model
const User = require('../models/User'); // now we can use methods on user

//Employee Model
const Employee = require('../models/employee');

//Company Model
const Company = require('../models/Company');

//Salary page
router.get('/salary',async(req,res)=>{
    const Salary=await Employee.aggregate([
 
        {
          $match : {$and: 
              [
              { company: "Company 1" },{ position: "Low-Level" }
              ]}
        },
        {  $group : {_id : "$date" } }
       
       ])
       console.log(salary)
       res.render('salary', {Salary})
})
//RANKING page
router.get('/rankings', async (req,res)=>
{
  const employeeRankings = await Employee.aggregate([
    {$match:{}},
    {  $group:
      {
        _id: "$company",
        avgRating: { $avg: "$equalityRating" },
        avgBiasness: { $avg: "$equalityBias" },
        avgImportance: { $avg: "$empowermentImp" },
        avgOpportunities: { $avg: "$empowermentOpportunities" },
        avgMissedout: { $avg: "$empowermentBenifit" },
        avgDiversity: { $avg: "$diversity" },
        avgEmpowermentAct: { $avg: "$empowermentActivity" }
      }},
      {
        $addFields: {
            avgEquality: {
                $avg: [ "$avgBiasness", "$avgRating" ]
            }
        }},
        {
            $addFields: {
                avgEmpowerment: {
                    $avg: [ "$avgImportance", "$avgOpportunities","$avgMissedout","$avgEmpowermentAct" ]
                }
            }},
            
      {
        $addFields: {
            totalSum: {
                $add: [ "$avgEquality", "$avgEmpowerment","$avgDiversity" ]
            }
        }},
     
        {
          $addFields: {
              totalAvg: {
                  $divide: [ "$totalSum", 3 ]
              }
          }
      },
      {
          $sort:{totalAvg:-1}
      }
  ]) // returns array
  console.log(employeeRankings)
  res.render('rankings', {employeeRankings})
})

//DASHBOARD page
router.get('/dashboard',(req,res)=>res.render('dashboard'))

//EMPLOYEEFORM page
router.get('/employeeForm',(req,res)=> res.render('employeeForm'));

//COMPANYFORM age
 router.get('/companyForm',(req,res)=> res.render('companyForm'));

//LOGIN page
// router.get('/login',(req,res)=> res.send('Login'));
router.get('/login',(req,res)=> res.render('login'));

//Register
// router.get('/register',(req,res)=> res.send('Register'));
 router.get('/register',(req,res)=> res.render('register'));

 //Register handle 
 router.post('/register',(req ,res )=>{
    //  console.log(req.body );
    //  res.send('Hello');
    const { name , email , password, password2}= req.body;
    let errors=[];
     // check required fields 
    if (!name || !email || !password || !password2){
        errors.push({msg:  ' please fill in all the fields'});
    }
    // check password match
    if (password !== password2){
        errors.push({msg:'passwords do not match'});

    }
    // check password length
    if(password.length<6){
        errors.push({msg:'password should be atleast 6 characters' });
    }
    if (errors.length >0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
             
        })

    }
    else{
        // res.send('pass');
        //Validation 
        User.findOne({email:email})
        .then(user =>{
            if(user){
                // user exists
                errors.push({msg:'Email is already registered'});
                res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    password2
                     
                })

            }
            else{
                const newUser = new User({
                    name,
                    email,
                    password
                });
           
                //Hash password
                bcrypt.genSalt(10,(err,salt)=>
                 bcrypt.hash(newUser.password,salt,(err,hash)=>{
                     if(err) throw err;
                     //set password to hashed
                     newUser.password=hash;
                     //Save user
                     newUser.save()
                     .then(user=>{
                         req.flash('success_msg', 'You are nOw registered !');
                         res.redirect('/users/login');
                     })
                     .catch(err => console.log(err));
                }))
                
            }


        });
    }
 });
 //Login handle
 router.post('/login',(req,res,next)=>{
     passport.authenticate('local',{
         successRedirect:'/dashboard',
         failureRedirect:'/users/login',
         failureFlash:true
     })(req,res,next);

 })
 //logout handle
 router.get('/logout',(req,res)=>{
     req.logout();
     req.flash('success_msg','You are loggedout');
     res.redirect('/users/login');
 })

// module.exports=router; //Module exports are the instruction that tells Node. js which bits of code (functions, objects, strings, etc.) to “export” from a given file so other files are allowed to access the exported code

//employee data submission handle
router.post('/submit', (req, res) => {

    const { name, gender, company, department, position, salary, experience, joineddate, equalityRating, equalityBias, empowermentImp, empowermentOpportunities, empowermentBenifit, diversity, empowermentActivity } = req.body;

    const newEmployee = new Employee({
        name,
        gender,
        company,
        department,
        position,
        salary,
        experience,
        joineddate,
        equalityRating,
        equalityBias,
        empowermentImp,
        empowermentOpportunities,
        empowermentBenifit,
        diversity,
        empowermentActivity
    });

    newEmployee.save()
        .then(employee => {
            res.redirect('/dashboard');
            
        })
        .catch(err => console.log(err));
});


router.post('/company', (req, res) => {
    const { companyname, address, noofdepartment, noofemployees, dateofestablishment, introduction } = req.body;

    const newCompany = new Company({
        companyname,
        address,
        noofdepartment,
        noofemployees,
        dateofestablishment,
        introduction
    });


    //save company

    newCompany.save()
        .then(Company => {
            res.redirect('/dashboard');
        })
        .catch(err => console.log(err));
})
module.exports = router; //Module exports are the instruction that tells Node. js which bits of code (functions, objects, strings, etc.) to “export” from a given file so other files are allowed to access the exported code