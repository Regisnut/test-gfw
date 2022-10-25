import { Space, Avatar } from "antd";

interface IHeader {
    name: string | null;
    setName: (string) => void;
}
const Header = ({ name, setName }: IHeader) => {
    return (
        <header className="mx-4 my-4">
            <nav
                className="my-4 container  mx-auto"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <h1>GLOBAL FUND WATCH</h1>
                <div className="mx-2">
                    <Space align="center">
                        {name ? (
                            <div>Welcome {name}!</div>
                        ) : (
                            <div>Sign-up to join us!</div>
                        )}
                        {name && (
                            <Avatar
                                size="large"
                                style={{ color: "#2d3d4b", backgroundColor: "#fde3cf" }}
                            >
                                {name?.slice(0, 1).toUpperCase()}
                            </Avatar>
                        )}
                    </Space>
                </div>
            </nav>
        </header>
    );
};

export default Header;
