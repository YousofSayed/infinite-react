
/**
 * 
 * @param {import('grapesjs').Editor} editor 
 * @returns 
 */
export const addDevices = (editor) => {
    const deviceManager = editor.DeviceManager;
  const mobileDevice = deviceManager.add({
    name:'mobile',
    width:'360px',
    id:'mobile',
    widthMedia:'360px'
  });

  const tabletDevice = deviceManager.add({
    name:'tablet',
    id:'tablet',
    width:'900px',
    widthMedia:'900px'
  })
  editor.DeviceManager.devices.add(...[mobileDevice , tabletDevice]);
}


