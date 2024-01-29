import db from "../models/index";
import { Op } from "sequelize";
const { startOfWeek, endOfWeek } = require("date-fns");

const bmibmrSave = async (data, email, date) => {
  try {
    // const vietnamTimezone = 'Asia/Ho_Chi_Minh';
    // const options = {timeZone: vietnamTimezone, day: '2-digit', month: '2-digit', year: 'numeric'};

    // const currentDateTimeVietnam = new Date().toLocaleDateString('en-GB', options);
    // const formattedDate = currentDateTimeVietnam.split('/').reverse().join('-');
    // console.log(new Date(formattedDate));

    const user = await db.User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return {
        EM: "User not found",
        EC: 1,
        DT: [],
      };
    }

    const userProfile = await db.UserProfile.findOne({
      where: {
        userId: user.id,
      },
    });

    if (!userProfile) {
      return {
        EM: "User not found",
        EC: 1,
        DT: [],
      };
    }
    const logDate = new Date(date);
    const logData = await db.BodyVitalLog.findOne({
      where: {
        user_profileId: userProfile.id,
      },
    });

    if (logData) {
      await logData.update({
        bmi: +data.bmi,
        bmr: +data.bmr,
        tdee: +data.tdee,
        water_intake: +data.waterIntake,
        activity_level: data.activityLevel,
        height: +data.height,
        weight: +data.weight,
      });

      const dailylogData = await db.DailyLog.findOne({
        where: {
          log_date: logDate,
          bodyVitalLogId: logData.id,
        },
      });
      if (dailylogData) {
        await dailylogData.update({
          weight_per_day: +data.weight,
        });
      } else {
        await db.DailyLog.create({
          log_date: logDate,
          bodyVitalLogId: logData.id,
          weight_per_day: +data.weight,
        });
      }

      return {
        EM: "Save Successfully",
        EC: 0,
        DT: [],
      };
    } else {
      const bodyData = await db.BodyVitalLog.create({
        bmi: +data.bmi,
        bmr: +data.bmr,
        tdee: +data.tdee,
        water_intake: +data.waterIntake,
        activity_level: data.activityLevel,
        height: +data.height,
        weight: +data.weight,
        user_profileId: userProfile.id,
      });
      const dailylogData = await db.DailyLog.findOne({
        where: {
          log_date: logDate,
          bodyVitalLogId: bodyData.id,
        },
      });
      if (dailylogData) {
        await dailylogData.update({
          weight_per_day: +data.weight,
        });
      } else {
        await db.DailyLog.create({
          log_date: logDate,
          bodyVitalLogId: bodyData.id,
          weight_per_day: +data.weight,
        });
      }
      return {
        EM: "Save successfully",
        EC: 0,
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

const goalSave = async (data, email) => {
  try {
    // console.log('data', data);
    // console.log(email);
    const user = await db.User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return {
        EM: "User not found",
        EC: 1,
        DT: [],
      };
    }

    const userProfile = await db.UserProfile.findOne({
      where: {
        userId: user.id,
      },
    });

    if (!userProfile) {
      return {
        EM: "User not found",
        EC: 1,
        DT: [],
      };
    }

    const logData = await db.BodyVitalLog.findOne({
      where: {
        user_profileId: userProfile.id,
      },
    });
    if (logData) {
      logData.update({
        calories_goal: data.goal,
        weight_goal: data.weight,
      });
      return {
        EM: "Set goal Successfully",
        EC: 0,
        DT: [],
      };
    } else {
      await db.BodyVitalLog.create({
        calories_goal: data.goal,
        user_profileId: userProfile.id,
      });

      return {
        EM: "Set goal successfully",
        EC: 0,
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

const getCaloriesGoal = async (email) => {
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
    const data = await db.BodyVitalLog.findOne({
      where: {
        user_profileId: userProfile.id,
      },
    });
    if (data) {
      return {
        EM: "Get goal successfully",
        EC: 0,
        DT: data,
      };
    } else {
      return {
        EM: `You haven't set your goal`,
        EC: 1,
        DT: [],
      };
    }
  } catch (error) {
    return {
      EM: "Something wrong with service",
      EC: 1,
      DT: "",
    };
  }
};

const getBodyVitals = async (email) => {
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
    const data = await db.BodyVitalLog.findOne({
      where: {
        user_profileId: userProfile.id,
      },
    });

    if (!data) {
      return {
        EM: `Please update your body vitals information`,
        EC: 1,
        DT: "",
      };
    }
    return {
      EM: "Get data successfully",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    return {
      EM: "Something wrong with service",
      EC: 1,
      DT: [],
    };
  }
};

const dailyGet = async (date, email) => {
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
        return {
          EM: `Get date successfully`,
          EC: 0,
          DT: existingRecord,
        };
      } else {
        // No record found, create a new one
        const newRecord = await db.DailyLog.create({
          log_date: date,
          bodyVitalLogId: bodyVitalData.id,
          calories_consumed_per_day: 0,
          calories_burnt_per_day: 0,
          weight_per_day: 0,
          water_drink_per_day: 0,
        });

        return {
          EM: `New record created successfully`,
          EC: 0,
          DT: newRecord,
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

const getWeightByMonth = async (date, email) => {
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
    const monthlyData = [];

    for (let month = 0; month < 12; month++) {
      const dateString = new Date(date);
      const year = dateString.getFullYear();

      const lastDayOfMonth = new Date(year, month + 1, 1);
      lastDayOfMonth.setUTCHours(0, 0, 0, 0); // Set UTC hours, minutes, seconds, and milliseconds to zero
      
      const monthlyWeight = await db.DailyLog.findOne({
        attributes: ["log_date", "weight_per_day"],
        where: {
          bodyVitalLogId: bodyVitalData.id,
          log_date: lastDayOfMonth,
        },
      });

      monthlyData.push(monthlyWeight);
    }
    return {
      EM: `Ok`,
      EC: 0,
      DT: monthlyData,
    };
  } catch (error) {
    console.error("Error fetching water drink data:", error);
    throw error;
  }
};

const getStartAndEndOfWeek = async (date) => {
  const startDate = startOfWeek(date, { weekStartsOn: 0 }); // Assuming Monday is the first day of the week
  const endDate = endOfWeek(date, { weekStartsOn: 0 });
  return { startDate, endDate };
};

const getWaterDrinkByDay = async (date, email) => {
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
    const { startDate, endDate } = await getStartAndEndOfWeek(logDate);
    if (bodyVitalData) {
      // Query the daily_log table for the specified user
      const waterDrinkData = await db.DailyLog.findAll({
        attributes: ["id", "log_date", "water_drink_per_day"],
        where: {
          bodyVitalLogId: bodyVitalData.id,
          log_date: {
            [db.Sequelize.Op.between]: [startDate, endDate],
          },
        },
      });
      return {
        EM: `New record created successfully`,
        EC: 0,
        DT: waterDrinkData,
      };
    }
  } catch (error) {
    console.error("Error fetching water drink data:", error);
    throw error;
  }
};

const getCaloByDay = async (date, email) => {
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
    const { startDate, endDate } = await getStartAndEndOfWeek(logDate);
    if (bodyVitalData) {
      // Query the daily_log table for the specified user
      const data = await db.DailyLog.findAll({
        attributes: ["id", "log_date", "calories_consumed_per_day", "calories_burnt_per_day", "carbs_consumed_per_day", "fat_consumed_per_day", "protein_consumed_per_day"],
        where: {
          bodyVitalLogId: bodyVitalData.id,
          log_date: {
            [db.Sequelize.Op.between]: [startDate, endDate],
          },
        },
      });
      return {
        EM: `New record created successfully`,
        EC: 0,
        DT: data,
      };
    }
  } catch (error) {
    console.error("Error fetching water drink data:", error);
    throw error;
  }
};

module.exports = {
  bmibmrSave,
  goalSave,
  getWeightByMonth,
  getCaloriesGoal,
  getBodyVitals,
  dailyGet,
  getWaterDrinkByDay,
  getCaloByDay,
};
