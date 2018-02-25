let huejay = require('huejay');

huejay.discover({strategy: 'all'})
  .then(bridges => {
      var ip;
    for (let bridge of bridges) {
      console.log(`Id: ${bridge.id}, IP: ${bridge.ip}`);
      ip = bridge.ip;
    }
    let client = new huejay.Client({
        host:     ip,
        // port:     80,               // Optional
        username: '5OnfNdyaHCAWjp6fv9LY5Fn6Hi2MoDk8o0gZHyYu', // Optional
        timeout:  15000,            // Optional, timeout in milliseconds (15000 is the default)
      });
      client.bridge.ping()
  .then(() => {
    console.log('Successful connection');
    client.bridge.isAuthenticated()
  .then(() => {
    console.log('Successful authentication');
    client.bridge.get()
  .then(bridge => {
    console.log(`Retrieved bridge ${bridge.name}`);
    console.log('  Id:', bridge.id);
    console.log('  Model Id:', bridge.modelId);
    console.log('  Model Name:', bridge.model.name);
    client.lights.getAll()
  .then(lights => {
    for (let light of lights) {
      console.log(`Light [${light.id}]: ${light.name}`);
      console.log(`  Type:             ${light.type}`);
      console.log(`  Unique ID:        ${light.uniqueId}`);
      console.log(`  Manufacturer:     ${light.manufacturer}`);
      console.log(`  Model Id:         ${light.modelId}`);
      console.log('  Model:');
      console.log(`    Id:             ${light.model.id}`);
      console.log(`    Manufacturer:   ${light.model.manufacturer}`);
      console.log(`    Name:           ${light.model.name}`);
      console.log(`    Type:           ${light.model.type}`);
      console.log(`    Color Gamut:    ${light.model.colorGamut}`);
      console.log(`    Friends of Hue: ${light.model.friendsOfHue}`);
      console.log(`  Software Version: ${light.softwareVersion}`);
      console.log('  State:');
      console.log(`    On:         ${light.on}`);
      console.log(`    Reachable:  ${light.reachable}`);
      console.log(`    Brightness: ${light.brightness}`);
      console.log(`    Color mode: ${light.colorMode}`);
      console.log(`    Hue:        ${light.hue}`);
      console.log(`    Saturation: ${light.saturation}`);
      console.log(`    X/Y:        ${light.xy[0]}, ${light.xy[1]}`);
      console.log(`    Color Temp: ${light.colorTemp}`);
      console.log(`    Alert:      ${light.alert}`);
      console.log(`    Effect:     ${light.effect}`);
      console.log();
    }
    client.lights.getById(1)
  .then(light => {
    light.brightness = 254;
    light.hue        = 32554;
    light.saturation = 254;

    return client.lights.save(light);
  })
  .then(light => {
    console.log(`Updated light [${light.id}]`);
  })
  .catch(error => {
    console.log('Something went wrong');
    console.log(error.stack);
  });
  })
  .catch(error =>{
    console.log('Could not get lights');
  });
  });
  })
  .catch(error => {
    console.log('Could not authenticate');
  });
  })
  .catch(error => {
    console.log('Could not connect');
  });
  })
  .catch(error => {
    console.log(`An error occurred: ${error.message}`);
  });