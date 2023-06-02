brightness = 0
moisture = 0
makerbit.connect_lcd(39)
makerbit.set_lcd_backlight(LcdBacklight.OFF)
serial.redirect_to_usb()
led.enable(False)
serial.write_string("Moisture,Brightness")
serial.write_line("")

def on_forever():
    global moisture, brightness
    makerbit.clear_lcd1602()
    makerbit.set_lcd_backlight(LcdBacklight.ON)
    moisture = pins.analog_read_pin(AnalogPin.P1)
    brightness = pins.analog_read_pin(AnalogPin.P4)
    makerbit.show_string_on_lcd1602("moisture:",
        makerbit.position1602(LcdPosition1602.POS1),
        10,
        TextOption.ALIGN_LEFT)
    makerbit.show_string_on_lcd1602("" + str(moisture),
        makerbit.position1602(LcdPosition1602.POS11),
        5,
        TextOption.ALIGN_LEFT)
    makerbit.show_string_on_lcd1602("brightness:",
        makerbit.position1602(LcdPosition1602.POS17),
        12,
        TextOption.ALIGN_LEFT)
    makerbit.show_string_on_lcd1602("" + str(brightness),
        makerbit.position1602(LcdPosition1602.POS29),
        5,
        TextOption.ALIGN_LEFT)
    if brightness <= 20:
        pins.digital_write_pin(DigitalPin.P12, 1)
    else:
        pins.digital_write_pin(DigitalPin.P12, 0)
    if moisture <= 250:
        pins.digital_write_pin(DigitalPin.P16, 1)
        basic.pause(2000)
    else:
        pins.digital_write_pin(DigitalPin.P16, 0)
        basic.pause(2000)
    if input.button_is_pressed(Button.A):
        pins.digital_write_pin(DigitalPin.P16, 1)
        basic.pause(2000)
    else:
        pins.digital_write_pin(DigitalPin.P16, 0)
        basic.pause(2000)
    if input.button_is_pressed(Button.B):
        pins.digital_write_pin(DigitalPin.P12, 1)
        basic.pause(2000)
    else:
        pins.digital_write_pin(DigitalPin.P12, 0)
        basic.pause(2000)
basic.forever(on_forever)

def on_every_interval():
    serial.write_numbers([moisture, brightness])
    serial.write_line("")
loops.every_interval(3600000, on_every_interval)