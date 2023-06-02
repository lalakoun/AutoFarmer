let brightness = 0
let moisture = 0
makerbit.connectLcd(39)
makerbit.setLcdBacklight(LcdBacklight.Off)
serial.redirectToUSB()
led.enable(false)
serial.writeString("Moisture,Brightness")
serial.writeLine("")
basic.forever(function () {
    makerbit.clearLcd1602()
    makerbit.setLcdBacklight(LcdBacklight.On)
    moisture = pins.analogReadPin(AnalogPin.P1)
    brightness = pins.analogReadPin(AnalogPin.P4)
    makerbit.showStringOnLcd1602("moisture:", makerbit.position1602(LcdPosition1602.Pos1), 10, TextOption.AlignLeft)
    makerbit.showStringOnLcd1602("" + (moisture), makerbit.position1602(LcdPosition1602.Pos11), 5, TextOption.AlignLeft)
    makerbit.showStringOnLcd1602("brightness:", makerbit.position1602(LcdPosition1602.Pos17), 12, TextOption.AlignLeft)
    makerbit.showStringOnLcd1602("" + (brightness), makerbit.position1602(LcdPosition1602.Pos29), 5, TextOption.AlignLeft)
    if (brightness <= 20) {
        pins.digitalWritePin(DigitalPin.P12, 1)
    } else {
        pins.digitalWritePin(DigitalPin.P12, 0)
    }
    if (moisture <= 250) {
        pins.digitalWritePin(DigitalPin.P16, 1)
        basic.pause(2000)
    } else {
        pins.digitalWritePin(DigitalPin.P16, 0)
        basic.pause(2000)
    }
    if (input.buttonIsPressed(Button.A)) {
        pins.digitalWritePin(DigitalPin.P16, 1)
        basic.pause(2000)
    } else {
        pins.digitalWritePin(DigitalPin.P16, 0)
        basic.pause(2000)
    }
    if (input.buttonIsPressed(Button.B)) {
        pins.digitalWritePin(DigitalPin.P12, 1)
        basic.pause(2000)
    } else {
        pins.digitalWritePin(DigitalPin.P12, 0)
        basic.pause(2000)
    }
})
loops.everyInterval(3600000, function () {
    serial.writeNumbers([moisture, brightness])
    serial.writeLine("")
})
