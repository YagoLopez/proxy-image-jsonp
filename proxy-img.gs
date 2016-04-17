function doGet(e) {

  var response = null;
  var url = decodeURIComponent(e.parameter.url);
  var urlTest = 'http://techslides.com/demos/samples/sample.png';
  
  try {
    response = UrlFetchApp.fetch(url);
  } catch (e) {
    return e.toString();
  }
  
  var type = response.getHeaders()['Content-Type'];
  var b64 = Utilities.base64Encode(response.getContent());
  var data = 'data:'+type+';base64,'+b64;
  
  //var rawdata = response.getContentText();
  //var data = 'angular.callbacks._0( {"image_data": "'+data+'"} )';
  var data = 'jsonpCallback( {"image_data": "'+data+'"} )';
  
  var jsonpData = ContentService.createTextOutput(data).setMimeType(ContentService.MimeType.JAVASCRIPT);
  
  return jsonpData;
  
}
