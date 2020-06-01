 if (ISMOBILE()) {
        var storage = STORAGE();
        ON('load-record', function(event) {
         storage.setItem('service_address', $address);
         storage.setItem('meter_id', RECORDID());
         storage.setItem('service_id', $service[0]['record_id']);
          
        //  console.log(storage.getItem('service_address'));
        });
  }

ON('change','service',function(){
  $obj=JSON.parse(event.data);
  if($obj.event.value[0]) {
    SETVALUE('service_id',$obj.event.value[0]['record_id']) 
      //console.log($obj.event.value[0]['record_id']); 
  }
});

  if (ISROLE('MGD_Reconn Field Technician') && ISMOBILE()  ) {
    SETHIDDEN('communication_info', true);
       };