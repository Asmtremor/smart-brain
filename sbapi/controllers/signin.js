

const handleSignIn = (db, bcrypt) => (req, resp) => {

    const { email, password } = req.body

    if (!email || !password) {
        return resp.status(400).json('incorrect form submit');
    }

    db.select('email', 'hash')
        .from('login')
        .where('email', '=', email)
        .then(data => {
 //           console.log(data)
            const isValid = bcrypt.compareSync(password, data[0].hash)
 //           console.log(isValid)
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
//                        console.log(user)
                        resp.json(user[0])
                    })
                    .catch(err => resp.status(400).json("unable to get this user "));
            } else {
                
            }
        })
        .catch(err => resp.status(400).json('wrong credentials'))
}

module.exports = {
    handleSignIn : handleSignIn
}