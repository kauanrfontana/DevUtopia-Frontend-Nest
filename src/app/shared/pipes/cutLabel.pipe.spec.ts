import { CutLabelPipe } from "./cutLabel.pipe";

describe("Pipe: CutLabel", () => {
    it("should return input string cutted", () => {
        let cutLabelPipe = new CutLabelPipe();
        expect(cutLabelPipe.transform("teste", 3)).toEqual("tes...");
    });
})