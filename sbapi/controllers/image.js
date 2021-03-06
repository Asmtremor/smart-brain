

const handleImage = (db) => (req, resp) => {
    const { id } = req.body;

    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
           resp.json(entries[0].entries)
        })
    .catch(err => resp.status(400).json("Unable to get these entries"))
}

module.exports = {
    handleImage: handleImage
}

