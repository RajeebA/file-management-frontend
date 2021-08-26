import { Input, Space } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
const TextInput = ({
  direction = "vertical",
  placeholder = "",
  isPassWord = false,
  onChange = () => {}
}) => {
  return (
    <Space direction={direction} style={{ width: "100%" }}>
      {isPassWord ? (
        <Input.Password
          placeholder={placeholder}
          onChange={onChange}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      ) : (
        <Input onChange={onChange} placeholder={placeholder} />
      )}
    </Space>
  );
};
export default TextInput;
