 if (ISMOBILE()) {
        var storage = STORAGE();
        ON('load-record', function(event) {
         storage.setItem('service_address', $address);
        //  console.log(storage.getItem('service_address'));
        });
  }