//中文
export default {
  skin:"蓝色",
  logout: "退出登录",
  chinese:'中文',
  english:'英文',
  apply:"发送请求",
  default:"默认",
  search:"搜索",
  reset:"重置",

  network:"网络设置",
  networkDes:"TCP/IP等端口设置，串口设置和CAN通讯设置",
  networkIndex:{
    tcpip:"TCP/IP设置",
    tcpipIndex:{
      hostName:"主机名",
      arp:"ARP/Ping",
      nic:"网卡",
      wired:"有线网卡(默认)",
      mode:"模式",
      static:"静态模式",
      dhcp:"DHCP",
      mac:"MAC地址",
      ipVersion:'IP版本',
      ip:"IP地址",
      subnetMask:"子网掩码",
      defaultGateway:"默认网关",
      preferredDns:"首选DNS",
      alternateDns:"备用DNS",
    },

    port:"端口设置",
    portIndex:{
      maxConnection:"最大连接数",
      tcpPort:"TCP端口",
      udpPort:"UDP端口",
      httpPort:"HTTP端口",
      rtspPort:"RTSP端口",
      rtmpPort:"RTMP端口",
      httpsPort:"HTTPS端口",
    },

    basicService:"基础服务",
    basicServiceIndex:{
      ssh:"SSH",
      search:"组播/广播搜索",
      cgi:"CGI",//通用计算机接口
      onvif:"ONVIF",//开放式网络视频接口论坛
      mobilePushNotifications:"移动推送通知",
      privateProtocolAuthenticationMode:"专用协议身份验证模式",
      securityMode:"安全模式(推荐)",
      compatibleMode:"兼容模式",
      onlineLogBackup:"在线日志备份"
    },

    serialPort:"串口设置",
    serialPortIndex:{
      serialPortNumber:"串口编号",
      baud:"波特率",
      checkBit:"校验位",
      dataBit:"数据位",
      stopBit:"停止位"
    },

    can:'CAN通讯设置',
    canIndex:{
      channelName:"通道名称",
      protocol:"协议",
      workingMode:"工作模式",
      baud:"波特率",
    }
  },

  myEvent:"事件",
  myEventDes:"事件与警报",
  myEventIndex: {
    alarm:"警报信息"
  },

  log:"日志记录",
  logDes:"日志与远程日志",
  logIndex:{
    //Log边栏中的内容
    searchDate:"搜索时间",
    selectDate:"选择时间",
    type:"日志类型",
    time:"时间",
    username:"操作人",
    //边栏
    remoteLog:"远程日志"
  },

  system:"系统设置",
  systemDes:"常规设置与账户信息",
  systemIndex:{
    general:"常规设置",
    account:"账户设置"
  },

  chart:"图表",
  chartDes:"图表与表格",
  chartIndex:{
    line:"折线图",
    lineIndex:{
      difference:"差值:"
    }
  },

  config:"配置",
  storage:"存储",
  record:"记录",
  account:"账户",
  security:"安全",
  all:"所有类型"


}

