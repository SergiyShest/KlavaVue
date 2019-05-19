//Load User Achivment from localStorage
export function LoadUserAchivment(userName,setingString) {
   var userAchivmentStr = localStorage.getItem(userName+"_"+setingString);//read as string
   if (userAchivmentStr != null) {
      try {
         return JSON.parse(userAchivmentStr);//
      } catch{
         return [];
      }
   }
   return [];
}




//Save User Achivment to localStorage
export function SaveUserAchivment(userName, userAchivment,setingString) {
   const userAchivmentStr = JSON.stringify(userAchivment)
   
   localStorage.setItem(userName+"_"+setingString, userAchivmentStr);
}

export function LoadCurrUser(userArrey) {
   if (userArrey == null || userArrey == "undefinded")
      userArrey = new Arrey();
   var currentUser = localStorage.getItem("currentUser");
   if (currentUser == null || currentUser == "undefinded") {
      if (userArrey.length > 0) {
         currentUser = userArrey[0]; //take first user from Arrey
      }
      else {
         currentUser = "unknown";
      }
   }
   if (!userArrey.includes(currentUser)) {
      userArrey.push(currentUser);
   }
   return currentUser;
 }

export function createAchivment(speed, error) {

   const userAchivment = [{ date: timeNow.getTime(), Errors: error, Speed: speed }]

}