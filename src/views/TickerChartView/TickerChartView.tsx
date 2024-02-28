import React, { useEffect, useState } from 'react'
import { Serie } from '@nivo/line'
import { TickerStats } from './TickerChartView.types'
import { getTickerInfo } from '../../api/api'
import { Chart } from '../../components/Chart/Chart'
import { StatsBar } from '../../components/StatsBar/StatsBar'

export const TickerChartView = () => {
  const [data, setData] = useState<Serie[]>([])
  const [tickerStats, setTickerStats] = useState<TickerStats | null>(null)
  useEffect(() => {
    const setTickerInfo = async () => {
      const tickerData = await getTickerInfo()
      if (!tickerData) return
      const priceArray = tickerData.data
        .map((point) => point.y)
        .filter((value) => !!value)
        .map((value) => Number(value))
      const max = Math.max(...priceArray).toFixed(6)
      const min = Math.min(...priceArray).toFixed(6)
      const avg = (priceArray.reduce((prev, curr) => prev + curr) / priceArray.length).toFixed(6)
      setData([tickerData])
      setTickerStats({ max, min, avg })
    }
    setTickerInfo()
  }, [])

  return (
    <>
      <Chart data={data} />
      {tickerStats ? (
        <StatsBar
          statsNodes={[
            { title: '7D Max', value: tickerStats.max },
            { title: '7D Min', value: tickerStats.min },
            { title: '7D Avg', value: tickerStats.avg },
          ]}
        />
      ) : (
        <div>Loading</div>
      )}
    </>
  )
}
