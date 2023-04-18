async function getName() {
    "use strict";
    var form = $("#name_search");
    form.validate();


    if (form.valid()) {
        
        var search_name = document.getElementById("search").value.toLowerCase();

        var nameURL = "https://rxnav.nlm.nih.gov/REST/RxTerms/allconcepts.json";
        
        var nameObject = await fetch(nameURL);

        var nameJSONText = await nameObject.text();
        
        var y = JSON.parse(nameJSONText);
        var foundname = 0;
        for( var i = 0; i < y.minConceptGroup.minConcept.length; i++ ){
            var fn = y.minConceptGroup.minConcept[i].fullName.toLowerCase();
            if (fn.includes(search_name) == true) {
                foundname = i;
                var myrxcui = y.minConceptGroup.minConcept[i].rxcui;
                document.getElementById("results").innerHTML = "Name: " + search_name + "," + foundname + ". Rxcui:" + myrxcui;
                getData(myrxcui);
            }

        }
        if (foundname == 0) {
            alert("Drug Not Found")
        }
    }
}

async function getData(rxcui) {
    "use strict";
    var x = rxcui

    var reactionURL = "https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=" + rxcui + "&sources=ONCHigh";

    var interactionObject = await fetch(reactionURL);

    var reactionJSONText = await interactionObject.text();

    var r = JSON.parse(reactionJSONText);

    var int = r.interactionTypeGroup.interactionPair.description;
    
    
    document.getElementById("interaction").innerHTML = int;
}
