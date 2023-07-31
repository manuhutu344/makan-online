import mongoose from "mongoose";

const MakananSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        min: 5
    },
    desc:{
        type: String,
        required: true,
        min: 10
    },
    category:{
        type: String,
        enum: ['Makanan Berat', 'Makanan Ringan', 'Minuman'],
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    featured:{
        type: Boolean,
        default: false
    }
}, {timestamps: true})

export default mongoose?.models?.Makanan || mongoose.model('Makanan', MakananSchema)