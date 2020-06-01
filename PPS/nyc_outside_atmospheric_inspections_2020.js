var status;

ON('load-record', function(event) {

  status =STATUS();

  if(LATITUDE()) getZone();

  if (ISROLE('Owner','Manager', 'Call Center Representative','MGD_Call Center Representative', 'Dispatcher' ,'MGD_Dispatcher', 'Maestro Role', 'MGD_Maestro Role', 'MGD_Projects', 'MGD_National Grid Manager')) {
    DATANAMES().forEach(function(dataName) {
      if(dataName!='customer_provided_mobile_number')  SETREQUIRED(dataName, false);
    });
  }

  var fieldUserRoles = ['MGD_Precision Field Technician', 'Contractor Inspector', 'Precision Field Technician'];

  // if the current role is one of the designated field user roles...
  if (ISROLE(fieldUserRoles)) {
    // set the status field filter
    SETSTATUSFILTER(['Post Card First Attempt', 'Post Card Second Attempt', 'Complete', 'Customer Refused', 'Unable To Post']);
  }

  var fieldUserRoles = ['Call Center Representative','MGD_Call Center Representative', 'Dispatcher' ,'MGD_Dispatcher', 'Maestro Role', 'MGD_Maestro Role'];

  // if the current role is one of the designated field user roles...
  if (ISROLE(fieldUserRoles)) {
    // set the status field filter
    SETSTATUSFILTER(['Post Card First Attempt', 'Post Card Second Attempt', 'BD First Attempt', 'Unassigned Appointment', '8AM-Noon', 'Noon-4PM', '4PM-7PM', 'Door Hanger', 'Revisit 1st Attempt DH', 'Revisit 2nd Attempt DH', 'Missed Appointment', 'Cement Sealing Appt Required', 'Complete' ,'Customer Refused', 'Unable To Post', 'School', 'Previously Inspected']);
  }

 if(ISROLE('Owner','Manager', 'Call Center Representative','MGD_Call Center Representative', 'Dispatcher' ,'MGD_Dispatcher', 'Maestro Role', 'MGD_Maestro Role', 'MGD_Projects')) 
  {
     SETREADONLY('sealing_appointment_date', false);
     SETREADONLY('sealing_appointment_time', false);
     SETREADONLY('contact_name', false);
     SETREADONLY('contact_number', false);
     SETREADONLY('appointment_date', false);
     SETREADONLY('appointment_time', false);
     SETREADONLY('appointment_contact_name', false);
     SETREADONLY('appointment_contact', false);
     SETREADONLY('appointment_notes', false);
     SETREADONLY('receive_text_messages', false);
     SETREADONLY('customer_provided_mobile_number', false);
     SETHIDDEN('csr_call_log', false);
     SETHIDDEN('ivr', false);
     SETHIDDEN('sms_sent', false);
     SETHIDDEN('home_phone', false);
  }

 if(ISROLE('Owner')) 
   {
     SETREADONLY('meter_count', false);
     SETREADONLY('service_type', false);
     SETREADONLY('service_type_parent', false);
     SETREADONLY('service_street_name', false);
     SETREADONLY('service_city', false);
     SETREADONLY('service_state', false);
     SETREADONLY('service_zip', false);
     SETREADONLY('address', false);
     SETREADONLY('street_name', false);
     SETREADONLY('yard', false);
     SETREADONLY('zone', false);
     SETREADONLY('ng_meter_number', false);
    // SETREADONLY('smart_meter_manufacturer', false);
    // SETREADONLY('smart_meter_number', false);
     SETREADONLY('customer_name', false);
     SETREADONLY('bill_account_no', false);
     SETREADONLY('customer_meter_address', false);
     SETREADONLY('street_name', false);
     SETREADONLY('address_2', false);
     SETREADONLY('city', false);
     SETREADONLY('state', false);
     SETREADONLY('zip', false);
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
     SETREADONLY('svs_inspection_date', false);
     SETREADONLY('svs_inspection_time', false);
     SETREADONLY('inspection_completed_date', false);
     SETREADONLY('inspection_completed_time', false);
     SETREADONLY('mtr_inspection_date', false);
     SETREADONLY('mtr_inspection_time', false);
     SETREADONLY('technician_parent', false);
     SETHIDDEN('premise_id', false);
     SETHIDDEN('service_point', false);
     SETHIDDEN('service_street_name', false);
     SETHIDDEN('service_city', false);
     SETHIDDEN('service_state', false);
     SETHIDDEN('service_zip', false);
     SETHIDDEN('field_address', false);
     SETHIDDEN('yard', false);
     SETHIDDEN('field_address', false);
     SETHIDDEN('bill_account_no', false);
     SETHIDDEN('street_name', false);
     SETHIDDEN('city', false);
     SETHIDDEN('state', false);
     SETHIDDEN('zip', false);
     SETHIDDEN('premise_no', false);
     SETHIDDEN('phone_2', false);
     SETHIDDEN('communication_info', false);
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
     SETHIDDEN('call_customer', true)
     SETHIDDEN('phone_2', false);
     SETHIDDEN('communication_info', false);
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
      SETHIDDEN('communication_info', true);

      SETHIDDEN('csr_call_log', true);
      SETREADONLY('appointment_date', true);
      SETREADONLY('appointment_time', true);
      SETREADONLY('appointment_contact_name', true);
      SETREADONLY('appointment_contact', true);
      SETREADONLY('appointment_notes', true);
      SETREADONLY('receive_text_messages', true);
      SETREADONLY('customer_provided_mobile_number', true);
  }
});

