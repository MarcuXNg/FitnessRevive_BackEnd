import db from "../models/index.js";

const waterAdd = async (email, date) => {
  try {
    const user = await db.User.findOne({
      where: {
        email: email,
      },
    });
    const userProfile = await db.UserProfile.findOne({
      where: {
        userId: user.id,
      },
    });
    const bodyVitalData = await db.BodyVitalLog.findOne({
      where: {
        user_profileId: userProfile.id,
      },
    });

    const logDate = new Date(date);
    if (bodyVitalData) {
      const existingRecord = await db.DailyLog.findOne({
        where: {
          log_date: logDate,
          bodyVitalLogId: bodyVitalData.id,
        },
        // logging: console.log, // Enable logging
      });

      if (existingRecord) {
        // A record already exists for the given date and bodyVitalLogId
        const existingCalories =
          parseInt(existingRecord.water_drink_per_day, 10) || 0;
        await existingRecord.update({
          water_drink_per_day: existingCalories + 240,
        });

        return {
          EM: `add successfully`,
          EC: 0,
          DT: [],
        };
      } else {
        // No record found, create a new one
        const newRecord = await db.DailyLog.create({
          log_date: date,
          bodyVitalLogId: bodyVitalData.id,
          calories_consumed_per_day: 0,
          calories_burnt_per_day: 0,
          carbs_consumed_per_day: 0,
          fat_consumed_per_day: 0,
          protein_consumed_per_day: 0,
          weight_per_day: 0,
          water_drink_per_day: 0,
        });

        await newRecord.update({
          water_drink_per_day: existingRecord.water_drink_per_day + 240,
        });

        return {
          EM: `add successfully`,
          EC: 0,
          DT: [],
        };
      }
    } else {
      return {
        EM: `Please update your body vitals information`,
        EC: 1,
        DT: "",
      };
    }
  } catch (error) {
    return {
      EM: "Something wrong with service",
      EC: 1,
      DT: [],
    };
  }
};

const waterDelete = async (email, date) => {
  try {
    const user = await db.User.findOne({
      where: {
        email: email,
      },
    });
    const userProfile = await db.UserProfile.findOne({
      where: {
        userId: user.id,
      },
    });
    const bodyVitalData = await db.BodyVitalLog.findOne({
      where: {
        user_profileId: userProfile.id,
      },
    });

    const logDate = new Date(date);
    if (bodyVitalData) {
      const existingRecord = await db.DailyLog.findOne({
        where: {
          log_date: logDate,
          bodyVitalLogId: bodyVitalData.id,
        },
        // logging: console.log, // Enable logging
      });

      if (existingRecord) {
        // A record already exists for the given date and bodyVitalLogId
        const existingCalories =
          parseInt(existingRecord.water_drink_per_day, 10) || 0;
        await existingRecord.update({
          water_drink_per_day: existingCalories - 240,
        });

        return {
          EM: `add successfully`,
          EC: 0,
          DT: [],
        };
      } else {
        // No record found, create a new one
        const newRecord = await db.DailyLog.create({
          log_date: date,
          bodyVitalLogId: bodyVitalData.id,
          calories_consumed_per_day: 0,
          calories_burnt_per_day: 0,
          carbs_consumed_per_day: 0,
          fat_consumed_per_day: 0,
          protein_consumed_per_day: 0,
          weight_per_day: 0,
          water_drink_per_day: 0,
        });

        await newRecord.update({
          water_drink_per_day: existingRecord.water_drink_per_day - 240,
        });

        return {
          EM: `add successfully`,
          EC: 0,
          DT: [],
        };
      }
    } else {
      return {
        EM: `Please update your body vitals information`,
        EC: 1,
        DT: "",
      };
    }
  } catch (error) {
    return {
      EM: "Something wrong with service",
      EC: 1,
      DT: [],
    };
  }
};

module.exports = {
  waterAdd,
  waterDelete,
};
