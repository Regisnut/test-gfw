import { InputHTMLAttributes } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface MyComponentProps extends InputHTMLAttributes<HTMLInputElement> {
    children: React.ReactNode;
    name: string | null;
    setName: (string) => void;
}

export default function Layout({ children, name, setName }: MyComponentProps) {
    return (
        <div className="layout">
            <Header name={name} setName={setName} />
            <main className="flexGrow1">{children}</main>
            <Footer />
        </div>
    );
}
