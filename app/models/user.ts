import mongoose from "mongoose";

export interface Users extends mongoose.Document {
    fid: number;
    address: string;
    winner: boolean;
}

const UserSchema = new mongoose.Schema<Users>({
    fid: Number,
    address: String,
    winner: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model<Users>("User", UserSchema);