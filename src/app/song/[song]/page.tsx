import { music, readMusic } from "@/utils/music/read";

const SongPage = ({ params }) => {
  readMusic();
  console.log(params);
  const song = params.song
    .replace("--"," -- ")
    .replaceAll("_"," ")
    .replaceAll("%3B",";")
    .replaceAll("%2C",",");
  const found =music.songs.find(s => s.song === song)
  return (
    <>
      <h1 className='' style={{fontSize: "30px"}}>
        {found?.song}
      </h1>
      <br/>
      <p style={{fontSize: "20px"}}>
        {Object.entries(found?.songInfo || {}).map(([k,v], i) => (
          <>
            <strong key={i}>{k}:</strong> {v} <br />
          </>
        ))}
      </p>
    </>
  )
}

export default SongPage;