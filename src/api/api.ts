import axios from 'axios'
import { Serie } from '@nivo/line'

export type TickerInfoDTO = {
  result: {
    data: {
      json: {
        [key: string]: {
          series: {
            time: number
            value: number
          }[]
          priceChangePercentage: number
          minValue: number
          maxValue: number
        }
      }
    }
  }
}

export const getTickerInfo = async (): Promise<Serie | null> => {
  const inputParams = JSON.stringify({
    json: {
      tokens: ['ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9', 'untrn'],
      chainId: 'neutron-1',
      dateRange: 'D7',
    },
  })
  const endpointInfo = await axios
    .get<TickerInfoDTO>('https://app.astroport.fi/api/trpc/charts.prices', {
      params: {
        input: inputParams,
      },
    })
    .then((res) => res.data.result.data)

  if (!endpointInfo) {
    console.log('Error while fetching ticker info')
    return null
  }
  console.log(endpointInfo)

  //transform endpoint info into nivo data params

  return {
    id: '$ATOM-$NTRN',
    color: 'hsl(174, 70%, 50%)',
    data: endpointInfo.json['ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9'].series.map(
      (data, idx) => ({
        x: data.time,
        y: data.value / endpointInfo.json.untrn.series[idx].value,
      }),
    ),
  }
}
