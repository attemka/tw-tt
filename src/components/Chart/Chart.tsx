import { ResponsiveLine, Serie } from '@nivo/line'
import { format } from 'date-fns'
import { TickerNaming, TooltipWrapper } from './chart.styled'
export const Chart = ({ data }: { data: Serie[] }) => {
  const valuesToShow = data.length && data[0].data.map((v, i) => (i % 2 === 0 ? '' : v.x))

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 10,
          format: (value) =>
            valuesToShow && valuesToShow.find((vts) => vts === value) ? format(value * 1000, 'HH:mm') : '',
          tickRotation: 0,
          legend: 'Time',
          legendOffset: 36,
          legendPosition: 'middle',
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: `Price (${data[0].id})`,
          legendOffset: -40,
          legendPosition: 'middle',
          truncateTickAt: 0,
        }}
        tooltip={(input) => {
          return (
            <TooltipWrapper>
              <div>
                <TickerNaming>X:</TickerNaming> {format(Number(input.point.data.x) * 1000, 'dd.MM HH:mm')}
              </div>
              <div>
                <TickerNaming>Y:</TickerNaming> {Number(input.point.data.y).toFixed(6)}{' '}
              </div>
            </TooltipWrapper>
          )
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: -30,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  )
}
