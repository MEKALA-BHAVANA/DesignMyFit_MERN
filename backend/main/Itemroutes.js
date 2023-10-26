const Item =require('../main/Item')

const Models=async(req,res)=>{
    const gmail=req.body.gmail;
    const name=req.body. name;
    const price=req.body.price;
    const number=req.body.number;
    const image=req.body.image;
    console.log(gmail,name,price,number)
    try {
        const Item=await Item.create({gmail,name,number,price,image})
        res.status(200).send({message:"Item Added sucessfully"})
    } catch (error) {
        res.status(403).send({message:"Failed to upload items"})
        console.log(error);
    }

}
const SendProducts=async(req,res)=>{
    const data=await Item.find({})
    res.send({data})
    //console.log(data);
}
const GetProductDetails=async(req,res)=>{
    const _id=req.body.id;
    const data=await Item.find({_id});
    res.send({data})
}
const ProductDeleteItem=async(req,res)=>{
    const itemId = req.params.id;
    console.log(itemId)
    try {
        //const datacar = 
        await Item.findOneAndDelete({ _id: itemId });
        res.status(200).send({ message: "Deletion successful" })
        
    } catch (error) {
        res.status(403).send({message:"Deletion Failed"})
        
    }
    //const datacar=
    await Item.findOneAndDelete({ _id: itemId });


}
const MyProductsItems=async(req,res)=>{
    const gmail = req.body.gmail;
    const data=await Item.find({gmail});
    res.send({data})
}
module.exports={Models,SendProducts,GetProductDetails,ProductDeleteItem,MyProductsItems}