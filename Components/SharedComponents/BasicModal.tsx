import { Modal, Space } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";

interface IModal {
    title: string;
    isModalOpen: boolean;
    handleOk?: () => void;
    handleCancel?: () => void;
    content: string;
}
const BasicModal = ({ title, isModalOpen, handleOk, handleCancel, content }: IModal) => {
    return (
        <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Space align="center">
                <CheckCircleTwoTone style={{ fontSize: 48 }} twoToneColor="#52c41a" />
                <div>{content}</div>
            </Space>
        </Modal>
    );
};

export default BasicModal;
