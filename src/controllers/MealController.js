import mealApi from "../service/MealService.js";

const getMeals = async (req, res) => {
  try {
    // console.log(req.params.date);
    const date = req.params.date;
    const data = await mealApi.getMeals(date, req.user.email);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server", // error message
      EC: "-1", // error code (error = -1, success = 0)
      DT: "", // data
    });
  }
};

const saveMeals = async (req, res) => {
    try {
      // console.log(req.params.date);
      const date = req.params.date;
      const data = await mealApi.mealSave(req.body, req.user.email, date);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        EM: "error from server", // error message
        EC: "-1", // error code (error = -1, success = 0)
        DT: "", // data
      });
    }
  };

module.exports = {
  getMeals,
  saveMeals,
};
