import bodyApi from '../service/bodyVitalsService.js';
// handle 
const saveBMIBMR = async (req, res) => {
  try {
    const date = req.params.date;
    const data = await bodyApi.bmibmrSave(req.body, req.user.email, date);
    console.log(data);
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
};

const saveGoal = async (req, res) => {
  try {
    const data = await bodyApi.goalSave(req.body, req.user.email);
    console.log(data);
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
};

const getGoal = async (req, res) => {
  try {
    const data = await bodyApi.getCaloriesGoal(req.user.email);
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
};

const getBody = async (req, res) => {
  try {
    const data = await bodyApi.getBodyVitals(req.user.email);
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
};


const getDaily = async (req, res) => {
  try {
    // console.log(req.params.date);
    const date = req.params.date;
    const data = await bodyApi.dailyGet(date, req.user.email);
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

const getWaterConsumptionPerDay = async (req, res) => {
  try {
    // console.log(req.params.date);
    const date = req.params.date;
    const data = await bodyApi.getWaterDrinkByDay(date, req.user.email);
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

const getCaloPerDay = async (req, res) => {
  try {
    const date = req.params.date;
    const data = await bodyApi.getCaloByDay(date, req.user.email);
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


const getWeightByMonth = async (req, res) => {
  try {
    const date = req.params.date;
    const data = await bodyApi.getWeightByMonth(date, req.user.email);
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
  saveBMIBMR,
  saveGoal,
  getGoal,
  getBody,
  getDaily,
  getWaterConsumptionPerDay,
  getWeightByMonth,
  getCaloPerDay,
};
