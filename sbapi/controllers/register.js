
const handleRegister =  (db, bcrypt) => (req, resp) => {
    const { email, name, password } = req.body;

    const hash = bcrypt.hashSync(password);

    if (!email || !name || !password) {
        return resp.status(400).json('incorrect form submit');
    }

    db.transaction( trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then (loginEmail => {
            return trx('users')
                        .returning('*')
                        .insert({
                        email: loginEmail[0].email,
                        name: name,
                        joined: new Date ()

                    })
                .then(user =>  resp.json(user[0]))
                .catch(error => resp.status(400).json("Unable to join"));
        })
            .then (trx.commit)
            .catch(trx.rollback);
    })
    
}

module.exports = {
    handleRegister: handleRegister
}

