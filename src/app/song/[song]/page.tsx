
import { music, readMusic } from "@/utils/music/read";
import { SongInfo } from "@/@types/Music";
import { Button, Input } from "@nextui-org/react";
// import { useState } from "react";

const SongPage = ({ params }) => {
  // const [edit, setEdit] = useState(false);

  readMusic();
  console.log(params);
  const song = params.song
    .replace("--"," -- ")
    .replaceAll("_"," ")
    .replaceAll("%3B",";")
    .replaceAll("%2C",",");
  const found = music.songs.find((s: SongInfo) => s.song === song)
  return (
    <>
      <h1 className='' style={{fontSize: "30px"}}>
        {found?.song}
      </h1>
      <br/>
      <p style={{fontSize: "20px"}}>
        {Object.entries(found?.songInfo || {}).map(([k,v], i) => (
          <>
            { false ? (
              <Input />
            ) : (
              <>
                <strong key={i}>{k}:</strong> {v} <br />
              </>
              )
            }
          </>
        ))}
      </p>
      <br />
      <Button type="submit" color="primary">Edit Song</Button>
    </>
  )
}

export default SongPage;