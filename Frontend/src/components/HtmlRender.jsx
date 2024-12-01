import DOMPurify from "dompurify";
import React from "react";

const HtmlRender = ({ htmlContent }) => {
  const sanitizedHtml = DOMPurify.sanitize(htmlContent);
  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};

export default HtmlRender;
