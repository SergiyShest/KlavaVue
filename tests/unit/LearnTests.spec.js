// import { shallowMount } from "@vue/test-utils";
import { Set } from "@/components/settingFunctions.js";
import { GetLern } from "@/components/TextCreation.js";

describe("itest set", () => {
    it("set", () => {
        let avaiableModes = Set.AvaiableModes();
       let learn= GetLern(avaiableModes[0]);
        console.log(learn);
        
        expect(avaiableModes.length>0);
    });
});


