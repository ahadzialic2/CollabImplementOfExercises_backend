class TestoviParser {

    dajTacnost(JSONstr) {
        JSONstr = JSON.stringify(JSONstr);
        
        var tacnostProcenti = 0;
        var nizGresaka = [];

        var isValidan = true; 
        try {  
            JSON.parse(JSONstr); 
        } catch { 
            isValidan = false; 
        }
        if(!isValidan) {
            tacnostProcenti = 0;
            nazivGreske = `Testovi se ne mogu izvršiti`;
            nizGresaka.push(nazivGreske);
            var rez = {
                tacnost:`${tacnostProcenti}%`,
                greske:`[${nizGresaka}]`
            };
            rez = JSON.stringify(rez);
            return rez;
        }

        var JSONobj = JSON.parse(JSONstr);
        
        var nizFullTitleTests = [];
        var nizPassFail = [];
        var testovi = [];

        for(var i=0;i<JSONobj.tests.length;i++) {
            var temp = JSONobj.tests[i].fullTitle;
            nizFullTitleTests.push(temp);
        }
        for(var j=0;j<nizFullTitleTests.length;j++) {
            for(var k=0;k<JSONobj.passes.length;k++) {
                if(nizFullTitleTests[j] == JSONobj.passes[k].fullTitle) {
                    nizPassFail[j] = 'pass';
                }
            }
            for(var h=0;h<JSONobj.failures.length;h++) {
                if(nizFullTitleTests[j] == JSONobj.failures[h].fullTitle) {
                    nizPassFail[j] = 'fail';
                }
            }
        }

        for(var i=0; i<nizFullTitleTests.length;i++) {
                testovi.push('fulltitle:' + nizFullTitleTests[i] + ',status:' + nizPassFail[i]);
        }

        var brojTestovaUkupno = JSONobj.stats.tests;
        var brojTestovaPassed = JSONobj.stats.passes;
        var brojTestovaFailed = JSONobj.stats.failures;

        tacnostProcenti = (brojTestovaPassed / brojTestovaUkupno) * 100;
        if((tacnostProcenti % 2) !== 0) {
            tacnostProcenti = Math.round(tacnostProcenti * 10) / 10;
        } 

            nizGresaka.length = 0;

        if(brojTestovaFailed !== 0) {        

            //dodajem title greske u nizGresaka
            for (var g=0;g<JSONobj.failures.length;g++) {
                var naziv1=JSONobj.failures[g].fullTitle;
                var nazivGreske = `${naziv1}`;
                nizGresaka.push(nazivGreske);
                }    
            }

        var rezultat = {
            tacnost:`${tacnostProcenti}%`,
            greske:`[${nizGresaka}]`,
            testovi:`[${testovi}]`
        };
        rezultat = JSON.stringify(rezultat);
        return rezultat;
    }
}

module.exports = {TestoviParser}