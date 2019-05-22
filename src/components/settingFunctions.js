//Load User Achivment from localStorage
export function LoadUserAchivment(userName,setingString) {
   var userAchivmentStr = localStorage.getItem(userName+"_"+setingString);//read as string
   if (userAchivmentStr != null) {
      try {
          console.log("load "+userName+"_"+setingString)
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
   console.log("save "+userName+"_"+setingString)
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


export function LoadUserSettings(userName) {

   var userSettingStr = localStorage.getItem(userName+"_setting");//read as string
   if (userSettingStr != null) {
      try 
      {
       var arr =  userSettingStr.split(";");
       return {
         selectedLang: arr[0], 
         Mode: arr[1],
         IgnoreCapital: arr[2]==='true',
         IgnoreRepeetWhiteSpace: arr[3]==='true'
      };
      } catch(ex){
         console.error(ex);
      }
   }
   return {selectedLang: "русский", Mode: "KvaziText",IgnoreCapital: false,IgnoreRepeetWhiteSpace: false};
   }

   export function SerialazeUserSettings(userSetting) {

      
     
         try {
            var userSettingStr =
            userSetting.selectedLang+';'+
            userSetting.Mode+';'+
            userSetting.IgnoreCapital+";"
            userSetting.IgnoreRepeetWhiteSpace;
            return userSettingStr;
         } catch(ex){
           console.error(ex);
         }
      } 
   export function SaveUserSettings(userName,userSetting) {

      
     
         try {
              var userSettingStr = SerialazeUserSettings(userSetting);
              console.log("userSettingStr="+userSettingStr);
              localStorage.setItem(userName+"_setting",userSettingStr)
         } catch(ex){
           console.error("Err"+ex);
         }
   }

