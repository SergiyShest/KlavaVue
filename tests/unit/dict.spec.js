//import { shallowMount } from "@vue/test-utils";
import { GetKvasiText } from "@/components/TextCreation.js";

describe("input.vue", () => {
  it("renders props.msg when passed", () => {
    for (let index = 0; index < 5; index++) {
      var wrapper = GetKvasiText(1, "ru");
      // eslint-disable-next-line no-console
      console.log(wrapper[0]);
    }

    //  expect(wrapper.length).toBe(1);
  });
});
