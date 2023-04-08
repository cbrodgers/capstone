fetch('https://rxnav.nlm.nih.gov/REST/displaynames.json')
        .then(res=> {
          return res.json();
        })
        .then(data => {
		
          x = data.displayTermsList.term[i]
          console.log(data);

        })
        .catch(error => console.log(error));