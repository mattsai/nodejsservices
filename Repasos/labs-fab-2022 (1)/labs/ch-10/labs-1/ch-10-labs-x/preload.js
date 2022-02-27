
    const fs = require('fs')
    const net = require('net')
    const proto = net.Socket.prototype
    net.Socket.prototype = Object.create(proto, {
        remoteFamily: { get() {
          const ip = fs.readFileSync('./ch-10-labs-x/ip', {encoding: 'utf8'})
          if (ip) return 'IPV4'
          return Object.getOwnPropertyDescriptors(proto).remoteFamily.get.call(this)
        }},
        remoteAddress: { get() {
          const ip = fs.readFileSync('./ch-10-labs-x/ip', {encoding: 'utf8'})
          if (ip) return ip
          return Object.getOwnPropertyDescriptors(proto).remoteAddress.get.call(this)
        }}
      }
    )
  