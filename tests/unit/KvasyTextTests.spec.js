//import { shallowMount } from "@vue/test-utils";
import { GetKvasiText,WordEx } from "@/components/TextCreation.js";

describe("GetKvasiTextTest", () => {
  it("Visual See text", () => {
    for (let index = 0; index < 5; index++) {
      var wrapper = GetKvasiText(1, "ru");
      // eslint-disable-next-line no-console
      console.log(wrapper[0]);
    }
    //  expect(wrapper.length).toBe(1);
  });
});
describe("GetKvasiTextTest", () => {
  it("Visual See text", () => {

    for (let index = 0; index < 15; index++) {
     var adjective  = WordEx( "Adjectives");
      var wrapper = WordEx( "Nouns");
      // eslint-disable-next-line no-console
      console.log(adjective+' '+ wrapper);
    }
    //  expect(wrapper.length).toBe(1);
  });
});