interface IconProps {
  height?: number;
  width?: number;
  color?: string;
}

const EnvelopeIcon: React.FC<IconProps> = ({ color = '#727C8D', height = 20, width = 20 }: IconProps) => {
  return (
    <svg width={width} height={height} viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.5 0.855225H15.5M0.5 0.855225V11.4802C0.5 11.646 0.565848 11.805 0.683058 11.9222C0.800269 12.0394 0.95924 12.1052 1.125 12.1052H14.875C15.0408 12.1052 15.1997 12.0394 15.3169 11.9222C15.4342 11.805 15.5 11.646 15.5 11.4802V0.855225M0.5 0.855225L8 7.73022L15.5 0.855225"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default EnvelopeIcon;
