#include <OneWire.h>
#include <DallasTemperature.h>
#include <WiFi.h>
#include <HTTPClient.h>

// ds18b20 data pin connected to
#define ONE_WIRE_BUS 4

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);
float lastSentTemperature = -1000.0;

// wifi credentials
const char* ssid = "TP-Link_E2B0";
const char* password = "21953750";

// local server url (temp)
const char* serverURL = "http://192.168.0.109:3000/api/temperature";

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);

  sensors.begin();
  Serial.println("DS18B20 Temp Sensor");

  // wifi connection setup
  WiFi.begin(ssid, password);
  Serial.println("Connecting to WiFi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.println("WiFi connected!");
  Serial.println(WiFi.localIP());
}

void loop() {
  // put your main code here, to run repeatedly:
  sensors.requestTemperatures();

  float temperature = sensors.getTempCByIndex(0);

  if (temperature == DEVICE_DISCONNECTED_C) {
    Serial.println("Sensor not detected!");
    delay(2000);
    return;
  }

  Serial.print("Water Temperature: ");
  Serial.print(temperature);
  Serial.println(" °C");
  
  if (WiFi.status() == WL_CONNECTED) {
    if (abs(temperature - lastSentTemperature) >= 0.1) {
      HTTPClient http;

      http.begin(serverURL);
      http.addHeader("Content-Type", "application/json");

      String jsonData = "{\"temperature\":" + String(temperature, 2) + "}";

      int httpResponseCode = http.POST(jsonData);

      Serial.print("HTTP Response Code: ");
      Serial.println(httpResponseCode);

      if (httpResponseCode >= 200 && httpResponseCode < 300) {
        lastSentTemperature = temperature;
      }

      http.end();
    } else {
      Serial.println("Temperature hasn't changed enough. Skipping request.");
    }
  } else {
    Serial.println("WiFi disconnected!");
  }

  delay(5000);
}
