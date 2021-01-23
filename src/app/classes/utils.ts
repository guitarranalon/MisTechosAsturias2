export class Utils {
    static readonly totalTechos = 78;

    static readonly si = 'Sí';
    static readonly no = 'No';

    static readonly storeName = 'techos';

    static readonly alertStandardTimeout = 5000;

    static readonly getCurrentPositionTimeout = 20000;

    // https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
    // This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
    static calcDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number =>
    {
      var R = 6371; // km
      var dLat = Utils.toRad(lat2-lat1);
      var dLon = Utils.toRad(lon2-lon1);
      var lat1 = Utils.toRad(lat1);
      var lat2 = Utils.toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

    // Converts numeric degrees to radians
    static toRad = (degrees: number): number =>
    {
        return degrees * Math.PI / 180;
    }

    // ¿ES un móvil de iOS?
    static isIos = (): boolean => {
      // If it's an iPhone..
      if( (navigator.platform.indexOf("iPhone") != -1) 
          || (navigator.platform.indexOf("iPod") != -1)
          || (navigator.platform.indexOf("iPad") != -1))
           return true

      return false;
  }

  // ¿Es un móvil Android?
  static isAndroid = (): boolean => {
    if (navigator.userAgent.toLowerCase().indexOf('android') > -1) return true;

    return false;
  }

  static isMobile = (): boolean => {
    return Utils.isIos() || Utils.isAndroid();
  }
}
