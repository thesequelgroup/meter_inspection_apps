var status;

ON('load-record', function(event) {

  status =STATUS();

  if(LATITUDE()) getZone();

  if (ISROLE('Owner','Manager', 'Call Center Representative','MGD_Call Center Representative', 'Dispatcher' ,'MGD_Dispatcher', 'Maestro Role', 'MGD_Maestro Role', 'MGD_Projects')) {
    DATANAMES().forEach(function(dataName) {
      if(dataName!='appointment_contact')  SETREQUIRED(dataName, false);
    });
  }

  var fieldUserRoles = ['MGD_Precision Field Technician', 'Precision Field Technician'];

  // if the current role is one of the designated field user roles...
  if (ISROLE(fieldUserRoles)) {
    // set the status field filter
    SETSTATUSFILTER(['RMSET Missed Appointment','POE Appointment Required', 'Unable To Post', 'RMSET Complete', 'RMSET Door Hanger']);
  }

  var fieldUserRoles = ['Call Center Representative','MGD_Call Center Representative', 'Dispatcher' ,'MGD_Dispatcher', 'Maestro Role', 'MGD_Maestro Role', 'MGD_Projects'];

  // if the current role is one of the designated field user roles...
  if (ISROLE(fieldUserRoles)) {
    // set the status field filter
    SETSTATUSFILTER(['RMSET First Attempt','RMSET Unassigned Appointment', 'Unable To Post', 'RMSET Appointment' ,'RMSET Missed Appointment', 'POE Appointment Required', 'Customer Refused', 'RMSET Complete' , 'RMSET Door Hanger']);
  }
});


ON('load-record', function (event) {
 
   if(ISROLE('Owner','Manager', 'Call Center Representative','MGD_Call Center Representative', 'Dispatcher' ,'MGD_Dispatcher', 'Maestro Role', 'MGD_Maestro Role', 'MGD_Projects')) 
   {
     SETREADONLY('poe_appointment_date', false);
     SETREADONLY('poe_appointment_time', false);
     SETREADONLY('contact_name', false);
     SETREADONLY('contact_number', false);
   }
   
 if(ISROLE('Owner')) 
   {
     SETREADONLY('service_type', false);
     SETREADONLY('address', false);
     SETREADONLY('yard', false);
     SETREADONLY('zone', false);
     SETREADONLY('meter_count', false);
     SETREADONLY('svs_inspection_date', false);
     SETREADONLY('svs_inspection_time', false);
     SETREADONLY('inspection_completed_date', false);
     SETREADONLY('inspection_completed_time', false);
  }
});

ON('validate-repeatable', 'meters', function (event) {

 // if(!$svs_inspection_date && !ISROLE('Owner','Manager', 'Call Center Representative','MGD_Call Center Representative', 'Dispatcher' ,'MGD_Dispatcher', 'Maestro Role', 'MGD_Maestro Role', 'MGD_Projects')) 
 // INVALID('First Inspect POE');

});

