ON('add-photo', 'meter_photo', function(event){
  meter(event.value.id,2);
});

ON('load-record', function(event) {
   if($meter_photo) meter($meter_photo[0].photo_id,1);
});

function meter(photo_id,l){
    options = {
    url://'https://webhook.site/1789be0c-7ca8-450c-ad58-0d2f297b79de'
   ISMOBILE() ?'https://dev.sequelgroup.io/fulcrum/meter_manufact.php':'https://cors-anywhere.herokuapp.com/https://dev.sequelgroup.io/fulcrum/meter_manufact.php'
    , method: 'POST'
     ,headers: {
      'Content-Type': 'application/json'
    },json: {
      	"token":"81f9a700a0571946a038012acf1bbf23b6ad341eaf01eb32e5cee644c56171",
        "type": "NYC",
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
          if(l==1 && $meter_manufacturer!=data['meter'] && $meter_manufacturer)
          	ALERT('Meter Manufacturer is incorrect');
                
          SETVALUE('meter_manufacturer', data['meter']);
          if(!$meter_number) SETVALUE('meter_number', data['meter_number']);
        }
    }
  });
}
