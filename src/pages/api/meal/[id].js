import Makanan from "../../../../models/Makanan";
import db from "../../../../utils/db";

export default async function handler(req, res){
    await db.connect()
    switch(req.method){
        case "GET":{
            const meal = await Makanan.findById(req.query.id)
            return res.status(200).json(meal)
        }

        case "DELETE":{
            const meal = await Makanan.findByIdAndDelete(req.query.id)
            return res.status(200).json(meal)
        }
        case "PUT":{
            const {id} = req.query
            const formData = req.body
            await Makanan.findByIdAndUpdate(id, formData)
            return res.status(200).json(formData)
        }
    }
}