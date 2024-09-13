#define RLOAD 22.0
#include <SoftwareSerial.h>
SoftwareSerial HC05(2,3);
#include "MQ135.h"
#include <SPI.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels
// Declaration for SSD1306 display connected using software SPI (default case):
#define OLED_MOSI 9
#define OLED_CLK 10
#define OLED_DC 11
#define OLED_CS 12
#define OLED_RESET 13
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT,
 OLED_MOSI, OLED_CLK, OLED_DC, OLED_RESET, OLED_CS);
MQ135 gasSensor = MQ135(A0);
int val;
int sensorPin = A0;
int sensorValue = 0;
void setup() {
 Serial.begin(9600);
 pinMode(sensorPin, INPUT);
 display.begin(SSD1306_SWITCHCAPVCC);
 display.clearDisplay();
 display.display();
Serial.println("Enter AT commands:");
HC05.begin(38400);
}
void loop() {
  if (HC05.available())
 Serial.write(HC05.read());
 if (Serial.available())
 HC05.write(Serial.read());
 val = analogRead(A0);
 Serial.print ("raw = ");
 Serial.println (val);
// float zero = gasSensor.getRZero();
// Serial.print ("rzero: ");
 //Serial.println (zero);
 float ppm = gasSensor.getPPM();
 Serial.print ("ppm: ");
 Serial.println (ppm);
 display.setTextSize(2);
 display.setTextColor(WHITE);
 display.setCursor(18,43);
 display.println("CO2");
 display.setCursor(63,43);
 display.println("(PPM)");
 display.setTextSize(2);
 display.setCursor(28,5);
 display.println(ppm);
 display.display();
 display.clearDisplay();
 delay(2000);
}
