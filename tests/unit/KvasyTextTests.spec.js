//import { shallowMount } from "@vue/test-utils";
import { GetKvasiText, AddPlace, GetSentation5 } from "@/components/TextCreation.js";

describe("GetKvasiTextTest", () => {
  it("Visual See text 5 times", () => {
    for (let index = 0; index < 5; index++) {
      var wrapper = GetSentation5();
      // eslint-disable-next-line no-console
       console.log(wrapper);
    }
    //  expect(wrapper.length).toBe(1);
 
    // it("Visual translate", () => {
    // for (let index = 0; index < 5; index++) {
    //   var wrapper = GetKvasiText(1, "ru");
      
    //   console.log(wrapper[0]);
    //    console.log( TRANSLATE(wrapper[0]));
    // }
    //  expect(wrapper.length).toBe(1);
  });

});

