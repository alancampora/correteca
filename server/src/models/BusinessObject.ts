import mongoose, { Schema, Document } from "mongoose";
import { BusinessObject as IBusinessObject } from "@common/BusinessObject";

interface BusinessObjectDocument extends Document, IBusinessObject {}

const BusinessObjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  subTitle: { type: String, required: true },
  price: { type: Number, required: true },
});

const BusinessObject = mongoose.model<BusinessObjectDocument>(
  "business-object",
  BusinessObjectSchema,
);

export default BusinessObject;
