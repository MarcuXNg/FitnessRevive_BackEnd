import db from '../models/index';

const getExercises = async (date, email) => {
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
      const existingRecord = await db.Exercises.findAll({
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
          EM: `No Exercises`,
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

const caloriesBurnedSave = async (data, email, date) => {
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
        const existingCalories = parseInt(existingRecord.calories_burnt_per_day, 10) || 0;
        const dataCalories = parseInt(data.calories, 10) || 0;
        await existingRecord.update({
          calories_burnt_per_day: existingCalories + dataCalories
        });

        await db.Exercises.create({
          bodyVitalLogId: bodyVitalData.id,
          exercise_name: data.name,
          calories: data.calories,
          duration: data.duration,
          log_date: logDate,
        })

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
          calories_burnt_per_day: existingRecord.calories_burnt_per_day + data.calories
        });

        await db.Exercises.create({
          bodyVitalLogId: bodyVitalData.id,
          exercise_name: data.name,
          calories: data.calories,
          duration: data.duration,
          log_date: logDate,
        })
        
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
        DT: '',
      };
    }

  } catch (error) {
    return {
      EM: 'Something wrong with service',
      EC: 1,
      DT: [],
    };
  }
};

module.exports = {
  getExercises,
  caloriesBurnedSave,
};
