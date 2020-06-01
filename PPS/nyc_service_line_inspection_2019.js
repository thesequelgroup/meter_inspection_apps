
var status;

ON('load-record', function(event) {
  var adminRoles = ['Owner', 'Manager', 'Call Center Representative','MGD_Call Center Representative', 'Dispatcher' ,'MGD_Dispatcher', 'Maestro Role', 'MGD_Maestro Role', 'MGD_Projects'];

  status = STATUS();

    if(!$latitude){
    	SETVALUE('latitude',LATITUDE())
        SETVALUE('longitude',LONGITUDE())
    }
  
  getZone();
  // if the current role is one of the designated admin roles...
  if (ISROLE(adminRoles)) {
    // make the fields visible
    SETHIDDEN('csr_call_log', false);
    SETHIDDEN('call_log_date', false);
    SETHIDDEN('call_source', false);
    SETHIDDEN('csr_name', false);
    SETHIDDEN('call_type', false);
    SETHIDDEN('call_status', false);
    SETHIDDEN('call_comments', false);
    SETHIDDEN('key_contact_information', false);
  }
  
    if (ISROLE('Owner', 'Manager', 'Call Center Representative','MGD_Call Center Representative', 'Dispatcher' ,'MGD_Dispatcher', 'Maestro Role', 'MGD_Maestro Role', 'MGD_Projects')) {
    DATANAMES().forEach(function(dataName) {
      SETREQUIRED(dataName, false);
    });
  }
  
});

ON('change', 'call_type', function (event) {

  if(event.value == null)
  {
  SETHIDDEN('outbound_call_result', true);  
  SETHIDDEN('inbound_call_result', true);  
  }
  else
      {
      if(event.value['choice_values'][0].toLowerCase()=='inbound')
      {
        SETHIDDEN('inbound_call_result', false);  
        SETHIDDEN('outbound_call_result', true);  
      }
    else if(event.value['choice_values'][0].toLowerCase()=='outbound')
      {
        SETHIDDEN('outbound_call_result', false);  
        SETHIDDEN('inbound_call_result', true);  
      }
  }
});

ON('click', 'driving_directions', function (event) {
  if ($address && $city) {
    OPENURL('https://maps.google.com/?q=' + $address + ', ' + $city + ', ' + $state + ', ' + $zip);
  } else {
    ALERT('No address provided!', 'An address is required to for driving directions!');
  }
});

ON('click', 'call_customer', function(event) {
  if (!EXISTS($contact)) {
    ALERT('You must enter a phone number.');
    return;
  }

  if (!ISMOBILE()) {
    ALERT('Only mobile devices support making phone calls.');
    return;
  }

  OPENURL('tel:' + $contact);
});

ON('change', 'latitude', function (event) {
  setLocation();
});

ON('change', 'longitude', function (event) {
  setLocation();
});

function setLocation() {
  if ($latitude && $longitude) {
    SETLOCATION($latitude, $longitude);
  }

}


/*
ON('change-status', function (event) {

  if(event.value == 'Complete')
  {
    SETVALUE('inspection_completed_date',TIMESTAMP());
    
      var options = {
        url: 'https://api.fulcrumapp.com/api/v2/query',
        qs: {
            token: 'f0c94ed3ffee26270fc292a5b4a7d89f9bf6f27c4de64b6f50a115d958bcbbc8',
          format: 'json',
          q: 'SELECT count(_record_id) as count_ids FROM "NYC Meters" WHERE inspections is not null and address = \'' + $address + '\''
        }
     };

REQUEST(options, function(error, response, body) {
        if (error) {
          ALERT('Error with request: ' + INSPECT(error));
        } else {
          var data = JSON.parse(body);
          var inspections = data.rows.map(function(row) {
            return row['count_ids'];
          });

         // if(inspections==$meter_count) 
          {
           // SETSTATUS('Complete');
               }
          else
          {
            SETSTATUS('Inspection Incomplete');
            ALERT('All meters have not been inspected. Please make sure you have inspected all meters at this location.');
          }
          
        }
      });
    }
});

*/
function getZone() {
  var options = {
    
      url: ISMOBILE() ? "https://reconntech-admin.cartodb.com/api/v2/sql?api_key=5820abbd473aa54e7f5d8cd8db793e3550911757&q=SELECT+zone+,+region+FROM+nyc_zones+WHERE+ST_Contains(the_geom, ST_GeomFromText('POINT("+ LONGITUDE() + " " + LATITUDE()+ ")',4326))":"https://cors-anywhere.herokuapp.com/https://reconntech-admin.cartodb.com/api/v2/sql?api_key=5820abbd473aa54e7f5d8cd8db793e3550911757&q=SELECT+zone+,+region+FROM+nyc_zones+WHERE+ST_Contains(the_geom, ST_GeomFromText('POINT("+ LONGITUDE() + " " + LATITUDE()+ ")',4326))"
  };
  
  REQUEST(options, function(error, response, body) {
    if (error) {
    //  ALERT('Error with request: ' + INSPECT(error));
    } else {
     
      data = JSON.parse(body);
      
      if (data.rows && data.rows.length > 0) {
            if (data.rows[0].zone) {
                  SETVALUE('zone', data.rows[0].zone);
                }
         if (data.rows[0].region) {
                  SETVALUE('yard', data.rows[0].region);
             }
      }
    }
  });
  
}



