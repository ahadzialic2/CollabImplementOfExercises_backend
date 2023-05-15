module.exports = (sequelize, Sequelize) => {
    const Vjezba = sequelize.define("Vjezba", {
    index: {
      type: Sequelize.STRING
    },
    vjezba: {
      type: Sequelize.INTEGER
    },
    tacnost: {
      type: Sequelize.STRING
    },
    promjena: {
      type: Sequelize.STRING
    },
    greske: {
      type: Sequelize.STRING
    },
    testovi: {
      type: Sequelize.STRING(900)
    }
    });
 
    return Vjezba;
  };
 