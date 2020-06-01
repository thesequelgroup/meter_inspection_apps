var status;

ON('load-record', function(event) {
  var adminRoles = ['Owner', 'Manager','Reconn Call Center Representative','MGD_Reconn Call Center Representative', 'Reconn Manager', 'MGD_Reconn Manager', 'Reconn Maestro Role', 'MGD_Reconn Maestro Role' ];
  
  status=STATUS();

     if(!$latitude){
    	SETVALUE('latitude',LATITUDE())
        SETVALUE('longitude',LONGITUDE())
    }

  // if the current role is one of the designated admin roles...
  if (ISROLE(adminRoles)) {
    // make the fields visible
    SETHIDDEN('csr_call_log', false);
    SETHIDDEN('call_log', false);
    SETHIDDEN('call_log_date', false);
    SETHIDDEN('csr_name', false);
    SETHIDDEN('call_source', false);
    SETHIDDEN('call_type', false);
     SETHIDDEN('call_status', false);
    SETHIDDEN('call_comments', false);
    SETHIDDEN('key_contact_information', false);
  }
  
  if (ISROLE('Owner', 'Manager','Reconn Call Center Representative','MGD_Reconn Call Center Representative', 'Reconn Manager', 'MGD_Reconn Manager', 'Reconn Maestro Role', 'MGD_Reconn Maestro Role' )) {
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
    }
});
*/



var current_date  = false;
var current_time  = false;

ON('change','date',function(){
current_date = true;
});

ON('change','time',function(){
  current_time = true;
});


ON('save-record', function (event) {
      
  if( (STATUS() == 'Complete' || STATUS()  == 'Opportunistic-Reconn')  && !$inspection_completed_date && ISMOBILE())
  {
      SETVALUE('inspection_completed_date',new Date());
    }
  
  if(status!=STATUS() && (status == 'Renewed in Fulcrum' || status == 'UNY Opportunistic')) 
  {
     SETVALUE('status_changed_date',new Date());
     SETVALUE('previous_status',status);
  }

  if(!PROJECTID())  SETPROJECT('UNY Unassigned');
  
   if(($sms_sent!='yes' && $receive_text_messages=='yes' &&  !ISMOBILE() && $time['choice_values'][0]) || (current_date &&  $date != null && $receive_text_messages=='yes' && !ISMOBILE())
      || (current_time &&  $time != null && $receive_text_messages=='yes' && !ISMOBILE()))
  {
    SETVALUE('sms_sent','yes');
     send_sms();
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



  if (ISROLE('MGD_Reconn Field Technician') && ISMOBILE()  ) {
    SETHIDDEN('inspection_completed_date', true);
    SETHIDDEN('billed', true);
    SETHIDDEN('bill_date', true);
  };

  if (ISROLE('MGD_Reconn Call Center Representative')) {
    SETREADONLY('inspection_completed_date', true);
  };



ON('edit-record', function(event){
  var name = $field_technician;
  if(ISMOBILE()){
    name = USERFULLNAME();
  }
  SETVALUE('field_technician', name);
});

ON('load-repeatable', function(event) {
  ALERT('Loaded repeatable editor');
});

/*ON('change','service',function(){
  if(!PROJECTID())  SETPROJECT('UNY Unassigned');
});*/


