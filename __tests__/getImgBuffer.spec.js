import getImgBuffer from "@/utils/getImgBuffer";

describe("getImgBuffer function", () => {
  it("return buffer data", () => {
    const uri = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA";
    const buffer = getImgBuffer(uri);
    const checkBuffer = Buffer.isBuffer(buffer);

    expect(checkBuffer).toBe(true);
  });

  it("return false when data is not base64 type", () => {
    const notbase64Uri = "data:image/;base64,iVBORw0KGgoAAAANSUhEUgAAA";
    const buffer = getImgBuffer(notbase64Uri);
    const checkBuffer = Buffer.isBuffer(buffer);

    expect(checkBuffer).toBe(false);
  });
});
