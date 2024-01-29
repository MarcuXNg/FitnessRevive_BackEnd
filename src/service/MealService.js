import db from "../models/index";

const getMeals = async (date, email) => {
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
      const existingRecord = await db.Meals.findAll({
        where: {
          log_date: logDate,
          bodyVitalLogId: bodyVitalData.id,
        },
        // logging: console.log, // Enable logging
      });

      if (existingRecord) {
        // A record already exists for the given date and bodyVitalLogId
        return {
          EM: `Get data successfully`,
          EC: 0,
          DT: existingRecord,
        };
      } else {
        return {
          EM: `No meals`,
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

const mealSave = async (data, email, date) => {
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
          parseInt(existingRecord.calories_consumed_per_day, 10) || 0;
        const dataCalories = parseInt(data.calories, 10) || 0;

        const existingCarbs =
          parseInt(existingRecord.carbs_consumed_per_day, 10) || 0;
        const dataCarbs = parseInt(data.carb, 10) || 0;

        const existingFat =
          parseInt(existingRecord.fat_consumed_per_day, 10) || 0;
        const dataFat = parseInt(data.fat, 10) || 0;

        const existingProtein =
          parseInt(existingRecord.protein_consumed_per_day, 10) || 0;
        const dataProtein = parseInt(data.protein, 10) || 0;

        await existingRecord.update({
          calories_consumed_per_day: existingCalories + dataCalories,
          carbs_consumed_per_day: existingCarbs + dataCarbs,
          fat_consumed_per_day: existingFat + dataFat,
          protein_consumed_per_day: existingProtein + dataProtein,
        });


        await db.Meals.create({
          bodyVitalLogId: bodyVitalData.id,
          meal_name: data.name,
          meal_type: data.type,
          calories: data.calories,
          fat: data.fat,
          protein: data.protein,
          carbon: data.carb,
          gam: data.gam,
          log_date: logDate,
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
          calories_consumed_per_day: existingRecord.calories_consumed_per_day + data.calories,
          fat_consumed_per_day: existingRecord.fat_consumed_per_day + data.fat,
          protein_consumed_per_day: existingRecord.protein_consumed_per_day + data.protein,
          carbs_consumed_per_day: existingRecord.carbs_consumed_per_day + data.carb,
        });

        await db.Meals.create({
            bodyVitalLogId: bodyVitalData.id,
            meal_name: data.name,
            meal_type: data.type,
            calories: data.calories,
            fat: data.fat,
            protein: data.protein,
            gam: data.gam,
            carbon: data.carb,
            log_date: logDate,
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
  getMeals,
  mealSave,
};
