import React, { useState } from "react";
import BasicModal from "../SharedComponents/BasicModal";
import axios from "axios";
import { Button, Checkbox, Form, Input } from "antd";
import Cookies from "js-cookie";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

interface IData {
    firstName: string;
    lastName: string;
    email?: string;
    password?: string;
    confirm?: string;
    agreement?: boolean;
}

interface IRegistrar {
    setName: (string) => void;
}

const Registrar = ({ setName }: IRegistrar) => {
    const [form] = Form.useForm();

    const [loading, setLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const onFinish = async (values: IData) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const body = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
        };
        try {
            setLoading(true);
            const { data } = await axios.post("/api/signup", body, config);
            setLoading(false);
            data && setIsModalOpen(true);
            Cookies.set("name", values.firstName, { expires: 7 });
            setName(values.firstName);
        } catch (error) {
            alert(`An error occurred - ${error}`);
        }
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <BasicModal
                title="Global Fund Watch"
                content="Welcome, you have been well signup !"
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
            />

            <section
                style={{
                    padding: "32px",
                    boxShadow: "0 10px 15px -3px gray",
                    border: "1px solid lightGray",
                    borderRadius: "16px",
                }}
                className="my-5 container  mx-auto"
            >
                <h2>Join us, sign-up</h2>
                <br />
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    initialValues={{}}
                    scrollToFirstError
                >
                    <Form.Item
                        name="firstName"
                        label="First Name"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please input your first name (2 characters minimum)!",
                                whitespace: true,
                                min: 2,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        label="Last Name"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please input your last name (2 characters minimum)!",
                                whitespace: true,
                                min: 2,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="E-mail"
                        hasFeedback
                        rules={[
                            {
                                type: "email",
                                message: "The input is not valid E-mail!",
                            },
                            {
                                required: true,
                                message: "Please input your E-mail!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },

                            {
                                pattern: new RegExp(
                                    `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$`
                                ),
                                message:
                                    "Password must have 8 characters long, and at least one lowercase, one uppercase, one number, and one special character between #?!@$%^&*-",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your password!",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            "The two passwords that you entered do not match!"
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value
                                        ? Promise.resolve()
                                        : Promise.reject(
                                              new Error("Should approve conditions")
                                          ),
                            },
                        ]}
                        {...tailFormItemLayout}
                    >
                        <Checkbox>
                            I have approved the <a href="">conditions</a>
                        </Checkbox>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </section>
        </>
    );
};

export default Registrar;
