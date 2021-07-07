import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header: AntdHeader } = Layout;

export const Header = () => {
  const menu = [{ label: "Home", link: "/" }];

  return (
    <AntdHeader>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
        {menu.map((_, index) => {
          const key = index + 1;
          return (
            <Menu.Item key={key}>
              <Link to={_.link}>{_.label}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </AntdHeader>
  );
};
