import { StatsBarNode } from './StatsBar.types'
import { NodeHeader, NodeText, StatsBarNodeWrapper, StatsBarWrapper } from './StatsBar.styled'

export const StatsBar = ({ statsNodes }: { statsNodes: StatsBarNode[] }) => {
  return (
    <StatsBarWrapper>
      {statsNodes.map((node) => (
        <StatsBarNodeWrapper key={node.title}>
          <NodeHeader>{node.title}</NodeHeader>
          <NodeText>{node.value}</NodeText>
        </StatsBarNodeWrapper>
      ))}
    </StatsBarWrapper>
  )
}
