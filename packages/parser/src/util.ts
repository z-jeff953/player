export function getXmlNodeValue(xmlDoc: any, elementName: string, defaultValue: string) {
  var element = xmlDoc.getElementsByTagName(elementName)[0];
  var elementText = element ? element.childNodes[0] : null;

  return elementText ? elementText.nodeValue : defaultValue;
}


export function fromISOToSeconds(isoString: string) {
  // "PT0H0M29.367S";
  var seconds = 0;
  var tempString = isoString.substring(2); // Remove PT
  var tempIndex = tempString.indexOf("H");

  if (tempIndex > -1) {
    seconds += Number(tempString.substring(0, tempIndex)) * 60 * 60;
    tempString = tempString.substring(tempIndex + 1);
  }

  tempIndex = tempString.indexOf("M");
  if (tempIndex > -1) {
    seconds += Number(tempString.substring(0, tempIndex)) * 60;
    tempString = tempString.substring(tempIndex + 1);
  }

  tempIndex = tempString.indexOf("S");
  if (tempIndex > -1) {
    seconds += Number(tempString.substring(0, tempIndex));
  }

  return seconds;
}

