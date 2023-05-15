var testoviParser = require('../../TestoviParser')

const db = require("../models");
const Student = db.student;
const Grupa = db.grupa;
const Vjezba = db.vjezba;

const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    var id_grupe;
    // Validate request
    Student.findOne({ where: { index: req.body.index } })
    .then((data)=> {
        //console.log(data.index);
    if (data != null) {
      res.status(400).send({
        status: `Student sa indexom {${req.body.index}} već postoji!`
      });
      return;
    } else {
        Grupa.findOne({where: {grupa:req.body.grupa}})
        .then((data)=> {
            if(data==null) {
                const group = {
                    grupa: req.body.grupa
                };
        
                Grupa.create(group)
                .then(data => {
                    id_grupe=data.id;
                    // Create a Tutorial
    const student = {
        ime: req.body.ime,
        prezime: req.body.prezime,
        index: req.body.index,
        grupa: req.body.grupa,
        GrupaId:id_grupe
      };
    
      // Save Tutorial in the database
      Student.create(student)
        .then(data => {
          //console.log(data)
          res.send({
              status: `Kreiran student!`
          })  
      })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Student."
          });
        });
                })
            }
            //ako grupa postoji
            else {
                id_grupe = data.id;
                const student = {
                    ime: req.body.ime,
                    prezime: req.body.prezime,
                    index: req.body.index,
                    grupa: req.body.grupa,
                    GrupaId:id_grupe
                  };
                
                  // Save Tutorial in the database
                  Student.create(student)
                    .then(data => {
                      //console.log(data)
                      res.send({
                          status: `Kreiran student!`
                      })  
                  })
                    .catch(err => {
                      res.status(500).send({
                        message:
                          err.message || "Some error occurred while creating the Student."
                      });
                    });
            }
        })
       
    
    }
    })
};

exports.createCSV = (req, res) => {
    var temp = req.body.split('\n');
    var indeksi = [];
    var k=0;
    let zadnjiIdPrije;
    let zadnjiIdPoslije;
    let postojeIndeksi=[];

    for(var i=0;i<temp.length;i++) {
        var temp2 = temp[i].split(',');
        indeksi[k] = temp2[2];
        k++;
    }

    Student.findOne({
        order: [ [ 'id', 'DESC' ]],
        })
        .then((zadnji)=>{
            if(zadnji == null) {
                zadnjiIdPrije=0;
            } else {
            zadnjiIdPrije=zadnji.id;
            //console.log('zadnji id prije: ' + zadnjiIdPrije)
            }
        })

    function csv(j) {
        var idGrupe=0;
            Student.findOne({ where: { index: indeksi[j]}})
        .then((data)=>{
            //console.log('find')
            if(data == null) {                
                var tmp = temp[j].split(',');
                    
                Grupa.findOne({where: {grupa:tmp[3]}})
                .then((data)=> {
                    if(data!=null) {
                        idGrupe=data.id;

                const student = {
                    ime: tmp[0],
                    prezime: tmp[1],
                    index: tmp[2],
                    grupa: tmp[3],
                    GrupaId:idGrupe
                  };
                  Student.create(student)
          .then(data => {
        //console.log('add')
        Student.findOne({
            order: [ [ 'id', 'DESC' ]],
            })
            .then((zadnji2)=>{
                zadnjiIdPoslije=zadnji2.id;
            //console.log('zadnji id poslije: ' + zadnjiIdPoslije)
                
            var vrati = zadnjiIdPoslije-zadnjiIdPrije;
            if(postojeIndeksi.length == 0) {
                res.send({
                    status:`Dodano ${vrati} studenata!`
                })
            } else {
                var strVrati1 = `Dodano {${vrati}} studenata, a studenti {`
        var strVrati2 = '';
        for(var i=0;i<postojeIndeksi.length;i++) {
            strVrati2 += `${postojeIndeksi[i]}`;
            if(i<postojeIndeksi.length-1) {
                strVrati2 += ', ';
            }
        }
        strVrati2 += '} već postoje!';
        var conCatVrati = strVrati1 + strVrati2; 
        var vrati2 = {
            status:`${conCatVrati}`
        };   
        res.send(vrati2);
            }
            })      
    })  
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Student."
            });
          });
                    } else {
                        //idGrupe=data.id;
                        const grupa = {
                            grupa:tmp[3]
                        }
                        Grupa.create(grupa)
                        .then((data)=> {
                            idGrupe=data.id;
                const student = {
                    ime: tmp[0],
                    prezime: tmp[1],
                    index: tmp[2],
                    grupa: tmp[3],
                    GrupaId:idGrupe
                  };
                  Student.create(student)
          .then(data => {
        //console.log('add')
        Student.findOne({
            order: [ [ 'id', 'DESC' ]],
            })
            .then((zadnji2)=>{
                zadnjiIdPoslije=zadnji2.id;
            //console.log('zadnji id poslije: ' + zadnjiIdPoslije)
                
            var vrati = zadnjiIdPoslije-zadnjiIdPrije;
            if(postojeIndeksi.length == 0) {
                res.send({
                    status:`Dodano ${vrati} studenata!`
                })
            } else {
                var strVrati1 = `Dodano {${vrati}} studenata, a studenti {`
        var strVrati2 = '';
        for(var i=0;i<postojeIndeksi.length;i++) {
            strVrati2 += `${postojeIndeksi[i]}`;
            if(i<postojeIndeksi.length-1) {
                strVrati2 += ', ';
            }
        }
        strVrati2 += '} već postoje!';
        var conCatVrati = strVrati1 + strVrati2; 
        var vrati2 = {
            status:`${conCatVrati}`
        };   
        res.send(vrati2);
            }
            })      
    })  
})

          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Student."
            });
          });
                    }
                    
                })

            } else {
                postojeIndeksi.push(data.index);
            }
                
            return;
        })
        }

        for(var j=0;j<indeksi.length;j++) {
            csv(j);
        }
        
};

