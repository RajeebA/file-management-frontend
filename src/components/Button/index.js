import { Button } from "antd";

const CustomBotton = (props) => {
  return (
    <Button
      {...props}
      type={props.type}
      loading={props.loading}
      onClick={props.handleClick}
    >
      {props.content}
    </Button>
  );
};
export default CustomBotton;
