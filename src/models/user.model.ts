import mongoose from 'mongoose';
import moment from 'jalali-moment';

const userSchema = new mongoose.Schema(
  {
    uuid: { type: String, required: true },
    name: { type: String, required: true },
    // firstName: { type: String, required: true },
    // lastName: { type: String, required: true },
    username: { type: String, /*required: true,*/ unique: true },
    bio: String,
    followers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    mobile: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },
    activationCode: Number,
    gender: { type: String, enum: ['male', 'female', 'other'] },
    role: { type: String, enum: ['admin', 'user'], required: true },
    avatarId: { type: mongoose.Types.ObjectId, ref: 'File' },
    telegramChannelShare: { type: Boolean, default: false },
    telegram: String,
    twitter: String,
    instagram: String,
    spotify: String,
    soundCloud: String,
    appleMusic: String,
    darkMode: Boolean,
    active: { type: Boolean, default: true },
    createdAt: { type: Number, required: true, default: moment(new Date()).format('X') },
    updatedAt: Number,
    deletedAt: Number,
    softDelete: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    versionKey: false,
  }
);

const User = mongoose.model('User', userSchema);
export default User;
