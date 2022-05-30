import React, { useState, useEffect } from "react";
import { Breadcrumb, List, Card } from "antd";
import { Link, useParams } from "react-router-dom";
import getFolders from "./getFolders";
import { FolderOutlined } from "@ant-design/icons";
import getFolderData from "./utils/getFolderData";
import generateBreadcrumb from "./utils/generateBreadcrumb";

const FolderPage = () => {
  const [state, setState] = useState({});
  const [breadCrumb, setBreadCrumb] = useState([]);
  const [loading, setLoading] = useState(false);
  const param = useParams();

  useEffect(() => {
    setState({});
    setLoading(true);

    getFolders().then((data) => {
      const id = param.id || 0;
      setState(getFolderData(Number(id), data));
      setBreadCrumb(generateBreadcrumb(Number(id), data));
      setLoading(false);
    });
  }, [param.id]);

  const data = state.children;
  return (
    <div>
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>

          {breadCrumb.map((e) => (
            <Breadcrumb.Item key={e.id}>
              <Link to={String(e.id)}>{e.name}</Link>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div>
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <Card>
                  <Link to={`${item.id}`}>
                    <FolderOutlined />
                    {item.name}
                  </Link>
                </Card>
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default FolderPage;
