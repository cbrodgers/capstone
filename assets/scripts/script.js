$(window).load(function(){        
    $('#myModal').modal('show');
     }); 
     
function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}



function openTab(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
  
function openRedirect(url) {
  window.location.href = url;
}