ON('change-status', function (event) {
  
  var incorrect=0;
  
  if($is_meter_inside=='yes' && event.value != 'Complete' && event.value != 'Cement Sealing Appt Required')
  {
    incorrect=1;
    ALERT('When Meter Is Inside - Status Can Only Be Complete');
    SETSTATUS(status);
  }

  if((event.value == 'Complete' || event.value == 'Cement Sealing Appt Required') && ($is_meter_inside!='yes' && EXISTS(REPEATABLEVALUES($meters, 'location_of_meter'))))
  {
      var locations = [];
      var meter_status = REPEATABLEVALUES($meters, 'meter_inspection_status');

      if(EXISTS(REPEATABLEVALUES($meters, 'location_of_meter')))
        locations = REPEATABLEVALUES($meters, 'location_of_meter').map(CHOICEVALUE);

      var gas_leak = REPEATABLEVALUES($gas_repair_order_info,'gas_leak');

    if(EXISTS(gas_leak) && gas_leak[0]=='yes')
     {
        incorrect=0;
        SETREQUIRED('is_meter_inside',false);
        SETREQUIRED('service_inspection_status',true);
        SETREQUIRED('meter_inspection_status',false);
      }
    else  if(($meters!= null && $meters))
      {
          for (var i = 0; i < locations.length; i++) 
          {
            if(EXISTS(locations[i])==false || locations[i]=='Inside')
            {
              if (meter_status[i]['choice_values'][0] == 'Incomplete' && (event.value == 'Complete' || event.value == 'Cement Sealing Appt Required'))
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
            event.value == 'Renewed in Fulcrum' || event.value == 'NYC Opportunistic' || event.value ==  'Complete') && incorrect==0
            && status!='Cement Sealing Appt Required'
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
 if($is_meter_inside=='yes' && STATUS() != 'Complete' && event.value != 'Cement Sealing Appt Required')
  {
    INVALID('When Meter Is Inside - Status Can Only Be Complete');
  }
   
  if((event.value == 'Complete' || event.value == 'Cement Sealing Appt Required') && ($is_meter_inside!='yes' && EXISTS(REPEATABLEVALUES($meters, 'location_of_meter'))))
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
              if (meter_status[i]['choice_values'][0] == 'Incomplete' && (STATUS() == 'Complete' || STATUS() == 'Cement Sealing Appt Required'))
              {
                INVALID('Please Complete Inspection For All Meters');
                break;
              }
            }
          }
      }
 }

     if(EXISTS(gas_leak) && gas_leak[0]=='yes' && (STATUS() == 'Complete' || STATUS() == 'Cement Sealing Appt Required'))
     {
        SETREQUIRED('is_meter_inside',false);
        SETREQUIRED('service_inspection_status',true);
        SETREQUIRED('meter_inspection_status',false);
     }
});

function send_report(){
    var options = {
    url:ISMOBILE() ?'https://dev.sequelgroup.io/fulcrum//wrs_report.php':'https://cors-anywhere.herokuapp.com/https://dev.sequelgroup.io/fulcrum//ng_report.php'
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

ON('click', 'call_appt_contact', function(event) {
  if (!EXISTS($appointment_contact)) {
    ALERT('You Must Enter A Phone Number.');
    return;
  }

  if (!ISMOBILE()) {
    ALERT('Only Mobile Devices Support Making Phone Calls.');
    return;
  }

  //OPENURL('tel:' + $appointment_contact);
    OPENURL('tel:{' + STRING($appointment_contact)+'}');
});

ON('click', 'call_customer_mobile', function(event) {
  if (!EXISTS($appointment_contact)) {
    ALERT('You Must Enter A Phone Number.');
    return;
  }

  if (!ISMOBILE()) {
    ALERT('Only Mobile Devices Support Making Phone Calls.');
    return;
  }

  //OPENURL('tel:' + $customer_provided_mobile_number);
    OPENURL('tel:{' + STRING($customer_provided_mobile_number)+'}');
});

ON('click', 'call_customer_home', function(event) {
  if (!EXISTS($appointment_contact)) {
    ALERT('You Must Enter A Phone Number.');
    return;
  }

  if (!ISMOBILE()) {
    ALERT('Only Mobile Devices Support Making Phone Calls.');
    return;
  }

  //OPENURL('tel:' + $home_phone);
    OPENURL('tel:{' + STRING($home_phone)+'}');
});

ON('click', 'call_phone_2', function(event) {
  if (!EXISTS($appointment_contact)) {
    ALERT('You Must Enter A Phone Number.');
    return;
  }

  if (!ISMOBILE()) {
    ALERT('Only Mobile Devices Support Making Phone Calls.');
    return;
  }

  //OPENURL('tel:' + $phone_2);
    OPENURL('tel:{' + STRING($phone_2)+'}');
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

ON('change', 'is_meter_inside', function (event) {
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


ON('add-photo', 'meter_photos_2', function(event){
  console.log(event.value.id);
  meter(event.value.id,2);
});

ON('load-repeatable','meter_inspection_parent',function (event) {
    if(EXISTS($meter_photos_2))
    meter($meter_photos_2[0]['photo_id'],1);
});

function meter(photo_id,l,manuf,meter_number){
   //console.log(photo_id);

    var options = {
    url:ISMOBILE() ?'https://dev.sequelgroup.io/fulcrum/meter_manufact.php':'https://cors-anywhere.herokuapp.com/https://dev.sequelgroup.io/fulcrum/meter_manufact.php'
    , method: 'POST'
     ,headers: {
      'Content-Type': 'application/json'
    },json: {
        "token":"81f9a700a0571946a038012acf1bbf23b6ad341eaf01eb32e5cee644c56171",
        "type": "nyc",
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

         //console.log(data);
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

