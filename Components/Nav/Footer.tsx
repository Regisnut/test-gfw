import React from "react";

type Props = {};

function Footer({}: Props) {
  const year = new Date().getFullYear();
  return (
    <footer className="mx-4 my-4">
      <div>
        <div>
          <div>
            © <span>{year}</span> All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
