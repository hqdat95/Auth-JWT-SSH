import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, trim: true },
    email: { type: String, trim: true },
    password: { type: String, trim: true },
  },
  {
    timestamps: true,
  },
);

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
  },
  versionKey: false,
});

const User = mongoose.model('user', userSchema);

export default User;
