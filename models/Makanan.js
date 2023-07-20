import mongoose from "mongoose";

const MakananSchema = new mongoose.Schema({
    judul:{
        type: String,
        required: true,
        min: 5
    },
    deskripsi:{
        type: String,
        required: true,
        min: 10
    },
    kategori:{
        type: String,
        enum: ['Makanan Berat', 'Makanan Ringan', 'Minuman'],
        required: true
    },
    harga:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    unggulan:{
        type: Boolean,
        default: false
    }
}, {timestamps: true})

export default mongoose?.models?.Makanan || mongoose.model('Makanan', MakananSchema)