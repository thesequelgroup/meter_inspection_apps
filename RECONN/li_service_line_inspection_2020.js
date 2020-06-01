var status;

ON('load-record', function(event) {
  status =STATUS();

  if(LATITUDE()) getZone();

  if (ISROLE('Owner','Manager', 'MGD_NG Manager','MGD_Reconn Call Center Representative', 'MGD_Reconn Dispatcher', 'MGD_Reconn Maestro Role', 'MGD_Reconn Manager')) {
    DATANAMES().forEach(function(dataName) {
      if(dataName!='appointment_contact_number')  SETREQUIRED(dataName, false);
    });
  }

  var fieldUserRoles = ['MGD_Reconn Field Technician'];
  //, 'Contractor Inspector'

  // if the current role is one of the designated field user roles...
  if (ISROLE(fieldUserRoles)) {
    // set the status field filter
    SETSTATUSFILTER(['Missed Appointment', 'Door Hanger', 'Complete', 'Customer Refused', 'Unable to Post', 'POE Appointment']);
  }

  var adminUserRoles = ['MGD_Reconn Call Center Representative','MGD_Reconn Dispatcher', 'MGD_Reconn Maestro Role', 'MGD_Reconn Manager'];

  // if the current role is one of the designated field user roles...
  if (ISROLE(adminUserRoles)) {
    // set the status field filter
    SETSTATUSFILTER(['Missed Appointment', 'Door Hanger', 'Complete', 'Unassigned Appointment', '8AM-Noon', 'Noon-4PM', 'Customer Refused', 'Unable to Post', '4PM-6PM', 'POE Appointment']);
  }
 
 if(ISROLE('Owner','Manager', 'MGD_NG Manager', 'MGD_Reconn Call Center Representative', 'MGD_Reconn Dispatcher', 'MGD_Reconn Maestro Role', 'MGD_Reconn Manager')) 
   {
     SETREADONLY('sealing_appointment_date', false);
     SETREADONLY('sealing_appointment_time', false);
     SETREADONLY('contact_name', false);
     SETREADONLY('contact_number', false);
     SETREADONLY('appointment_date', false);
     SETREADONLY('appointment_time', false);
     SETREADONLY('appointment_contact_name', false);
     SETREADONLY('appointment_contact_number', false);
     SETREADONLY('access_controller', false);
     SETREADONLY('access_controller_number', false);
     SETREADONLY('appointment_notes', false);
     SETREADONLY('receive_text_messages', false);
     SETREADONLY('customer_provided_mobile_number', false);
     SETHIDDEN('service_type', false);
     SETHIDDEN('premise_id', false);
     SETHIDDEN('address', false);
     SETHIDDEN('yard', false);
     SETHIDDEN('gwa', false);
     SETHIDDEN('region', false);
     SETHIDDEN('csr_call_log', false);
     SETHIDDEN('ivr', false);
     SETHIDDEN('sms_sent', false);
     SETHIDDEN('home_phone', false);
  }

 if(ISROLE('Owner')) 
   {
     SETREADONLY('poe_count', false);
     SETREADONLY('meter_count', false);
     SETREADONLY('service_type', false);
     SETREADONLY('premise_id', false);
     SETREADONLY('address', false);
     SETREADONLY('service_street_name', false);
     SETREADONLY('service_city', false);
     SETREADONLY('service_state', false);
     SETREADONLY('service_zip', false);
     SETREADONLY('yard', false);
     SETREADONLY('gwa', false);
     SETREADONLY('region', false);
     SETREADONLY('poe_address', false);
     SETREADONLY('poe_address_two', false);
     SETREADONLY('svs_inspection_date', false);
     SETREADONLY('svs_inspection_time', false);
     SETREADONLY('technician_svs', false);
     SETREADONLY('ng_meter_number', false);
     SETREADONLY('smart_meter_manufacturer', true);
     SETREADONLY('smart_meter_number', true);
     SETREADONLY('manufacturer', false);
     SETREADONLY('model_type', false);
     SETREADONLY('year', false);
     SETREADONLY('customer_name', false);
     SETREADONLY('bill_account_no', false);
     SETREADONLY('customer_meter_address', false);
     SETREADONLY('street_name', false);
     SETREADONLY('city', false);
     SETREADONLY('state', false);
     SETREADONLY('zip', false);
     SETREADONLY('meter_address_two', false);
     SETREADONLY('bill_account_no', false);
     SETREADONLY('premise_no', false);
     SETREADONLY('home_phone', false);
     SETREADONLY('phone_2', false);
     SETREADONLY('communication_info', false);
     SETREADONLY('postcard_sent', false);
     SETREADONLY('postcard_date', false);
     SETREADONLY('postcard_returned', false);
     SETREADONLY('certified_letter_sent', false);
     SETREADONLY('certified_letter_date', false);
     SETREADONLY('certified_letter_returned', false);
     SETREADONLY('meter_inspection_date', false);
     SETREADONLY('meter_inspection_time', false);
     SETREADONLY('technician_mtr', false);
     SETREADONLY('gro_date', false);
     SETREADONLY('gro_time', false);
     SETREADONLY('gro_field_address', false);
     SETREADONLY('inspection_completed_date', false);
     SETREADONLY('inspection_completed_time', false);
     SETREADONLY('technician_parent', false);
     SETHIDDEN('service_street_name', false);
     SETHIDDEN('service_city', false);
     SETHIDDEN('service_state', false);
     SETHIDDEN('service_zip', false);
     SETHIDDEN('field_address', true);
     SETHIDDEN('manufacturer', false);
     SETHIDDEN('model_type', false);
     SETHIDDEN('year', false);
     SETHIDDEN('bill_account_no', false);
     SETHIDDEN('street_name', false);
     SETHIDDEN('city', false);
     SETHIDDEN('state', false);
     SETHIDDEN('zip', false);
     SETHIDDEN('premise_no', false);
     SETHIDDEN('phone_2', false);
     SETHIDDEN('communication_info', false);
  }
  else if(ISROLE('Manager','MGD_NG Manager', 'MGD_Reconn Call Center Representative','MGD_Reconn Dispatcher', 'MGD_Reconn Maestro Role' ,'MGD_Reconn Manager')) 
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
     SETHIDDEN('street_name', true);
     SETHIDDEN('meter_address_two', true);
     SETHIDDEN('phone_2', false);
     SETHIDDEN('communication_info', false);
   }
 else{
      SETHIDDEN('ivr', true);
      SETHIDDEN('sent_sms', true);
      SETHIDDEN('customer_meter_address', false);
      SETHIDDEN('street_name', true);
      SETHIDDEN('city', true);
      SETHIDDEN('state', true);
      SETHIDDEN('zip', true);
      SETHIDDEN('home_phone', true);
      SETREADONLY('address_2', true);
      SETHIDDEN('bill_account_no', true);
      SETHIDDEN('premise_no', true);
      SETREADONLY('home_phone', true);
      SETHIDDEN('phone_2', true);
      SETHIDDEN('communication_info', true);

      SETHIDDEN('csr_call_log', true);
      SETREADONLY('appointment_date', true);
      SETREADONLY('appointment_time', true);
      SETREADONLY('appointment_contact_name', false);
      SETREADONLY('appointment_contact_number', false);
      SETREADONLY('appointment_notes', false);
      SETREADONLY('receive_text_messages', true);
      SETREADONLY('customer_provided_mobile_number', true);
  }

  if ($requirements==1) {
      DATANAMES().forEach(function(dataName) {
          SETREQUIRED(dataName, false);
        });
  }
    
});


