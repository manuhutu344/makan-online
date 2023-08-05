import Makanan from "../../../../models/Makanan";
import db from "../../../../utils/db";

export default async function handler(req, res){
    await db.connect()
    switch(req.method){
        case "GET":{
            const meals = await Makanan.find({}).limit(15)
            return res.status(200).json(meals)
        }
        case "POST":{
            const meal = await Makanan.create({...req.body})
            return res.status(201).json(meal)
        }
        case "PUT":{
            const id = req.params
            const {title, desc, category, price, image, featured} = req.body
            const makan = await Makanan.findByIdAndUpdate(id, {title, desc, category, price, image, featured})
            return res.status(200).json(makan)
        }
    }
}