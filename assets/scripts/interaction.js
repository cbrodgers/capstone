async function getName() {
    "use strict";
    var form = $("#name_search");
    form.validate();


    if (form.valid()) {
        
        var search_name = document.getElementById("search").value;

        var nameURL = 'https://rxnav.nlm.nih.gov/REST/RxTerms/allconcepts.json';
        
        var nameObject = await fetch(nameURL);

        if (nameObject.status >= 200 && nameObject.status <= 299) {
            x = JSON.stringify(data);
            y = JSON.parse(x);
            for( i = 0; i < y.minConceptGroup.minConcept.length; i++ ){
                fn = y.minConceptGroup.minConcept[i].fullName;
                if (fn.includes(search_name) == true) {
                  foundname = i;
                  myrxcui = y.minConceptGroup.minConcept[i].rxcui;
                  document.getElementById("results").innerHTML = "Name: " + foundname + ". Rxcui:" + myrxcui;
                }

            }
        }
        else {
            /* AJAX complete with error - probably invalid stock ticker symbol */
                /* Your code to process the result goes here - 
                    display the returned message */
            alert("Drug Not Found - Status: " + nameObject.status)
            return;
        
        
        


          

        }
    }
}