exports.update = (req, res) => {  
    var idGrupe = 0;
    Student.findOne({ where: { index: req.params.index } })
    .then((data)=> {
    if (data == null) {
      res.status(400).send({
        status: `Student sa indexom {${req.params.index}} ne postoji!`
      });
      return;
    } else {
    
    
      //.then(data => {
          Grupa.findOne({where:{grupa:req.body.grupa}})
          .then((data)=> {
            if(data == null) {
                const grupa = {
                    grupa:req.body.grupa
                  };
                
                  Grupa.create(grupa)
                    .then(data => {
                      //console.log(data)
                      idGrupe=data.id;  
                      Student.update(req.body, {
                        where: { index: req.params.index }
                      })
                      Student.update({GrupaId:idGrupe}, {
                          where: { index:req.params.index} 
                      })
                  })
            } else {
                idGrupe=data.id;
                Student.update(req.body, {
                    where: { index: req.params.index }
                  })
                  Student.update({GrupaId:idGrupe}, {
                      where: { index:req.params.index} 
                  })
            }
          })
        res.send({
            status:`Promjenjena grupa studentu {${req.params.index}}`
        })
     // })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
    }
  })
};

exports.createVjezbe = (req, res) => {
    Vjezba.destroy({ where: {} });      
    var zadnjiId=0;
    function foo(i,j) {
            Student.findOne({where:{id:i+1}})
            .then((data) => {
                const vjezbe = {
                    index:data.index,
                    vjezba:j+1,
                    tacnost:"0%",
                    promjena:"0%",
                    greske:"",
                    testovi:"",
                    StudentId:data.id
                    }
            Vjezba.create(vjezbe)
            .then((data)=>{
                //if(data.id==zadnjiId*req.body.brojVjezbi) {
                    res.send('Dodane vježbe za studente!');
                //}
            })
    })}
Student.findOne({
    order: [ [ 'id', 'DESC' ]],
    })
    .then((zadnji)=>{
        zadnjiId=zadnji.id;
    for(var i=0;i<zadnjiId;i++) {
    for(var j=0;j<req.body.brojVjezbi;j++) {
        foo(i,j)
    }    
        if(i==zadnjiId-1) {
        }
    }
    });
};
//Knjiga.findOne({where:{[Op.or]:[{naslov:’jedan’},{autor:’neki’}]}});

exports.updateVjezbe = (req, res) => {
    Student.findOne({ where: { index: req.params.index } })
    .then((data)=>{
        if(data==null) {
            res.send({
                status:'Nije moguće ažurirati vježbe!'
            })
        }
    } );

    Vjezba.findOne({ where: { vjezba: req.params.vjezba } })
            .then((data)=>{
                if(data==null){
                    res.send({
                        status:'Nije moguće ažurirati vježbe!'
                    })
                }
            }); 
       

    var obj = new testoviParser.TestoviParser;
    var rez = JSON.parse(obj.dajTacnost(req.body));
    Vjezba.findOne({where:{[Op.and]:[{index:req.params.index},{vjezba:req.params.vjezba}]}})
    .then((data)=>{   
        Vjezba.update({tacnost:`${rez.tacnost}`}, {
            where: {[Op.and]:[{index:req.params.index},{vjezba:req.params.vjezba}]} 
        })
        Vjezba.update({promjena:`0%`}, {
            where: {[Op.and]:[{index:req.params.index},{vjezba:req.params.vjezba}]} 
        })
        Vjezba.update({greske:`${rez.greske}`}, {
            where: {[Op.and]:[{index:req.params.index},{vjezba:req.params.vjezba}]} 
        })
        Vjezba.update({testovi:`${rez.testovi}`}, {
            where: {[Op.and]:[{index:req.params.index},{vjezba:req.params.vjezba}]} 
        })
            var vrati = {
                vjezba:`${req.params.vjezba}`,
                tacnost:`${rez.tacnost}`,
                promjena:'0%',
                greske:`${rez.greske}`
            };
            vrati = JSON.stringify(vrati);
            res.send(vrati);
    })
}   