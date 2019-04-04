/* Create a WiFi access point and provide a web server on it. */

#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <WiFiUdp.h>
#include <ESP8266WebServer.h>

#ifndef APSSID
#define APSSID "DAGuest"
#define APPSK  "DataArtEnjoyIT"
#endif

/* Set these to your desired credentials. */
const char *ssid = APSSID; 
const char *password = APPSK;

WiFiUDP Udp;
unsigned int localUdpPort = 4210;  // local port to listen on
char incomingPacket[255];  // buffer for incoming packets
char  replyPacket[] = "Hi there! Got the message :-)";  // a reply string to send back

const int wifiServerPort = 8080;

ESP8266WebServer server(80);
WiFiServer wifiServer(wifiServerPort);

/* Just a little test message.  Go to http://192.168.4.1 in a web browser
   connected to this access point to see it.
*/
void handleRoot() {
  server.send(200, "text/html", "<h1>You are connected</h1>");
}


#include <SoftwareSerial.h>
SoftwareSerial ESPserial(2, 3); // RX | TX
 
void setup() 
{


  delay(1000);
    Serial.begin(115200);     // communication with the host computer
    Serial.println("Serial begin on 115200");
    //while (!Serial)   { ; }
 
    // Start the software serial for communication with the ESP8266
    ESPserial.begin(9600);  
 
  
//  Serial.begin(115200);
  Serial.println();
  Serial.print("Configuring access point...");
  /* You can remove the password parameter if you want the AP to be open. */
//  WiFi.softAP(ssid);
   WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print("Connecting...");
  }
   Serial.print("Connected to WiFi. IP:");
   Serial.println(WiFi.localIP());

//  IPAddress myIP = WiFi.softAPIP();
//  Serial.print("AP IP address: ");
//  Serial.println(myIP);
  server.on("/", handleRoot);
  server.begin();

  Serial.printf("Device IP: %s",WiFi.localIP().toString().c_str());
  Serial.println();
  Serial.println("HTTP server started on port: 80");

  wifiServer.begin();
  Serial.printf("Wifi server started on port: %d", wifiServerPort);
  Serial.println();
 

  Udp.begin(localUdpPort);
  Serial.printf("UDP Now listening, UDP port: %d\n", localUdpPort);

  
}

void loop() {
//  server.handleClient();

//   int packetSize = Udp.parsePacket();
//  if (packetSize)
//  {
//    // receive incoming UDP packets
//    Serial.printf("Received %d bytes from %s, port %d\n", packetSize, Udp.remoteIP().toString().c_str(), Udp.remotePort());
//    int len = Udp.read(incomingPacket, 255);
//    if (len > 0)
//    {
//      incomingPacket[len] = 0;
//    }
//    Serial.printf("UDP packet contents: %s\n", incomingPacket);
//
//    // send back a reply, to the IP address and port we got the packet from
//    Udp.beginPacket(Udp.remoteIP(), Udp.remotePort());
//    Udp.write(replyPacket);
//    Udp.endPacket();
//  }

  WiFiClient client = wifiServer.available();
 
  if (client) {
 
    while (client.connected()) {
 
      while (client.available()>0) {
        char c = client.read();
        Serial.write(c);
      }
 
      delay(10);
    }
 
    client.stop();
    Serial.println("Client disconnected");
 
  }
  
//    // listen for communication from the ESP8266 and then write it to the serial monitor
//    if ( ESPserial.available() )   {  Serial.write( ESPserial.read() );  }
// 
//    // listen for user input and send it to the ESP8266
//    if ( Serial.available() )       {  ESPserial.write( Serial.read() );  }
}
