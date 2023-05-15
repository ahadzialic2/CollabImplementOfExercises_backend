module.exports = (sequelize, Sequelize) => {
    const Grupa = sequelize.define("Grupa", {
      grupa: {
       type: Sequelize.STRING
     }
    });

    return Grupa;
  };
 