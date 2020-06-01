if (ISMOBILE()) {
  // initialize storage variable
var storage = STORAGE();

// this should populate the service address for the meter that this inspection is for.
// only when creating a new record.  i.e. when a field user is creating the new inspection record.
ON('new-record', function(event) {
	SETVALUE('service_address', storage.getItem('service_address'));
  });
  
}