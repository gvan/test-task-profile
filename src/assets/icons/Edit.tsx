import * as React from "react"
import Svg, { SvgProps, Rect, Path } from "react-native-svg"

const Edit = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Rect width={24} height={24} rx={12} fill="#F3F3F3" />
    <Path
      d="M17.25 18H6.75a.75.75 0 1 0 0 1.5h10.5a.75.75 0 1 0 0-1.5Zm-10.5-1.5h.067l3.128-.285a1.5 1.5 0 0 0 .907-.428l6.75-6.75a1.44 1.44 0 0 0-.052-2.032L15.495 4.95a1.5 1.5 0 0 0-1.995-.053l-6.75 6.75a1.5 1.5 0 0 0-.428.908L6 15.682a.75.75 0 0 0 .75.818ZM14.453 6 16.5 8.047 15 9.51 12.99 7.5 14.453 6Z"
      fill="#5E6272"
    />
  </Svg>
)

export default Edit