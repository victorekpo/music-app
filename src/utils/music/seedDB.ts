import fs from 'node:fs';
import { MusicCollections } from "@/db/models/Music";
import { User } from "@/db/models/User";

const musicFile = <string>process.env.musicFile;

const readJSONFile = (filePath: string) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading the JSON file:', err);
    throw err;
  }
};

export const seedDatabase = async () => {
  try {
    const musicData = readJSONFile(musicFile);

    // Insert user
    const newUser = await User.create({
      username: 'victor',
      email: 'vic@neweradesign.net',
      password: 'password123'
    });
    console.info('User created successfully:', newUser);

    // Insert data into the collection
    const result = await MusicCollections.insertMany(musicData);
    console.info(`${result.length} music collections were inserted with ${musicData.songs.length} songs`);
  } catch (err) {
    console.error('Error seeding the database:', err);
  }
};
