import exercisesApi from "../service/ExerciseService.js";

const getExercises = async (req, res) => {
  try {
    // console.log(req.params.date);
    const date = req.params.date;
    const data = await exercisesApi.getExercises(date, req.user.email);
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

const saveCaloriesBurned = async (req, res) => {
  try {
    const date = req.params.date;
    const data = await exercisesApi.caloriesBurnedSave(req.body, req.user.email, date);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: 'error from server', // error message
      EC: '-1', // error code (error = -1, success = 0)
      DT: '', // data
    });
  }
}

module.exports = {
  getExercises,
  saveCaloriesBurned,
};