var current_date  = false;
var current_time  = false;

ON('change','date',function(){
current_date = true;
});

ON('change','time',function(){
  current_time = true;
});



var dhdate ='1/1/2000' ; 

ON ('load-record', function (event) {
  if (STATUS() == 'Door Hanger' && !$door_hanger_date)
{
  dhdate = 'SOMETHING ELSE'
}

  
  
 if(dhdate == '1/1/2000'  && STATUS() == 'Door Hanger')
 {
   dhdate = $door_hanger_date.toDateString();
  }
}); 



ON('save-record', function (event) {
      
  if(STATUS() == 'Complete' && !$inspection_completed_date && ISMOBILE())
  {
      SETVALUE('inspection_completed_date',new Date());
    }
  
  if(status!=STATUS() && (status == 'Renewed in Fulcrum' || status == 'NYC Opportunistic'))
  {
     SETVALUE('status_changed_date',new Date());
     SETVALUE('previous_status',status);
  }

  if(!PROJECTID())  SETPROJECT('NYC Unassigned');
   

   if(($sms_sent!='yes' && $receive_text_messages=='yes' &&  !ISMOBILE() && $time['choice_values'][0]) || (current_date &&  $date != null && $receive_text_messages=='yes' && !ISMOBILE())
      || (current_time &&  $time != null && $receive_text_messages=='yes' && !ISMOBILE()))
  {
    SETVALUE('sms_sent','yes');
     send_sms();
    }
             if(STATUS() == 'Door Hanger' && dhdate == '1/1/2000'   )
  {
      SETVALUE('door_hanger_date',new Date());
    } 
});



function send_sms(){
    options = {
    url:ISMOBILE() ?'https://dev.sequelgroup.io/fulcrum/send_alert.php':'https://cors-anywhere.herokuapp.com/https://dev.sequelgroup.io/fulcrum/twilio_sms.php'
    , method: 'POST'
     ,headers: {
      'Content-Type': 'application/json'
    },json: {
      	"token":"81f9a700a0571946a038012acf1bbf23b6ad341eaf01eb32e5cee644c56171",
        "phone": $customer_provided_mobile_number,
      "app_date": $date,
      "app_time": $time['choice_values'][0]
    }
  };

  
  
  REQUEST(options, function(error, response, body) {
    if (error) {
     // ALERT(INSPECT(error));
    } else {
       if(body)
        {
         }
    }
  });
}

ON('click', 'all_meters_for_this_service', function (event) {
  var options = {
    url: 'https://api.fulcrumapp.com/api/v2/query',
    qs: {
      token: 'f0c94ed3ffee26270fc292a5b4a7d89f9bf6f27c4de64b6f50a115d958bcbbc8',
      format: 'json',
      q: 'SELECT _record_id FROM "NYC Meters 2019" WHERE address = \'' + $address + '\' AND city = \'' + $city + '\''
    }
  };

  REQUEST(options, function(error, response, body) {
    if (error) {
      ALERT('Error with request: ' + INSPECT(error));
    } else {
      var data = JSON.parse(body);
      var meters = data.rows.map(function(row) {
        return row['_record_id'];
      });
      SETVALUE('meter', meters);
    }
  });
});



  if (ISROLE('MGD_Precision Field Technician') && ISMOBILE()  ) {
    SETHIDDEN('inspection_completed_date', true);
        }



ON('edit-record', function(event){
  var name = $field_technician;
  if(ISMOBILE()){
    name = USERFULLNAME();
  }
  SETVALUE('field_technician', name);
});


ON('change','service',function(){

 if(!PROJECTID())  SETPROJECT('NYC Unassigned');
   
})