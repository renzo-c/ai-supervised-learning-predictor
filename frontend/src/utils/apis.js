import axios from "axios";

const getPrediction = async (cb, features, model) => {
  console.log({model})
  return await axios({
    method: "POST",
    url: `http://localhost:12345/predict/${model}`,
    data: features,
  })
    .then((r) => {
      let res = r.data.prediction;
      res = res.substring(2, res.length - 2);
      cb(res);
      return;
    })
    .catch((e) => console.log("error", e));
};

export default getPrediction;
