import { model, Schema, Document, models } from "mongoose";

interface ISongInfo extends Document {
  artist: string;
  song: string;
  album?: string;
  genre?: string;
  BPM?: string;
  speed?: string;
  mood?: string;
  tags?: string;
  quotes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ISongs extends Document {
  song: string;
  songInfo: ISongInfo;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IMusicCollection extends Document {
  songs: ISongs[];
  user: Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const SongInfoSchema: Schema<ISongInfo> = new Schema({
  artist: {
    type: String,
    required: [true, 'Artist name is required!'],
    trim: true,
  },
  song: {
    type: String,
    required: [true, 'Song title is required!'],
    trim: true,
  },
  album: {
    type: String,
    trim: true,
  },
  genre: {
    type: String,
    trim: true,
  },
  BPM: {
    type: String,
    trim: true,
  },
  speed: {
    type: String,
    trim: true,
  },
  mood: {
    type: String,
    trim: true,
  },
  tags: {
    type: String,
    trim: true,
  },
  quotes: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp: Date) => timestamp,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    get: (timestamp: Date) => timestamp,
  },
});

const SongsSchema: Schema<ISongs> = new Schema({
  song: {
    type: String,
    required: [true, 'Song title is required!'],
    trim: true,
  },
  songInfo: {
    type: SongInfoSchema,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp: Date) => timestamp,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    get: (timestamp: Date) => timestamp,
  },
});

const MusicCollectionsSchema: Schema<IMusicCollection> = new Schema({
  songs: {
    type: [SongsSchema],
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp: Date) => timestamp,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    get: (timestamp: Date) => timestamp,
  },
});


export const MusicCollections = models.MusicCollections || model<IMusicCollection>('MusicCollections', MusicCollectionsSchema);
