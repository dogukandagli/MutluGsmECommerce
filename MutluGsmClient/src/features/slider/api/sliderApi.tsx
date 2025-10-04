import queries from "../../../shared/lib/apiClient";

const Slider = {
  getSliders: (url: string) => queries.get(`odata/Sliders${url}`),
  crateSlider: (formData: any) => queries.post("sliders", formData),
};

export default Slider;
