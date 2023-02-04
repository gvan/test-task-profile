import * as React from "react"
import Svg, { SvgProps, Rect, Path } from "react-native-svg"

const EyeOpen = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Rect width={24} height={24} rx={12} fill="#F3F3F3" />
    <Path
      d="M9.96 12a1.969 1.969 0 1 0 3.939 0 1.969 1.969 0 0 0-3.938 0Zm9.602-.454C17.896 8.037 15.377 6.27 12 6.27c-3.379 0-5.896 1.766-7.562 5.278a1.06 1.06 0 0 0 0 .905C6.104 15.963 8.623 17.73 12 17.73c3.379 0 5.896-1.766 7.562-5.278a1.06 1.06 0 0 0 0-.905Zm-7.632 3.548a3.094 3.094 0 1 1 0-6.188 3.094 3.094 0 0 1 0 6.188Z"
      fill="#5E6272"
    />
  </Svg>
)

export default EyeOpen
