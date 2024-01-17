import db from '../models/index';
import {Op} from 'sequelize';

const bmibmrSave = async (data, email) => {
  try {
    const vietnamTimezone = 'Asia/Ho_Chi_Minh';
    const options = {timeZone: vietnamTimezone, day: '2-digit', month: '2-digit', year: 'numeric'};

    const currentDateTimeVietnam = new Date().toLocaleDateString('en-GB', options);
    const formattedDate = currentDateTimeVietnam.split('/').reverse().join('-');
    console.log(new Date(formattedDate));
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
      userProfileId: userProfile.id,
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
      userProfileId: userProfile.id,
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
      userProfileId: userProfile.id,
    });
    return {
      EM: 'Get goal successfully',
      EC: 0,
      DT: data.calories_goal,
    };
  } catch (error) {
    return {
      EM: 'Something wrong with service',
      EC: 1,
      DT: [],
    };
  }
};

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
};
