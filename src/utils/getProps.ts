export const getProps = (obj: any, method, func) => {
  var songsInfo: any = [];
  Object.keys(obj).forEach(function(prop) {
    songsInfo.push(obj[prop]);
    if (func === undefined) {
      //check method for logs
      if (method == 1) { console.log(obj); }
      else { for (let p in obj) { console.log(p) }; };
    }
    else { songsInfo = obj[prop]; func();}
  });
  //check method for return
  if (method == 1) { return songsInfo; }
  else { return "All values listed"; };
  /* Usage:
  getProps(music.songs,1)   //view object
  getProps(music.songs,0)   //view titles
  func = () => {console.log(songInfo)}  // if you need a  function
  getProps(music.songs,0,func)
  */
};