from netmiko import ConnectHandler
import re

def telnetDevice(ip, port):
    dataDevice = {}

    try:
        device = ConnectHandler(device_type='cisco_ios_telnet', ip=ip, port=port, secret='guest123')

        device.enable()

        output = device.send_command('show version') 
        regex_hostname = re.compile(r'(\S+)\suptime')
        hostname = regex_hostname.findall(output)
        dataDevice["hostname"] = hostname[0]

        regex_version = re.compile(r'Cisco\sIOS\sSoftware.+Version\s([^,]+)')
        version = regex_version.findall(output)

        output = device.send_command('show interface desc')
        regex_interface = re.compile(r'\S+\s+(?:up|down)\s+(?:up|down)\s+.+')
        output = regex_interface.findall(output)
        output = output[0].split('\n')
        dataDevice["version"] = version[0]

        for (index) in range(len(output)) :
            objectInterface = {}
            tempInterface = ' '.join(output[index].split())
            tempInterface = tempInterface.split(' ')
            objectInterface["interface"] = tempInterface[0]
            objectInterface["status"] = tempInterface[1]
            objectInterface["protocol"] = tempInterface[2]
            if(len(output) > 2):
                objectInterface["description"] = tempInterface[3]
            else :
                objectInterface["description"] = ''
            output[index] = objectInterface

        dataDevice["interface"] = output

        return dataDevice

        device.disconnect()
    except: 
        raise ValueError("problem fetch data from device, check ip or port")