ON('load-repeatable', 'meters', function (event) {
 
   if(ISROLE('Owner','Manager', 'Call Center Representative','MGD_Call Center Representative', 'Dispatcher' ,'MGD_Dispatcher', 'Maestro Role', 'MGD_Maestro Role', 'MGD_Projects')) 
   {
     SETHIDDEN('csr_call_log', false);
     SETHIDDEN('ivr', false);
     SETHIDDEN('sent_sms', false);
     SETREADONLY('appointment_date', false);
     SETREADONLY('appointment_time', false);
     SETREADONLY('appointment_contact_name', false);
     SETREADONLY('appointment_contact', false);
     SETREADONLY('appointment_notes', false);
     SETREADONLY('receive_text_messages', false);
     SETREADONLY('customer_provided_mobile_number', false);
     SETHIDDEN('communication_info', false);
  }

 if(ISROLE('Owner')) 
   {
     SETREADONLY('ng_meter_number', false);
     SETREADONLY('customer_name', false);
     SETREADONLY('customer_meter_address', false);
     SETREADONLY('street_name', false);
     SETREADONLY('city', false);
     SETREADONLY('state', false);
     SETREADONLY('zip', false);
     SETREADONLY('address_2', false);
     SETREADONLY('bill_account_no', false);
     SETREADONLY('premise_no', false);
     SETREADONLY('home_phone', false);
     SETREADONLY('phone_2', false);
     SETREADONLY('postcard_sent', false);
     SETREADONLY('postcard_date', false);
     SETREADONLY('postcard_returned', false);
     SETREADONLY('certified_letter_sent', false);
     SETREADONLY('certified_letter_date', false);
     SETREADONLY('certified_letter_returned', false);
     SETREADONLY('return_reason', false);
     SETREADONLY('legal_letter_sent', false);
     SETREADONLY('legal_letter_date', false);
     SETREADONLY('legal_letter_returned', false);
     SETREADONLY('fine_imposed', false);
     SETREADONLY('mtr_inspection_date', false);
     SETREADONLY('mtr_inspection_time', false);
     SETREADONLY('inspection_completed_date', false);
     SETREADONLY('inspection_completed_time', false);
  }
  else if(ISROLE('Manager', 'Call Center Representative','MGD_Call Center Representative', 'Dispatcher' ,'MGD_Dispatcher', 'Maestro Role', 'MGD_Maestro Role', 'MGD_Projects')) 
   {
     SETREADONLY('customer_meter_address', true);
     SETREADONLY('street_name', true);
     SETREADONLY('city', true);
     SETREADONLY('address_2', true);
     SETREADONLY('state', true);
     SETREADONLY('zip', true);
     SETREADONLY('bill_account_no', true);
     SETREADONLY('premise_no', true);
     SETREADONLY('home_phone', true);
     SETREADONLY('phone_2', true);
   }
 else{
      SETHIDDEN('ivr', true);
      SETHIDDEN('sent_sms', true);
      SETHIDDEN('customer_meter_address', true);
      SETHIDDEN('street_name', true);
      SETHIDDEN('city', true);
      SETHIDDEN('state', true);
      SETHIDDEN('zip', true);
      SETREADONLY('address_2', true);
      SETHIDDEN('bill_account_no', true);
      SETHIDDEN('premise_no', true);
      SETREADONLY('home_phone', true);
      SETHIDDEN('phone_2', true);

      SETHIDDEN('csr_call_log', true);
      SETREADONLY('appointment_date', true);
      SETREADONLY('appointment_time', true);
      SETREADONLY('appointment_contact_name', true);
      SETREADONLY('appointment_contact', true);
      SETREADONLY('appointment_notes', true);
      SETREADONLY('receive_text_messages', true);
      SETREADONLY('customer_provided_mobile_number', true);
  }
  
   
 // if($svs_inspection_date || ISROLE('Owner','Manager', 'Call Center Representative','MGD_Call Center Representative', 'Dispatcher' ,'MGD_Dispatcher', 'Maestro Role', 'MGD_Maestro Role', 'MGD_Projects'))
    {
      SETVALUE('has_poe_been_captured','yes');
      SETHIDDEN('meter_inspection', false);
      SETHIDDEN('rmd_info', false);
      SETHIDDEN('visit_details', false);
      SETHIDDEN('meter_inspection_status', false);
      SETHIDDEN('inspection_appointment_information', false);
      SETHIDDEN('customer', false);
    }
   /* else
    {
      SETVALUE('has_poe_been_captured','no');
      SETHIDDEN('meter_inspection', true);
      SETHIDDEN('rmd_info', true);
      SETHIDDEN('visit_details', true);
      SETHIDDEN('meter_inspection_status', true);
      SETHIDDEN('inspection_appointment_information', true);
      SETHIDDEN('customer', true);

      ALERT('First Inspect POE');
    }
    */
});

ON('change-status', function (event) {
  
  var incorrect=0;
  
  if($is_meter_outside=='yes' && event.value != 'RMSET Complete')
  {
    incorrect=1;
    ALERT('When Meter Is Outside - Status Can Only Be RMSET Complete');
    SETSTATUS(status);
  }
 
  if(event.value == 'RMSET Complete' && $is_meter_outside!='yes')
  {
      var locations = [];
      var meter_status = REPEATABLEVALUES($meters, 'meter_inspection_status');

      if(EXISTS(REPEATABLEVALUES($meters, 'location_of_meter')))
        locations = REPEATABLEVALUES($meters, 'location_of_meter').map(CHOICEVALUE);

      var gas_leak = REPEATABLEVALUES($gas_repair_order_info,'gas_leak');

    if(EXISTS(gas_leak) && gas_leak[0]=='yes')
     {
        incorrect=0;
        SETREQUIRED('is_meter_outside',false);
        SETREQUIRED('service_inspection_status',true);
        SETREQUIRED('meter_inspection_status',false);
      }
    else  if(($meters!= null && $meters))
      {
          for (var i = 0; i < locations.length; i++) 
          {
            if(EXISTS(locations[i])==false || locations[i]=='Inside')
            {
              if (meter_status[i]['choice_values'][0] == 'Incomplete' && event.value == 'RMSET Complete')
              {
                incorrect=1;
                ALERT('Please Complete Inspection For All Meters');
                break;
              }
              else{
                incorrect=0;
              }
            }
          }
      }
        else
        {
          incorrect=1;
          ALERT('Please Complete Meter Inspection(s)');
        }
      
      if(incorrect==1 )  
      {
        SETSTATUS(status);
      }
}
        if(
          (
            event.value == 'POE Appointment Required' || event.value == 'Renewed in Fulcrum' || event.value == 'NYC Opportunistic' || event.value ==  'RMSET Complete') && incorrect==0
            && status!='POE Appointment Required'
          )
        {
                  var d = new Date();
          
                    if(d.getMinutes()<10)
                      var min='0'+d.getMinutes();
                      else
                      var min=String(d.getMinutes());

                    if(d.getHours()<10)
                      var hour='0'+d.getHours();
                      else
                      var hour=String(d.getHours());

                  var n = hour + ":" + min;
                  var n = hour + ":" + min;

                  SETVALUE('inspection_completed_date',d);
                  SETVALUE('inspection_completed_time',n);
      }

       if(incorrect==0)  status =STATUS();
});