ON('change-status', function (event) {
  
  var incorrect=0;
  
  if($is_meter_outside=='yes' && event.value != 'Complete')
  {
    incorrect=1;
    ALERT('When Meter Is Outside - Status Can Only Be Complete');
    SETSTATUS(status);
  }
 
  if(event.value == 'Complete' && $is_meter_outside!='yes' && $requirements!=1)
  {
        var meter_status = REPEATABLEVALUES($meter_inspection_parent, 'meter_inspection_status');
        var locations = REPEATABLEVALUES($meter_inspection_parent, 'location_of_meter');
        var gas_leak=REPEATABLEVALUES($gas_repair_order_info,'gas_leak');
        
    if(gas_leak!= null && gas_leak=='yes')
     {
        incorrect=0;
        SETREQUIRED('is_meter_outside',false);
        SETREQUIRED('poe_inspection_parent',false);
        SETREQUIRED('is_poe_count_correct',false);
        SETREQUIRED('is_meter_count_correct',false);
        SETREQUIRED('meter_inspection_parent',false);
        SETREQUIRED('access_to_poe',false);
      }
    else  if(($meter_inspection_parent!= null && $meter_inspection_parent))
      {
          for (var i = 0; i < locations.length; i++) 
          {
            if($location_of_meter =='Inside' || !$location_of_meter || ISBLANK($location_of_meter))
            {
              if (meter_status[i]['choice_values'][0] == 'Incomplete' && event.value == 'Complete')
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
            event.value == 'POE Appointment' || event.value == 'Renewed in Fulcrum' || event.value == 'LI Opportunistic' || event.value ==  'Complete') && incorrect==0
            && status!='POE Appointment'
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
   var meter_status2 = REPEATABLEVALUES($meter_inspection_parent, 'meter_inspection_status');
  if(STATUS()  == 'Send Gro')
  {
      send_report();
    }
});

ON('validate-record', function (event) {
 if($is_meter_outside=='yes' && STATUS() != 'Complete')
  {
    INVALID('When Meter Is Outside - Status Can Only Be Complete');
  }
 
  if(STATUS() == 'Complete' && $is_meter_outside!='yes' && $requirements!=1)
  {
        var meter_status = REPEATABLEVALUES($meter_inspection_parent, 'meter_inspection_status');
        var locations = REPEATABLEVALUES($meter_inspection_parent, 'location_of_meter');
        var gas_leak=REPEATABLEVALUES($gas_repair_order_info,'gas_leak');
      
      if($meter_inspection_parent== null)
      {
        INVALID('Please Complete Inspection For All Meters');
      }
 }

     if(gas_leak!= null && gas_leak=='yes' && STATUS() == 'Complete')
     {
       SETREQUIRED('is_meter_outside',false);
        SETREQUIRED('poe_inspection_parent',false);
        SETREQUIRED('is_poe_count_correct',false);
        SETREQUIRED('meter_inspection_parent',false);
        SETREQUIRED('is_meter_count_correct',false);
     }

    var access_to_poe=REPEATABLEVALUES($poe_inspection_parent,'access_to_poe');
    if(REPEATABLEVALUES($poe_inspection_parent,'poe_inspection_status')!= null)
      var poe_inspection_status= REPEATABLEVALUES($poe_inspection_parent,'poe_inspection_status').map(CHOICEVALUE);

   if(access_to_poe!= null && access_to_poe[0]=='no' && (poe_inspection_status==null || (poe_inspection_status!=null && poe_inspection_status[0]=='Complete'))) INVALID("POE Status Must Be 'Incomplete' when No Access To POE");
    if(access_to_poe!= null && access_to_poe[0]=='yes' && (poe_inspection_status==null || (poe_inspection_status!=null && poe_inspection_status[0]=='Incomplete'))) INVALID("POE Status Must Be 'Complete' when POE Is Accessible");

});


ON('validate-repeatable','poe_inspection_parent' ,function (event) {
    if($access_to_poe!= null && $access_to_poe=='no' && ($poe_inspection_status==null || ($poe_inspection_status!=null && $poe_inspection_status.choice_values[0]=='Complete'))) INVALID("POE Status Must Be 'Incomplete' or 'No POE At This Address' when No Access To POE");
    if($access_to_poe!= null && $access_to_poe=='yes' && ($poe_inspection_status==null || ($poe_inspection_status!=null && $poe_inspection_status.choice_values[0]=='Incomplete'))) INVALID("POE Status Must Be 'Complete' when POE Is Accessible");

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

ON('click', 'notify_dispatch', function(event) {
  if (!EXISTS('cms_dispatch_regulator')) {
    ALERT('You Must Enter A Phone Number.');
    return;
  }

  if (!ISMOBILE()) {
    ALERT('Only Mobile Devices Support Making Phone Calls.');
    return;
  }

  OPENURL('tel:' + $cms_dispatch_regulator);
  });

ON('click', 'call_appt_contact', function(event) {
  if (!EXISTS('appointment_contact_number')) {
    ALERT('You Must Enter A Phone Number.');
    return;
  }

  if (!ISMOBILE()) {
    ALERT('Only Mobile Devices Support Making Phone Calls.');
    return;
  }

  OPENURL('tel:' + $appointment_contact_number);
  });

  ON('click', 'call_access_controller', function(event) {
  if (!EXISTS('access_controller_number')) {
    ALERT('You Must Enter A Phone Number.');
    return;
  }

  if (!ISMOBILE()) {
    ALERT('Only Mobile Devices Support Making Phone Calls.');
    return;
  }

  OPENURL('tel:' + $access_controller_number);
  });

  ON('click', 'call_customer_mobile', function(event) {
  if (!EXISTS('customer_provided_mobile_number')) {
    ALERT('You Must Enter A Phone Number.');
    return;
  }

  if (!ISMOBILE()) {
    ALERT('Only Mobile Devices Support Making Phone Calls.');
    return;
  }

  OPENURL('tel:' + $customer_provided_mobile_number);
  });

function getZone() {
  var options = {
      url: ISMOBILE() ? "https://reconntech-admin.cartodb.com/api/v2/sql?api_key=5820abbd473aa54e7f5d8cd8db793e3550911757&q=SELECT+gwa+FROM+gwa_gis+WHERE+ST_Contains(the_geom, ST_GeomFromText('POINT("+ LONGITUDE() + " " + LATITUDE()+ ")',4326))":"https://cors-anywhere.herokuapp.com/https://reconntech-admin.cartodb.com/api/v2/sql?api_key=5820abbd473aa54e7f5d8cd8db793e3550911757&q=SELECT+gwa+FROM+gwa_gis+WHERE+ST_Contains(the_geom, ST_GeomFromText('POINT("+ LONGITUDE() + " " + LATITUDE()+ ")',4326))"
  };

  REQUEST(options, function(error, response, body) {
    if (error) {
     // ALERT('Error with request: ' + INSPECT(error));
    } else {
     
      var data = JSON.parse(body);
      
      if (data.rows && data.rows.length > 0) {
            if (data.rows[0].gwa!= null) {
                  SETVALUE('gwa', data.rows[0].gwa);
                }
         if (data.rows[0].region!= null) {
                  SETVALUE('barn', UPPER(data.rows[0].region));
              }
      }
    }
  });
  
}

ON('change', 'gas_leak', function (event) {

     if(event.value!= null && event.value=='yes')
     {
       SETREQUIRED('is_meter_outside',false);
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


         SETVALUE('meter_inspection_date',d);
         SETVALUE('meter_inspection_time',n);
       }
      else
      {
        SETVALUE('meter_inspection_date',null);
        SETVALUE('meter_inspection_time',null);
      }
  })

ON('change', 'access_to_poe', function (event) {
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

ON('add-photo', 'meter_photos_2', function(event){
  //console.log(event.value.id);
  meter(event.value.id,2);
});


ON('add-photo', 'meter_photos_2', function(event){
  console.log(event.value.id);
  meter(event.value.id,2);
});


ON('load-repeatable','meter_inspection_parent',function (event) {
    if(EXISTS($meter_photos_2))    meter($meter_photos_2[0]['photo_id'],1);
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

          //console.log(data);

          if($smart_meter_manufacturer!=data['meter'] && $smart_meter_manufacturer)
          	ALERT('Meter Manufacturer is incorrect');



          if(data['meter']!==false && !$smart_meter_manufacturer && !manuf) 
          {
            SETVALUE('smart_meter_manufacturer', data['meter']);
            manuf=data['meter'];
           }
        if(data['meter_number']!==false && !$smart_meter_number && !meter_number) 
          SETVALUE('smart_meter_number', data['meter_number']);
        }
    if((!manuf || !meter_number) && l==1 && EXISTS($meter_photos_2))
    {
      meter($meter_photos_2[1]['photo_id'],2,data['meter'],data['meter_number']);
     }
    }
  });
}