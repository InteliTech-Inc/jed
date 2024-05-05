import { RotatingLines } from "react-loader-spinner";

type Props = {};

export default function Rotating_Lines({}: Props) {
  return (
    <span className="mr-1">
      <RotatingLines width="20" strokeColor="#fff" />
    </span>
  );
}
