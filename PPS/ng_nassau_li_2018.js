ON('load-record', function(event) {
  var adminRoles = ['Owner', 'Manager', 'Call Center Representative', 'Dispatcher' , 'Maestro Role'];

  // if the current role is one of the designated admin roles...
  if (ISROLE(adminRoles)) {
    // make the fields visible
    SETHIDDEN('csr_call_log', false);
    SETHIDDEN('call_log', false);
    SETHIDDEN('call_log_date', false);
    SETHIDDEN('call_source', false);
    SETHIDDEN('csr_name', false);
    SETHIDDEN('call_type', false);
    SETHIDDEN('call_result', false);
    SETHIDDEN('call_status', false);
    SETHIDDEN('call_comments', false);
    SETHIDDEN('key_contact_information', false);
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

ON('load-record', function(event) {
  if (ISROLE('Owner', 'Manager', 'Call Center Representative', 'Dispatcher' , 'Maestro Role')) {
    DATANAMES().forEach(function(dataName) {
      SETREQUIRED(dataName, false);
    });
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

ON('change','time', function (event) {
   updateStatus();
});
ON('change','date', function (event) {
    updateStatus();
});

function updateStatus()
{
    if(CHOICEVALUES($time)) 
    {
      SETPROJECT('Unassigned');
      SETSTATUS('Unassigned Appointment');
      SETASSIGNMENT('dispatch@thesequelgroup.com');
    }
}

ON('change-status', function (event) {
      
  if(event.value == 'Complete')
  {
    
     SETVALUE('inspection_completed_date',TIMESTAMP());
      var options = {
        url: 'https://api.fulcrumapp.com/api/v2/query',
        qs: {
            token: 'f0c94ed3ffee26270fc292a5b4a7d89f9bf6f27c4de64b6f50a115d958bcbbc8',
          format: 'json',
          q: 'SELECT count(_record_id) as count_ids FROM "NG Nassau LI Meters" WHERE inspections is not null and address = \'' + $address + '\''
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
         /* else
          {
            SETSTATUS('Inspection Incomplete');
            ALERT('All meters have not been inspected. Please make sure you have inspected all meters at this location.');
          }
          */
        }
      });
    }
});
ON('click', 'all_meters_for_this_service', function (event) {
  var options = {
    url: 'https://api.fulcrumapp.com/api/v2/query',
    qs: {
      token: 'f0c94ed3ffee26270fc292a5b4a7d89f9bf6f27c4de64b6f50a115d958bcbbc8',
      format: 'json',
      q: 'SELECT _record_id FROM "NG Nassau LI Meters" WHERE address = \'' + $address + '\''
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