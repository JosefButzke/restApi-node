import Sequelize, { Model } from 'sequelize';
import { isBefore } from 'date-fns';

class Meetups extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        location: Sequelize.STRING,
        date: Sequelize.DATE,
        editable: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(new Date(), this.date);
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Subscription, {
      foreignKey: 'meetupId',
    });
    this.belongsTo(models.File, { foreignKey: 'image', as: 'banner' });
    this.belongsTo(models.User, { foreignKey: 'organizer', as: 'organizerId' });
  }
}

export default Meetups;