ON('save-record', function (event) {
   var meter_status2 = REPEATABLEVALUES($meters, 'meter_inspection_status');
  if(STATUS()  == 'Send Gro')
  {
      send_report();
    }
});

ON('validate-record', function (event) {
 if($is_meter_outside=='yes' && STATUS() != 'RMSET Complete')
  {
    INVALID('When Meter Is Outside - Status Can Only Be RMSET Complete');
  }
 
  if(STATUS() == 'RMSET Complete' && $is_meter_outside!='yes')
  {
        var meter_status = REPEATABLEVALUES($meters, 'meter_inspection_status');
        var locations=[];

        if(EXISTS(REPEATABLEVALUES($meters, 'location_of_meter')))
          locations = REPEATABLEVALUES($meters, 'location_of_meter').map(CHOICEVALUE);

        var gas_leak=REPEATABLEVALUES($gas_repair_order_info,'gas_leak');
      
      if($meters== null)
      {
        INVALID('Please Complete Inspection For All Meters');
      }

     if($meters!= null && $meters)
      {
          for (var i = 0; i < locations.length; i++) 
          {

            if(EXISTS(locations[i])==false || locations[i]=='Inside')
            {
              if (meter_status[i]['choice_values'][0] == 'Incomplete' && event.value == 'Complete')
              {
                INVALID('Please Complete Inspection For All Meters');
                break;
              }
            }
          }
      }
 }

     if(EXISTS(gas_leak) && gas_leak[0]=='yes' && STATUS() == 'RMSET Complete')
     {
        SETREQUIRED('is_meter_outside',false);
        SETREQUIRED('service_inspection_status',true);
        SETREQUIRED('meter_inspection_status',false);
     }
});


function send_report(){
    var options = {
    url:ISMOBILE() ?'https://dev.sequelgroup.io/fulcrum//ng_report.php':'https://cors-anywhere.herokuapp.com/https://dev.sequelgroup.io/fulcrum//ng_report.php'
    , method: 'POST'
     ,headers: {
      'Content-Type': 'application/json'
    },json: {
      	"token":"eb32e5cee644c56171571946a038012acf1bbf2644c561713b6ad341eaf01eb32e5cee",
        "_record_id": RECORDID()
    }
  };
   
  REQUEST(options, function(error, response, body) {
    if (error) {
//     console.log(INSPECT(error));
    } else {
      
       if(body)
        {
         }
    }
  });
}

ON('click', 'driving_directions', function (event) {
  if ($address) {
    OPENURL('https://maps.google.com/?q=' + $address);
  } else {
    ALERT('No Address Provided!', 'An Address Is Required For Driving Directions!');
  }
});

ON('click', 'call_customer', function(event) {
  if (!EXISTS(REPEATABLEVALUES($meters, 'appointment_contact'))) {
    ALERT('You Must Enter A Phone Number.');
    return;
  }

  if (!ISMOBILE()) {
    ALERT('Only Mobile Devices Support Making Phone Calls.');
    return;
  }

  //OPENURL('tel:' + REPEATABLEVALUES($meters, 'appointment_contact'));
    OPENURL('tel:{' + STRING(REPEATABLEVALUES($meters, 'appointment_contact'))+'}');
});


