import { IconSvgProps } from "@/types";

export const VerticalDotsIcon = (props: IconSvgProps) => (
  <svg height="1em" viewBox="0 0 24 24" width="1em" {...props}>
    <circle cx="12" cy="5" fill="currentColor" r="2" />
    <circle cx="12" cy="12" fill="currentColor" r="2" />
    <circle cx="12" cy="19" fill="currentColor" r="2" />
  </svg>
);