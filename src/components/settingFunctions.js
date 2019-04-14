//Load User Achivment from localStorage
 export function LoadUserAchivment(userName) {
    var userAchivmentStr= localStorage.getItem(userName);//read as string
    if(userAchivmentStr!=null)
  {
    try{ 
       return JSON.parse(userAchivmentStr);//
    }catch{
        return [];
    }
  } 
  return [];
 }


export function createAchivment(speed,error) {

     const userAchivment= [{date:timeNow.getTime(),Errors:error,Speed:speed}]

 }
 
 //Save User Achivment to localStorage
 export function SaveUserAchivment(userName,userAchivment) {
    const userAchivmentStr = JSON.stringify(userAchivment)
     console.log( userAchivmentStr);
    localStorage.setItem(userName,userAchivmentStr);
 }