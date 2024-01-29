/* eslint-disable prefer-const */
import waterService from "../service/waterService.js";

const addWater = async (req, res) => {
    const date = req.params.date;
  let data = await waterService.waterAdd(req.user.email, date);
  // console.log('>>>check req', req.body);
  return res.status(200).json({
    EM: data.EM,
    EC: data.EC,
    DT: data.DT,
  });
};

const deleteWater = async (req, res) => {
    const date = req.params.date;
    let data = await waterService.waterDelete(req.user.email, date);
    // console.log('>>>check req', req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  };

module.exports = {
    addWater,
    deleteWater,
};
