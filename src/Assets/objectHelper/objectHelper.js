export const isVideosEmpty = (videos) =>{
    //Объект Видео
    let initialVideosArr =
        {
            id:0,
            link:"",
            name:"",
            description:"",
            priority:0,
            add_date:"",
        }
    if (videos.length === 0) return true;
    if (shallowEqual(videos[0],initialVideosArr)) {return true};
    return false;
    }

let shallowEqual = (object1, object2) =>{
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }
    return true;
}