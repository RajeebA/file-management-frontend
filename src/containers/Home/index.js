import { Row, Col, Table, Menu, Button, Space, Upload, message } from "antd";
import Layout, { Header } from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import {
  LogoutOutlined,
  DownloadOutlined,
  InboxOutlined
} from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";

import { getAllFilesAPI, uploadFileAPI } from "../../utils/api";
import dateFormat from "../../utils/dateFormat";
import logout from "../../utils/logout";
import { getUser } from "../../utils/getUser";

const Home = () => {
  const { Dragger } = Upload;

  const [columns, setColumns] = useState([
    {
      title: "Name",
      dataIndex: "filename",
      sorter: (a, b) => a.filename.length - b.filename.length,
      sortDirections: ["descend"]
    },
    {
      title: "uploaded At",
      dataIndex: "createdAt",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.createdAt - b.createdAt
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            shape="circle"
            icon={<DownloadOutlined />}
            size="large"
            onClick={() => {
              onDownload(record);
            }}
          />
        </Space>
      )
    }
  ]);

  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onDownload = (e) => {
    let element = document.createElement("a");
    element.setAttribute("href", e.location);
    element.setAttribute("download", e.filename);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  const showModal = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  const createTable = (response) => {
    const allFiles = response.data?.rows ?? [];
    setFiles(
      allFiles.map((file) => ({
        ...file,
        createdAt: dateFormat(file.createdAt)
      }))
    );
  };
  const fetchData = async () => {
    let response = await getAllFilesAPI();
    setLoading(false);
    createTable(response);
  };
  useEffect(() => {
    const user = getUser();
    if (user && user.role === "admin") {
      setColumns([
        ...columns,
        {
          title: "User",
          dataIndex: ["userDetails", "name"],
          sorter: (a, b) =>
            a.userDetails.name.length - b.userDetails.name.length,
          sortDirections: ["descend"]
        }
      ]);
    }
    fetchData();
  }, []);

  const uploadImage = async (options) => {
    const { onSuccess, onError, file } = options;

    const fmData = new FormData();
    fmData.append("file", file);
    await uploadFileAPI(fmData).catch(onError);
    onSuccess("Ok");
    fetchData();
  };
  const props = {
    name: "file",
    multiple: false,
    customRequest: uploadImage,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file);
      }

      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">File Manager</Menu.Item>
          <Menu.Item key="2" onClick={showModal}>
            Upload File
          </Menu.Item>
          <Menu.Item key="3" icon={<LogoutOutlined />} onClick={logout}>
            Log Out
          </Menu.Item>
        </Menu>
      </Header>
      <Row justify="center" align="middle">
        <Col span={24}>
          <Table columns={columns} dataSource={files} loading={loading} />
        </Col>
      </Row>
      <Modal
        title="Upload File"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single. Strictly prohibit from uploading company data
            or other band files
          </p>
        </Dragger>
      </Modal>
    </Layout>
  );
};
export default Home;
