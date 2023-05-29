//英文
export default {
  skin:"Blue",
  logout: "Logout",
  chinese:'Chinese',
  english:'English',
  apply:"Apply",
  default:"Default",
  search:"Search",
  reset:"Reset",

  network:"Network",
  networkDes:"TCP/IP port basicService serialPort and CAN setting",
  networkIndex:{
    tcpip:"TCP/IP",
    tcpipIndex:{
      hostName:"HostName",
      arp:"ARP/Ping",
      nic:"NIC",
      wired:"Wired(Default)",
      mode:"Mode",
      static:"Static",
      dhcp:"DHCP",
      mac:"MAC Address",
      ipVersion:'IP Version',
      ip:"IP Address",
      subnetMask:"SubnetMask",
      defaultGateway:"Default Gateway",
      preferredDns:"Preferred DNS",
      alternateDns:"alternate Dns",
    },

    port:"Port",
    portIndex:{
      maxConnection:"Max Connection",
      tcpPort:"TCP Port",
      udpPort:"UDP Port",
      httpPort:"HTTP Port",
      rtspPort:"RTSP Port",
      rtmpPort:"RTMP Port",
      httpsPort:"HTTPS Port",

    },

    basicService:"basicService",
    basicServiceIndex:{
      ssh:"SSH",
      search:"Multicast/Broadcast Search",
      cgi:"CGI",
      onvif:"ONVIF",
      mobilePushNotifications:"Mobile Push Notifications",
      privateProtocolAuthenticationMode:"Private Protocol Authentication Mode",
      securityMode:"Security Mode (Recommended)",
      compatibleMode:"Compatible Mode",
      onlineLogBackup:"Online Log Backup"
    },

    serialPort:"serialPort",
    serialPortIndex:{
      serialPortNumber:"Serial Port Number",
      baud:"BAUD",
      checkBit:"Check Bit",
      dataBit:"Data Bit",
      stopBit:"Stop Bit"
    },

    can:'CAN',
    canIndex:{
      channelName:"Channel Name",
      protocol:"Protocol",
      workingMode:"Working Mode",
      baud:"BAUD",
    }
  },

  myEvent:"Event",
  myEventDes:"Events and alarm",
  myEventIndex: {
    alarm:"Alarm"
  },

  log:"Log",
  logDes:"Log and remote log",
  logIndex:{
    //Log边栏中的内容
    searchDate:"Search Date",
    selectDate:"Select Date",
    type:"Type:",
    time:"Time",
    username:"Username",
    //边栏
    remoteLog:"Remote Log"
  },

  system:"System",
  systemDes:"General setting and Account information",
  systemIndex:{
    general:"General",
    account:"Account"
  },

  chart:"Chart",
  chartDes:"Charts and tables",
  chartIndex:{
    line:"Line",
    lineIndex:{
      difference:"D-value:"
    }
  },

  //可拓展备用
  config:"Config",
  storage:"Storage",
  record:"Record",
  account:"Account",
  security:"Security",
  all:"ALL"

}
