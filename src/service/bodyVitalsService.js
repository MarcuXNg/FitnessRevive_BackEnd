import db from '../models/index';
import {Op} from 'sequelize';

const bmibmrSave = async (data, email) => {
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
        EM: 'User not found',
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
        EM: 'User not found',
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
      await logData.update({
        bmi: +data.bmi,
        bmr: +data.bmr,
        tdee: +data.tdee,
        water_intake: +data.waterIntake,
        activity_level: data.activityLevel,
        height: +data.height,
        weight: +data.weight,
      });

      return {
        EM: 'Save Successfully',
        EC: 0,
        DT: [],
      };
    } else {
      await db.BodyVitalLog.create({
        bmi: +data.bmi,
        bmr: +data.bmr,
        tdee: +data.tdee,
        water_intake: +data.waterIntake,
        activity_level: data.activityLevel,
        height: +data.height,
        weight: +data.weight,
        user_profileId: userProfile.id,
      });

      return {
        EM: 'Save successfully',
        EC: 0,
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
        EM: 'User not found',
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
        EM: 'User not found',
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
      });
      return {
        EM: 'Set goal Successfully',
        EC: 0,
        DT: [],
      };
    } else {
      await db.BodyVitalLog.create({
        calories_goal: data.goal,
        user_profileId: userProfile.id,
      });

      return {
        EM: 'Set goal successfully',
        EC: 0,
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
        EM: 'Get goal successfully',
        EC: 0,
        DT: data.calories_goal,
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
      EM: 'Something wrong with service',
      EC: 1,
      DT: '',
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
        DT: '',
      };
    }
    return {
      EM: 'Get data successfully',
      EC: 0,
      DT: data,
    };
  } catch (error) {
    return {
      EM: 'Something wrong with service',
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
}

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
      const existingRecord = await db.Meals.findOne({
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
        }
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
}

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
        }
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
}

const getWeightByMonth = async () => {
  try {
    const currentDate = new Date();
    const startOfPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);

    await db.BodyVitalLog.findAll({
      where: {
        updatedAt: {
          [Op.gte]: startOfPreviousMonth,
          [Op.lt]: currentDate,
        },
      },
    });
  } catch (error) {

  }
};

module.exports = {
  bmibmrSave,
  goalSave,
  getWeightByMonth,
  getCaloriesGoal,
  getBodyVitals,
  caloriesBurnedSave,
  dailyGet,
  getMeals,
  getExercises,
};