function getZone() {
  var options = {
      url: ISMOBILE() ? "https://reconntech-admin.cartodb.com/api/v2/sql?api_key=5820abbd473aa54e7f5d8cd8db793e3550911757&q=SELECT+zone+,+region+FROM+nyc_zones+WHERE+ST_Contains(the_geom, ST_GeomFromText('POINT("+ LONGITUDE() + " " + LATITUDE()+ ")',4326))":"https://cors-anywhere.herokuapp.com/https://reconntech-admin.cartodb.com/api/v2/sql?api_key=5820abbd473aa54e7f5d8cd8db793e3550911757&q=SELECT+zone+,+region+FROM+nyc_zones+WHERE+ST_Contains(the_geom, ST_GeomFromText('POINT("+ LONGITUDE() + " " + LATITUDE()+ ")',4326))"
  };

  REQUEST(options, function(error, response, body) {
    if (error) {
     // ALERT('Error with request: ' + INSPECT(error));
    } else {
     
      var data = JSON.parse(body);
      
      if (data.rows && data.rows.length > 0) {
            if (data.rows[0].zone!= null) {
                  SETVALUE('zone', data.rows[0].zone);
                }
         if (data.rows[0].region!= null) {
                  SETVALUE('yard', UPPER(data.rows[0].region));
              }
      }
    }
  });
  
}

ON('change', 'is_meter_outside', function (event) {
      if(event.value)
        {
            var d = new Date();
    
              if(d.getMinutes()<10)
                var min='0'+d.getMinutes();
                else
                var min=String(d.getMinutes());

              if(d.getHours()<10)
                var hour='0'+d.getHours();
                else
                var hour=String(d.getHours());

                var n = hour + ":" + min;

              var n = hour + ":" + min;

            SETVALUE('svs_inspection_date',d);
            SETVALUE('svs_inspection_time',n);
        }
        else
        {
        SETVALUE('svs_inspection_date',null);
        SETVALUE('svs_inspection_time',null);
        }
 })


ON('change', 'meter_inspection_status', function (event) {
  if($meter_inspection_status) 
      {
        var d = new Date();

        if(d.getMinutes()<10)
         var min='0'+d.getMinutes();
        else
         var min=String(d.getMinutes());

        if(d.getHours()<10)
         var hour='0'+d.getHours();
        else
         var hour=String(d.getHours());

        var n = hour + ":" + min;


         SETVALUE('mtr_inspection_date',d);
         SETVALUE('mtr_inspection_time',n);
       }
      else
      {
        SETVALUE('mtr_inspection_date',null);
        SETVALUE('mtr_inspection_time',null);
      }
  })

  
ON('add-photo', 'meter_photos_2', function(event){
  console.log(event.value.id);
  meter(event.value.id,2);
});


ON('load-repeatable','meters',function (event) {
    if(EXISTS($meter_photos_2))
    meter($meter_photos_2[0]['photo_id'],1);
});

function meter(photo_id,l,manuf,meter_number){
   console.log(photo_id);

    var options = {
    url:ISMOBILE() ?'https://dev.sequelgroup.io/fulcrum/meter_manufact.php':'https://cors-anywhere.herokuapp.com/https://dev.sequelgroup.io/fulcrum/meter_manufact.php'
    , method: 'POST'
     ,headers: {
      'Content-Type': 'application/json'
    },json: {
      	"token":"81f9a700a0571946a038012acf1bbf23b6ad341eaf01eb32e5cee644c56171",
        "type": "uny",
        "photo": photo_id
    }
  };

  REQUEST(options, function(error, response, body) {
    if (error) {
     // ALERT(INSPECT(error));
    } else {
       if(body)
        {
          var b=ISMOBILE() ? body:JSON.stringify(body);
          var data = JSON.parse(b);

         // console.log(data);
          if(data['meter'] && $smart_meter_manufacturer!=data['meter'] && $smart_meter_manufacturer)
          	ALERT('Meter Manufacturer is incorrect');

          if(data['meter']!==false && !$smart_meter_manufacturer && !manuf && LEN(data['meter'])>LEN(manuf)) 
          {
            SETVALUE('smart_meter_manufacturer', data['meter']);
            manuf=data['meter'];
           }
        if(data['meter_number']!==false && !$smart_meter_number && !meter_number && LEN(data['meter_number'])>LEN(meter_number)) 
          SETVALUE('smart_meter_number', data['meter_number']);
        }
    if((!manuf || !meter_number) && l==1 && EXISTS($meter_photos_2))
    {
      meter($meter_photos_2[1]['photo_id'],2,data['meter'],data['meter_number']);
     }
    }
  });
}
