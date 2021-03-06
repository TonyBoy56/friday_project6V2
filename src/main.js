import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './styles.css';
import { Doc } from './doctor.js';


$(document).ready(function () {
  $("form#docSearch").submit(function(event) {
    event.preventDefault();
    const name = $("#inputDoc").val();

    (async () => {
      let doctor = new Doc();
      let response = await doctor.findDoctor(name, location);

      fetchElements(response);
    })(); 

    let fetchElements = function (response) {
      if (response === false) {
        $("#output").text('Sorry, there was an error in handling your request.');
      } else if ( response.data.length === 0) {
        $("ul#docResult").text('There are no results to display at this time.');
      } else if (response.data.length > 0) {
        $("ul#docResult").empty();
          response.data.forEach(function (doctor) {
            let website = doctor.practices[0].website || "";
            $("ul#docResult").append(`<li>${doctor.profile.first_name} ${doctor.profile.last_name} <br> ${doctor.practices[0].visit_address.city} <br> ${doctor.practices[0].visit_address.state} <br> ${doctor.practices[0].visit_address.street} <br> ${doctor.practices[0].visit_address.zip} <br>  Accepts new patients: ${doctor.practices[0].accepts_new_patients} <br> Phone: ${doctor.practices[0].phones[0].number} <br> ${website} </li>`);
            if (website === "") {
              return $("ul#docResult").append("This website information is not available");
            }
          });
      }
    };
  });

  $("form#symptoms").submit(function(event) {
    event.preventDefault();
    const currentSymptom = $("#currentSymptom").val();

    (async () => {
      let doctor = new Doc();
      let response = await doctor.symptoms(currentSymptom);
      fetchElements(response);
    })();

    let fetchElements = function (response) {
      if (response === false) {
        $("#output").text('Sorry, there was an error in handling your request.');
      } else if (response.data.length === 0) {
        $("ul#docResult").append('There are no results to display at this time.');
      } else if (response.data.length > 0) {
        $("ul#docResult").empty();
          response.data.forEach(function (doctor) {
            let website = doctor.practices[0].website || "";
            $("ul#docResult").append(`<li>${doctor.profile.first_name} ${doctor.profile.last_name} <br> ${doctor.practices[0].visit_address.city} <br> ${doctor.practices[0].visit_address.state} <br> ${doctor.practices[0].visit_address.street} <br> ${doctor.practices[0].visit_address.zip} <br>  Accepts new patients: ${doctor.practices[0].accepts_new_patients} <br> Phone: ${doctor.practices[0].phones[0].number} <br> ${website} </li>`);
            if (website == "") {
              return $("ul#docResult").append("This website information is not available");
            }
          }); 
      }
    };
  });
});