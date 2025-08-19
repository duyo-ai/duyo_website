'use client'

import * as ChannelService from '@channel.io/channel-web-sdk-loader'
import { PropsWithChildren, useEffect } from 'react'

const ChannelProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    ChannelService.loadScript()

    ChannelService.boot({
      pluginKey: '16df9617-b1c4-414b-a93c-89d0b1cc99da',
    })
  }, [])

  return <>{children}</>
}

export default ChannelProvider
