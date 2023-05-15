module.exports = (sequelize, Sequelize) => {
   const Student = sequelize.define("Student", {
     ime: {
      type: Sequelize.STRING
     },
     prezime: {
      type: Sequelize.STRING
     },
     index: {
      type: Sequelize.STRING
     },
     grupa: {
      type: Sequelize.STRING
    }
   });


   return Student;
 };
