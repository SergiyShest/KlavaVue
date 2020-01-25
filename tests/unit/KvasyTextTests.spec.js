//import { shallowMount } from "@vue/test-utils";
import {
  GetKvasiTextS,
  GetKvasiText,
  WordEx
} from "@/components/TextCreation.js";
import { Set } from "@/components/settingFunctions.js";
// describe("GetKvasiTextTest", () => {
//   it("Visual See text", () => {
//     for (let index = 0; index < 5; index++) {
//       var wrapper = GetKvasiText(1, "ru");
//       // eslint-disable-next-line no-console
//       console.log(wrapper[0]);
//     }
//     //  expect(wrapper.length).toBe(1);
//   });
// });
// describe("Test that worsd not repiting ", () => {
//   it("Visual look on the text", () => {

//     for (let index = 0; index < 15; index++) {
//       var adjective = WordEx("Adjectives");
//       var wrapper = WordEx("Nouns");
//       // eslint-disable-next-line no-console
//       console.log(adjective + ' ' + wrapper);
//     }
//     //  expect(wrapper.length).toBe(1);
//   });
// });

describe("Test that worsd not repiting ", () => {
  it("Visual See text", () => {
    var set = new Set();
    set.selectedLang = "aнглийский";
    var arr = new Array();
    var engl = GetKvasiTextS(set, 1, arr);
    console.log(arr);
    console.log(engl);
  });
});
