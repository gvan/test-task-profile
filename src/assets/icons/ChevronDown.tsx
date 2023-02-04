import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const ChevronDown = (props: SvgProps) => (
  <Svg
    width={12}
    height={7}
    fill="none"
    {...props}
  >
    <Path
      d="m1 1 5 5 5-5"
      stroke="#9795A4"
      strokeWidth={2}
      strokeLinejoin="round"
    />
  </Svg>
)

export default ChevronDown
