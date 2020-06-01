 if (ISMOBILE()) {
   // initialize storage variable
var storage = STORAGE();

// this should populate the service address for the meter that this inspection is for.
// only when creating a new record.  i.e. when a field user is creating the new inspection record.
ON('new-record', function(event) {
	SETVALUE('service_address', storage.getItem('service_address'));
    SETVALUE('ng_meter_number', storage.getItem('meter_number'));
    SETVALUE('meter_id', storage.getItem('meter_id'));
    SETVALUE('service_id', storage.getItem('service_id'));
  });
 }
ON('add-photo', 'meter_photos', function(event){
  // console.log(event.value.id);
  meter(event.value.id,2);
});

ON('load-record', function(event) {
   if($meter_photos) meter($meter_photos[0].photo_id,1);
});


function meter(photo_id,l){
    options = {
    url:ISMOBILE() ?'https://dev.sequelgroup.io/fulcrum/meter_manufact.php':'https://cors-anywhere.herokuapp.com/https://dev.sequelgroup.io/fulcrum/meter_manufact.php'
    , method: 'POST'
     ,headers: {
      'Content-Type': 'application/json'
    },json: {
      	"token":"81f9a700a0571946a038012acf1bbf23b6ad341eaf01eb32e5cee644c56171",
        "type": "AMR",
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
          if(l==1 && $smart_meter_manufacturer!=data['meter'] && $smart_meter_manufacturer)
          	ALERT('Meter Manufacturer is incorrect');
                
          SETVALUE('smart_meter_manufacturer', data['meter']);
          if(data['meter_number']!==false) SETVALUE('smart_meter_number', data['meter_number']);
        }
    }
  });
}