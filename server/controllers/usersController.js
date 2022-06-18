const {UserModel} = require( './../models/usersModel' );
const bcrypt = require( 'bcrypt' );



const UsersController = {

    register: async function (req,res) {
        
        const {firstname,lastname,email,password,confpassword} = req.body 

    //!-----VALIDATIONS--------------------------------------------------------------------------
        let isValid = true;
        let errormessages = {}

        //* No empty spaces
        if(!firstname || !lastname || !email || !password || !confpassword){
            isValid = false
            errormessages.empty = "📄 Seems you leaved an empty space"
        }
        //* Firstname min 3
        if(firstname.length < 3){
            isValid = false
            errormessages.firstnlen = "📮 Firstname must be at least 3 caracters"
        }
        //* Lastname min 3 
        if(lastname.length < 3){
            isValid = false
            errormessages.lastnlen = "📮 Lastname must be at least 3 caracters"
        }
        //* Firstname max 20
        if(firstname.length > 20){
            isValid = false
            errormessages.firstnlen2 = "📮 Firstname must be less than 20 caracters"
        }
        //* Lastname max 20
        if(lastname.length > 20){
            isValid = false
            errormessages.lastnlen2 = "📮 Lastname must be less than 20 caracters"
        }
        //* Password min 8
        if(password.length < 8){
            isValid = false
            errormessages.passlen = "📮 Password must be at least 8 caracters"
        }
        //* ConfPassword min 8
        if(confpassword.length < 8){
            isValid = false
            errormessages.passlen2 = "📮 Confirmation must be at least 8 caracters"
        }
        //* Passwords Match
        if(password !== confpassword){
            isValid = false
            errormessages.passnotmatch = "⌨️ The passwords doesn't match"
        }

        //?------------------------------------------------------

        const emailExist = await UserModel.getUserByEmail(email)
        if(emailExist !== null){
            isValid = false
            errormessages.emailExist = "⚠️ This Email already exits"
        }

        //?------------------------------------------------------
    //!-----VALIDATIONS--------------------------------------------------------------------------

    if(isValid){

        const encryptedpass = await bcrypt.hash( password , 10)

        const newUser = {
            firstname,
            lastname,
            email, 
            password: encryptedpass
        }

        UserModel.createUser(newUser)
        .then(data=>{
            res.status(200).json(data)
            // Security problem with pass, but to make it easy, just keep like this
        })
        .catch(error=>{
            res.status(400).json(error)
        })

    }
    else{
        res.status(400).json(errormessages)
    }

    },


    login: async function (req,res) {
        const {email,password} = req.body

        let errormessages = {};
        let isValid = true;

        if(email && password){
            UserModel.getUserByEmail(email)
            .then(data=>{
                if(!data){
                    let errormsj = {
                        adminerror: "⚠️ This user doesn't exits"
                    }
                    res.status(400).json(errormsj)
                }
                bcrypt.compare( password, data.password )
                .then(flag =>{
                    if( !flag ){
                        let errormsj = {
                            passworderror: "🔐 This password is wrong"
                        }
                        res.status(400).json(errormsj)
                    }
                
                userInfo = {
                    _id: data._id,
                    firstname : data.firstname,
                    lastname : data.lastname,
                    username : data.username,
                    email: data.email,
                }
                res.status(200).json(userInfo);
                })
                .catch( error => {
                    res.statusMessage = error.message;
                    res.status(406).end()
                }); 
            })
            .catch( error => {
                res.statusMessage = error.message;
                res.status(406).end()
            });
        }
        else{
            let errormsj = {
                empty: "📄 There is an empty space"
            }
            res.status(400).json(errormsj)
        }

    }


}


module.exports = {UsersController}