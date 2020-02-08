export class Set {
  constructor() {
    this.selectedLang = "русский";
    this.Mode = "KvaziText";
    this.IgnoreCapital = false;
    this.IgnoreRepeetWhiteSpace = false;
    this.SentationsCount = 1;
  }
  Serialaze() {
    var userSettingStr =
      this.selectedLang +
      ";" +
      this.Mode +
      ";" +
      this.IgnoreCapital +
      ";" +
      this.IgnoreRepeetWhiteSpace +
      ";" +
      this.SentationsCount;
    return userSettingStr;
  }
  get Lang() {
    if (this.selectedLang === "русский") return "ru";
    else return "en";
  }
  static AvaiableModes() {
    return [
      "KvaziText",
      "learn1",
      "learn2",
      "learn3",
      "learn4",
      "learn5",
      "word1",
      "word2",
      "word3"
    ];
  }
}

//Load User Achivment from localStorage
export function LoadUserAchivment(userName, setingString) {
  var userAchivmentStr = localStorage.getItem(userName + "_" + setingString); //read as string
  if (userAchivmentStr != null) {
    try {
      console.log("load " + userName + "_" + setingString);
      return JSON.parse(userAchivmentStr); //
    } catch (e) {
      return [];
    }
  }

  return [];
}

//Save User Achivment to localStorage
export function SaveUserAchivment(userName, userAchivment, setingString) {
  const userAchivmentStr = JSON.stringify(userAchivment);
  console.log("save " + userName + "_" + setingString);
  localStorage.setItem(userName + "_" + setingString, userAchivmentStr);
}

export function LoadCurrUser(userArrey) {
  if (userArrey == null || userArrey == "undefinded") userArrey = new Arrey();
  var currentUser = localStorage.getItem("currentUser");
  if (currentUser == null || currentUser == "undefinded") {
    if (userArrey.length > 0) {
      currentUser = userArrey[0]; //take first user from Arrey
    } else {
      currentUser = "unknown";
    }
  }
  if (!userArrey.includes(currentUser)) {
    userArrey.push(currentUser);
  }
  return currentUser;
}

export function LoadUserSettings(userName) {
  var userSettingStr = localStorage.getItem(userName + "_setting"); //read as string
  if (userSettingStr != null) {
    try {
      var arr = userSettingStr.split(";");
      var set = new Set();
      set.selectedLang = arr[0];
      set.Mode = arr[1];

      set.IgnoreCapital = arr[2] === "true";
      set.IgnoreRepeetWhiteSpace = arr[3] === "true";
      set.SentationsCount = arr[4];
      return set;
    } catch (ex) {
      console.error(ex);
    }
  }
  return new Set();
}

export function SerialazeUserSettings(userSetting) {
  try {
    var userSettingStr =
      userSetting.selectedLang +
      ";" +
      userSetting.Mode +
      ";" +
      userSetting.IgnoreCapital +
      ";" +
      userSetting.IgnoreRepeetWhiteSpace +
      ";" +
      userSetting.SentationsCount;
    return userSettingStr;
  } catch (ex) {
    console.error(ex);
  }
}

export function SaveUserSettings(userName, userSetting) {
  try {
    var userSettingStr = userSetting.Serialaze();
    console.log("userSettingStr=" + userSettingStr);
    localStorage.setItem(userName + "_setting", userSettingStr);
  } catch (ex) {
    console.error("Err" + ex);
  }
}

function typeOf(obj) {
  return {}.toString
    .call(obj)
    .match(/\s(\w+)/)[1]
    .toLowerCase();
}

function checkTypes(args, types) {
  args = [].slice.call(args);
  for (var i = 0; i < types.length; ++i) {
    if (typeOf(args[i]) != types[i]) {
      throw new TypeError("param " + i + " must be of type " + types[i]);
    }
  }
}
