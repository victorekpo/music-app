'use client'

import { Button, Input } from "@nextui-org/react";
import { useState } from "react";

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(e.target.values);
}
const AddMusicPage = () => {
  const [artist, setArtist] = useState('');
  const [song, setSong] = useState('');
  const [album, setAlbum] = useState('');
  const [genre, setGenre] = useState('');
  const [BPM, setBPM] = useState('');
  const [speed, setSpeed] = useState('');
  const [mood, setMood] = useState('');
  const [tags, setTags] = useState(''); // Todo: Change to array
  const [quotes, setQuotes]=useState(''); // Todo: Change to array
  return (
    <>
      <div className=''>Add Music Page</div>
      <form onSubmit={ handleSubmit }>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="Artist"
            label="Artist"
            required
          />
          <Input
            type="Song"
            label="Song"
            required
          />
          <Input/>
          <Input/>
          <Button type="submit" color="primary">Submit</Button>
        </div>
      </form>

</>
)
}

export default AddMusicPage