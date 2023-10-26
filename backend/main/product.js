const Item = require('../main/Item')
const Models = async (req, res) => {
    
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;
    const number = req.body.number;
    const image = req.body.image;
    console.log( name, price, number,category)
    try {
        const item = await Item.create({ name, number, price, image, category})
        res.status(200).send({ message: "Item Added successfully" })
    } catch (error) {
        res.status(403).send({ message: "Failed to upload items" })
        console.log(error)
    }

}
const SendProducts = async (req, res) => {
    const data = await Item.find({})
    res.send( data )
    //console.log(data);
}
module.exports = { Models, SendProducts }