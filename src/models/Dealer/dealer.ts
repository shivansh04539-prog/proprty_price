import mongoose, { Schema , model } from "mongoose";
import slugify from "slugify";


const DealerProfileSchema = new Schema({

    name: { type: String, required: true, trim: true, index: true },
  slug: { type: String, required: true, unique: true }, // seo shareable
  city: { type: String, required: true, index: true },
  area: { type: String, required: true },
  image: { type: String }, // CDN URL
  phone: { type: String },
  email: { type: String },
  bio: { type: String },
  propertyCount: { type: Number, default: 0 }, 


}, {timestamps:true})




// optional compound index for listings
DealerProfileSchema .index({ city: 1, area: 1 });


// Thise runs automatically before the dealer is saved int he database

DealerProfileSchema.pre("save", function(next) {
    if(this.isModified('name')){
        // Turns John Doe into john-doe

        this.slug = slugify(this.name, {lower:true , strict:true})

    }
    next()
})






export const Dealers = mongoose.models.Dealers || mongoose.model('Dealers', DealerProfileSchema)

