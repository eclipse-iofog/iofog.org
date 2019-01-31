# GPIO abstaction
GPIO abstraction is intended to easy the use of GPIO on any language. 

As a part of HAL REST server it listens on port 54331 under 'gpio' path. 
 
> ##### Prerequisites:
> as Docker container, it needs to be run with next options to grant access: 
> <pre> --net=host --privileged </pre>
> in other cases it needs to start under root user
 
## GPIO for RaspberryPi
This API will only work for RaspberryPi
#### Set BCM mode (GET)
Sets GPIO numbering to BCM mode 
<pre> curl http://localhost:54331/hal/gpio/rpi/setmode/bcm </pre>
Response example
<pre> 
{
    "GPIO mode set successfully" /     
    "GPIO is already in mode BCM/BOARD"/
    "Error message"
} 
</pre>
#### Set BOARD mode (GET)
Sets GPIO numbering to BOARD mode 
<pre> curl http://localhost:54331/hal/gpio/rpi/setmode/board </pre>
Response example
<pre> 
{
    "GPIO mode set successfully" / 
    "GPIO is already in mode BCM/BOARD"/
    "Error message"
} 
</pre>
#### Clean-up GPIO channels (POST)
Cleans up GPIO channels
<pre> curl -d '{}' http://localhost:54331/hal/gpio/rpi/cleanup </pre>
POST JSON example
<pre> 
    [] - to clean-up all channels / 
    [17, 5, 4] - list of channels to clean up
</pre>
Response example
<pre> 
{
    "clean up success" / 
    "Error message" 
}
</pre>
#### Set up GPIO channels (POST)
Set up a list of GPIO channels (number and type properties are mandatory)
<pre>  
curl -d '[
      {
      "number": 1,
      "type": "out",
      "initial_value": "low"
  },
  {
      "number": 2,
      "type": "in",
      "pull_up_down": "down"
  },
  {
      "number": 3,
      "type": "out",
      "initial_value": "low"
  },
  {
      "number": 4,
      "type": "out"
  }
]' http://localhost:54331/hal/gpio/rpi/setup </pre>

Response example
<pre> 
{
    "successfully set up all pins" / 
    "Error message" 
}
</pre>

#### Set values to GPIO channels (POST)
Set values to GPIO channels

<pre> 
curl -d '[
  {
      "number": 1,
      "value": "high"
  },
  {
      "number": 3,
      "value": "low"
  }
]' http://localhost:54331/hal/gpio/rpi/setv
</pre>

Response example
<pre> 
{
    "1": "ok",
    "3": "ok"
} /
{ "Error message" }
</pre>

</pre>
#### Set values to HIGH/LOW to GPIO channels (POST)
Set values to HIGH/LOW to GPIO channels
<pre> curl -d '[1,3]' http://localhost:54331/hal/gpio/rpi/setv/high </pre>
<pre> curl -d '[1,3]' http://localhost:54331/hal/gpio/rpi/setv/low </pre>
POST JSON example
<pre> 
    [17, 5, 4] - list of channels to set up HIGH/LOW
</pre>
Response example
<pre> 
{
    "1": "ok",
    "3": "ok"
} /
{ "Error message" }
</pre>
#### Get values of GPIO channels (POST)
Get values of GPIO channels
<pre> curl -d '[1,3]' http://localhost:54331/hal/gpio/rpi/getv </pre>
POST JSON example
<pre> 
    [17, 5, 4] - list of channels to read value from
</pre>
Response example
<pre> 
{
    "1": 0,
    "3": 1
} /
{ "Error message" }
</pre>

