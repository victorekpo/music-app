import { Schema, model, Document, models } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  music: Schema.Types.ObjectId;
  isCorrectPassword(password: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  music: {
    type: Schema.Types.ObjectId,
    ref: 'musiccollections',
    unique: true
  },
});

// Hash password before saving
 userSchema.pre<IUser>('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
 });

// // Method to compare passwords
 userSchema.methods.isCorrectPassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
 };

export const User = models.User || model<IUser>('User', userSchema);