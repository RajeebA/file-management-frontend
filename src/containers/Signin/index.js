import { Row, Col, Card } from "antd";
import { useState } from "react";
import { useHistory } from "react-router";
import CustomBotton from "../../components/Button";
import TextInput from "../../components/Input";
import { postSignInAPI } from "../../utils/api";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({ email: "", password: "" });
  const history = useHistory();
  const handleResponse = (response) => {
    localStorage.setItem("token", response.data?.tokens?.access?.token);
    localStorage.setItem("user", JSON.stringify(response.data?.user));
    history.push("/");
  };
  const onSubmit = async () => {
    setLoading(true);
    const response = await postSignInAPI(state).catch((error) =>
      console.log(error)
    );
    setLoading(false);
    console.log(response);
    if (response) handleResponse(response);
  };
  const goToSignUp = () => {
    history.push("signup");
  };
  return (
    <Row justify="center" align="middle">
      <Col span={12}>
        <Row justify="center">
          <Col span={20}>
            <Card title="Login" style={{ width: "100%", textAlign: "center" }}>
              <Row justify="center">
                <Col span={20} style={{ marginBottom: "10px" }}>
                  <TextInput
                    placeholder="email"
                    onChange={(e) => {
                      setState({ ...state, email: e.target.value });
                    }}
                  />
                </Col>
                <Col span={20} style={{ marginBottom: "10px" }}>
                  <TextInput
                    placeholder="password"
                    isPassWord={true}
                    onChange={(e) => {
                      setState({ ...state, password: e.target.value });
                    }}
                  />
                </Col>
                <Col span={20}>
                  <CustomBotton
                    type="primary"
                    loading={loading}
                    handleClick={onSubmit}
                    content="Login"
                  />
                </Col>
                <Col span={20}>
                  <CustomBotton
                    type="link"
                    handleClick={goToSignUp}
                    content="Create a account!"
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default SignIn;
